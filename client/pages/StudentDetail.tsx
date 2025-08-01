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
      case 'search':
        return { left: 6, width: button1 };
      case 'snapshot':
        return { left: 6 + button1, width: button2 };
      case 'goals':
        return { left: 6 + button1 + button2, width: button3 };
      case 'session-notes':
        return { left: 6 + button1 + button2 + button3, width: button4 };
      case 'assignments':
        return { left: 6 + button1 + button2 + button3 + button4, width: button5 };
      default:
        return { left: 6 + button1, width: button2 };
    }
  };

  // Find the student data
  const student = mockStudents.find(s => s.id === studentId);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSidebarNavigation = (view: string) => {
    // Only navigate away from student page for specific views
    if (view === 'home' || view === 'all') {
      navigate('/');
      return;
    }

    // For other views like 'schedule' and 'sessionnotes', stay on student page but update the view
    setActiveView(view);
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
              <div className="bg-white border-b border-stone-200 rounded-t-lg" style={{padding: '18px 24px 0 18px', border: '1px none rgb(231, 229, 228)'}}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-stone-600 hover:text-indigo-600 transition-colors p-2"
                      onClick={handleBackClick}
                    >
                      <ArrowLeft className="w-5 h-5" style={{color: 'rgba(231, 229, 228, 1)'}} />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Avatar className="w-full h-full">
                          <AvatarFallback className={`${getSubjectColors(student.subject || '')} font-medium text-lg`}>
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div style={{marginLeft: '8px'}}>
                        <h1 className="text-2xl font-bold text-stone-900 font-lexend">{student.name}</h1>
                        <p className="text-sm text-stone-600 font-lexend">{student.subject}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-11 px-4 border-stone-200 bg-white hover:bg-stone-50 font-lexend text-sm font-normal text-stone-700"
                    >
                      Actions
                      <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 15L12 20L17 15" />
                        <path d="M7 9L12 4L17 9" />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      className="w-11 h-11 rounded-full border border-stone-200 bg-white hover:bg-stone-50 p-0 flex items-center justify-center"
                      variant="outline"
                    >
                      <Plus className="w-6 h-6 text-indigo-600" strokeWidth={4} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-stone-200" style={{padding: '12px 24px 24px'}}>
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
              <div className="flex-1 overflow-y-auto p-8 bg-stone-50">
                {activeTab === 'snapshot' && (
                  <div className="flex gap-6">
                    {/* Left Sidebar - Session Cards */}
                    <div className="flex flex-col gap-6">
                      {/* Sessions Group */}
                      <div className="flex flex-col gap-3">
                        {/* July 28 Card */}
                        <Card className="w-[150px] h-[150px] p-3 flex flex-col justify-between">
                          <CardContent className="p-0 flex flex-col gap-1.5">
                            <div className="text-stone-400 font-lexend text-base font-medium">July</div>
                            <div className="text-stone-700 font-lexend text-2xl font-black">28</div>
                            <div className="text-stone-700 font-lexend text-base font-medium">Mon</div>

                            {/* Session Time */}
                            <div className="flex items-center gap-1 py-0.5">
                              <CircleCheck className="w-3 h-3 text-green-500" />
                              <span className="text-stone-700 font-lexend text-xs">3:00–3:45AM</span>
                            </div>
                          </CardContent>

                          {/* View Notes Button */}
                          <div className="flex justify-center pb-1.5">
                            <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend">
                              View notes
                            </div>
                          </div>
                        </Card>

                        {/* August 4 Card */}
                        <Card className="w-[150px] h-[150px] p-3 flex flex-col justify-between">
                          <CardContent className="p-0 flex flex-col gap-1.5">
                            <div className="text-stone-400 font-lexend text-base font-medium">August</div>
                            <div className="text-stone-700 font-lexend text-2xl font-black">4</div>
                            <div className="text-stone-700 font-lexend text-base font-medium">Mon</div>

                            {/* Session Time */}
                            <div className="flex items-center gap-1 py-0.5">
                              <Clock className="w-3 h-3 text-stone-700" />
                              <span className="text-stone-700 font-lexend text-xs">3:00–3:45AM</span>
                            </div>
                          </CardContent>

                          {/* Add Notes Button */}
                          <div className="flex justify-center pb-1.5">
                            <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend">
                              Add notes
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">
                      {/* For Next Session */}
                      <Card className="p-5">
                        <CardContent className="p-0">
                          <div className="flex flex-col gap-3">
                            {/* Header with icon */}
                            <div className="flex items-start gap-1.5">
                              <svg className="w-6 h-6 text-stone-700 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 18V12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12V18"/>
                                <path d="M5 21C5 21.2652 5.10536 21.5196 5.29289 21.7071C5.48043 21.8946 5.73478 22 6 22H18C18.2652 22 18.5196 21.8946 18.7071 21.7071C18.8946 21.5196 19 21.2652 19 21V20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18H7C6.46957 18 5.96086 18.2107 5.58579 18.5858C5.21071 18.9609 5 19.4696 5 20V21Z"/>
                                <path d="M21 12H22"/>
                                <path d="M18.5 4.5L18 5"/>
                                <path d="M2 12H3"/>
                                <path d="M12 2V3"/>
                                <path d="M4.92871 4.92871L5.63571 5.63571"/>
                                <path d="M12 12V18"/>
                              </svg>
                              <div>
                                <h2 className="text-stone-900 font-lexend text-xl font-bold leading-6">For next session</h2>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <span className="text-stone-400 font-lexend text-sm">From session notes</span>
                                  <div className="bg-stone-100 rounded-full px-2 py-1">
                                    <span className="text-stone-400 font-lexend text-xs">14 June 25</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Task List */}
                            <div className="space-y-3 pl-1.5">
                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-[18px] h-[18px] rounded-full border border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-[18px] h-[18px] rounded-full border border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-[18px] h-[18px] rounded-full border border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Introduce multi-step problems involving both perimeter/area and decimal rounding.
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Observations */}
                      <Card className="p-5 min-w-[500px] max-w-[650px] flex-1">
                        <CardContent className="p-0">
                          <div className="flex flex-col gap-3">
                            {/* Header with icon and copy button */}
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-1.5">
                                <svg className="w-6 h-6 text-stone-900 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M16 2V4"/>
                                  <path d="M17.915 22C17.915 20.4087 17.2829 18.8826 16.1577 17.7574C15.0325 16.6321 13.5063 16 11.915 16C10.3237 16 8.79762 16.6321 7.6724 17.7574C6.54718 18.8826 5.91504 20.4087 5.91504 22"/>
                                  <path d="M8 2V4"/>
                                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
                                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"/>
                                </svg>
                                <div>
                                  <h2 className="text-stone-900 font-lexend text-xl font-bold leading-6">Observations</h2>
                                  <span className="text-stone-400 font-lexend text-sm">From the last 7 sessions</span>
                                </div>
                              </div>

                              {/* Copy Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 px-3 py-1.5 h-auto border-stone-200"
                                onClick={() => {
                                  const observationsText = [
                                    "Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.",
                                    "Reviewed and recalled formulas for 2D shapes: circle, rectangle, square.",
                                    "Demonstrated improved accuracy in identifying decimal positions with visual support.",
                                    "Made progress toward independent problem-solving with fewer rounding errors.",
                                    "Joined the session late but used remaining time effectively to reinforce key math skills.",
                                    "Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies."
                                  ].join('\n\n');
                                  navigator.clipboard.writeText(observationsText);
                                }}
                              >
                                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                                  <path d="M10 4H5C4.44772 4 4 4.44772 4 5V10C4 10.5523 4.44772 11 5 11H10C10.5523 11 11 10.5523 11 10V5C11 4.44772 10.5523 4 10 4Z"/>
                                  <path d="M2 8C1.45 8 1 7.55 1 7V2C1 1.45 1.45 1 2 1H7C7.55 1 8 1.45 8 2"/>
                                </svg>
                                <span className="text-sm">Copy</span>
                              </Button>
                            </div>

                            {/* Observations List */}
                            <div className="space-y-3 pl-1.5">
                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Reviewed and recalled formulas for 2D shapes: circle, rectangle, square.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Demonstrated improved accuracy in identifying decimal positions with visual support.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Made progress toward independent problem-solving with fewer rounding errors.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Joined the session late but used remaining time effectively to reinforce key math skills.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-[18px] h-[18px] text-stone-700" />
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'search' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Search functionality coming soon...</p>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-stone-900 font-lexend mb-4">Upcoming Sessions</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {/* Session Cards for Upcoming */}
                        <Card className="p-4">
                          <CardContent className="p-0">
                            <div className="text-center">
                              <div className="text-sm text-stone-400 font-lexend">August 4, 2025</div>
                              <div className="text-lg font-bold text-stone-900 font-lexend">3:00 - 3:45 AM</div>
                              <div className="text-sm text-stone-600 font-lexend mt-2">Math Tutoring</div>
                              <div className="mt-3">
                                <Button size="sm" variant="outline" className="font-lexend">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        {/* Add more session cards as needed */}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'session-notes' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-stone-900 font-lexend mb-6">Notes Due</h2>
                      <div className="max-w-4xl mx-auto space-y-4">
                        {/* Session Notes Due */}
                        <Card className="p-5 text-left">
                          <CardContent className="p-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-stone-900 font-lexend">Session Report - July 28, 2025</h3>
                                <p className="text-sm text-stone-600 font-lexend">Math Tutoring - 3:00-3:45 AM</p>
                                <p className="text-sm text-red-600 font-lexend mt-1">Due: July 30, 2025</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="font-lexend">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit notes
                                </Button>
                                <Button size="sm" className="font-lexend">
                                  <CircleCheck className="w-4 h-4 mr-1" />
                                  Mark Complete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="p-5 text-left">
                          <CardContent className="p-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-stone-900 font-lexend">Session Report - August 4, 2025</h3>
                                <p className="text-sm text-stone-600 font-lexend">Math Tutoring - 3:00-3:45 AM</p>
                                <p className="text-sm text-amber-600 font-lexend mt-1">Due: August 6, 2025</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="font-lexend">
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add notes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
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
