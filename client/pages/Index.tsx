import { useState, useEffect, useRef } from "react";
import { UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, Bell, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  subject?: string;
  avatar?: string;
  upcomingSession?: string;
  sessionTime?: string;
  openTasks?: number;
  sessionReportDue?: boolean;
}

const mockStudents: Student[] = [
  // Students with upcoming sessions
  { id: "1", name: "Alex", subject: "Math Tutoring", upcomingSession: "9:00 AM, today", sessionTime: "9:00am today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" },
  { id: "2", name: "Emma", subject: "Science Tutoring", upcomingSession: "3:00 PM, today", sessionTime: "3:00pm today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma" },
  { id: "3", name: "Marcus", subject: "English Tutoring", upcomingSession: "7:00 PM, today", sessionTime: "7:00pm today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus" },

  // Students with open tasks
  { id: "4", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, next Tuesday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia" },
  { id: "5", name: "Liam", subject: "Math Tutoring", sessionTime: "9:00am, next Friday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam" },
  { id: "6", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, next Monday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella" },
  { id: "7", name: "Noah", subject: "Physics Tutoring", sessionTime: "4:45pm, next Wednesday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah" },

  // All students (additional)
  { id: "10", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, next Monday" },
  { id: "11", name: "Maya", subject: "Biology Tutoring", sessionTime: "3:00pm, next Thursday" },
  { id: "12", name: "Daniel", subject: "Art Tutoring" },
  { id: "13", name: "Zoe", subject: "Music Tutoring", sessionTime: "3:00pm, next Tuesday" },
  { id: "14", name: "Oliver", subject: "Geography Tutoring", sessionTime: "8:00pm, next Friday" },
  { id: "15", name: "Luna", subject: "Literature Tutoring" },
  { id: "16", name: "Kai", subject: "Computer Science", sessionTime: "8:00pm, next Wednesday" },
];

function StudentCard({ student, onClick, scheduleView = false }: { student: Student; onClick: () => void; scheduleView?: boolean }) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-sm transition-all duration-200 bg-white border border-stone-200 rounded-xl w-45 h-60"
      onClick={onClick}
    >
      <CardContent className="p-1.5 flex flex-col justify-between h-full">
        {/* Top section with avatar, name, subject, and session time */}
        <div className="flex flex-col items-start gap-1 px-3 pt-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
            <Avatar className="w-full h-full">
              <AvatarFallback className="bg-orange-100 text-orange-700 font-medium text-sm">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <h3 className="text-stone-900 font-lexend font-semibold text-lg leading-[18px] tracking-[-0.09px] mt-1">
            {student.name}
          </h3>

          {/* Subject and Session Time */}
          <div className="flex flex-col items-start gap-0.5 pt-3">
            {student.subject && (
              <div className="text-stone-900 font-lexend text-xs font-normal leading-[18px] tracking-[-0.06px]">
                {student.subject}
              </div>
            )}

            {student.sessionTime && (
              <div className="flex items-center gap-1 py-0.5">
                <div className="flex items-center gap-1">
                  <Bell className="w-3 h-3 text-stone-700" />
                  <span className="text-stone-700 font-lexend text-xs font-normal leading-4">
                    {scheduleView
                      ? student.sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm))/i)?.[1] || student.sessionTime
                      : student.sessionTime
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with session report badge */}
        <div className="flex justify-center px-1.5 pb-1.5">
          {student.sessionReportDue && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 border border-stone-200 rounded">
              <Clock className="w-3 h-3 text-pink-600" />
              <span className="text-stone-400 font-lexend text-xs font-normal leading-4">
                Session report
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16 min-w-16' : 'w-60 min-w-60'} flex flex-col min-h-screen transition-all duration-300 flex-shrink-0`}>
      {/* Header */}
      <div className="flex items-center justify-between pl-4 pr-0 py-4">
        {!isCollapsed && (
          <h1 className="text-lg font-medium text-white font-lexend">Lexsee Workspace</h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 h-6 w-6"
        >
          <PanelLeft className="w-5 h-5 text-stone-400" />
        </Button>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 flex flex-col pl-3 pr-0 py-4">
        {/* My Students Section */}
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="px-2">
              <h2 className="text-xs font-medium text-white/80 font-lexend uppercase tracking-wide">My students</h2>
            </div>
          )}

          {/* All Students */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => setActiveView('all')}
          >
            <div className="flex items-center space-x-2">
              <UsersRound className={`w-4 h-4 ${activeView === 'all' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-white'}`}>All</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-white/50'}`}>14</span>}
          </div>

          {/* Schedule */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer h-8 leading-6 ${
              activeView === 'schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => setActiveView('schedule')}
          >
            <div className="flex items-center space-x-2">
              <Calendar className={`w-4 h-4 ${activeView === 'schedule' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white'}`}>Schedule</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white/50'}`}>3</span>}
          </div>

          {/* Session Notes */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'sessionnotes' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => setActiveView('sessionnotes')}
          >
            <div className="flex items-center space-x-2">
              <NotebookText className={`w-4 h-4 ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white'}`}>Session notes</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/50'}`}>4</span>}
          </div>
        </div>

        {/* Spacer */}
        <div className="my-4"></div>

        {/* Other Navigation Items */}
        <div className="space-y-2 flex-1">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-indigo-950`}>
            <LibraryBig className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Library</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-indigo-950`}>
            <FileAudio className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Assignments</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-indigo-950`}>
            <Rabbit className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Lexsee Reader</span>}
          </div>
        </div>
      </div>

      {/* User Profile at Bottom */}
      <div className="p-3">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg hover:bg-indigo-950`}>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-stone-200 text-stone-600 text-xs">JS</AvatarFallback>
            </Avatar>
            {!isCollapsed && <span className="text-sm font-medium text-white font-lexend">John Smith</span>}
          </div>
          {!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-stone-400" />}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("schedule");
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hideEmptyDays, setHideEmptyDays] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'hiding' | 'showing' | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState('28'); // Track selected day
  const calendarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close calendar picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendarPicker(false);
      }
    };

    if (showCalendarPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendarPicker]);

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  // Helper functions for different views
  const getAllStudentsSorted = () => {
    return [...mockStudents].sort((a, b) => a.name.localeCompare(b.name));
  };

  // Session data for each date
  const dateSessionData: { [key: string]: { morning: Student[], afternoon: Student[], evening: Student[] } } = {
    '28': {
      morning: [mockStudents[0]], // Alex
      afternoon: [mockStudents[1], mockStudents[2]], // Emma, Marcus
      evening: []
    },
    '29': {
      morning: [],
      afternoon: [mockStudents[3]], // Sofia
      evening: []
    },
    '31': {
      morning: [mockStudents[4]], // Liam
      afternoon: [mockStudents[5], mockStudents[6]], // Isabella, Noah
      evening: []
    },
    '4': {
      morning: [],
      afternoon: [mockStudents[7], mockStudents[8], mockStudents[9]], // All afternoon
      evening: []
    },
    '5': {
      morning: [],
      afternoon: [],
      evening: [mockStudents[10]] // Maya
    },
    '6': {
      morning: [mockStudents[11]], // Daniel
      afternoon: [mockStudents[12]], // Zoe
      evening: [mockStudents[13]] // Oliver
    },
    '7': {
      morning: [],
      afternoon: [mockStudents[14]], // Luna
      evening: []
    },
    '8': {
      morning: [mockStudents[15]], // Kai
      afternoon: [],
      evening: []
    },
    '11': {
      morning: [],
      afternoon: [mockStudents[0]], // Alex
      evening: []
    },
    '12': {
      morning: [],
      afternoon: [],
      evening: [mockStudents[1]] // Emma
    }
  };

  const getScheduleData = () => {
    return dateSessionData[selectedDayDate] || { morning: [], afternoon: [], evening: [] };
  };

  const getSessionNotesStudents = () => {
    return mockStudents.filter(s => s.sessionReportDue).sort((a, b) => {
      // Sort by session time for session notes
      if (!a.sessionTime) return 1;
      if (!b.sessionTime) return -1;
      return a.sessionTime.localeCompare(b.sessionTime);
    });
  };

  const studentsWithUpcomingSessions = mockStudents.filter(s => s.upcomingSession);
  const studentsWithOpenTasks = mockStudents.filter(s => s.sessionReportDue);
  const allStudents = mockStudents.slice(9); // Show the Jayden students in "All students"

  return (
    <div className="h-screen bg-indigo-900 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Content */}
        <div className="flex-1 p-3 h-full min-w-0 overflow-hidden">
          {/* My students panel card */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg shadow-sm h-full flex flex-col min-w-0 overflow-hidden">
            {/* Header inside card */}
            <div className="px-6 pt-4 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 relative" ref={calendarRef}>
                  <button
                    className="flex items-center space-x-2 hover:bg-stone-100 rounded px-2 py-1 ml-12"
                    onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                  >
                    <h1 className="text-xl font-medium text-gray-900 font-lexend">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h1>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
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
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-medium font-lexend">
                          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => {
                            const newDate = new Date(selectedDate);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setSelectedDate(newDate);
                          }}
                          className="p-1 hover:bg-stone-100 rounded"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Today button */}
                      <div className="flex justify-center mb-4">
                        <button
                          onClick={() => {
                            setSelectedDate(new Date());
                            setShowCalendarPicker(false);
                          }}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 font-lexend"
                        >
                          Today
                        </button>
                      </div>

                      {/* Simple calendar grid */}
                      <div className="grid grid-cols-7 gap-1 text-sm">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center p-2 text-gray-500 font-lexend text-xs">
                            {day}
                          </div>
                        ))}
                        {Array.from({length: 35}, (_, i) => {
                          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - 6);
                          const isSelected = date.toDateString() === selectedDate.toDateString();
                          const isCurrentMonth = date.getMonth() === selectedDate.getMonth();

                          return (
                            <button
                              key={i}
                              onClick={() => {
                                setSelectedDate(date);
                                setShowCalendarPicker(false);
                              }}
                              className={`p-2 text-center rounded hover:bg-stone-100 font-lexend text-sm ${
                                isSelected
                                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                  : isCurrentMonth
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Find session"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 md:w-64 h-9 min-w-0"
                    />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 h-9">
                    <b>+</b>
                  </Button>
                </div>
              </div>
            </div>
            {/* Content inside card */}
            <div className="px-4 pb-6 pt-0 space-y-6 flex-1 overflow-y-auto">
              {activeView === 'all' && (
                <section>
                  <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-3">
                    {getAllStudentsSorted().map((student) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        onClick={() => handleStudentClick(student.id)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {activeView === 'schedule' && (
                <div className="space-y-6 min-w-0 overflow-hidden">

                  {/* Week Calendar */}
                  <div className="flex items-center gap-4 min-w-0 mt-6 mb-0">
                    {/* Back Arrow */}
                    <button className="flex-shrink-0 flex p-2.5 items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50">
                      <ChevronLeft className="w-6 h-6" style={{color: '#5046e5'}} />
                    </button>

                    {/* Day Cards Container */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                      {(() => {
                        const allDays = [
                          { date: '28', day: 'Mon', sessions: 3, isToday: true },
                          { date: '29', day: 'Tues', sessions: 1, isToday: false },
                          { date: '30', day: 'Wed', sessions: 0, isToday: false },
                          { date: '31', day: 'Thu', sessions: 3, isToday: false },
                          { date: '1', day: 'Fri', sessions: 0, isToday: false },
                          { date: '2', day: 'Sat', sessions: 0, isToday: false },
                          { date: '3', day: 'Sun', sessions: 0, isToday: false },
                          { date: '4', day: 'Mon', sessions: 3, isToday: false },
                          { date: '5', day: 'Tue', sessions: 1, isToday: false },
                          { date: '6', day: 'Wed', sessions: 3, isToday: false },
                          { date: '7', day: 'Thu', sessions: 1, isToday: false },
                          { date: '8', day: 'Fri', sessions: 1, isToday: false },
                          { date: '11', day: 'Mon', sessions: 1, isToday: false },
                          { date: '12', day: 'Tue', sessions: 1, isToday: false }
                        ];

                        const getAnimationClass = (dayData: any, originalIndex: number) => {
                          const isEmpty = dayData.sessions === 0;

                          if (!isToggling) {
                            return 'day-card-base';
                          }

                          if (isEmpty) {
                            if (animationDirection === 'hiding') {
                              return 'day-card-slide-behind';
                            } else if (animationDirection === 'showing') {
                              return 'day-card-emerge';
                            }
                          } else {
                            // Non-empty cards move to fill gaps or make space
                            if (animationDirection === 'hiding') {
                              return 'day-card-fill-gap';
                            } else if (animationDirection === 'showing') {
                              return 'day-card-make-space';
                            }
                          }

                          return 'day-card-base';
                        };

                        const getZIndex = (dayData: any, originalIndex: number) => {
                          const isEmpty = dayData.sessions === 0;

                          if (isEmpty && isToggling && animationDirection === 'hiding') {
                            return 1; // Empty cards go behind
                          }

                          // Earlier dates have higher z-index (leftmost has highest)
                          return 50 - originalIndex;
                        };

                        const getMoveDistance = (dayData: any, originalIndex: number) => {
                          if (dayData.sessions === 0) {
                            // Empty cards slide far left to go behind the nearest session card to their left
                            return -200; // Fixed distance to slide behind
                          }

                          // For session cards: count consecutive empty cards immediately to the left
                          let consecutiveEmptyToLeft = 0;
                          for (let i = originalIndex - 1; i >= 0; i--) {
                            if (allDays[i].sessions === 0) {
                              consecutiveEmptyToLeft++;
                            } else {
                              break; // Stop at first non-empty card
                            }
                          }

                          return consecutiveEmptyToLeft * -104; // Move by the number of consecutive empty cards
                        };

                        // Show all days during animation, filter after
                        const visibleDays = isToggling
                          ? allDays
                          : allDays.filter(dayData => !hideEmptyDays || dayData.sessions > 0);

                        return visibleDays.map((dayData, index) => {
                          const originalIndex = allDays.findIndex(day => day.date === dayData.date);
                          const moveDistance = getMoveDistance(dayData, originalIndex);

                          const isSelected = selectedDayDate === dayData.date;

                          return (
                            <button
                              key={dayData.date}
                              onClick={() => setSelectedDayDate(dayData.date)}
                              className={`flex w-24 h-24 p-3 pb-2 flex-col justify-between items-start rounded-xl border cursor-pointer flex-shrink-0 ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600 scale-100'
                                  : 'border-stone-200 bg-white hover:bg-stone-50 scale-100'
                              } ${getAnimationClass(dayData, originalIndex)}`}
                              style={{
                                zIndex: getZIndex(dayData, originalIndex),
                                '--move-distance': `${moveDistance}px`
                              }}
                            >
                          {/* Top section with date and today indicator */}
                          <div className="flex flex-col items-start w-full gap-0.5">
                            <div className="flex justify-between items-center w-full">
                              <div className={`text-2xl font-black leading-none font-lexend ${
                                isSelected
                                  ? 'text-white'
                                  : dayData.sessions === 0
                                    ? 'text-stone-400'
                                    : 'text-stone-700'
                              }`}>
                                {dayData.date}
                              </div>
                              {dayData.isToday && (
                                <div className={`text-xs leading-none font-lexend opacity-50 ${
                                  isSelected
                                    ? 'text-white'
                                    : dayData.sessions === 0
                                      ? 'text-stone-400'
                                      : 'text-stone-700'
                                }`}>
                                  Today
                                </div>
                              )}
                            </div>
                            <div className={`text-base font-medium leading-none font-lexend w-full text-left ${
                              isSelected
                                ? 'text-white'
                                : dayData.sessions === 0
                                  ? 'text-stone-400'
                                  : 'text-stone-700'
                            }`}>
                              {dayData.day}
                            </div>
                          </div>

                          {/* Bottom section with sessions */}
                          {dayData.sessions > 0 && (
                            <div className="flex items-start gap-1 w-full">
                              <div className={`text-sm font-normal leading-none font-lexend ${
                                isSelected ? 'text-white' : 'text-stone-700'
                              }`}>
                                {dayData.sessions}
                              </div>
                              <div className={`text-sm font-normal leading-none font-lexend ${
                                isSelected ? 'text-white' : 'text-stone-700'
                              }`}>
                                {dayData.sessions === 1 ? 'session' : 'sessions'}
                              </div>
                            </div>
                          )}
                            </button>
                          );
                        });
                      })()}
                      </div>
                    </div>

                    {/* Forward Arrow */}
                    <button className="flex-shrink-0 flex p-2.5 items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50">
                      <ChevronRight className="w-6 h-6" style={{color: '#5046e5'}} />
                    </button>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center justify-end" style={{marginTop: '8px'}}>
                    <div className="flex items-center gap-2 mr-16">
                      <button
                        onClick={() => {
                          if (isToggling) return; // Prevent rapid clicking
                          setIsToggling(true);
                          setAnimationDirection(hideEmptyDays ? 'showing' : 'hiding');

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
                          hideEmptyDays ? 'bg-indigo-600' : 'bg-stone-600'
                        }`}
                        style={{
                          backgroundColor: hideEmptyDays ? '#4f46e5' : '#5d5955'
                        }}
                      >
                        <div
                          className={`absolute w-4 h-4 rounded-full bg-white shadow-lg transition-transform top-0.5 ${
                            hideEmptyDays ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                      <span className="text-sm font-lexend" style={{color: 'rgba(74, 74, 74, 0.75)'}}>
                        <span style={{color: 'rgb(169, 162, 159)'}}>
                          Hide empty days
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Time Periods */}
                  <div className="space-y-8 min-w-0 mt-6 mx-16">
                    {/* Morning */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Morning</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().morning.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                              scheduleView={true}
                            />
                          </div>
                        ))}
                        {getScheduleData().morning.length === 0 && (
                          <div className="text-gray-400 font-lexend text-sm">No sessions scheduled</div>
                        )}
                      </div>
                    </section>

                    {/* Afternoon */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Afternoon</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().afternoon.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                            />
                          </div>
                        ))}
                        {getScheduleData().afternoon.length === 0 && (
                          <div className="text-gray-400 font-lexend text-sm">No sessions scheduled</div>
                        )}
                      </div>
                    </section>

                    {/* Evening */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Evening</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().evening.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                            />
                          </div>
                        ))}
                        {getScheduleData().evening.length === 0 && (
                          <div className="text-gray-400 font-lexend text-sm">No sessions scheduled</div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeView === 'sessionnotes' && (
                <section>
                  <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-3">
                    {getSessionNotesStudents().map((student) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        onClick={() => handleStudentClick(student.id)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
