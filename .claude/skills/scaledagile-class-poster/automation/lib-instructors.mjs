/**
 * Read ONLY the Instructors table from a class detail page.
 *
 * The page has two tables whose rows both contain email addresses —
 * Instructors and Attendees. Matching on "row containing an @" therefore
 * picks up enrolled students and reports them as trainers. Identify the right
 * table by its header: Instructors has an "Instructor Name" column.
 */
export async function readInstructors(page) {
  return page.evaluate(() => {
    const grids = [];
    const walk = (root) => {
      root.querySelectorAll('[role="grid"],table').forEach((g) => grids.push(g));
      root.querySelectorAll("*").forEach((e) => e.shadowRoot && walk(e.shadowRoot));
    };
    walk(document);

    for (const g of grids) {
      const rows = [...g.querySelectorAll('[role="row"],tr')];
      if (!rows.length) continue;
      const header = rows[0].innerText || "";
      if (!/Instructor Name/i.test(header)) continue; // Attendees table, skip
      const out = [];
      for (const r of rows.slice(1)) {
        const cells = [...r.querySelectorAll('[role="gridcell"],[role="rowheader"],td,th')];
        const name = cells[0]?.innerText?.trim();
        if (name && /@/.test(r.innerText || "")) out.push(name);
      }
      if (out.length) return [...new Set(out)];
    }
    return [];
  });
}
