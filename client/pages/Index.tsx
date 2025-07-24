import { useState } from "react";
import { Users, FileText, GraduationCap, Settings } from "lucide-react";
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
  { id: "1", name: "Jordan", upcomingSession: "3:00 PM, today", sessionTime: "3:00pm today" },
  { id: "2", name: "Jordan", upcomingSession: "4:00 PM, today", sessionTime: "4:00pm today" },
  { id: "3", name: "Jordan", upcomingSession: "5:00 PM, today", sessionTime: "5:00pm today" },
  
  // Students with open tasks
  { id: "4", name: "Sofia", sessionTime: "10:30am, tomorrow", sessionReportDue: true },
  { id: "5", name: "Liam", sessionTime: "9:00am, Friday", sessionReportDue: true },
  { id: "6", name: "Isabella", sessionTime: "1:30am, Monday", sessionReportDue: true },
  { id: "7", name: "Noah", sessionTime: "4:45pm, today", sessionReportDue: true },
  { id: "8", name: "Mia", sessionTime: "11:00am, Wednesday", sessionReportDue: true },
  { id: "9", name: "Ethan", sessionTime: "2:00pm, Thursday", sessionReportDue: true },
  
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
    <div className="w-16 bg-white border-r border-stone-200 flex flex-col items-center py-3">
      {/* Logo */}
      <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mb-4">
        <div className="w-6 h-6 bg-indigo-600 rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-stone-400 hover:text-stone-600">
          <GraduationCap className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-stone-400 hover:text-stone-600">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-stone-100 text-indigo-600 hover:bg-stone-100">
          <Users className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-stone-400 hover:text-stone-600">
          <Settings className="w-4 h-4" />
        </Button>
      </nav>

      {/* User avatar */}
      <div className="mt-auto">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-stone-200 text-stone-600 text-xs">U</AvatarFallback>
        </Avatar>
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
                <strong className="text-stone-400">Students with upcoming sessions</strong>
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
                <strong className="text-stone-400">All students</strong>
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
