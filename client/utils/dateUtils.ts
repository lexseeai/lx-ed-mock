// Helper function to reformat session time for session notes view (Month Day, Time)
export function formatSessionTimeForNotes(sessionTime: string): string {
  // Match pattern like "3:00pm, July 28" or "9:00am, July 14"
  const match = sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm)),\s*(.+)/i);
  if (match) {
    const [, time, date] = match;
    return `${date}, ${time}`;
  }
  return sessionTime; // Return original if no match
}

// Helper function to reformat session time to "Month day, time" format
export function formatSessionTimeToMonthDayTime(sessionTime: string): string {
  // Match pattern like "9:00am, July 14" and convert to "July 14, 9:00am"
  const match = sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm)),\s*(.+)/i);
  if (match) {
    const [, time, date] = match;
    return `${date}, ${time}`;
  }
  return sessionTime; // Return original if no match
}

// Helper function to convert single time to 45-minute session range
export function getSessionTimeRange(timeString: string): string {
  const timeMatch = timeString.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!timeMatch) return timeString;

  const [, hours, minutes, period] = timeMatch;
  const startHour = parseInt(hours);
  const startMin = parseInt(minutes);

  // Convert to 24-hour format for calculation
  let start24Hour = startHour;
  if (period.toLowerCase() === "pm" && startHour !== 12) {
    start24Hour += 12;
  } else if (period.toLowerCase() === "am" && startHour === 12) {
    start24Hour = 0;
  }

  // Add 45 minutes
  let endMin = startMin + 45;
  let end24Hour = start24Hour;
  if (endMin >= 60) {
    endMin -= 60;
    end24Hour += 1;
  }

  // Convert back to 12-hour format
  let endHour = end24Hour;
  let endPeriod = "am";
  if (end24Hour >= 12) {
    endPeriod = "pm";
    if (end24Hour > 12) {
      endHour = end24Hour - 12;
    }
  }
  if (endHour === 0) {
    endHour = 12;
  }

  const startTime = `${hours}:${minutes.padStart(2, "0")}`;
  const endTime = `${endHour}:${endMin.toString().padStart(2, "0")}`;

  // Use en dash and show period only on end time if different, or both if same
  if (period.toLowerCase() === endPeriod) {
    return `${startTime}–${endTime}${period.toLowerCase()}`;
  } else {
    return `${startTime}${period.toLowerCase()}–${endTime}${endPeriod}`;
  }
}

// Get time-based greeting
export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { text: "Good morning", icon: "Haze" };
  } else if (hour < 18) {
    return { text: "Good afternoon", icon: "SunMedium" };
  } else {
    return { text: "Good evening", icon: "MoonStar" };
  }
}

// Get sessions heading based on time of day
export function getSessionsHeading() {
  const hour = new Date().getHours();
  return hour >= 18 ? "Tomorrow's sessions" : "Today's sessions";
}

// Helper function to get session count for a specific date
export function getSessionCountForDate(date: Date, allDays: any[]) {
  const dateStr = date.getDate().toString();
  const monthStr = date.toLocaleDateString("en-US", { month: "long" });

  // Find matching day in our calendar data
  const matchingDay = allDays.find(
    (day) => day.date === dateStr && day.month === monthStr,
  );

  return matchingDay ? matchingDay.sessions : 0;
}

// Helper function to render session dots
export function renderSessionDots(
  sessionCount: number,
  isSelected: boolean = false,
  isCurrentMonth: boolean = true,
) {
  if (sessionCount === 0) return null;

  let dotCount = 1;
  if (sessionCount >= 2 && sessionCount <= 4) dotCount = 2;
  if (sessionCount >= 5) dotCount = 3;

  let dotColor = "bg-stone-300"; // Default for current month
  if (isSelected) {
    dotColor = "bg-white";
  } else if (!isCurrentMonth) {
    dotColor = "bg-stone-400"; // Non-active months use stone-400
  }

  return (
    <div className="flex justify-center gap-0.5 mt-0.5">
      {Array.from({ length: dotCount }, (_, i) => (
        <div key={i} className={`w-1 h-1 ${dotColor} rounded-full`}></div>
      ))}
    </div>
  );
}