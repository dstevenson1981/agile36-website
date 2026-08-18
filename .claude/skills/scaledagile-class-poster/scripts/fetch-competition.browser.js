// Run via the browser javascript_tool on a tab whose origin is
// https://training.scaledagile.com (open any page there first).
// curl does NOT work — the API sits behind a Vercel bot checkpoint.
//
// Returns JSON: for every course+date in the window, how many OTHER partners
// have that same course starting that day. Feed the result to
// select-batch.mjs via --competition so low-competition dates win the
// floater and twice-a-month slots.
//
// Edit FROM/TO to match the posting window before running.
(async () => {
  const FROM = "2026-09-01";
  const TO = "2026-10-31";
  const OURS = new Set([
    "Lean Portfolio Management",
    "SAFe Product Owner/Product Manager",
    "SAFe Scrum Master",
    "Leading SAFe",
    "SAFe Advanced Scrum Master",
    "Agile Product Management",
    "SAFe for Teams",
  ]);
  const data = {};
  for (let page = 1; page <= 30; page++) {
    const r = await fetch(`/api/search?sort=default&page=${page}&limit=100`);
    const j = await r.json();
    const res = j.results || [];
    for (const c of res) {
      if (!OURS.has(c.courseType)) continue;
      if (!(c.startDate >= FROM && c.startDate <= TO)) continue;
      // Our own listings are not competition.
      if ((c.partnerName || "").toLowerCase().includes("agile36")) continue;
      const k = `${c.startDate}|${c.courseType}`;
      data[k] = data[k] || { all: 0, eastern: 0 };
      data[k].all++;
      if (c.standardizedTimezone === "America/New_York") data[k].eastern++;
    }
    if (res.length < 100) break;
  }
  return JSON.stringify({ window: `${FROM}..${TO}`, data });
})()
