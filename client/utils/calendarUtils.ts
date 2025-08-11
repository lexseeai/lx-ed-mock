import { getAllDaysData, DayData } from "@/data/calendarData";

export function getCurrentWeek(
  currentWeekStart: number,
  selectedDayDate: string,
) {
  const allDays = getAllDaysData();

  // Use currentWeekStart if it's set, otherwise calculate from selectedDayDate
  if (currentWeekStart >= 0 && currentWeekStart < allDays.length) {
    return allDays.slice(currentWeekStart, currentWeekStart + 7);
  }

  // Fallback: find by selectedDayDate
  const currentIndex = allDays.findIndex((day) => day.date === selectedDayDate);

  if (currentIndex === -1) return allDays.slice(0, 7);

  // Find the Monday of the current week
  const currentDay = allDays[currentIndex];
  const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(
    currentDay.day,
  );
  const mondayIndex = currentIndex - dayIndex;

  // Get the complete week (Monday through Sunday)
  return allDays.slice(Math.max(0, mondayIndex), Math.max(7, mondayIndex + 7));
}

export function getCurrentMondayMonth(
  currentWeekStart: number,
  selectedDayDate: string,
) {
  const currentWeek = getCurrentWeek(currentWeekStart, selectedDayDate);
  const monday = currentWeek.find((day) => day.day === "Mon");
  return monday ? monday.month : "July";
}

export function jumpToDate(targetDate: Date) {
  const allDays = getAllDaysData();
  const targetDateStr = targetDate.getDate().toString();
  const targetMonth = targetDate.toLocaleDateString("en-US", {
    month: "long",
  });

  // Find the target day in our data
  const targetDay = allDays.find(
    (day) => day.date === targetDateStr && day.month === targetMonth,
  );

  if (targetDay) {
    // Find the Monday of this week and set as week start
    const targetIndex = allDays.findIndex((day) => day === targetDay);
    const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(
      targetDay.day,
    );
    const mondayIndex = targetIndex - dayIndex;

    return {
      selectedDayDate: targetDay.date,
      currentWeekStart: Math.max(0, mondayIndex),
    };
  }

  return null;
}

export function selectToday() {
  // Today is July 28th (Monday) - jump to this date
  return jumpToDate(new Date(2025, 6, 28)); // July 28, 2025
}

export function navigateTime(
  direction: "prev" | "next",
  currentWeekStart: number,
) {
  const allDays = getAllDaysData();

  if (direction === "prev") {
    // Go to previous week
    const newWeekStart = Math.max(0, currentWeekStart - 7);

    // Set selected day to the Monday of this week
    const newMonday = allDays[newWeekStart];
    return {
      currentWeekStart: newWeekStart,
      selectedDayDate: newMonday ? newMonday.date : "1",
    };
  } else {
    // Go to next week
    const newWeekStart = Math.min(allDays.length - 7, currentWeekStart + 7);

    // Set selected day to the Monday of this week
    const newMonday = allDays[newWeekStart];
    return {
      currentWeekStart: newWeekStart,
      selectedDayDate: newMonday ? newMonday.date : "1",
    };
  }
}
