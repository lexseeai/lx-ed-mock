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
  Clock,
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
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const calendarRef = useRef<HTMLDivElement>(null);
  const studentDropdownRef = useRef<HTMLDivElement>(null);

  // Get current week data
  const currentWeek = getCurrentWeek(currentWeekStart, selectedDayDate);

  // Get sessions for the selected day
  const getSessionsForDay = (dayDate: string) => {
    return students.filter((student) => {
      if (!student.sessionDate) return false;
      const studentDate = student.sessionDate.getDate().toString();
      return studentDate === dayDate;
    });
  };

  const todaysSessions = getSessionsForDay(selectedDayDate);

  // Handle navigation
  const handlePrevWeek = () => {
    const { newWeekStart } = navigateTime("prev", currentWeekStart);
    setCurrentWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const { newWeekStart } = navigateTime("next", currentWeekStart);
    setCurrentWeekStart(newWeekStart);
  };

  const handleToday = () => {
    const { newWeekStart, newSelectedDay } = selectToday();
    setCurrentWeekStart(newWeekStart);
    setSelectedDayDate(newSelectedDay);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendarPicker(false);
      }
      if (
        studentDropdownRef.current &&
        !studentDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStudentDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFilteredStudentNames = () => {
    const uniqueNames = getUniqueStudentNames(students);
    return uniqueNames.filter((name) =>
      name.toLowerCase().includes(studentSearchQuery.toLowerCase()),
    );
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 rounded-lg border border-stone-200 shadow-lg">
      {/* Header */}
      <div className="p-6 bg-white border-b border-stone-200">
        {/* Top row with date picker and filter */}
        <div className="flex items-center justify-between mb-3">
          {/* Date Picker - Left side */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center space-x-1" ref={calendarRef}>
              <button
                className="flex items-center space-x-1 hover:bg-stone-100 rounded px-2 py-1"
                onClick={() => setShowCalendarPicker(!showCalendarPicker)}
              >
                <h1 className="text-2xl font-bold text-stone-800 font-lexend">
                  July 2025
                </h1>
                <ChevronDown className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Navigation controls - Center */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevWeek}
              className="flex h-11 w-11 items-center justify-center border border-stone-200 bg-white rounded-lg hover:bg-stone-50"
            >
              <ChevronLeft className="w-6 h-6 text-indigo-600" />
            </button>
            <button
              onClick={handleToday}
              className="flex h-11 w-27 px-4 items-center justify-center gap-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 font-lexend"
            >
              <span className="text-base font-normal text-stone-900">
                Today
              </span>
            </button>
            <button
              onClick={handleNextWeek}
              className="flex h-11 w-11 items-center justify-center border border-stone-200 bg-white rounded-lg hover:bg-stone-50"
            >
              <ChevronRight className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          {/* Filter - Right side */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-56" ref={studentDropdownRef}>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <UserRound className="w-6 h-6 text-stone-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Filter by student"
                  value={selectedStudentFilter ? "" : studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  onFocus={() => setShowStudentDropdown(true)}
                  className="h-11 rounded-full border border-stone-200 bg-white pl-12 pr-4 text-sm font-lexend"
                />
              </div>
              {showStudentDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  <div className="p-2">
                    {getFilteredStudentNames().map((name, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedStudentFilter(name);
                          setShowStudentDropdown(false);
                          setStudentSearchQuery("");
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-stone-50 rounded font-lexend"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Days - Centered */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5">
            {currentWeek.slice(0, 7).map((dayData) => {
              const isSelected = selectedDayDate === dayData.date;
              const isToday = dayData.isToday;
              const hasNoSessions = dayData.sessions === 0;

              return (
                <button
                  key={dayData.date}
                  onClick={() => setSelectedDayDate(dayData.date)}
                  className={`flex w-24 h-24 p-3 pb-2 flex-col justify-between items-start rounded-xl border ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-stone-200 bg-white hover:bg-stone-50"
                  }`}
                >
                  {/* Top section */}
                  <div className="flex flex-col items-start w-full gap-1.5">
                    <div className="flex justify-between items-center w-full">
                      <div
                        className={`text-2xl font-black leading-none font-lexend ${
                          isSelected
                            ? "text-white"
                            : hasNoSessions
                              ? "text-stone-400"
                              : "text-stone-700"
                        }`}
                      >
                        {dayData.date}
                      </div>
                      {isToday && (
                        <div
                          className={`text-xs leading-none font-lexend opacity-50 ${
                            isSelected
                              ? "text-white"
                              : hasNoSessions
                                ? "text-stone-400"
                                : "text-stone-700"
                          }`}
                        >
                          Today
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-base font-medium leading-none font-lexend ${
                        isSelected
                          ? "text-white"
                          : hasNoSessions
                            ? "text-stone-400"
                            : "text-stone-700"
                      }`}
                    >
                      {dayData.day}
                    </div>
                  </div>

                  {/* Sessions count - only show if there are sessions */}
                  {dayData.sessions > 0 && (
                    <div className="flex items-center gap-1">
                      <div
                        className={`text-sm font-normal font-lexend ${
                          isSelected ? "text-white" : "text-stone-700"
                        }`}
                      >
                        {dayData.sessions}
                      </div>
                      <div
                        className={`text-sm font-normal font-lexend ${
                          isSelected ? "text-white" : "text-stone-700"
                        }`}
                      >
                        {dayData.sessions === 1 ? "session" : "sessions"}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 p-6 gap-4.5">
        {/* Left: Day Schedule */}
        <div className="w-[450px] flex flex-col bg-white rounded-lg border border-stone-200 p-4.5">
          {/* Time slots with sessions */}
          <div className="flex flex-col flex-1 justify-between">
            {/* Header */}
            <div className="flex items-center justify-between px-9 py-6">
              <div className="flex gap-1">
                <h2 className="text-4xl font-black text-stone-700 font-lexend tracking-tight">
                  Monday
                </h2>
                <h2 className="text-4xl font-normal text-stone-700 font-lexend tracking-tight">
                  28
                </h2>
              </div>
              <span className="text-sm font-semibold text-stone-500 font-lexend">
                Today
              </span>
            </div>

            {/* Time grid */}
            <div className="flex-1 flex flex-col relative">
              {/* Hour markers */}
              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                <div key={hour} className="flex items-center gap-2.5 px-3 py-3">
                  <div className="w-4 text-xs text-stone-400 text-right font-lexend">
                    {hour}
                  </div>
                  <div className="flex-1 h-px bg-stone-100"></div>
                </div>
              ))}

              {/* Sessions overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {todaysSessions.map((session, index) => {
                  const sessionHour = session.sessionDate?.getHours() || 9;
                  const sessionMinutes = session.sessionDate?.getMinutes() || 0;

                  // Each hour row: py-3 (12px top + 12px bottom) + content ≈ 52px total height
                  const hourHeight = 52;
                  const startPosition = (sessionHour - 8) * hourHeight + (sessionMinutes / 60 * hourHeight);

                  // Debug: Log positioning
                  if (process.env.NODE_ENV === 'development') {
                    console.log(`${session.name} (${sessionHour}:${sessionMinutes.toString().padStart(2,'0')}): position ${startPosition}px`);
                  }

                  // Session duration is 45 minutes = 39px (0.75 * 52px per hour)
                  const sessionHeight = 39;

                  let bgColor = "bg-indigo-100 border-indigo-200";
                  let textColor = "text-stone-600";

                  if (session.sessionReportCompleted) {
                    bgColor = "bg-indigo-50 border-indigo-100";
                  } else if (sessionHour < new Date().getHours()) {
                    bgColor = "bg-indigo-600 border-indigo-600";
                    textColor = "text-white";
                  }

                  // Format time range for display in 24-hour format
                  const startHour24 = sessionHour.toString().padStart(2, '0');
                  const startMin24 = sessionMinutes.toString().padStart(2, '0');

                  // Calculate end time (45 minutes later)
                  const endTotalMinutes = sessionHour * 60 + sessionMinutes + 45;
                  const endHour = Math.floor(endTotalMinutes / 60);
                  const endMinutes = endTotalMinutes % 60;
                  const endHour24 = endHour.toString().padStart(2, '0');
                  const endMin24 = endMinutes.toString().padStart(2, '0');

                  const timeRange = `${startHour24}:${startMin24} – ${endHour24}:${endMin24}`;

                  return (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`absolute left-9 w-[400px] flex items-center px-1.5 rounded-md border pointer-events-auto ${bgColor}`}
                      style={{
                        top: `${startPosition}px`,
                        height: `${sessionHeight}px`
                      }}
                    >
                      <div className="flex items-center gap-4.5">
                        <div className={`w-[75px] text-xs font-lexend ${textColor}`}>
                          {timeRange}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-bold font-lexend ${textColor}`}>
                            {session.name}
                          </div>
                          <div className={`text-sm font-normal font-lexend opacity-60 ${textColor}`}>
                            {session.subject}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Current time indicator - only show on today */}
              {selectedDayDate === "28" && (
                <div
                  className="absolute left-9 w-[400px] h-1 bg-red-600 rounded-full"
                  style={{
                    top: `${(new Date().getHours() - 8) * 52 + (new Date().getMinutes() / 60 * 52)}px`
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right: Session Details */}
        {selectedSession && (
          <div className="flex-1 flex flex-col bg-white rounded-lg border border-stone-200 p-9">
            {/* Student header */}
            <div className="flex items-start justify-between pt-4.5 mb-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-15 h-15 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white">
                    <span className="text-xl font-bold text-purple-600 font-lexend">
                      M
                    </span>
                  </div>
                  <div className="flex flex-col px-0.5">
                    <h3 className="text-2xl font-bold text-stone-900 font-lexend tracking-tight">
                      {selectedSession.name} Smith
                    </h3>
                    <p className="text-sm font-medium text-stone-400 font-lexend tracking-tight">
                      {selectedSession.subject}
                    </p>
                  </div>
                </div>
                <div className="pl-17 pt-2">
                  <p className="text-base font-medium text-stone-700 font-lexend tracking-tight">
                    Monday, 28 July, 19:00 – 19:45
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-4 py-2 border border-stone-200 bg-white rounded-md hover:bg-stone-50">
                <span className="text-sm font-normal text-black font-readex tracking-tight">
                  View student
                </span>
                <UserRound className="w-4.5 h-4.5 text-black" />
              </button>
            </div>

            {/* Topics section */}
            <div className="bg-white rounded-lg p-5 mb-5">
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-xl font-bold text-stone-900 font-lexend tracking-wide">
                    Topics for this session
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-normal text-stone-400 font-lexend">
                    From session notes
                  </span>
                  <div className="px-1 py-1 bg-stone-100 rounded-full">
                    <span className="text-xs font-normal text-stone-400 font-lexend">
                      14 June 25
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pl-1.5">
                <div className="flex items-start gap-1.5">
                  <div className="pt-0.5">
                    <div className="w-4.5 h-4.5 border border-stone-700 rounded-full"></div>
                  </div>
                  <p className="flex-1 text-base font-normal text-stone-900 font-lexend leading-relaxed">
                    Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                  </p>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="pt-0.5">
                    <div className="w-4.5 h-4.5 border border-stone-700 rounded-full"></div>
                  </div>
                  <p className="flex-1 text-base font-normal text-stone-900 font-lexend leading-relaxed">
                    Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                  </p>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="pt-0.5">
                    <div className="w-4.5 h-4.5 border border-stone-700 rounded-full"></div>
                  </div>
                  <p className="flex-1 text-base font-normal text-stone-900 font-lexend leading-relaxed">
                    Introduce multi-step problems involving both perimeter/area and decimal rounding.
                  </p>
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div className="bg-white rounded-lg p-5">
              <h4 className="text-xl font-bold text-stone-900 font-lexend tracking-wide mb-4">
                Session notes
              </h4>
              <div className="space-y-3 pl-1.5">
                {/* Today's session */}
                <div className="flex flex-col p-3 border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-5 h-5 text-stone-400" />
                    <span className="text-sm font-bold text-stone-700 font-lexend">
                      Monday, 28 July 25
                    </span>
                  </div>
                  <div className="pl-6.5">
                    <span className="text-sm font-normal text-stone-400 font-lexend">
                      19:00 – 19:45
                    </span>
                  </div>
                </div>

                {/* Previous sessions */}
                <div className="flex flex-col p-3 border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 border-2 border-pink-600 rounded-full"></div>
                    <span className="text-sm font-bold text-stone-700 font-lexend">
                      Monday, 21 July 25
                    </span>
                  </div>
                  <div className="pl-6.5">
                    <span className="text-sm font-normal text-stone-400 font-lexend">
                      19:00 – 19:45
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-3 border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-1 bg-green-600 transform rotate-45"></div>
                    </div>
                    <span className="text-sm font-bold text-stone-700 font-lexend">
                      Monday, 14 July 25
                    </span>
                  </div>
                  <div className="pl-6.5">
                    <span className="text-sm font-normal text-stone-400 font-lexend">
                      19:00 – 19:45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
