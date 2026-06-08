export type ParsedAttendee = {
  name: string | null;
  email: string | null;
  rawLine: string;
};

const EMAIL_RE = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/;

export function isEnrollingForSomeoneElse(enrollingFor?: string | null): boolean {
  const value = (enrollingFor || "").trim().toLowerCase();
  return value === "someoneelse" || value === "someone-else" || value === "someone_else";
}

export function formatEnrollingForLabel(enrollingFor?: string | null): string {
  return isEnrollingForSomeoneElse(enrollingFor) ? "Registered for someone else" : "Self enrollment";
}

/** Parse attendee lines from checkout alternative_contact textarea. */
export function parseAttendees(alternativeContact?: string | null): ParsedAttendee[] {
  if (!alternativeContact?.trim()) return [];

  const lines = alternativeContact
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const attendees: ParsedAttendee[] = [];
  let pendingName: string | null = null;

  for (const line of lines) {
    const emailMatch = line.match(EMAIL_RE);
    if (emailMatch) {
      const email = emailMatch[0];
      const nameFromLine = line.replace(email, "").replace(/[-–—|,:]/g, " ").trim() || pendingName;
      attendees.push({
        name: nameFromLine || null,
        email,
        rawLine: line,
      });
      pendingName = null;
      continue;
    }

    pendingName = line;
  }

  if (pendingName && attendees.length === 0) {
    attendees.push({ name: pendingName, email: null, rawLine: pendingName });
  }

  return attendees;
}

export function formatAttendeesSummary(alternativeContact?: string | null): string {
  const attendees = parseAttendees(alternativeContact);
  if (attendees.length === 0) return "";

  return attendees
    .map((attendee) => {
      if (attendee.name && attendee.email) return `${attendee.name} (${attendee.email})`;
      if (attendee.email) return attendee.email;
      return attendee.name || attendee.rawLine;
    })
    .join("; ");
}
