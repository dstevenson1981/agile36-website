#!/usr/bin/env python3
"""Practice-exam follow-up copy. From Marcus. No dashes. No 100OFF."""

COURSES = [
    {
        "slug": "leading-safe",
        "short": "Leading SAFe",
        "eyebrow": "Leading SAFe® / SAFe® Agilist",
        "exam": "SAFe® Agilist",
        "course": "Leading SAFe®",
        "href": "https://www.agile36.com/courses/leading-safe/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "product-owner-manager",
        "short": "POPM",
        "eyebrow": "SAFe® Product Owner / Product Manager",
        "exam": "SAFe® POPM",
        "course": "SAFe® POPM",
        "href": "https://www.agile36.com/courses/product-owner-manager/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "lean-portfolio-management",
        "short": "LPM",
        "eyebrow": "SAFe® Lean Portfolio Management",
        "exam": "SAFe® LPM",
        "course": "SAFe® Lean Portfolio Management",
        "href": "https://www.agile36.com/courses/lean-portfolio-management/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "agile-product-management",
        "short": "APM",
        "eyebrow": "SAFe® Agile Product Management",
        "exam": "SAFe® APM",
        "course": "SAFe® Agile Product Management",
        "href": "https://www.agile36.com/courses/agile-product-management/schedule",
        "class_line": "Live three day class with the official exam included",
    },
    {
        "slug": "scrum-master",
        "short": "Scrum Master",
        "eyebrow": "SAFe® Scrum Master",
        "exam": "SAFe® Scrum Master",
        "course": "SAFe® Scrum Master",
        "href": "https://www.agile36.com/courses/scrum-master/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "safe-for-teams",
        "short": "SAFe for Teams",
        "eyebrow": "SAFe® for Teams",
        "exam": "SAFe® for Teams",
        "course": "SAFe® for Teams",
        "href": "https://www.agile36.com/courses/safe-for-teams/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "devops",
        "short": "DevOps",
        "eyebrow": "SAFe® DevOps",
        "exam": "SAFe® DevOps",
        "course": "SAFe® DevOps",
        "href": "https://www.agile36.com/courses/devops/schedule",
        "class_line": "Live two day class with the official exam included",
    },
    {
        "slug": "advanced-scrum-master",
        "short": "Advanced Scrum Master",
        "eyebrow": "SAFe® Advanced Scrum Master",
        "exam": "SAFe® Advanced Scrum Master",
        "course": "SAFe® Advanced Scrum Master",
        "href": "https://www.agile36.com/courses/advanced-scrum-master/schedule",
        "class_line": "Live two day class with the official exam included",
    },
]


def bullets(c):
    return [
        c["class_line"],
        "SPC instructors with Fortune 100 transformation experience",
        "Official courseware and one year of SAFe Studio",
        "The certification exam is included with class",
    ]


def subject(c):
    return f"You started the {c['short']} practice exam. Here's how people pass"


def body_text(c):
    lines = "\n".join(f"• {b}" for b in bullets(c))
    return f"""Hi {{first_name}},

You started the free {c["course"]} practice exam. That usually means you want to pass the official {c["exam"]} exam.

Our students pass at a 98% rate. The free mock is a preview. The live class is how people actually get ready: official exam included, real instructors, and the courseware you need.

What enrollment includes:
{lines}

See upcoming dates: {c["href"]}

Questions about the exam or which date fits? Reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner"""


def body_html(c):
    rows = "".join(
        f'<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">{b}</td></tr>'
        for b in bullets(c)
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>{c["course"]} practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">{c["eyebrow"]}</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here's how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {{first_name}},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>{c["course"]}</strong> practice exam. That usually means one thing: you want to pass the official {c["exam"]} exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. The live class is how people actually get ready: official exam included, real instructors, and the courseware you need.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
{rows}
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="{c["href"]}" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>"""


def assert_no_dashes(text: str, label: str) -> None:
    for ch in ("—", "–", "-", "→"):
        if ch in text:
            raise SystemExit(f"dash {ch!r} found in {label}")


def copy_without_urls(text: str) -> str:
    return " ".join(part for part in text.split() if not part.startswith("http"))


for c in COURSES:
    assert_no_dashes(subject(c), f"subject {c['slug']}")
    text = copy_without_urls(body_text(c))
    assert_no_dashes(text, f"text {c['slug']}")
    if "Pro exam" in text or "Pro practice" in text:
        raise SystemExit(f"Pro upsell found in text {c['slug']}")
    visible = copy_without_urls(body_html(c))
    for bad in ("—", "–", "two-day", "three-day", "Deadra", "&rarr;", "Pro exam", "Pro practice"):
        if bad in visible:
            raise SystemExit(f"{bad!r} found in html {c['slug']}")
