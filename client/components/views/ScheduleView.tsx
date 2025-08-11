import React, { useState, useRef, useEffect } from "react";
import { Student } from "@/types/student";
import { StudentCard } from "@/components/StudentCard";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserRound,
  X,
  Haze,
  SunMedium,
  MoonStar,
} from "lucide-react";
import { getAllDaysData } from "@/data/calendarData";
import {
  getCurrentWeek,
  getCurrentMondayMonth,
  jumpToDate,
  selectToday,
  navigateTime,
} from "@/utils/calendarUtils";
import { getSessionCountForDate, getSessionDotsData } from "@/utils/dateUtils";
import {
  getUniqueStudentNames,
  getStudentSessionDays,
} from "@/utils/studentUtils";

interface ScheduleViewProps {
  students: Student[];
  onStudentClick: (studentId: string, studentList: Student[]) => void;
  openNotesOverlay: (mode: "view" | "add" | "edit", session: any) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedDayDate: string;
  setSelectedDayDate: (date: string) => void;
  currentWeekStart: number;
  setCurrentWeekStart: (start: number) => void;
  hideEmptyDays: boolean;
  setHideEmptyDays: (hide: boolean) => void;
  isToggling: boolean;
  setIsToggling: (toggling: boolean) => void;
  animationDirection: "hiding" | "showing" | null;
  setAnimationDirection: (direction: "hiding" | "showing" | null) => void;
}

export function ScheduleView({
  students,
  onStudentClick,
  openNotesOverlay,
  selectedDate,
  setSelectedDate,
  selectedDayDate,
  setSelectedDayDate,
  currentWeekStart,
  setCurrentWeekStart,
  hideEmptyDays,
  setHideEmptyDays,
  isToggling,
  setIsToggling,
  animationDirection,
  setAnimationDirection,
}: ScheduleViewProps) {
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<
    string | null
  >(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const calendarRef = useRef<HTMLDivElement>(null);
  const studentDropdownRef = useRef<HTMLDivElement>(null);

  // Close calendar picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendarPicker(false);
      }
    };

    if (showCalendarPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendarPicker]);

  // Close student dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        studentDropdownRef.current &&
        !studentDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStudentDropdown(false);
      }
    };

    if (showStudentDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStudentDropdown]);

  // Filter student names based on search
  const getFilteredStudentNames = () => {
    const allNames = getUniqueStudentNames(students);
    if (!studentSearchQuery) return allNames;
    return allNames.filter((name) =>
      name.toLowerCase().includes(studentSearchQuery.toLowerCase()),
    );
  };

  // Check if a day should be shown based on student filter
  const shouldShowDay = (dayData: any) => {
    if (!selectedStudentFilter) return true;

    const studentSessionDays = getStudentSessionDays(
      students,
      selectedStudentFilter,
    );
    return studentSessionDays.includes(dayData.date);
  };

  // Get session times for a specific student on a specific date
  const getStudentSessionTimes = (studentName: string, date: string) => {
    const dayData = dateSessionData[date];
    if (!dayData) return [];

    const times = [];

    // Check all time periods for this student
    ["morning", "afternoon", "evening"].forEach((period) => {
      const periodStudents = dayData[period as keyof typeof dayData];
      const studentInPeriod = periodStudents.find(
        (s) => s.name === studentName,
      );
      if (studentInPeriod && studentInPeriod.sessionTime) {
        // Extract just the time from the sessionTime string (e.g., "9:00am" from "9:00am, July 28")
        const timeMatch = studentInPeriod.sessionTime.match(
          /(\d{1,2}:\d{2}(?:am|pm))/i,
        );
        if (timeMatch) {
          times.push(timeMatch[1]);
        }
      }
    });

    return times;
  };

  // Session data for each date - simplified mapping
  const dateSessionData: {
    [key: string]: {
      morning: Student[];
      afternoon: Student[];
      evening: Student[];
    };
  } = {
    "28": {
      morning: students.filter((s) => s.id === "13"), // Alex - Done
      afternoon: students.filter((s) => s.id === "14"), // Emma - In progress
      evening: students.filter((s) => s.id === "15"), // Marcus - Waiting
    },
    // Add other dates as needed
  };

  const getScheduleData = () => {
    const data = dateSessionData[selectedDayDate] || {
      morning: [],
      afternoon: [],
      evening: [],
    };
    // Filter out any undefined students to prevent errors
    return {
      morning: data.morning.filter((student) => student && student.id),
      afternoon: data.afternoon.filter((student) => student && student.id),
      evening: data.evening.filter((student) => student && student.id),
    };
  };

  const handleJumpToDate = (targetDate: Date) => {
    const result = jumpToDate(targetDate);
    if (result) {
      setSelectedDayDate(result.selectedDayDate);
      setCurrentWeekStart(result.currentWeekStart);
      setShowCalendarPicker(false);
    }
  };

  const handleSelectToday = () => {
    const result = selectToday();
    if (result) {
      setSelectedDayDate(result.selectedDayDate);
      setCurrentWeekStart(result.currentWeekStart);
    }
  };

  const handleNavigateTime = (direction: "prev" | "next") => {
    const result = navigateTime(direction, currentWeekStart);
    setCurrentWeekStart(result.currentWeekStart);
    setSelectedDayDate(result.selectedDayDate);
  };

  // Helper function to render session dots
  const renderSessionDots = (
    sessionCount: number,
    isSelected: boolean = false,
    isCurrentMonth: boolean = true,
  ) => {
    const dotsData = getSessionDotsData(
      sessionCount,
      isSelected,
      isCurrentMonth,
    );
    if (!dotsData) return null;

    const { dotCount, dotColor } = dotsData;

    return (
      <div className="flex justify-center gap-0.5 mt-0.5">
        {Array.from({ length: dotCount }, (_, i) => (
          <div key={i} className={`w-1 h-1 ${dotColor} rounded-full`}></div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div
              className="flex items-center space-x-2 relative"
              ref={calendarRef}
            >
              <button
                className="flex items-center space-x-2 hover:bg-stone-100 rounded pr-2"
                onClick={() => setShowCalendarPicker(!showCalendarPicker)}
              >
                <h1 className="text-3xl font-bold text-stone-800 font-lexend">
                  {getCurrentMondayMonth(currentWeekStart, selectedDayDate)}{" "}
                  2025
                </h1>
                <ChevronDown className="w-6 h-6 text-stone-400" />
              </button>

              {/* Calendar Picker */}
              {showCalendarPicker && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg p-4 z-[100] min-w-80">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setSelectedDate(newDate);
                      }}
                      className="p-1 hover:bg-stone-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4 text-indigo-600" />
                    </button>
                    <span className="font-medium font-lexend text-stone-800">
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setSelectedDate(newDate);
                      }}
                      className="p-1 hover:bg-stone-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>

                  {/* Simple calendar grid */}
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center p-2 text-stone-500 font-lexend text-xs"
                        >
                          {day}
                        </div>
                      ),
                    )}
                    {Array.from({ length: 42 }, (_, i) => {
                      // Start from Monday - calculate the first Monday of the month view
                      const firstOfMonth = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        1,
                      );
                      const firstDayOfWeek = (firstOfMonth.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
                      const date = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        i - firstDayOfWeek + 1,
                      );

                      const isSelected =
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth() &&
                        date.getFullYear() === selectedDate.getFullYear();
                      const isCurrentMonth =
                        date.getMonth() === selectedDate.getMonth();
                      const sessionCount = getSessionCountForDate(
                        date,
                        getAllDaysData(),
                      );
                      const hasNoSessions = sessionCount === 0;
                      const shouldGrayOut =
                        hideEmptyDays && hasNoSessions && isCurrentMonth;

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDate(date);
                            handleJumpToDate(date);
                          }}
                          className={`w-9 h-9 flex flex-col items-center justify-center text-center rounded hover:bg-stone-700/10 font-lexend text-sm ${
                            isSelected
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : shouldGrayOut
                                ? "text-stone-200"
                                : isCurrentMonth
                                  ? "text-stone-700"
                                  : sessionCount > 0
                                    ? "text-stone-400"
                                    : hideEmptyDays
                                      ? "text-stone-200"
                                      : "text-stone-400"
                          }`}
                        >
                          <div className="leading-none">{date.getDate()}</div>
                          {sessionCount > 0 ? (
                            renderSessionDots(
                              sessionCount,
                              isSelected,
                              isCurrentMonth,
                            )
                          ) : (
                            <div className="h-1.5"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Separator */}
                  <div className="border-t border-stone-200 my-4"></div>

                  {/* Hide empty days toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-lexend text-gray-700">
                      Hide empty days
                    </span>
                    <button
                      onClick={() => {
                        if (isToggling) return; // Prevent rapid clicking
                        setIsToggling(true);
                        setAnimationDirection(
                          hideEmptyDays ? "showing" : "hiding",
                        );

                        // Start animation, then change state, then cleanup
                        setTimeout(() => {
                          setHideEmptyDays(!hideEmptyDays);
                          setTimeout(() => {
                            setIsToggling(false);
                            setAnimationDirection(null);
                          }, 500); // Match animation duration
                        }, 50);
                      }}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        hideEmptyDays ? "bg-indigo-600" : "bg-stone-600"
                      }`}
                      style={{
                        backgroundColor: hideEmptyDays ? "#4f46e5" : "#5d5955",
                      }}
                    >
                      <div
                        className={`absolute w-4 h-4 rounded-full bg-white shadow-lg transition-transform top-0.5 ${
                          hideEmptyDays ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative flex-1 w-56" ref={studentDropdownRef}>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <UserRound className="w-6 h-6 text-stone-400" />
              </div>
              {selectedStudentFilter && (
                <button
                  onClick={() => {
                    setSelectedStudentFilter(null);
                    setStudentSearchQuery("");
                    // Reset to highlighting today when student filter is cleared
                    setSelectedDayDate("28");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-stone-100 rounded"
                >
                  <X className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                </button>
              )}
              <Input
                type="text"
                placeholder={selectedStudentFilter || "Filter by student"}
                value={selectedStudentFilter ? "" : studentSearchQuery}
                onChange={(e) => {
                  if (!selectedStudentFilter) {
                    setStudentSearchQuery(e.target.value);
                  }
                }}
                onFocus={() => {
                  setShowStudentDropdown(true);
                  if (selectedStudentFilter) {
                    setStudentSearchQuery("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !selectedStudentFilter) {
                    const filteredNames = getFilteredStudentNames();
                    if (filteredNames.length === 1) {
                      setSelectedStudentFilter(filteredNames[0]);
                      setShowStudentDropdown(false);
                      setStudentSearchQuery("");
                    }
                  }
                }}
                className={`pl-14 ${selectedStudentFilter ? "pr-10" : "pr-4.5"} h-11 font-readex text-base rounded-full overflow-hidden bg-transparent ${selectedStudentFilter ? "text-stone-900 font-medium placeholder:text-stone-900 placeholder:font-medium" : "placeholder:text-stone-400"}`}
                readOnly={!!selectedStudentFilter}
              />

              {/* Dropdown */}
              {showStudentDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {getFilteredStudentNames().map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        setSelectedStudentFilter(name);
                        setShowStudentDropdown(false);
                        setStudentSearchQuery("");

                        // Highlight the first day when student is selected
                        const allDays = getAllDaysData();
                        const activeMonth = selectedDate.toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                          },
                        );
                        const studentSessionDays = getStudentSessionDays(
                          students,
                          name,
                        );
                        const monthDaysWithStudentSessions = allDays.filter(
                          (day) =>
                            day.month === activeMonth &&
                            studentSessionDays.includes(day.date) &&
                            day.sessions > 0,
                        );

                        if (monthDaysWithStudentSessions.length > 0) {
                          setSelectedDayDate(
                            monthDaysWithStudentSessions[0].date,
                          );
                        }
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      <span className="text-stone-900 font-lexend text-sm">
                        {name}
                      </span>
                    </button>
                  ))}
                  {getFilteredStudentNames().length === 0 && (
                    <div className="px-4 py-2 text-stone-500 text-sm">
                      No students found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Back Arrow */}
            <button
              onClick={() => handleNavigateTime("prev")}
              className="flex p-2.5 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-50 h-11"
            >
              <ChevronLeft className="w-6 h-6 text-indigo-600" />
            </button>

            {/* Today Button */}
            <button
              onClick={handleSelectToday}
              className="flex px-4 py-2 items-center justify-center rounded-lg border border-stone-200 bg-white hover:bg-stone-50 h-11"
            >
              <span className="text-stone-900 font-lexend text-base font-normal leading-6">
                Today
              </span>
            </button>

            {/* Forward Arrow */}
            <button
              onClick={() => handleNavigateTime("next")}
              className="flex p-2.5 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-50 h-11"
            >
              <ChevronRight className="w-6 h-6 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {(() => {
                const currentWeek = getCurrentWeek(
                  currentWeekStart,
                  selectedDayDate,
                );

                // Show all days during animation, filter after based on new rules
                let visibleDays;
                if (isToggling) {
                  visibleDays = currentWeek;
                } else if (selectedStudentFilter) {
                  // When student is filtered: show all dates in the active month where that student has sessions
                  const allDays = getAllDaysData();
                  const activeMonth = selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                  });

                  // Get all days in the active month where the selected student has sessions
                  const studentSessionDays = getStudentSessionDays(
                    students,
                    selectedStudentFilter,
                  );
                  const monthDaysWithStudentSessions = allDays.filter(
                    (day) =>
                      day.month === activeMonth &&
                      studentSessionDays.includes(day.date) &&
                      day.sessions > 0,
                  );

                  visibleDays = monthDaysWithStudentSessions;
                } else if (hideEmptyDays) {
                  // When hiding empty days: show only days with sessions, but always include Monday
                  const monday = currentWeek.find((day) => day.day === "Mon");
                  const daysWithSessions = currentWeek.filter(
                    (day) => day.sessions > 0,
                  );

                  // Create set to avoid duplicates, then convert back to array maintaining order
                  const uniqueDays = new Map();
                  if (monday) uniqueDays.set(monday.date, monday);
                  daysWithSessions.forEach((day) =>
                    uniqueDays.set(day.date, day),
                  );
                  visibleDays = Array.from(uniqueDays.values()).sort(
                    (a, b) => currentWeek.indexOf(a) - currentWeek.indexOf(b),
                  );
                } else {
                  // When showing empty days: show all 7 days of the week
                  visibleDays = currentWeek;
                }

                return visibleDays.map((dayData, index) => {
                  const isSelected = selectedDayDate === dayData.date;

                  return (
                    <button
                      key={dayData.date}
                      onClick={() => setSelectedDayDate(dayData.date)}
                      className={`flex w-24 h-24 p-3 pb-2 flex-col justify-between items-start rounded-xl border cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 scale-100"
                          : "border-stone-200 bg-white hover:bg-stone-50 scale-100"
                      }`}
                    >
                      {/* Top section with date and today indicator */}
                      <div className="flex flex-col items-start w-full gap-0.5">
                        <div className="flex justify-between items-center w-full">
                          <div
                            className={`text-2xl font-black leading-none font-lexend ${
                              isSelected
                                ? "text-white"
                                : dayData.sessions === 0
                                  ? "text-stone-400"
                                  : "text-stone-700"
                            }`}
                          >
                            {dayData.date}
                          </div>
                          {dayData.isToday && (
                            <div
                              className={`text-xs leading-none font-lexend opacity-50 ${
                                isSelected
                                  ? "text-white"
                                  : dayData.sessions === 0
                                    ? "text-stone-400"
                                    : "text-stone-700"
                              }`}
                            >
                              Today
                            </div>
                          )}
                        </div>
                        <div
                          className={`text-base font-medium leading-none font-lexend w-full text-left ${
                            isSelected
                              ? "text-white"
                              : dayData.sessions === 0
                                ? "text-stone-400"
                                : "text-stone-700"
                          }`}
                        >
                          {dayData.day}
                        </div>
                      </div>

                      {/* Bottom section with sessions */}
                      {dayData.sessions > 0 && (
                        <div className="flex flex-col items-start gap-0.5 w-full">
                          {selectedStudentFilter ? (
                            // Show session times when student is filtered
                            getStudentSessionTimes(
                              selectedStudentFilter,
                              dayData.date,
                            ).map((time, index) => (
                              <div
                                key={index}
                                className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? "text-white" : "text-stone-700"
                                }`}
                              >
                                {time}
                              </div>
                            ))
                          ) : (
                            // Show session count when no student filter
                            <div className="flex items-start gap-1 w-full">
                              <div
                                className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? "text-white" : "text-stone-700"
                                }`}
                              >
                                {dayData.sessions}
                              </div>
                              <div
                                className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? "text-white" : "text-stone-700"
                                }`}
                              >
                                {dayData.sessions === 1
                                  ? "session"
                                  : "sessions"}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="pl-0 pr-4 pb-6 pt-0 space-y-6 overflow-y-auto mobile-scroll"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db #f3f4f6",
          height: "100vh",
          maxHeight: "100svh",
          padding: "32px 64px 60px",
        }}
      >
        <div className="space-y-6 min-w-0 overflow-hidden flex flex-col items-start justify-start">
          {/* Time Periods */}
          <div className="space-y-8 min-w-0 mr-16">
            {/* Morning */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Haze className="w-6 h-6 text-stone-400" />
                <h3 className="text-xl font-normal text-stone-400 font-lexend">
                  Morning
                </h3>
              </div>
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                {getScheduleData().morning.map((student) => (
                  <div key={student.id} className="flex-shrink-0">
                    <StudentCard
                      student={student}
                      onClick={() => {
                        const allDayStudents = [
                          ...getScheduleData().morning,
                          ...getScheduleData().afternoon,
                          ...getScheduleData().evening,
                        ];
                        onStudentClick(student.id, allDayStudents);
                      }}
                      scheduleView={true}
                      dimmed={
                        selectedStudentFilter &&
                        student.name !== selectedStudentFilter
                      }
                      openNotesOverlay={openNotesOverlay}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Afternoon */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <SunMedium className="w-6 h-6 text-stone-400" />
                <h3 className="text-xl font-normal text-stone-400 font-lexend">
                  Afternoon
                </h3>
              </div>
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                {getScheduleData().afternoon.map((student) => (
                  <div key={student.id} className="flex-shrink-0">
                    <StudentCard
                      student={student}
                      onClick={() => {
                        const allDayStudents = [
                          ...getScheduleData().morning,
                          ...getScheduleData().afternoon,
                          ...getScheduleData().evening,
                        ];
                        onStudentClick(student.id, allDayStudents);
                      }}
                      scheduleView={true}
                      dimmed={
                        selectedStudentFilter &&
                        student.name !== selectedStudentFilter
                      }
                      openNotesOverlay={openNotesOverlay}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Evening */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MoonStar className="w-6 h-6 text-stone-400" />
                <h3 className="text-xl font-normal text-stone-400 font-lexend">
                  Evening
                </h3>
              </div>
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                {getScheduleData().evening.map((student) => (
                  <div key={student.id} className="flex-shrink-0">
                    <StudentCard
                      student={student}
                      onClick={() => {
                        const allDayStudents = [
                          ...getScheduleData().morning,
                          ...getScheduleData().afternoon,
                          ...getScheduleData().evening,
                        ];
                        onStudentClick(student.id, allDayStudents);
                      }}
                      scheduleView={true}
                      dimmed={
                        selectedStudentFilter &&
                        student.name !== selectedStudentFilter
                      }
                      openNotesOverlay={openNotesOverlay}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
