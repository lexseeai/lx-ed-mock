import { useState } from "react";
import { Users, FileText, GraduationCap, Settings, Clock, Calendar, BookOpen, FileUser, ChevronUp, LayoutPanelLeft, Timer } from "lucide-react";
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
  { id: "3", name: "Marcus", upcomingSession: "5:00 PM, today", sessionTime: "5:00pm today", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus" },

  // Students with open tasks
  { id: "4", name: "Sofia", sessionTime: "10:30am, tomorrow", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia" },
  { id: "5", name: "Liam", sessionTime: "9:00am, Friday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam" },
  { id: "6", name: "Isabella", sessionTime: "1:30am, Monday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella" },
  { id: "7", name: "Noah", sessionTime: "4:45pm, today", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah" },
  { id: "8", name: "Mia", sessionTime: "11:00am, Wednesday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia" },
  { id: "9", name: "Ethan", sessionTime: "2:00pm, Thursday", sessionReportDue: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ethan" },
  
  // All students (additional)
  { id: "10", name: "Jayden", sessionTime: "8:00pm, today" },
  { id: "11", name: "Jayden", sessionTime: "3:00pm, today" },
  { id: "12", name: "Jayden", sessionTime: "8:00pm, today" },
  { id: "13", name: "Jayden", sessionTime: "3:00pm, today" },
  { id: "14", name: "Jayden", sessionTime: "8:00pm, today" },
  { id: "15", name: "Jayden", sessionTime: "8:00pm, today" },
  { id: "16", name: "Jayden", sessionTime: "8:00pm, today" },
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
          <AvatarImage src={student.avatar} />
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

function Sidebar() {
  return (
    <div className="w-60 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-stone-200">
        <h1 className="text-lg font-medium text-stone-800 font-lexend">Lexsee Workspace</h1>
        <LayoutPanelLeft className="w-5 h-5 text-stone-400" />
      </div>

      {/* Navigation Content */}
      <div className="flex-1 flex flex-col px-3 py-4">
        {/* My Students Section */}
        <div className="space-y-2">
          <div className="px-2">
            <h2 className="text-xs font-medium text-stone-400 font-lexend uppercase tracking-wide">My students</h2>
          </div>

          {/* All Students - Active */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-indigo-600 text-white">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-lexend">All</span>
            </div>
            <span className="text-sm font-lexend">14</span>
          </div>

          {/* This Week */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-stone-50">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-teal-500" />
              <span className="text-sm text-stone-700 font-lexend">This week</span>
            </div>
            <span className="text-sm text-stone-400 font-lexend">3</span>
          </div>

          {/* Upcoming */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-stone-50">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span className="text-sm text-stone-700 font-lexend">Upcoming</span>
            </div>
            <span className="text-sm text-stone-400 font-lexend">9</span>
          </div>

          {/* Open Tasks */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-stone-50">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-fuchsia-500" />
              <span className="text-sm text-stone-700 font-lexend">Open tasks</span>
            </div>
            <span className="text-sm text-stone-400 font-lexend">4</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="my-4"></div>

        {/* Other Navigation Items */}
        <div className="space-y-2">
          <div className="flex items-center px-2 py-1 rounded-lg hover:bg-stone-50">
            <BookOpen className="w-4 h-4 text-stone-600 mr-2" />
            <span className="text-sm text-stone-700 font-lexend">Library</span>
          </div>

          <div className="flex items-center px-2 py-1 rounded-lg hover:bg-stone-50">
            <FileUser className="w-4 h-4 text-stone-600 mr-2" />
            <span className="text-sm text-stone-700 font-lexend">Assignments</span>
          </div>

          <div className="flex items-center px-2 py-1 rounded-lg hover:bg-stone-50">
            <GraduationCap className="w-4 h-4 text-stone-600 mr-2" />
            <span className="text-sm text-stone-700 font-lexend">Lexsee Reader</span>
          </div>
        </div>

        {/* User Profile at Bottom */}
        <div className="mt-auto border-t border-stone-200 pt-4">
          <div className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-stone-50">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-stone-200 text-stone-600 text-xs">JS</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-black font-lexend">John Smith</span>
            </div>
            <ChevronUp className="w-4 h-4 text-stone-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  const studentsWithUpcomingSessions = mockStudents.filter(s => s.upcomingSession);
  const studentsWithOpenTasks = mockStudents.filter(s => s.sessionReportDue);
  const allStudents = mockStudents.slice(9); // Show the Jayden students in "All students"

  return (
    <div className="min-h-screen bg-stone-100 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-3">
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

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 bg-stone-50">
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
  );
}
