// Run via the browser javascript_tool on a tab whose origin is
// https://training.scaledagile.com (open any page there first).
// Returns JSON: every upcoming Agile36 listing on the Training Finder.
// curl does NOT work — the API sits behind a Vercel bot checkpoint.
(async () => {
  const out = [];
  let page = 1;
  while (page <= 30) {
    const r = await fetch(`/api/search?sort=default&page=${page}&limit=100`);
    const j = await r.json();
    const res = j.results || [];
    for (const c of res) {
      if ((c.partnerName || "").toLowerCase().includes("agile36")) {
        out.push({
          course: c.courseName || c.course || c.courseType,
          start: c.startDate,
          end: c.endDate,
          tz: c.standardizedTimezone,
          tzLabel: c.timezone,
          reg: (c.registrationUrl || "").split("?")[0],
        });
      }
    }
    if (res.length < 100) break;
    page++;
  }
  return JSON.stringify(out);
})()
