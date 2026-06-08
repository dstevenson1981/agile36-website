export type CourseScheduleRow = {
  id: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  timezone?: string;
  duration?: string;
  time_slot?: string;
  is_weekend?: boolean;
  instructor_name?: string | null;
  instructor_image?: string | null;
  language?: string | null;
  exam_included?: boolean | null;
  price: string;
  original_price?: string | null;
  is_best_deal?: boolean;
  seats_available?: number | null;
};

export function formatDateRange(startDate: string, endDate: string): string {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startFormatted = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endFormatted = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${startFormatted} - ${end.getDate()}`;
    }
    return `${startFormatted} - ${endFormatted}`;
  } catch {
    return "Date TBA";
  }
}

export function formatTimezoneLabel(timezone?: string): string {
  if (!timezone) return "EST";
  if (timezone === "America/New_York") return "EST";
  return timezone;
}

export function formatTimeShort(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function formatTime(time: string, timezone?: string): string {
  const short = formatTimeShort(time);
  if (!short) return "";
  const tz = formatTimezoneLabel(timezone);
  return `${short} (${tz})`;
}

export function getTimeSlotLabel(timeSlot?: string): string {
  const labels: Record<string, string> = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
  };
  return labels[timeSlot || ""] || "Morning";
}

export function getTimeSlotColor(timeSlot?: string): string {
  const colors: Record<string, string> = {
    morning: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
    afternoon: "bg-sky-50 text-sky-800 ring-1 ring-sky-200",
    evening: "bg-violet-50 text-violet-800 ring-1 ring-violet-200",
  };
  return colors[timeSlot || ""] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

export type ScheduleUrgency = {
  show: boolean;
  isWithinNext7Days: boolean;
  isWithin8to14Days: boolean;
  isLowSeats: boolean;
  message: string;
};

export function getScheduleUrgency(schedule: CourseScheduleRow): ScheduleUrgency {
  const startDate = new Date(schedule.start_date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date(now);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const fourteenDaysFromNow = new Date(now);
  fourteenDaysFromNow.setDate(fourteenDaysFromNow.getDate() + 14);

  const startDateOnly = new Date(startDate);
  startDateOnly.setHours(0, 0, 0, 0);

  const isWithinNext7Days = startDateOnly >= now && startDateOnly <= sevenDaysFromNow;
  const isWithin8to14Days = startDateOnly > sevenDaysFromNow && startDateOnly <= fourteenDaysFromNow;
  const isLowSeats =
    !isWithinNext7Days &&
    !isWithin8to14Days &&
    schedule.seats_available !== null &&
    schedule.seats_available !== undefined &&
    schedule.seats_available > 0 &&
    schedule.seats_available <= 5;

  const show = isWithinNext7Days || isWithin8to14Days || isLowSeats;

  let message = "";
  if (isWithinNext7Days) message = "Only 3 seats left";
  else if (isWithin8to14Days) message = "Sales ending soon";
  else if (isLowSeats) message = `Only ${schedule.seats_available} seats left`;

  return { show, isWithinNext7Days, isWithin8to14Days, isLowSeats, message };
}
