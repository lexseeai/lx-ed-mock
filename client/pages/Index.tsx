import { useState } from "react";
import { UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, Bell, ChevronLeft, ChevronRight } from "lucide-react";
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

function StudentCard({ student, onClick }: { student: Student; onClick: () => void }) {
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
                    {student.sessionTime}
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
              <UsersRound className={`w-4 h-4 ${activeView === 'all' ? 'text-white' : 'text-stone-600'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-white'}`}>All</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-white/50'}`}>14</span>}
          </div>

          {/* Schedule */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
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
  const navigate = useNavigate();

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  // Helper functions for different views
  const getAllStudentsSorted = () => {
    return [...mockStudents].sort((a, b) => a.name.localeCompare(b.name));
  };

  const getScheduleData = () => {
    // Get students with sessions today and tomorrow
    const todayStudents = mockStudents.filter(s => s.sessionTime?.includes('today'));
    const tomorrowStudents = mockStudents.filter(s => s.sessionTime?.includes('tomorrow'));

    // Parse time and categorize by period
    const categorizeByTime = (students: Student[]) => {
      const morning: Student[] = [];
      const afternoon: Student[] = [];
      const evening: Student[] = [];

      students.forEach(student => {
        if (!student.sessionTime) return;

        const timeMatch = student.sessionTime.match(/(\d{1,2}):?(\d{0,2})(am|pm)/i);
        if (!timeMatch) return;

        let hours = parseInt(timeMatch[1]);
        const period = timeMatch[3].toLowerCase();

        if (period === 'pm' && hours !== 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;

        if (hours >= 6 && hours < 12) {
          morning.push(student);
        } else if (hours >= 12 && hours < 17) {
          afternoon.push(student);
        } else {
          evening.push(student);
        }
      });

      return { morning, afternoon, evening };
    };

    const todayPeriods = categorizeByTime(todayStudents);
    const tomorrowPeriods = categorizeByTime(tomorrowStudents);

    return {
      today: todayPeriods,
      tomorrow: tomorrowPeriods
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
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-medium text-gray-900">
                    My students
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Filter students"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 md:w-64 h-9 min-w-0"
                    />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 h-9">
                    + New student
                  </Button>
                </div>
              </div>
            </div>
            {/* Content inside card */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
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
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-lg font-medium text-gray-900 font-lexend">July, 2025</h2>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 hover:bg-stone-200 rounded">
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-stone-200 rounded">
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm text-gray-700 hover:bg-stone-100 rounded font-lexend">
                      Today
                    </button>
                  </div>

                  {/* Week Calendar */}
                  <div className="flex items-center gap-4 mb-6 min-w-0">
                    {/* Back Arrow */}
                    <button className="flex-shrink-0 flex p-2.5 items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50">
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>

                    {/* Day Cards Container */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                      {[
                        { date: '28', day: 'Mon', sessions: 3, isToday: true, isSelected: true },
                        { date: '29', day: 'Tues', sessions: 1, isToday: false, isSelected: false },
                        { date: '31', day: 'Wed', sessions: 3, isToday: false, isSelected: false },
                        { date: '4', day: 'Mon', sessions: 3, isToday: false, isSelected: false },
                        { date: '5', day: 'Tue', sessions: 1, isToday: false, isSelected: false },
                        { date: '6', day: 'Wed', sessions: 3, isToday: false, isSelected: false },
                        { date: '7', day: 'Thu', sessions: 1, isToday: false, isSelected: false },
                        { date: '8', day: 'Fri', sessions: 1, isToday: false, isSelected: false },
                        { date: '11', day: 'Mon', sessions: 1, isToday: false, isSelected: false },
                        { date: '12', day: 'Tue', sessions: 1, isToday: false, isSelected: false }
                      ].map((dayData, index) => (
                        <button
                          key={dayData.date}
                          className={`flex w-24 h-24 p-3 pb-2 flex-col justify-between items-start rounded-xl border cursor-pointer transition-colors flex-shrink-0 ${
                            dayData.isSelected
                              ? 'border-indigo-600 bg-indigo-600'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          {/* Top section with date and today indicator */}
                          <div className="flex flex-col items-start gap-1.5 w-full">
                            <div className="flex justify-between items-center w-full">
                              <div className={`text-2xl font-black leading-none font-lexend ${
                                dayData.isSelected ? 'text-white' : 'text-stone-700'
                              }`}>
                                {dayData.date}
                              </div>
                              {dayData.isToday && (
                                <div className={`text-xs leading-none font-lexend opacity-50 ${
                                  dayData.isSelected ? 'text-white' : 'text-stone-700'
                                }`}>
                                  Today
                                </div>
                              )}
                            </div>
                            <div className={`text-base font-medium leading-none font-lexend w-full text-left ${
                              dayData.isSelected ? 'text-white' : 'text-stone-700'
                            }`}>
                              {dayData.day}
                            </div>
                          </div>

                          {/* Bottom section with sessions */}
                          <div className="flex items-start gap-1 w-full">
                            <div className={`text-sm font-normal leading-none font-lexend ${
                              dayData.isSelected ? 'text-white' : 'text-stone-700'
                            }`}>
                              {dayData.sessions}
                            </div>
                            <div className={`text-sm font-normal leading-none font-lexend ${
                              dayData.isSelected ? 'text-white' : 'text-stone-700'
                            }`}>
                              sessions
                            </div>
                          </div>
                        </button>
                      ))}
                      </div>
                    </div>

                    {/* Forward Arrow */}
                    <button className="flex-shrink-0 flex p-2.5 items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50">
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                  </div>

                  {/* Time Periods */}
                  <div className="space-y-8 min-w-0 mt-6 mx-16">
                    {/* Morning */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Morning</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().today.morning.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                            />
                          </div>
                        ))}
                        {getScheduleData().today.morning.length === 0 && (
                          <div className="text-gray-400 font-lexend text-sm">No sessions scheduled</div>
                        )}
                      </div>
                    </section>

                    {/* Afternoon */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Afternoon</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().today.afternoon.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                            />
                          </div>
                        ))}
                        {getScheduleData().today.afternoon.length === 0 && (
                          <div className="text-gray-400 font-lexend text-sm">No sessions scheduled</div>
                        )}
                      </div>
                    </section>

                    {/* Evening */}
                    <section>
                      <h3 className="text-xl font-normal text-stone-400 mb-4 font-lexend">Evening</h3>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().today.evening.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => handleStudentClick(student.id)}
                            />
                          </div>
                        ))}
                        {getScheduleData().today.evening.length === 0 && (
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
