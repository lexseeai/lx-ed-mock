import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, CalendarFold, Bell, ChevronLeft, ChevronRight, ChevronDown, Haze, SunMedium, MoonStar, X, Maximize2, MoreVertical, Loader, Timer, NotebookPen, CircleCheck, Edit, Pencil, ChevronsLeft, ChevronsRight, ChevronUp, UserRoundSearch, LoaderCircle, UserRound, Search, UserRoundPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

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
  email?: string;
}

// Mock student data that matches the sidebar content
const mockStudents: Student[] = [
  { id: "1", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 14), sessionReportCompleted: true, email: "alex.johnson@email.com" },
  { id: "23", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, August 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false, email: "alex.johnson@email.com" },
];

function Sidebar({ activeView, setActiveView, selectedStudentId }: { activeView: string; setActiveView: (view: string) => void; selectedStudentId: string | null }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return { text: 'Good morning', icon: Haze };
    } else if (hour < 18) {
      return { text: 'Good afternoon', icon: SunMedium };
    } else {
      return { text: 'Good evening', icon: MoonStar };
    }
  };

  const greeting = getTimeBasedGreeting();
  const GreetingIcon = greeting.icon;

  // Find the selected student
  const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);

  return (
    <div className={`${isCollapsed ? 'w-16 min-w-16' : 'w-60 min-w-60'} flex flex-col min-h-screen transition-all duration-300 flex-shrink-0 bg-indigo-900`}>
      {/* Header */}
      <div className="flex items-center justify-between pl-4 pr-0 py-4">
        {!isCollapsed && (
          <h1 className="text-lg font-medium text-white font-lexend">Lexsee Educator</h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 h-6 w-6 hover:bg-indigo-950"
        >
          <PanelLeft className="w-5 h-5 text-white/50" />
        </Button>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 flex flex-col pl-3 pr-0 py-4">
        {/* Home Section */}
        <div className="space-y-1">
          {/* Time-based Greeting - Clickable Home */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              activeView === 'home' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => setActiveView('home')}
          >
            <div className="flex items-center space-x-2">
              <GreetingIcon className={`w-4 h-4 ${activeView === 'home' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'home' ? 'text-white' : 'text-white'}`}>{greeting.text}</span>}
            </div>
          </div>

          {/* My Students - Highlighted when on student page */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              selectedStudent ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => setActiveView('all')}
          >
            <div className="flex items-center space-x-2">
              <UsersRound className={`w-4 h-4 ${selectedStudent ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${selectedStudent ? 'text-white' : 'text-white'}`}>Students</span>}
            </div>
          </div>
        </div>

        {/* Spacer above sessions */}
        <div className="my-3"></div>

        {/* Sessions Section */}
        <div>
          {/* Sessions Label */}
          {!isCollapsed && (
            <span className="text-xs font-medium text-white/50 font-lexend ml-3 mt-3 mb-1 block">Sessions</span>
          )}
          <div className="space-y-1">
            {/* Schedule */}
            <div
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-9 leading-6 ${
                activeView === 'schedule' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-950'
              }`}
              onClick={() => setActiveView('schedule')}
            >
              <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${activeView === 'schedule' ? 'text-white' : 'text-white/80'}`} />
                {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white'}`}>Upcoming</span>}
              </div>
              {!isCollapsed && (
                <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white/50'}`}>7</span>
              )}
            </div>

            {/* Session Notes */}
            <div
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-8 ${
                activeView === 'sessionnotes' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-950'
              }`}
              onClick={() => setActiveView('sessionnotes')}
            >
              <div className="flex items-center space-x-2">
                <NotebookText className={`w-4 h-4 ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/80'}`} />
                {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white'}`}>Notes dues</span>}
              </div>
              {!isCollapsed && (
                <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/50'}`}>4</span>
              )}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="my-3"></div>

        {/* Other Navigation Items */}
        <div className="space-y-1 flex-1">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}>
            <LibraryBig className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Library</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}>
            <FileAudio className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Assignments</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}>
            <Rabbit className="w-4 h-4 text-white/80" />
            {!isCollapsed && <span className="text-sm text-white font-lexend ml-2">Lexsee Reader</span>}
          </div>
        </div>
      </div>

      {/* User Profile at Bottom */}
      <div className="py-3 pl-3 pr-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 py-1 rounded-lg hover:bg-indigo-950`}>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 rounded-xl">
              <AvatarFallback className="bg-stone-200 text-stone-600 text-xs rounded-xl">JS</AvatarFallback>
            </Avatar>
            {!isCollapsed && <span className="text-sm font-medium text-white font-lexend">John Smith</span>}
          </div>
          {!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-stone-400" />}
        </div>
      </div>
    </div>
  );
}

function getSubjectColors(subject: string) {
  const subjectLower = subject?.toLowerCase() || '';

  if (subjectLower.includes('math') || subjectLower.includes('algebra') || subjectLower.includes('geometry') || subjectLower.includes('calculus')) {
    return 'bg-blue-100 text-blue-700';
  }
  if (subjectLower.includes('science') || subjectLower.includes('biology') || subjectLower.includes('chemistry') || subjectLower.includes('physics')) {
    return 'bg-green-100 text-green-700';
  }
  if (subjectLower.includes('english') || subjectLower.includes('literature') || subjectLower.includes('writing')) {
    return 'bg-purple-100 text-purple-700';
  }
  if (subjectLower.includes('history') || subjectLower.includes('social')) {
    return 'bg-amber-100 text-amber-700';
  }
  if (subjectLower.includes('spanish') || subjectLower.includes('french') || subjectLower.includes('language')) {
    return 'bg-pink-100 text-pink-700';
  }
  if (subjectLower.includes('art') || subjectLower.includes('music') || subjectLower.includes('creative')) {
    return 'bg-red-100 text-red-700';
  }
  if (subjectLower.includes('computer') || subjectLower.includes('coding') || subjectLower.includes('programming')) {
    return 'bg-indigo-100 text-indigo-700';
  }
  if (subjectLower.includes('geography') || subjectLower.includes('earth')) {
    return 'bg-teal-100 text-teal-700';
  }

  return 'bg-stone-100 text-stone-700';
}

export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("snapshot");
  const [activeView, setActiveView] = useState("student");

  // Tab measurement state and refs for sliding indicator
  const [buttonMeasurements, setButtonMeasurements] = useState<{
    button1?: number;
    button2?: number;
    button3?: number;
    button4?: number;
    button5?: number;
  }>({});

  // Ref callbacks that measure immediately when elements are mounted
  const button1RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements(prev => ({ ...prev, button1: el.offsetWidth }));
      }, 10);
    }
  };

  const button2RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements(prev => ({ ...prev, button2: el.offsetWidth }));
      }, 10);
    }
  };

  const button3RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements(prev => ({ ...prev, button3: el.offsetWidth }));
      }, 10);
    }
  };

  const button4RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements(prev => ({ ...prev, button4: el.offsetWidth }));
      }, 10);
    }
  };

  const button5RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements(prev => ({ ...prev, button5: el.offsetWidth }));
      }, 10);
    }
  };

  // Calculate tab position and width
  const getTabPosition = () => {
    const { button1, button2, button3, button4, button5 } = buttonMeasurements;

    if (!button1 || !button2 || !button3 || !button4 || !button5) {
      return null;
    }

    switch (activeTab) {
      case 'next-session':
        return { left: 6, width: button1 };
      case 'observations':
        return { left: 6 + button1, width: button2 };
      case 'goals':
        return { left: 6 + button1 + button2, width: button3 };
      case 'session-notes':
        return { left: 6 + button1 + button2 + button3, width: button4 };
      case 'assignments':
        return { left: 6 + button1 + button2 + button3 + button4, width: button5 };
      default:
        return { left: 6, width: button1 };
    }
  };

  // Find the student data
  const student = mockStudents.find(s => s.id === studentId);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSidebarNavigation = (view: string) => {
    setActiveView(view);
    navigate('/');
  };

  if (!student) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-stone-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Student not found</h1>
            <p className="text-gray-600 mb-4">The student you're looking for doesn't exist.</p>
            <Button variant="outline" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-indigo-900 flex">
        <Sidebar activeView={activeView} setActiveView={handleSidebarNavigation} selectedStudentId={studentId || null} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Content */}
          <div className="flex-1 p-3 h-full min-w-0">
            <Card className="h-full flex flex-col min-w-0">
              {/* Header */}
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-stone-600 hover:text-indigo-600 transition-colors p-2"
                      onClick={handleBackClick}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Avatar className="w-full h-full">
                          <AvatarFallback className={`${getSubjectColors(student.subject || '')} font-medium text-lg`}>
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-stone-900 font-lexend">{student.name}</h1>
                        <p className="text-sm text-stone-600 font-lexend">{student.subject}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-stone-200">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Actions
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="px-6 py-4 border-b border-stone-200">
                <div className="flex justify-center">
                  <div className="relative flex p-1.5 border border-stone-200 rounded-xl bg-white overflow-hidden h-auto self-center">
                    {/* Sliding background indicator */}
                    {getTabPosition() && (
                      <div
                        className="absolute bg-indigo-600 shadow-sm rounded-md"
                        style={{
                          height: '32px',
                          top: '6px',
                          left: `${getTabPosition()!.left}px`,
                          width: `${getTabPosition()!.width}px`,
                          transition: 'left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)'
                        }}
                      />
                    )}
                    <button
                      ref={button1RefCallback}
                      onClick={() => setActiveTab('search')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'search'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    <button
                      ref={button2RefCallback}
                      onClick={() => setActiveTab('snapshot')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'snapshot'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Snapshot
                    </button>
                    <button
                      ref={button3RefCallback}
                      onClick={() => setActiveTab('goals')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'goals'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Goals
                    </button>
                    <button
                      ref={button4RefCallback}
                      onClick={() => setActiveTab('session-notes')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'session-notes'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Session notes
                    </button>
                    <button
                      ref={button5RefCallback}
                      onClick={() => setActiveTab('assignments')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'assignments'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Assignments
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-16 pt-8 pb-12">
                {activeTab === 'next-session' && (
                  <div className="space-y-12 max-w-4xl">
                    {/* Session Timeline */}
                    <div className="space-y-6" style={{margin: '0 36px 0 28px'}}>
                      {(() => {
                        // Mock session data similar to sidebar
                        const sessions = {
                          next: { time: '9:00am', date: 'August 4', status: 'wait' },
                          current: { time: '3:00pm', date: 'July 28', status: 'active' },
                          previous: { time: '9:00am', date: 'July 21', status: 'done' }
                        };

                        const getSessionIcon = (status: string) => {
                          switch (status) {
                            case 'done':
                              return { icon: CircleCheck, color: 'text-green-600' };
                            case 'active':
                              return { icon: LoaderCircle, color: 'text-indigo-600' };
                            case 'wait':
                            default:
                              return { icon: Clock, color: 'text-stone-400' };
                          }
                        };

                        const getButtonText = (status: string) => {
                          if (status === 'done') return 'View notes';
                          if (status === 'wait') return 'Add notes';
                          return 'Edit notes';
                        };

                        const sessions_to_show = [];
                        if (sessions.next) sessions_to_show.push({ ...sessions.next, key: 'next' });
                        if (sessions.current) sessions_to_show.push({ ...sessions.current, key: 'current' });
                        if (sessions.previous) sessions_to_show.push({ ...sessions.previous, key: 'previous' });

                        return sessions_to_show.map((session, index) => {
                          const iconConfig = getSessionIcon(session.status);
                          const IconComponent = iconConfig.icon;
                          const buttonText = getButtonText(session.status);

                          return (
                            <Card key={session.key} className="group hover:border-stone-300 transition-colors cursor-pointer">
                              <CardContent className="flex items-center justify-between gap-2 p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 flex justify-center">
                                    <IconComponent className={`w-5 h-5 ${iconConfig.color}`} />
                                  </div>
                                  <span className="text-lg font-lexend leading-5" style={{
                                    fontWeight: session.key === 'previous' ? '400' : '600',
                                    color: session.key === 'previous' ? 'rgba(87, 83, 78, 1)' : 'rgba(68, 64, 60, 1)'
                                  }}>
                                    {session.time}, {session.date}
                                  </span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="flex items-center px-2 py-1 border border-stone-200 rounded bg-white">
                                    <span className="text-stone-400 font-lexend text-sm font-normal">
                                      {buttonText}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        });
                      })()}
                    </div>

                    {/* Next Session Tasks */}
                    <div>
                      <div className="pb-4">
                        <h2 className="text-2xl font-bold text-stone-900 font-lexend leading-7">
                          Next session
                        </h2>
                        <p className="text-sm font-normal text-stone-400 font-lexend mt-1">
                          From session notes 21 July 2025
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <div className="w-5 h-5 rounded-md border-2 border-stone-700"></div>
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <div className="w-5 h-5 rounded-md border-2 border-stone-700"></div>
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <div className="w-5 h-5 rounded-md border-2 border-stone-700"></div>
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Introduce multi-step problems involving both perimeter/area and decimal rounding.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Observations */}
                    <div id="observations-section">
                      <div className="pb-4">
                        <h2 className="text-2xl font-bold text-stone-900 font-lexend leading-7">
                          Observations
                        </h2>
                        <p className="text-sm font-normal text-stone-400 font-lexend mt-1">
                          From the last 7 sessions
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">21 July 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Reviewed and recalled formulas for 2D shapes: circle, rectangle, square.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">21 July 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Demonstrated improved accuracy in identifying decimal positions with visual support.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">14 July 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Made progress toward independent problem-solving with fewer rounding errors.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">7 July 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Joined the session late but used remaining time effectively to reinforce key math skills.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">30 June 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="pt-1">
                            <ArrowRight className="w-5 h-5 text-stone-700" />
                          </div>
                          <p className="text-lg font-normal text-stone-900 font-lexend leading-6">
                            Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px'}}>
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer text-xs">
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal">23 June 25</span>
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'observations' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Observations content coming soon...</p>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Goals content coming soon...</p>
                  </div>
                )}

                {activeTab === 'session-notes' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Session notes content coming soon...</p>
                  </div>
                )}

                {activeTab === 'assignments' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Assignments content coming soon...</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
