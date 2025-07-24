import { useState } from "react";
import { ArrowLeft, Calendar, FileText, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "react-router-dom";

interface StudentSession {
  id: string;
  date: string;
  time: string;
  type: string;
  status: "completed" | "upcoming" | "cancelled";
  notes?: string;
}

interface StudentAssignment {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  type: string;
}

const mockSessions: StudentSession[] = [
  {
    id: "1",
    date: "Today",
    time: "3:00 PM",
    type: "Reading Assessment",
    status: "upcoming",
  },
  {
    id: "2",
    date: "Yesterday",
    time: "3:00 PM",
    type: "Reading Practice",
    status: "completed",
    notes: "Great progress on phonics. Student showed improvement in letter recognition.",
  },
  {
    id: "3",
    date: "Dec 10",
    time: "3:00 PM",
    type: "Vocabulary Building",
    status: "completed",
    notes: "Worked on sight words. Needs more practice with common words.",
  },
];

const mockAssignments: StudentAssignment[] = [
  {
    id: "1",
    title: "Session Report - Reading Assessment",
    dueDate: "Today",
    status: "pending",
    type: "report",
  },
  {
    id: "2",
    title: "Homework - Sight Words Practice",
    dueDate: "Tomorrow",
    status: "pending",
    type: "homework",
  },
  {
    id: "3",
    title: "Weekly Progress Report",
    dueDate: "Dec 15",
    status: "completed",
    type: "report",
  },
];

export default function StudentDetail() {
  const { studentId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock student data - in real app this would be fetched based on studentId
  const student = {
    id: studentId || "1",
    name: "Jordan Smith",
    grade: "2nd Grade",
    age: 8,
    parentName: "Sarah Smith",
    parentEmail: "sarah.smith@email.com",
    enrollmentDate: "September 2024",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-orange-100 text-orange-800 font-medium">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
              <p className="text-sm text-gray-600">{student.grade} • Age {student.age}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="assignments">Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Parent/Guardian</p>
                    <p className="text-sm text-gray-900">{student.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact Email</p>
                    <p className="text-sm text-gray-900">{student.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enrollment Date</p>
                    <p className="text-sm text-gray-900">{student.enrollmentDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Next Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Reading Assessment</p>
                    <p className="text-sm text-gray-600">Today at 3:00 PM</p>
                    <Badge className={getStatusColor("upcoming")}>
                      Upcoming
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAssignments.filter(a => a.status === "pending").map((assignment) => (
                      <div key={assignment.id} className="border-l-2 border-yellow-300 pl-3">
                        <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-xs text-gray-600">Due {assignment.dueDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Session History</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{session.type}</h3>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {session.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {session.time}
                          </span>
                        </div>
                        {session.notes && (
                          <p className="text-sm text-gray-700 mt-2">{session.notes}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Assignments & Tasks</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <FileText className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                        <p className="text-xs text-gray-500 capitalize">{assignment.type}</p>
                      </div>
                      {assignment.status === "pending" && (
                        <Button size="sm" variant="outline">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Session Notes</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 text-center py-8">
                  No notes available yet. Session notes will appear here after sessions are completed.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
