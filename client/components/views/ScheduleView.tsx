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
  SquareArrowOutUpRight,
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

  // Clear selected session when switching days
  useEffect(() => {
    setSelectedSession(null);
  }, [selectedDayDate]);
  const [isViewStudentHovered, setIsViewStudentHovered] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const studentDropdownRef = useRef<HTMLDivElement>(null);

  // Get current week data
  const currentWeek = getCurrentWeek(currentWeekStart, selectedDayDate);

  // Get sessions for the selected day
  const getSessionsForDay = (dayDate: string) => {
    return students.filter((student) => {
      if (!student.sessionDate) return false;
      const studentDate = student.sessionDate.getDate().toString();
      const studentMonth = student.sessionDate.getMonth(); // 0-based (6 = July)
      const studentYear = student.sessionDate.getFullYear();

      // For July 2025 (month 6), only show sessions from July 2025
      return studentDate === dayDate && studentMonth === 6 && studentYear === 2025;
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
    const result = selectToday();
    if (result) {
      setCurrentWeekStart(result.currentWeekStart);
      setSelectedDayDate(result.selectedDayDate);
    } else {
      // Fallback: ensure we go to July 28th directly
      setSelectedDayDate("28");
      // Find the week that contains July 28th
      const allDays = getAllDaysData();
      const july28Index = allDays.findIndex(day => day.date === "28" && day.month === "July");
      if (july28Index !== -1) {
        const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(allDays[july28Index].day);
        const mondayIndex = july28Index - dayOfWeek;
        setCurrentWeekStart(Math.max(0, mondayIndex));
      }
    }
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
      <div className="p-6 bg-white border-b border-stone-200 overflow-visible rounded-t-lg">
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
              className="flex h-11 px-4 items-center justify-center gap-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 font-lexend"
              style={{ width: "108px" }}
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
        <div className="flex justify-center overflow-visible">
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
      <div className="flex flex-1 p-6 gap-6 h-0 min-h-0">
        {/* Left: Day Schedule */}
        <div className="w-[450px] flex flex-col bg-white rounded-lg border border-stone-200 p-4.5 h-full overflow-hidden">
          {/* Time slots with sessions */}
          <div className="flex flex-col flex-1 justify-between">
            {/* Header */}
            <div className="flex items-center justify-between px-9 py-6">
              <div className="flex gap-1">
                {(() => {
                  const selectedDay = currentWeek.find(day => day.date === selectedDayDate);
                  const dayName = selectedDay?.day === 'Mon' ? 'Monday' :
                                 selectedDay?.day === 'Tue' ? 'Tuesday' :
                                 selectedDay?.day === 'Wed' ? 'Wednesday' :
                                 selectedDay?.day === 'Thu' ? 'Thursday' :
                                 selectedDay?.day === 'Fri' ? 'Friday' :
                                 selectedDay?.day === 'Sat' ? 'Saturday' :
                                 selectedDay?.day === 'Sun' ? 'Sunday' : 'Monday';
                  return (
                    <>
                      <h2 className="text-4xl font-black text-stone-700 font-lexend tracking-tight">
                        {dayName}
                      </h2>
                      <h2 className="text-4xl font-normal text-stone-700 font-lexend tracking-tight">
                        {selectedDayDate}
                      </h2>
                    </>
                  );
                })()}
              </div>
              {selectedDayDate === "28" && (
                <span className="text-sm font-semibold text-stone-500 font-lexend">
                  Today
                </span>
              )}
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
                  // Only process sessions with valid sessionDate
                  if (!session.sessionDate) return null;

                  const sessionHour = session.sessionDate.getHours();
                  const sessionMinutes = session.sessionDate.getMinutes();

                  // Each hour row: py-3 (12px top + 12px bottom) + content ≈ 46px total height
                  const hourHeight = 46;
                  const startPosition = (sessionHour - 8) * hourHeight + (sessionMinutes / 60 * hourHeight) + 12;

                  // Debug: Log positioning
                  if (process.env.NODE_ENV === 'development') {
                    console.log(`${session.name} (${sessionHour}:${sessionMinutes.toString().padStart(2,'0')}): position ${startPosition}px`);
                  }

                  // Session duration is 45 minutes = 34px (0.75 * 46px per hour)
                  const sessionHeight = 34;

                  // Check if this session is selected
                  const isSelected = selectedSession?.id === session.id;

                  let bgColor = "bg-indigo-100 border-indigo-200";
                  let textColor = "text-stone-600";

                  if (isSelected) {
                    // Selected state: indigo-600 background with white text
                    bgColor = "bg-indigo-600 border-indigo-600";
                    textColor = "text-white";
                  } else if (session.sessionReportCompleted) {
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
                        <div className={`w-[75px] text-xs font-lexend ${textColor}`} style={{marginRight: "16px"}}>
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
                    top: `${(new Date().getHours() - 8) * 46 + (new Date().getMinutes() / 60 * 46) + 12}px`
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right: Session Details */}
        {selectedSession && (
          <div className="flex-1 flex flex-col bg-white rounded-lg border border-stone-200 h-full max-h-full overflow-hidden">
            <div className="flex p-[18px_36px_0_36px] flex-col items-start gap-2.5 flex-1 self-stretch overflow-y-auto">
              {/* Top section */}
              <div className="flex pt-[19px] justify-between items-start self-stretch">
                {/* Left side */}
                <div className="flex flex-col items-start">
                  {/* Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex w-[60px] h-[60px] p-[18px_10px] flex-col justify-center items-center gap-2.5 rounded-full border-2 border-white bg-[#F2E9FE]">
                      <span className="text-[#7536C7] font-lexend text-2xl font-bold leading-4 tracking-[-0.12px]">
                        M
                      </span>
                    </div>
                    <div className="flex p-[2px_0] flex-col justify-center items-start">
                      <div className="text-stone-900 font-lexend text-[30px] font-bold leading-9 tracking-[-0.15px]">
                        {selectedSession.name} Smith
                      </div>
                      <div className="text-stone-400 font-lexend text-sm font-medium leading-5 tracking-[-0.07px]">
                        {selectedSession.subject}
                      </div>
                    </div>
                  </div>
                  {/* Day and time */}
                  <div className="flex p-[4px_0_0_68px] justify-center items-center gap-2.5">
                    <div className="text-stone-700 font-lexend text-base font-medium leading-5 tracking-[-0.08px]">
                      {selectedSession?.sessionDate ? (() => {
                        const sessionDate = selectedSession.sessionDate;
                        const dayName = sessionDate.toLocaleDateString('en-US', { weekday: 'long' });
                        const day = sessionDate.getDate();
                        const month = sessionDate.toLocaleDateString('en-US', { month: 'long' });
                        const startHour = sessionDate.getHours().toString().padStart(2, '0');
                        const startMin = sessionDate.getMinutes().toString().padStart(2, '0');

                        // Calculate end time (45 minutes later)
                        const endTime = new Date(sessionDate.getTime() + 45 * 60000);
                        const endHour = endTime.getHours().toString().padStart(2, '0');
                        const endMin = endTime.getMinutes().toString().padStart(2, '0');

                        return `${dayName}, ${day} ${month}, ${startHour}:${startMin} – ${endHour}:${endMin}`;
                      })() : "Monday, 28 July, 19:00 – 19:45"}
                    </div>
                  </div>
                </div>
                {/* View student button */}
                <button
                  className="flex p-[8px_16px] justify-center items-center gap-1 rounded-md border border-stone-200 bg-white hover:bg-stone-50"
                  onMouseEnter={() => setIsViewStudentHovered(true)}
                  onMouseLeave={() => setIsViewStudentHovered(false)}
                  onClick={() => onStudentClick(selectedSession.id, students)}
                >
                  <span className="text-black font-['Readex_Pro'] text-sm font-normal leading-6 tracking-[-0.07px]">
                    View student
                  </span>
                  {isViewStudentHovered ? (
                    <SquareArrowOutUpRight className="w-[18px] h-[18px] text-black" />
                  ) : (
                    <UserRound className="w-[18px] h-[18px] text-black" />
                  )}
                </button>
              </div>

              {/* Topics section */}
              <div className="flex p-[48px_20px_20px_20px] flex-col items-start gap-3 self-stretch rounded-lg">
                {/* Title */}
                <div className="flex flex-col items-start gap-0.5 self-stretch">
                  <div className="flex h-6 items-start gap-1.5">
                    <h4 className="text-stone-900 font-lexend text-xl font-bold leading-6 tracking-[-0.35px]">
                      Topics for this session
                    </h4>
                  </div>
                  <div className="flex h-5 items-center gap-1 self-stretch">
                    <span className="text-stone-400 font-lexend text-sm font-normal leading-5">
                      From session notes
                    </span>
                    <div className="flex p-1 justify-center items-center gap-2.5 rounded-[99px] bg-stone-100">
                      <span className="text-stone-400 font-lexend text-xs font-normal leading-[14px]">
                        14 June 25
                      </span>
                    </div>
                  </div>
                </div>

                {/* Topics list */}
                <div className="flex pl-1.5 items-start gap-1.5 self-stretch">
                  <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2.25C14.4 2.25 15.75 3.6 15.75 9C15.75 14.4 14.4 15.75 9 15.75C3.6 15.75 2.25 14.4 2.25 9C2.25 3.6 3.6 2.25 9 2.25Z" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-stone-900 font-lexend text-base font-normal leading-[23.75px]">
                    Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                  </div>
                </div>
                <div className="flex pl-1.5 items-start gap-1.5 self-stretch">
                  <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2.25C14.4 2.25 15.75 3.6 15.75 9C15.75 14.4 14.4 15.75 9 15.75C3.6 15.75 2.25 14.4 2.25 9C2.25 3.6 3.6 2.25 9 2.25Z" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-stone-900 font-lexend text-base font-normal leading-[23.75px]">
                    Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                  </div>
                </div>
                <div className="flex pl-1.5 items-start gap-1.5 self-stretch">
                  <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2.25C14.4 2.25 15.75 3.6 15.75 9C15.75 14.4 14.4 15.75 9 15.75C3.6 15.75 2.25 14.4 2.25 9 C2.25 3.6 3.6 2.25 9 2.25Z" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-stone-900 font-lexend text-base font-normal leading-[23.75px]">
                    Introduce multi-step problems involving both perimeter/area and decimal rounding.
                  </div>
                </div>
              </div>

              {/* Session Notes */}
              <div className="flex p-5 flex-col items-start gap-4 flex-1 self-stretch rounded-xl bg-white">
                {/* Title */}
                <div className="flex flex-col items-start gap-0.5 self-stretch">
                  <div className="flex h-6 items-start gap-1.5">
                    <h4 className="text-stone-900 font-lexend text-xl font-bold leading-6 tracking-[-0.35px]">
                      Session notes
                    </h4>
                  </div>
                </div>

                {/* List of notes */}
                <div className="flex p-[0_6px] flex-col items-start gap-3 self-stretch">
                  {/* Today's session - Upcoming */}
                  <div className="flex p-3 flex-col items-start self-stretch rounded-xl border border-stone-200">
                    <div className="flex items-start self-stretch">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_6475_2920)">
                            <path d="M10 5V10L13.3333 11.6667" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_6475_2920">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-stone-700 font-lexend text-sm font-bold leading-[18px]">
                          {selectedSession?.sessionDate ? (() => {
                            const sessionDate = selectedSession.sessionDate;
                            const dayName = sessionDate.toLocaleDateString('en-US', { weekday: 'long' });
                            const day = sessionDate.getDate();
                            const month = sessionDate.toLocaleDateString('en-US', { month: 'short' });
                            const year = sessionDate.getFullYear().toString().slice(-2);
                            return `${dayName}, ${day} ${month} ${year}`;
                          })() : "Monday, 28 July 25"}
                        </span>
                      </div>
                    </div>
                    <div className="flex pl-[26px] flex-col justify-center items-start self-stretch">
                      <span className="text-stone-400 font-lexend text-sm font-normal leading-[18px]">
                        {selectedSession?.sessionDate ? (() => {
                          const sessionDate = selectedSession.sessionDate;
                          const startHour = sessionDate.getHours().toString().padStart(2, '0');
                          const startMin = sessionDate.getMinutes().toString().padStart(2, '0');

                          // Calculate end time (45 minutes later)
                          const endTime = new Date(sessionDate.getTime() + 45 * 60000);
                          const endHour = endTime.getHours().toString().padStart(2, '0');
                          const endMin = endTime.getMinutes().toString().padStart(2, '0');

                          return `${startHour}:${startMin} – ${endHour}:${endMin}`;
                        })() : "19:00 – 19:45"}
                      </span>
                    </div>
                  </div>

                  {/* Previous session - In progress */}
                  <div className="flex p-3 flex-col items-start self-stretch rounded-xl border border-stone-200">
                    <div className="flex items-start self-stretch">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_6477_3242)">
                            <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#BE185D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_6477_3242">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-stone-700 font-lexend text-sm font-bold leading-[18px]">
                          Monday, 21 July 25
                        </span>
                      </div>
                    </div>
                    <div className="flex pl-[26px] flex-col justify-center items-start self-stretch">
                      <span className="text-stone-400 font-lexend text-sm font-normal leading-[18px]">
                        19:00 – 19:45
                      </span>
                    </div>
                  </div>

                  {/* Completed session */}
                  <div className="flex p-3 flex-col items-start self-stretch rounded-xl border border-stone-200">
                    <div className="flex items-start self-stretch">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_6477_3250)">
                            <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#059669" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="#059669" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_6477_3250">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-stone-700 font-lexend text-sm font-bold leading-[18px]">
                          Monday, 14 July 25
                        </span>
                      </div>
                    </div>
                    <div className="flex pl-[26px] flex-col justify-center items-start self-stretch">
                      <span className="text-stone-400 font-lexend text-sm font-normal leading-[18px]">
                        19:00 – 19:45
                      </span>
                    </div>
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
