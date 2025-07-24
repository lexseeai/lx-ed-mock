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
  { id: "1", name: "Jordan", upcomingSession: "3:00 PM, today", sessionTime: "3:00" },
  { id: "2", name: "Jordan", upcomingSession: "3:00 PM, today", sessionTime: "3:00" },
  { id: "3", name: "Jordan", upcomingSession: "8:00 PM, today", sessionTime: "8:00" },
  
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
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white border border-gray-200"
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={student.avatar} />
          <AvatarFallback className="bg-orange-100 text-orange-800 font-medium">
            {getInitials(student.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">{student.name}</h3>
          {student.sessionTime && (
            <p className="text-sm text-gray-600">{student.sessionTime}</p>
          )}
        </div>
        
        {student.sessionReportDue && (
          <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">
            📝 Session report due
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <div className="w-6 h-6 bg-indigo-600 rounded-full"></div>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-gray-400">
          <GraduationCap className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-gray-400">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-gray-100 text-indigo-600">
          <Users className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-gray-400">
          <Settings className="w-4 h-4" />
        </Button>
      </nav>
      
      {/* User avatar */}
      <div className="mt-auto">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleStudentClick = (studentId: string) => {
    console.log("Opening student view for:", studentId);
    // Navigate to student detail view
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
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-6 h-6 bg-indigo-600 rounded-full mr-2"></div>
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
                  className="w-64"
                />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                + New student
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 space-y-8">
          {/* Students with upcoming sessions */}
          <section>
            <h2 className="text-lg font-medium text-gray-700 mb-4">Students with upcoming sessions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
            <h2 className="text-lg font-medium text-gray-700 mb-4">Students with open tasks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
            <h2 className="text-lg font-medium text-gray-700 mb-4">All students</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
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
