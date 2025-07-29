import { useState, useEffect, useRef } from "react";
import { UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, Bell, ChevronLeft, ChevronRight, ChevronDown, Haze, SunMedium, MoonStar, X, Maximize2, MoreVertical, Loader, Timer, NotebookPen, CircleCheck } from "lucide-react";
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
  sessionDate?: Date;
  sessionReportCompleted?: boolean;
}

const mockStudents: Student[] = [
  // July 14th - 2 sessions: all done
  { id: "1", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 14), sessionReportCompleted: true }, // Done
  { id: "2", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 6, 14), sessionReportCompleted: true }, // Done

  // July 15th - 1 session: done
  { id: "3", name: "Marcus", subject: "English Tutoring", sessionTime: "10:00am, July 15", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 6, 15), sessionReportCompleted: true }, // Done

  // July 17th - 2 sessions: all done
  { id: "4", name: "Sofia", subject: "History Tutoring", sessionTime: "9:00am, July 17", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 6, 17), sessionReportCompleted: true }, // Done
  { id: "5", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, July 17", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 6, 17), sessionReportCompleted: true }, // Done

  // July 18th - 1 session: done
  { id: "6", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, July 18", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 6, 18), sessionReportCompleted: true }, // Done

  // July 21st - 3 sessions: 2 done, 1 late
  { id: "7", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: true }, // Done
  { id: "8", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: true }, // Done
  { id: "9", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: false }, // Late

  // July 23rd - 1 session: late
  { id: "10", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, July 23", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 6, 23), sessionReportCompleted: false }, // Late

  // July 24th - 2 sessions: both late
  { id: "11", name: "Liam", subject: "Math Tutoring", sessionTime: "9:00am, July 24", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 6, 24), sessionReportCompleted: false }, // Late
  { id: "12", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, July 24", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 6, 24), sessionReportCompleted: false }, // Late

  // July 28th - 3 sessions: Alex & Emma = In process, Marcus = Waiting
  { id: "13", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(Date.now() - 12 * 60 * 60 * 1000), sessionReportCompleted: false }, // In process (12h ago, within 48h, not completed)
  { id: "14", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(Date.now() - 6 * 60 * 60 * 1000), sessionReportCompleted: false }, // In process (6h ago, within 48h, not completed)
  { id: "15", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(Date.now() + 2 * 60 * 60 * 1000), sessionReportCompleted: false }, // Waiting (2h in future)

  // July 29th - all waiting
  { id: "16", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, July 29", sessionDate: new Date(Date.now() + 24 * 60 * 60 * 1000), sessionReportCompleted: false }, // Waiting (24h in future)

  // July 31st - all waiting
  { id: "17", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false }, // Waiting
  { id: "18", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false }, // Waiting
  { id: "19", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false }, // Waiting

  // August sessions - all waiting
  { id: "20", name: "Oliver", subject: "Geography Tutoring", sessionTime: "8:00am, August 4", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false }, // Waiting
  { id: "21", name: "Luna", subject: "Literature Tutoring", sessionTime: "2:00pm, August 7", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "22", name: "Kai", subject: "Computer Science", sessionTime: "6:00pm, August 8", sessionDate: new Date(2025, 7, 8), sessionReportCompleted: false }, // Waiting
];

function getSessionReportStatus(student: Student) {
  if (!student.sessionDate) return 'waiting';

  const now = new Date();
  const sessionDate = student.sessionDate;
  const hoursSinceSession = (now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);

  // If session hasn't happened yet
  if (sessionDate > now) return 'waiting';

  // If session report is completed
  if (student.sessionReportCompleted) return 'done';

  // If session was more than 48 hours ago
  if (hoursSinceSession > 48) return 'late';

  // If session was within 48 hours and not completed
  return 'active';
}

function getSessionBadgeConfig(status: string) {
  switch (status) {
    case 'done':
      return { icon: CircleCheck, color: 'text-green-500' };
    case 'active':
      return { icon: NotebookPen, color: 'text-indigo-600' };
    case 'late':
      return { icon: Timer, color: 'text-pink-600' };
    case 'waiting':
    default:
      return { icon: Loader, color: 'text-stone-400' };
  }
}

function StudentCard({ student, onClick, scheduleView = false }: { student: Student; onClick: () => void; scheduleView?: boolean }) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const sessionStatus = getSessionReportStatus(student);
  const badgeConfig = getSessionBadgeConfig(sessionStatus);
  const BadgeIcon = badgeConfig.icon;

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
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-stone-200 rounded bg-white">
            <BadgeIcon className={`w-3 h-3 ${badgeConfig.color}`} />
            <span className="text-stone-400 font-lexend text-xs font-normal leading-4">
              {(sessionStatus === 'waiting' || sessionStatus === 'active') ? 'Session notes' : 'Session report'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar({ activeView, setActiveView, onThisWeekClick }: { activeView: string; setActiveView: (view: string) => void; onThisWeekClick: () => void }) {
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
          <PanelLeft className="w-5 h-5 text-white/50" />
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
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-8 ${
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

          {/* This week */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-9 leading-6 ${
              activeView === 'schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => {
              setActiveView('schedule');
              onThisWeekClick(); // Navigate to this week (July 28)
            }}
          >
            <div className="flex items-center space-x-2">
              <Calendar className={`w-4 h-4 ${activeView === 'schedule' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white'}`}>This week</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white/50'}`}>7</span>}
          </div>

          {/* Session Notes */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-8 ${
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
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 28)); // July 28, 2025 to match initial selectedDayDate
  const [hideEmptyDays, setHideEmptyDays] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'hiding' | 'showing' | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState('28'); // Track selected day
  const [currentWeekStart, setCurrentWeekStart] = useState(27); // July 28th is at index 27 (Monday)
  const [showStudentOverlay, setShowStudentOverlay] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentStudentList, setCurrentStudentList] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState('in-progress');
  const calendarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync selectedDate when selectedDayDate changes
  useEffect(() => {
    const allDays = getAllDaysData();

    // First try to find the day in the current week context
    const currentWeekDays = getCurrentWeek();
    let selectedDay = currentWeekDays.find(day => day.date === selectedDayDate);

    // If not found in current week, fall back to searching all days
    if (!selectedDay) {
      selectedDay = allDays.find(day => day.date === selectedDayDate);
    }

    if (selectedDay) {
      // Parse the full date and create a proper Date object
      const [year, month, date] = selectedDay.fullDate.split('-').map(Number);
      const newSelectedDate = new Date(year, month - 1, date); // month is 0-indexed
      setSelectedDate(newSelectedDate);
    }
  }, [selectedDayDate, currentWeekStart]);

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

  const handleStudentClick = (studentId: string, studentList: Student[] = []) => {
    setSelectedStudentId(studentId);
    setCurrentStudentList(studentList);
    setShowStudentOverlay(true);
  };

  const handleExpandStudent = () => {
    if (selectedStudentId) {
      setShowStudentOverlay(false);
      navigate(`/student/${selectedStudentId}`);
    }
  };

  const getCurrentStudentIndex = () => {
    return currentStudentList.findIndex(student => student.id === selectedStudentId);
  };

  const canNavigatePrevious = () => {
    const currentIndex = getCurrentStudentIndex();
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    const currentIndex = getCurrentStudentIndex();
    return currentIndex < currentStudentList.length - 1;
  };

  const navigatePrevious = () => {
    if (canNavigatePrevious()) {
      const currentIndex = getCurrentStudentIndex();
      setSelectedStudentId(currentStudentList[currentIndex - 1].id);
    }
  };

  const navigateNext = () => {
    if (canNavigateNext()) {
      const currentIndex = getCurrentStudentIndex();
      setSelectedStudentId(currentStudentList[currentIndex + 1].id);
    }
  };

  const getSelectedStudent = () => {
    return mockStudents.find(student => student.id === selectedStudentId);
  };

  // Helper functions for different views
  const getAllStudentsSorted = () => {
    return [...mockStudents].sort((a, b) => a.name.localeCompare(b.name));
  };

  // Comprehensive July/August 2025 day data
  const getAllDaysData = () => {
    return [
      // July 2025
      { date: '1', fullDate: '2025-07-01', day: 'Tue', sessions: 2, isToday: false, month: 'July' },
      { date: '2', fullDate: '2025-07-02', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '3', fullDate: '2025-07-03', day: 'Thu', sessions: 3, isToday: false, month: 'July' },
      { date: '4', fullDate: '2025-07-04', day: 'Fri', sessions: 0, isToday: false, month: 'July' },
      { date: '5', fullDate: '2025-07-05', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '6', fullDate: '2025-07-06', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '7', fullDate: '2025-07-07', day: 'Mon', sessions: 1, isToday: false, month: 'July' },
      { date: '8', fullDate: '2025-07-08', day: 'Tue', sessions: 2, isToday: false, month: 'July' },
      { date: '9', fullDate: '2025-07-09', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '10', fullDate: '2025-07-10', day: 'Thu', sessions: 1, isToday: false, month: 'July' },
      { date: '11', fullDate: '2025-07-11', day: 'Fri', sessions: 3, isToday: false, month: 'July' },
      { date: '12', fullDate: '2025-07-12', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '13', fullDate: '2025-07-13', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '14', fullDate: '2025-07-14', day: 'Mon', sessions: 2, isToday: false, month: 'July' },
      { date: '15', fullDate: '2025-07-15', day: 'Tue', sessions: 1, isToday: false, month: 'July' },
      { date: '16', fullDate: '2025-07-16', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '17', fullDate: '2025-07-17', day: 'Thu', sessions: 2, isToday: false, month: 'July' },
      { date: '18', fullDate: '2025-07-18', day: 'Fri', sessions: 1, isToday: false, month: 'July' },
      { date: '19', fullDate: '2025-07-19', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '20', fullDate: '2025-07-20', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '21', fullDate: '2025-07-21', day: 'Mon', sessions: 3, isToday: false, month: 'July' },
      { date: '22', fullDate: '2025-07-22', day: 'Tue', sessions: 0, isToday: false, month: 'July' },
      { date: '23', fullDate: '2025-07-23', day: 'Wed', sessions: 1, isToday: false, month: 'July' },
      { date: '24', fullDate: '2025-07-24', day: 'Thu', sessions: 2, isToday: false, month: 'July' },
      { date: '25', fullDate: '2025-07-25', day: 'Fri', sessions: 0, isToday: false, month: 'July' },
      { date: '26', fullDate: '2025-07-26', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '27', fullDate: '2025-07-27', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '28', fullDate: '2025-07-28', day: 'Mon', sessions: 3, isToday: true, month: 'July' },
      { date: '29', fullDate: '2025-07-29', day: 'Tue', sessions: 1, isToday: false, month: 'July' },
      { date: '30', fullDate: '2025-07-30', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '31', fullDate: '2025-07-31', day: 'Thu', sessions: 3, isToday: false, month: 'July' },

      // August 2025
      { date: '1', fullDate: '2025-08-01', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '2', fullDate: '2025-08-02', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '3', fullDate: '2025-08-03', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '4', fullDate: '2025-08-04', day: 'Mon', sessions: 3, isToday: false, month: 'August' },
      { date: '5', fullDate: '2025-08-05', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '6', fullDate: '2025-08-06', day: 'Wed', sessions: 3, isToday: false, month: 'August' },
      { date: '7', fullDate: '2025-08-07', day: 'Thu', sessions: 1, isToday: false, month: 'August' },
      { date: '8', fullDate: '2025-08-08', day: 'Fri', sessions: 1, isToday: false, month: 'August' },
      { date: '9', fullDate: '2025-08-09', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '10', fullDate: '2025-08-10', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '11', fullDate: '2025-08-11', day: 'Mon', sessions: 1, isToday: false, month: 'August' },
      { date: '12', fullDate: '2025-08-12', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '13', fullDate: '2025-08-13', day: 'Wed', sessions: 2, isToday: false, month: 'August' },
      { date: '14', fullDate: '2025-08-14', day: 'Thu', sessions: 3, isToday: false, month: 'August' },
      { date: '15', fullDate: '2025-08-15', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '16', fullDate: '2025-08-16', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '17', fullDate: '2025-08-17', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '18', fullDate: '2025-08-18', day: 'Mon', sessions: 2, isToday: false, month: 'August' },
      { date: '19', fullDate: '2025-08-19', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '20', fullDate: '2025-08-20', day: 'Wed', sessions: 0, isToday: false, month: 'August' },
      { date: '21', fullDate: '2025-08-21', day: 'Thu', sessions: 2, isToday: false, month: 'August' },
      { date: '22', fullDate: '2025-08-22', day: 'Fri', sessions: 3, isToday: false, month: 'August' },
      { date: '23', fullDate: '2025-08-23', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '24', fullDate: '2025-08-24', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '25', fullDate: '2025-08-25', day: 'Mon', sessions: 1, isToday: false, month: 'August' },
      { date: '26', fullDate: '2025-08-26', day: 'Tue', sessions: 0, isToday: false, month: 'August' },
      { date: '27', fullDate: '2025-08-27', day: 'Wed', sessions: 2, isToday: false, month: 'August' },
      { date: '28', fullDate: '2025-08-28', day: 'Thu', sessions: 1, isToday: false, month: 'August' },
      { date: '29', fullDate: '2025-08-29', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '30', fullDate: '2025-08-30', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '31', fullDate: '2025-08-31', day: 'Sun', sessions: 0, isToday: false, month: 'August' }
    ];
  };

  const getCurrentWeek = () => {
    const allDays = getAllDaysData();

    // Use currentWeekStart if it's set, otherwise calculate from selectedDayDate
    if (currentWeekStart >= 0 && currentWeekStart < allDays.length) {
      return allDays.slice(currentWeekStart, currentWeekStart + 7);
    }

    // Fallback: find by selectedDayDate
    const currentIndex = allDays.findIndex(day => day.date === selectedDayDate);

    if (currentIndex === -1) return allDays.slice(0, 7);

    // Find the Monday of the current week
    const currentDay = allDays[currentIndex];
    const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(currentDay.day);
    const mondayIndex = currentIndex - dayIndex;

    // Get the complete week (Monday through Sunday)
    return allDays.slice(Math.max(0, mondayIndex), Math.max(7, mondayIndex + 7));
  };

  const getCurrentMondayMonth = () => {
    const currentWeek = getCurrentWeek();
    const monday = currentWeek.find(day => day.day === 'Mon');
    return monday ? monday.month : 'July';
  };

  const jumpToDate = (targetDate: Date) => {
    const allDays = getAllDaysData();
    const targetDateStr = targetDate.getDate().toString();
    const targetMonth = targetDate.toLocaleDateString('en-US', { month: 'long' });

    // Find the target day in our data
    const targetDay = allDays.find(day =>
      day.date === targetDateStr && day.month === targetMonth
    );

    if (targetDay) {
      setSelectedDayDate(targetDay.date);

      // Find the Monday of this week and set as week start
      const targetIndex = allDays.findIndex(day => day === targetDay);
      const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(targetDay.day);
      const mondayIndex = targetIndex - dayIndex;

      setCurrentWeekStart(Math.max(0, mondayIndex));
      setShowCalendarPicker(false);
    }
  };

  const selectToday = () => {
    // Today is July 28th (Monday) - jump to this date
    jumpToDate(new Date(2025, 6, 28)); // July 28, 2025
  };

  const navigateTime = (direction: 'prev' | 'next') => {
    const allDays = getAllDaysData();

    if (direction === 'prev') {
      // Go to previous week
      const newWeekStart = Math.max(0, currentWeekStart - 7);
      setCurrentWeekStart(newWeekStart);

      // Set selected day to the Monday of this week
      const newMonday = allDays[newWeekStart];
      if (newMonday) {
        setSelectedDayDate(newMonday.date);
      }
    } else {
      // Go to next week
      const newWeekStart = Math.min(allDays.length - 7, currentWeekStart + 7);
      setCurrentWeekStart(newWeekStart);

      // Set selected day to the Monday of this week
      const newMonday = allDays[newWeekStart];
      if (newMonday) {
        setSelectedDayDate(newMonday.date);
      }
    }
  };

  // Session data for each date
  const dateSessionData: { [key: string]: { morning: Student[], afternoon: Student[], evening: Student[] } } = {
    // July 14th - 2 sessions: all done
    '14': {
      morning: [mockStudents[0]], // Alex - Done
      afternoon: [mockStudents[1]], // Emma - Done
      evening: []
    },
    // July 15th - 1 session: done
    '15': {
      morning: [mockStudents[2]], // Marcus - Done
      afternoon: [],
      evening: []
    },
    // July 17th - 2 sessions: all done
    '17': {
      morning: [mockStudents[3]], // Sofia - Done
      afternoon: [mockStudents[4]], // Liam - Done
      evening: []
    },
    // July 18th - 1 session: done
    '18': {
      morning: [mockStudents[5]], // Isabella - Done
      afternoon: [],
      evening: []
    },
    // July 21st - 3 sessions: 2 done, 1 late
    '21': {
      morning: [mockStudents[6]], // Alex - Done
      afternoon: [mockStudents[7]], // Emma - Done
      evening: [mockStudents[8]] // Marcus - Late
    },
    // July 23rd - 1 session: late
    '23': {
      morning: [mockStudents[9]], // Sofia - Late
      afternoon: [],
      evening: []
    },
    // July 24th - 2 sessions: both late
    '24': {
      morning: [mockStudents[10]], // Liam - Late
      afternoon: [mockStudents[11]], // Isabella - Late
      evening: []
    },
    // July 28th - 3 sessions: Alex & Emma = In process, Marcus = Waiting
    '28': {
      morning: [mockStudents[12]], // Alex - In process
      afternoon: [mockStudents[13]], // Emma - In process
      evening: [mockStudents[14]] // Marcus - Waiting
    },
    // July 29th - all waiting
    '29': {
      morning: [],
      afternoon: [mockStudents[15]], // Carlos - Waiting
      evening: []
    },
    // July 31st - all waiting
    '31': {
      morning: [mockStudents[16]], // Maya - Waiting
      afternoon: [mockStudents[17], mockStudents[18]], // Daniel, Zoe - Waiting
      evening: []
    },
    // August 4th - waiting
    '4': {
      morning: [mockStudents[19]], // Oliver - Waiting
      afternoon: [],
      evening: []
    },
    // August 7th - waiting
    '7': {
      morning: [],
      afternoon: [mockStudents[20]], // Luna - Waiting
      evening: []
    },
    // August 8th - waiting
    '8': {
      morning: [],
      afternoon: [],
      evening: [mockStudents[21]] // Kai - Waiting
    }
  };

  const getScheduleData = () => {
    const data = dateSessionData[selectedDayDate] || { morning: [], afternoon: [], evening: [] };
    // Filter out any undefined students to prevent errors
    return {
      morning: data.morning.filter(student => student && student.id),
      afternoon: data.afternoon.filter(student => student && student.id),
      evening: data.evening.filter(student => student && student.id)
    };
  };

  const getSessionNotesStudents = () => {
    return mockStudents.filter(s => s.sessionReportDue).sort((a, b) => {
      // Sort by session time for session notes
      if (!a.sessionTime) return 1;
      if (!b.sessionTime) return -1;
      return a.sessionTime.localeCompare(b.sessionTime);
    });
  };

  // Helper functions to categorize session notes by status
  const getInProgressNotes = () => {
    return mockStudents
      .filter(student => getSessionReportStatus(student) === 'active')
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  const getDueSoonNotes = () => {
    return mockStudents
      .filter(student => getSessionReportStatus(student) === 'late')
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  const getSubmittedNotes = () => {
    return mockStudents
      .filter(student => getSessionReportStatus(student) === 'done')
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  // Helper function to get session count for a specific date
  const getSessionCountForDate = (date: Date) => {
    const dateStr = date.getDate().toString();
    const monthStr = date.toLocaleDateString('en-US', { month: 'long' });

    // Find matching day in our calendar data
    const allDays = getAllDaysData();
    const matchingDay = allDays.find(day =>
      day.date === dateStr && day.month === monthStr
    );

    return matchingDay ? matchingDay.sessions : 0;
  };

  // Helper function to render session dots
  const renderSessionDots = (sessionCount: number, isSelected: boolean = false, isCurrentMonth: boolean = true) => {
    if (sessionCount === 0) return null;

    let dotCount = 1;
    if (sessionCount >= 2 && sessionCount <= 4) dotCount = 2;
    if (sessionCount >= 5) dotCount = 3;

    let dotColor = 'bg-stone-300'; // Default for current month
    if (isSelected) {
      dotColor = 'bg-white';
    } else if (!isCurrentMonth) {
      dotColor = 'bg-stone-400'; // Non-active months use stone-400
    }

    return (
      <div className="flex justify-center gap-0.5 mt-0.5">
        {Array.from({ length: dotCount }, (_, i) => (
          <div key={i} className={`w-1 h-1 ${dotColor} rounded-full`}></div>
        ))}
      </div>
    );
  };

  const studentsWithUpcomingSessions = mockStudents.filter(s => s.upcomingSession);
  const studentsWithOpenTasks = mockStudents.filter(s => s.sessionReportDue);
  const allStudents = mockStudents.slice(9); // Show the Jayden students in "All students"

  return (
    <div className="h-screen bg-indigo-900 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onThisWeekClick={selectToday} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Content */}
        <div className="flex-1 p-3 h-full min-w-0 overflow-hidden">
          {/* My students panel card */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg shadow-sm h-full flex flex-col min-w-0 overflow-hidden">
            {/* Header inside card - Different headers for different views */}
            {activeView === 'schedule' && (
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2 relative" ref={calendarRef}>
                      <button
                        className="flex items-center space-x-2 hover:bg-stone-100 rounded pr-2"
                        onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                      >
                      <h1 className="text-3xl font-bold text-stone-800 font-lexend">
                        {getCurrentMondayMonth()} 2025
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
                            <ChevronRight className="w-4 h-4 text-indigo-600" />
                          </button>
                        </div>



                        {/* Simple calendar grid */}
                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <div key={day} className="text-center p-2 text-stone-500 font-lexend text-xs">
                            {day}
                          </div>
                        ))}
                          {Array.from({length: 42}, (_, i) => {
                            // Start from Monday - calculate the first Monday of the month view
                            const firstOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                            const firstDayOfWeek = (firstOfMonth.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
                            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - firstDayOfWeek + 1);

                            const isSelected = date.getDate() === selectedDate.getDate() &&
                                             date.getMonth() === selectedDate.getMonth() &&
                                             date.getFullYear() === selectedDate.getFullYear();
                            const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                            const sessionCount = getSessionCountForDate(date);
                            const hasNoSessions = sessionCount === 0;
                            const shouldGrayOut = hideEmptyDays && hasNoSessions && isCurrentMonth;

                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedDate(date);
                                  jumpToDate(date);
                                }}
                                className={`w-9 h-9 flex flex-col items-center justify-center text-center rounded hover:bg-stone-700/10 font-lexend text-sm ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : shouldGrayOut
                                      ? 'text-stone-200'
                                      : isCurrentMonth
                                        ? 'text-stone-700'
                                        : sessionCount > 0
                                          ? 'text-stone-400'
                                          : hideEmptyDays
                                            ? 'text-stone-200'
                                            : 'text-stone-400'
                                }`}
                              >
                                <div className="leading-none">
                                  {date.getDate()}
                                </div>
                                {sessionCount > 0 ?
                                  renderSessionDots(sessionCount, isSelected, isCurrentMonth) :
                                  <div className="h-1.5"></div>
                                }
                              </button>
                            );
                          })}
                        </div>

                        {/* Separator */}
                        <div className="border-t border-stone-200 my-4"></div>

                        {/* Hide empty days toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-lexend text-gray-700">Hide empty days</span>
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
                        </div>
                      </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Back Arrow */}
                    <button
                      onClick={() => navigateTime('prev')}
                      className="flex p-2.5 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-50 h-11"
                    >
                      <ChevronLeft className="w-6 h-6 text-indigo-600" />
                    </button>

                    {/* Today Button */}
                    <button
                      onClick={selectToday}
                      className="flex px-4 py-2 items-center justify-center rounded-lg border border-stone-200 bg-white hover:bg-stone-50 h-11"
                    >
                      <span className="text-stone-900 font-lexend text-base font-normal leading-6">Today</span>
                    </button>

                    {/* Forward Arrow */}
                    <button
                      onClick={() => navigateTime('next')}
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
                      const currentWeek = getCurrentWeek();

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
                          if (currentWeek[i] && currentWeek[i].sessions === 0) {
                            consecutiveEmptyToLeft++;
                          } else {
                            break; // Stop at first non-empty card
                          }
                        }

                        return consecutiveEmptyToLeft * -104; // Move by the number of consecutive empty cards
                      };

                      // Show all days during animation, filter after based on new rules
                      let visibleDays;
                      if (isToggling) {
                        visibleDays = currentWeek;
                      } else if (hideEmptyDays) {
                        // When hiding empty days: show only days with sessions, but always include Monday
                        const monday = currentWeek.find(day => day.day === 'Mon');
                        const daysWithSessions = currentWeek.filter(day => day.sessions > 0);

                        // Create set to avoid duplicates, then convert back to array maintaining order
                        const uniqueDays = new Map();
                        if (monday) uniqueDays.set(monday.date, monday);
                        daysWithSessions.forEach(day => uniqueDays.set(day.date, day));
                        visibleDays = Array.from(uniqueDays.values()).sort((a, b) =>
                          currentWeek.indexOf(a) - currentWeek.indexOf(b)
                        );
                      } else {
                        // When showing empty days: show all 7 days of the week
                        visibleDays = currentWeek;
                      }

                      return visibleDays.map((dayData, index) => {
                        const originalIndex = currentWeek.findIndex(day => day.date === dayData.date);
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
                            <div className={`text-xs font-normal leading-none font-lexend ${
                              isSelected ? 'text-white' : 'text-stone-700'
                            }`}>
                              {dayData.sessions}
                            </div>
                            <div className={`text-xs font-normal leading-none font-lexend ${
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
                </div>
              </div>
            )}

            {/* Header for All Students view */}
            {activeView === 'all' && (
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-stone-800 font-lexend pt-1">
                      All Students
                    </h1>
                    <p className="text-lg text-gray-600 font-lexend mt-1">
                      {getAllStudentsSorted().length} students in your workspace
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Find student"
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
            )}

            {/* Header for Session Notes view */}
            {activeView === 'sessionnotes' && (
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-end gap-0.5">
                    <h1 className="text-3xl font-bold text-stone-800 font-lexend tracking-tight">
                      Session notes
                    </h1>
                  </div>
                  <div className="flex items-center w-56">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M21.0002 21.0002L16.6602 16.6602" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <Input
                        type="text"
                        placeholder="Search notes"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 pr-14 h-11 font-readex text-base rounded-full overflow-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center">
                  <div className="flex p-1.5 border border-stone-200 rounded-xl bg-white overflow-hidden h-auto self-center">
                    <button
                      onClick={() => scrollToSection('in-progress')}
                      className={`flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all overflow-hidden ${
                        activeTab === 'in-progress'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      In progress
                    </button>
                    <button
                      onClick={() => scrollToSection('due-soon')}
                      className={`flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all overflow-hidden ${
                        activeTab === 'due-soon'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Due soon
                    </button>
                    <button
                      onClick={() => scrollToSection('submitted')}
                      className={`flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all overflow-hidden ${
                        activeTab === 'submitted'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Submitted
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Content inside card - Different margins for different views */}
            <div className={`${
              activeView === 'schedule'
                ? 'pl-0 pr-4 pb-6 pt-0'
                : activeView === 'sessionnotes'
                  ? 'p-9'
                  : 'px-8 pb-8 pt-4'
            } space-y-6 flex-1 overflow-y-auto`}>
              {activeView === 'all' && (
                <section>
                  <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                    {getAllStudentsSorted().map((student) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        onClick={() => handleStudentClick(student.id, getAllStudentsSorted())}
                      />
                    ))}
                  </div>
                </section>
              )}

              {activeView === 'schedule' && (
                <div className="space-y-6 min-w-0 overflow-hidden">





                  {/* Time Periods */}
                  <div className="space-y-8 min-w-0 mt-9 ml-9 mr-16">
                    {/* Morning */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Haze className="w-5 h-5 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Morning</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().morning.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                            />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Afternoon */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <SunMedium className="w-5 h-5 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Afternoon</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().afternoon.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                            />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Evening */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <MoonStar className="w-5 h-5 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Evening</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().evening.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeView === 'sessionnotes' && (
                <div className="space-y-12">
                  {/* In Progress Section */}
                  <section id="in-progress">
                    <div className="flex items-center gap-2 mb-4">
                      <NotebookPen className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">In Progress</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getInProgressNotes().length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getInProgressNotes().map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getInProgressNotes())}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Due Soon Section */}
                  <section id="due-soon">
                    <div className="flex items-center gap-2 mb-4">
                      <Timer className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">Due Soon</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getDueSoonNotes().length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getDueSoonNotes().map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getDueSoonNotes())}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Submitted Section */}
                  <section id="submitted">
                    <div className="flex items-center gap-2 mb-4">
                      <CircleCheck className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">Submitted</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getSubmittedNotes().length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getSubmittedNotes().map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getSubmittedNotes())}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student Overlay Modal */}
      {showStudentOverlay && selectedStudentId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[1000]">
          {/* Navigation Arrow - Left */}
          <button
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious()}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 flex p-2.5 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg transition-opacity ${
              canNavigatePrevious() ? 'hover:bg-stone-50' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ left: 'calc(50% - 384px - 24px - 44px)' }}
          >
            <ChevronLeft className={`w-6 h-6 ${
              canNavigatePrevious() ? 'text-indigo-600' : 'text-stone-300'
            }`} />
          </button>

          {/* Modal Content */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-xl max-w-3xl w-full mx-8 max-h-[85vh] max-w-[90vw] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between p-6">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="bg-orange-100 text-orange-700 font-bold text-2xl">
                      {getSelectedStudent()?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold text-stone-900 font-lexend leading-tight">
                    {getSelectedStudent()?.name}
                  </h2>
                  {getSelectedStudent()?.sessionTime && (
                    <div className="flex items-center gap-1 mt-1">
                      <Bell className="w-4 h-4 text-stone-700" />
                      <span className="text-stone-700 font-lexend text-base">
                        9:00am, Thursday July 31
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <MoreVertical className="w-4 h-4" />
                  <span>Actions</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <button onClick={handleExpandStudent} className="p-1 hover:bg-stone-100 rounded">
                  <Maximize2 className="w-6 h-6 text-stone-700" />
                </button>
                <button onClick={() => setShowStudentOverlay(false)} className="p-1 hover:bg-stone-100 rounded">
                  <X className="w-6 h-6 text-stone-700" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Topics for next session */}
              <div className="border border-stone-200 rounded-lg bg-stone-50 p-5">
                <h3 className="text-xl font-bold text-stone-900 font-lexend mb-3">
                  Topics for next session
                </h3>
                <div className="text-stone-900 font-lexend text-base leading-5 space-y-2">
                  <div>1. Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.</div>
                  <div>2. Apply 2D shape formulas in word problems to build real-world problem-solving skills.</div>
                  <div>3. Introduce multi-step problems involving both perimeter/area and decimal rounding.</div>
                </div>
              </div>

              {/* Session highlights */}
              <div className="border border-stone-200 rounded-lg bg-stone-50 p-5">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-stone-900 font-lexend">
                    Session highlights
                  </h3>
                  <p className="text-xs text-stone-400 font-lexend mt-1">
                    From the last 7 sessions
                  </p>
                </div>
                <div className="text-stone-900 font-lexend text-base leading-5 space-y-2">
                  <div className="pl-4 -indent-4">• Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.</div>
                  <div className="pl-4 -indent-4">• Reviewed and recalled formulas for 2D shapes: circle, rectangle, square.</div>
                  <div className="pl-4 -indent-4">• Demonstrated improved accuracy in identifying decimal positions with visual support.</div>
                  <div className="pl-4 -indent-4">• Made progress toward independent problem-solving with fewer rounding errors.</div>
                  <div className="pl-4 -indent-4">• Joined the session late but used remaining time effectively to reinforce key math skills.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrow - Right */}
          <button
            onClick={navigateNext}
            disabled={!canNavigateNext()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 flex p-2.5 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg transition-opacity ${
              canNavigateNext() ? 'hover:bg-stone-50' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ right: 'calc(50% - 384px - 24px - 44px)' }}
          >
            <ChevronRight className={`w-6 h-6 ${
              canNavigateNext() ? 'text-indigo-600' : 'text-stone-300'
            }`} />
          </button>
        </div>
      )}
    </div>
  );
}
