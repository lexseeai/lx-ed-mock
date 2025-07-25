import { useState } from "react";
import { UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  avatar?: string;
  upcomingSession?: string;
  sessionTime?: string;
  openTasks?: number;
  sessionReportDue?: boolean;
}

const mockStudents: Student[] = [
  // Students with upcoming sessions
  { id: "1", name: "Alex", upcomingSession: "3:00 PM, today", sessionTime: "3:00pm today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" },
  { id: "2", name: "Emma", upcomingSession: "4:00 PM, today", sessionTime: "4:00pm today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma" },
  { id: "3", name: "Marcus", upcomingSession: "5:00 PM, tomorrow", sessionTime: "5:00pm tomorrow", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus" },

  // Students with open tasks
  { id: "4", name: "Sofia", sessionTime: "10:30am, next Tuesday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia" },
  { id: "5", name: "Liam", sessionTime: "9:00am, next Friday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam" },
  { id: "6", name: "Isabella", sessionTime: "1:30pm, next Monday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella" },
  { id: "7", name: "Noah", sessionTime: "4:45pm, next Wednesday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah" },

  // All students (additional)
  { id: "10", name: "Carlos", sessionTime: "8:00pm, next Monday" },
  { id: "11", name: "Maya", sessionTime: "3:00pm, next Thursday" },
  { id: "12", name: "Daniel" },
  { id: "13", name: "Zoe", sessionTime: "3:00pm, next Tuesday" },
  { id: "14", name: "Oliver", sessionTime: "8:00pm, next Friday" },
  { id: "15", name: "Luna" },
  { id: "16", name: "Kai", sessionTime: "8:00pm, next Wednesday" },
];

function StudentCard({ student, onClick }: { student: Student; onClick: () => void }) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-sm transition-all duration-200 bg-white border border-stone-200 rounded-lg h-60 w-48"
      style={{ aspectRatio: '0.75' }}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center space-y-3 h-full">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-orange-100 text-orange-700 font-medium text-sm">
            {getInitials(student.name)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1 flex-1 flex flex-col justify-start items-center w-full">
          <h3 className="text-gray-900 font-lexend font-medium text-sm">{student.name}</h3>
          {student.sessionTime && (
            <p className="text-xs text-gray-600 leading-tight">
              <p>{student.sessionTime}</p>
            </p>
          )}
        </div>

        {student.sessionReportDue && (
          <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200 flex-shrink-0">
            📝 Session report due
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

function Sidebar({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-60'} bg-stone-100 flex flex-col min-h-screen transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && (
          <h1 className="text-lg font-medium text-stone-800 font-lexend">Lexsee Workspace</h1>
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
      <div className="flex-1 flex flex-col px-3 py-4">
        {/* My Students Section */}
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="px-2">
              <h2 className="text-xs font-medium text-stone-400 font-lexend uppercase tracking-wide">My students</h2>
            </div>
          )}

          {/* All Students */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100'
            }`}
            onClick={() => setActiveView('all')}
          >
            <div className="flex items-center space-x-2">
              <UsersRound className={`w-4 h-4 ${activeView === 'all' ? 'text-white' : 'text-stone-600'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-stone-700'}`}>All</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-stone-400'}`}>14</span>}
          </div>

          {/* This Week */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'thisweek' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100'
            }`}
            onClick={() => setActiveView('thisweek')}
          >
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${activeView === 'thisweek' ? 'text-white' : 'text-teal-500'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'thisweek' ? 'text-white' : 'text-stone-700'}`}>This week</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'thisweek' ? 'text-white' : 'text-stone-400'}`}>3</span>}
          </div>

          {/* Upcoming */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'upcoming' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100'
            }`}
            onClick={() => setActiveView('upcoming')}
          >
            <div className="flex items-center space-x-2">
              <Calendar className={`w-4 h-4 ${activeView === 'upcoming' ? 'text-white' : 'text-sky-500'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'upcoming' ? 'text-white' : 'text-stone-700'}`}>Upcoming</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'upcoming' ? 'text-white' : 'text-stone-400'}`}>9</span>}
          </div>

          {/* Open Tasks */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg cursor-pointer ${
              activeView === 'opentasks' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100'
            }`}
            onClick={() => setActiveView('opentasks')}
          >
            <div className="flex items-center space-x-2">
              <NotebookText className={`w-4 h-4 ${activeView === 'opentasks' ? 'text-white' : 'text-fuchsia-500'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'opentasks' ? 'text-white' : 'text-stone-700'}`}>Open tasks</span>}
            </div>
            {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'opentasks' ? 'text-white' : 'text-stone-400'}`}>4</span>}
          </div>
        </div>

        {/* Spacer */}
        <div className="my-4"></div>

        {/* Other Navigation Items */}
        <div className="space-y-2 flex-1">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-stone-100`}>
            <LibraryBig className="w-4 h-4 text-stone-600" />
            {!isCollapsed && <span className="text-sm text-stone-700 font-lexend ml-2">Library</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-stone-100`}>
            <FileAudio className="w-4 h-4 text-stone-600" />
            {!isCollapsed && <span className="text-sm text-stone-700 font-lexend ml-2">Assignments</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-2 py-1 rounded-lg hover:bg-stone-100`}>
            <Rabbit className="w-4 h-4 text-stone-600" />
            {!isCollapsed && <span className="text-sm text-stone-700 font-lexend ml-2">Lexsee Reader</span>}
          </div>
        </div>
      </div>

      {/* User Profile at Bottom */}
      <div className="p-3">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg hover:bg-stone-100`}>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-stone-200 text-stone-600 text-xs">JS</AvatarFallback>
            </Avatar>
            {!isCollapsed && <span className="text-sm font-medium text-black font-lexend">John Smith</span>}
          </div>
          {!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-stone-400" />}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("all");
  const navigate = useNavigate();

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  // Helper functions for different views
  const getAllStudentsSorted = () => {
    return [...mockStudents].sort((a, b) => a.name.localeCompare(b.name));
  };

  const getThisWeekStudents = () => {
    const today = mockStudents.filter(s => s.sessionTime?.includes('today'));
    const tomorrow = mockStudents.filter(s => s.sessionTime?.includes('tomorrow'));
    return { today, tomorrow };
  };

  const getUpcomingStudents = () => {
    const thisWeek = mockStudents.filter(s => s.sessionTime?.includes('today') || s.sessionTime?.includes('tomorrow'));
    const nextWeek = mockStudents.filter(s => s.sessionTime?.includes('next'));
    const furtherOut = mockStudents.filter(s => s.sessionTime && !s.sessionTime.includes('today') && !s.sessionTime.includes('tomorrow') && !s.sessionTime.includes('next'));
    return { thisWeek, nextWeek, furtherOut };
  };

  const getOpenTasksStudents = () => {
    return mockStudents.filter(s => s.sessionReportDue).sort((a, b) => {
      // Sort by session time for open tasks
      if (!a.sessionTime) return 1;
      if (!b.sessionTime) return -1;
      return a.sessionTime.localeCompare(b.sessionTime);
    });
  };

  const studentsWithUpcomingSessions = mockStudents.filter(s => s.upcomingSession);
  const studentsWithOpenTasks = mockStudents.filter(s => s.sessionReportDue);
  const allStudents = mockStudents.slice(9); // Show the Jayden students in "All students"

  return (
    <div className="h-screen bg-stone-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 pt-3 pr-6 pb-3 pl-3 bg-stone-100 h-full">
          {/* My students panel card */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg shadow-sm h-full flex flex-col">
            {/* Header inside card */}
            <div className="border-b border-stone-200 px-6 py-4">
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
                      className="w-64 h-9"
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
          {/* Students with upcoming sessions */}
          <section>
            <h2 className="text-base font-normal text-stone-400 mb-3 font-lexend">
              <h1 className="text-xl pt-5">
                <p>Students with upcoming sessions</p>
              </h1>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,_192px)] gap-3">
              {studentsWithUpcomingSessions.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => handleStudentClick(student.id)}
                />
              ))}
            </div>
          </section>

          {/* Students with open tasks */}
          <section>
            <h2 className="text-base font-normal text-stone-400 mb-3 font-lexend">
              <h1 className="text-xl pt-5">
                <p>Open tasks</p>
              </h1>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,_192px)] gap-3">
              {studentsWithOpenTasks.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => handleStudentClick(student.id)}
                />
              ))}
            </div>
          </section>

          {/* All students */}
          <section>
            <h2 className="text-base font-normal text-stone-400 mb-3 font-lexend">
              <h1 className="text-xl pt-5">
                <p>All students</p>
              </h1>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,_192px)] gap-3">
              {allStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => handleStudentClick(student.id)}
                />
              ))}
            </div>
          </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
