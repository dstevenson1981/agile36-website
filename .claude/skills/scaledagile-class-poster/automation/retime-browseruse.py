"""
Set Timezone / City / State on existing partner-calendar listings.

    uvx --from browser-use browser-use < retime-browseruse.py

Why this and not Playwright: the edit form is a Visualforce frame wrapping
Lightning web components, and the dropdown's option list renders outside the
form's DOM entirely. Every CSS/role selector finds nothing, and synthetic
element.click() is ignored. The accessibility tree exposes each control with a
real backendDOMNodeId, and CDP mouse events land at the compositor level, so
they pass straight through the frame and shadow boundaries.

Reads targets from targets.json (written by retime-classes.mjs --dry-run).
Verifies each save on the page before counting it. Changes three fields and
nothing else — no dates, no instructors, no cancellations.
"""
import json
import re
import time

TARGETS = json.load(open("targets.json"))
WANT_TZ = "GMT–05:00 Eastern Standard Time"  # en dash, as the portal renders it


def tree():
    return cdp("Accessibility.getFullAXTree")["nodes"]  # noqa: F821


def center(bid):
    q = cdp("DOM.getBoxModel", backendNodeId=bid)["model"]["content"]  # noqa: F821
    return sum(q[0::2]) / 4, sum(q[1::2]) / 4


def find(role=None, name=None, value=None, nodes=None):
    """First AX node matching role / name substring / value substring."""
    for n in nodes if nodes is not None else tree():
        r = (n.get("role") or {}).get("value") or ""
        nm = (n.get("name") or {}).get("value") or ""
        vl = str((n.get("value") or {}).get("value") or "")
        if role and r != role:
            continue
        if name and name.lower() not in nm.lower():
            continue
        if value and value.lower() not in vl.lower():
            continue
        return n
    return None


def click_node(n):
    """Scroll in and click. An element can briefly report no box model while the
    modal animates, so retry rather than losing the class."""
    bid = n.get("backendDOMNodeId")
    last = None
    for _ in range(4):
        try:
            cdp("DOM.scrollIntoViewIfNeeded", backendNodeId=bid)  # noqa: F821
            time.sleep(0.8)
            x, y = center(bid)
            click_at_xy(x, y)  # noqa: F821
            return
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.5)
    raise RuntimeError(f"could not click node {bid}: {last}")


def set_field(label, text):
    """Type into a text input identified by its accessibility name."""
    n = find(role="textbox", name=label)
    if not n:
        raise RuntimeError(f'no textbox "{label}"')
    click_node(n)
    time.sleep(0.5)
    # Meta+a alone leaves the old value selected but not removed, so typing
    # appends and you get "MiamiMiami". Delete it explicitly first.
    press_key("Meta+a")  # noqa: F821
    time.sleep(0.2)
    press_key("Delete")  # noqa: F821
    time.sleep(0.3)
    type_text(text)  # noqa: F821
    time.sleep(0.6)
    got = str((find(role="textbox", name=label).get("value") or {}).get("value") or "").strip()
    if got != text:
        raise RuntimeError(f'{label} reads "{got}" not "{text}"')


def set_dropdown(label, want):
    """Open a Lightning combobox and pick the option whose name contains `want`."""
    box = find(role="combobox", name=label)
    if not box:
        raise RuntimeError(f'no combobox "{label}"')
    click_node(box)
    time.sleep(2.0)
    opt = find(role="option", name=want)
    if not opt:
        # Long lists (the 50 states) only render what is on screen, so the
        # option does not exist in the tree until it scrolls into range.
        # Lightning comboboxes support type-ahead, which is faster and exact.
        type_text(want[:4])  # noqa: F821
        time.sleep(1.5)
        opt = find(role="option", name=want)
    if not opt:
        for _ in range(12):
            scroll(0, 320)  # noqa: F821
            time.sleep(0.6)
            opt = find(role="option", name=want)
            if opt:
                break
    if not opt:
        raise RuntimeError(f'option "{want}" not offered for {label}')
    click_node(opt)
    time.sleep(1.2)
    now = str((find(role="combobox", name=label).get("value") or {}).get("value") or "")
    if want.lower() not in now.lower():
        raise RuntimeError(f'{label} still reads "{now[:40]}"')


results = []
for t in TARGETS:
    label = f"{t['date']}  {t['name'][:38]}  -> {t['city']}, {t['state']}"
    try:
        goto_url(t["href"])  # noqa: F821
        wait_for_load()  # noqa: F821
        time.sleep(7)

        # Private classes are not publicly listed, so they are not worth editing.
        head = js("document.body.innerText")  # noqa: F821
        if "Remote Private Course" in head:
            print(f"SKIP  {label}  (private)")
            results.append({**t, "status": "skipped-private"})
            continue

        # The modal opens intermittently — the page reflows after load, so a
        # click can land before the header settles. Re-locate and retry rather
        # than failing the class.
        opened = False
        for attempt in range(4):
            cands = []
            for n in tree():
                if (n.get("role") or {}).get("value") == "button" and (
                    ((n.get("name") or {}).get("value") or "").strip().lower() == "basic info"
                ):
                    try:
                        cands.append((center(n["backendDOMNodeId"])[1], n))
                    except Exception:  # noqa: BLE001
                        pass
            if not cands:
                time.sleep(4)
                continue
            click_node(min(cands, key=lambda c: c[0])[1])
            for _ in range(6):
                time.sleep(2.5)
                if find(role="combobox", name="Timezone"):
                    opened = True
                    break
            if opened:
                break
            time.sleep(3)
        if not opened:
            raise RuntimeError("edit modal did not open after 4 attempts")

        set_dropdown("Timezone", WANT_TZ)
        set_field("City", t["city"])
        set_dropdown("State", t["state"])

        save = None
        for n in tree():
            if (n.get("role") or {}).get("value") == "button" and (
                ((n.get("name") or {}).get("value") or "").strip().lower() == "save"
            ):
                save = n
        if not save:
            raise RuntimeError("no Save button")
        click_node(save)
        time.sleep(8)

        body = js("document.body.innerText")  # noqa: F821
        m = re.search(r"Timezone\s*\n?\s*([^\n]+)", body)
        shown = (m.group(1) if m else "").strip()
        if "05:00 Eastern Standard" not in shown:
            raise RuntimeError(f'saved but page shows "{shown[:40]}"')

        print(f"OK    {label}")
        results.append({**t, "status": "updated"})
    except Exception as e:  # noqa: BLE001
        print(f"FAIL  {label}\n      {e}")
        results.append({**t, "status": "failed", "error": str(e)})

ok = sum(1 for r in results if r["status"] == "updated")
print(f"\nupdated {ok} | failed {len(results) - ok}")
json.dump(results, open("retime-results.json", "w"), indent=2)
