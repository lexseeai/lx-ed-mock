import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, CalendarFold, Bell, ChevronLeft, ChevronRight, ChevronDown, Haze, SunMedium, MoonStar, X, Maximize2, MoreVertical, Loader, Timer, NotebookPen, CircleCheck, Edit, Pencil, ChevronsLeft, ChevronsRight, ChevronUp, UserRoundSearch, LoaderCircle, UserRound, Search, UserRoundPlus, Plus, Siren } from 'lucide-react';
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
  const [isHoveringObservations, setIsHoveringObservations] = useState(false);
  const [isHoveringNextSession, setIsHoveringNextSession] = useState(false);

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
    // All sidebar navigation should go back to main app with the appropriate view
    navigate('/', { state: { activeView: view } });
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
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 group hover:bg-transparent"
                      onClick={handleBackClick}
                    >
                      <ArrowLeft className="w-5 h-5 text-stone-300 group-hover:text-indigo-600 transition-colors" />
                    </Button>
                    <div className="flex items-center space-x-2">
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
                  <div className="flex justify-center">
                    <div className="flex gap-6">
                      {/* Left Column - Session Cards and For Next Session */}
                    <div className="flex flex-col gap-6">
                      {/* Sessions Group */}
                      <div className="flex flex-row gap-3" style={{flexDirection: 'row'}}>
                        {/* July 28 Card */}
                        <Card className="w-[150px] h-[150px] p-3 pb-2 flex flex-col justify-between">
                          <CardContent className="p-0 flex flex-col gap-0.5">
                            <div className="text-stone-400 font-lexend text-base font-medium leading-4">July</div>
                            <div className="text-stone-700 font-lexend text-2xl font-black leading-6">28</div>
                            <div className="text-stone-700 font-lexend text-base font-medium leading-4">Mon</div>

                            {/* Session Time */}
                            <div className="flex items-center gap-1 py-0.5 mt-1.5">
                              <CircleCheck className="w-3 h-3 text-green-500" />
                              <span className="text-stone-700 font-lexend text-xs">3:00–3:45AM</span>
                            </div>
                          </CardContent>

                          {/* View Notes Button */}
                          <div className="flex justify-center">
                            <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend">
                              View notes
                            </div>
                          </div>
                        </Card>

                        {/* August 4 Card */}
                        <Card className="w-[150px] h-[150px] p-3 pb-2 flex flex-col justify-between">
                          <CardContent className="p-0 flex flex-col gap-0.5">
                            <div className="text-stone-400 font-lexend text-base font-medium leading-4">August</div>
                            <div className="text-stone-700 font-lexend text-2xl font-black leading-6">4</div>
                            <div className="text-stone-700 font-lexend text-base font-medium leading-4">Mon</div>

                            {/* Session Time */}
                            <div className="flex items-center gap-1 py-0.5 mt-1.5">
                              <Clock className="w-3 h-3 text-stone-700" />
                              <span className="text-stone-700 font-lexend text-xs">3:00–3:45AM</span>
                            </div>
                          </CardContent>

                          {/* Add Notes Button */}
                          <div className="flex justify-center">
                            <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend">
                              Add notes
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* For Next Session */}
                      <Card
                        className="p-5"
                        style={{width: '312px'}}
                        onMouseEnter={() => setIsHoveringNextSession(true)}
                        onMouseLeave={() => setIsHoveringNextSession(false)}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col gap-3">
                            {/* Header with icon and copy button */}
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-1">
                                {/* Icon and Title */}
                                <div className="flex items-end gap-1.5 justify-start">
                                  <Siren className="w-6 h-6 text-stone-700 mt-0.5" />
                                  <h2 className="text-stone-900 font-lexend text-xl font-bold" style={{lineHeight: '20px'}}>For next session</h2>
                                </div>
                                {/* From section - flush left */}
                                <div className="flex items-center gap-1 pl-1">
                                  <span className="text-stone-400 font-lexend text-sm">From notes</span>
                                  <span className="relative inline-block group">
                                    <span className="bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer rounded-full text-stone-400 group-hover:text-white font-lexend text-xs" style={{padding: '2px 8px', lineHeight: '12px'}}>
                                      14 June 25
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {/* Copy Button - Fixed width container to prevent layout shift */}
                              <div className="w-16 flex justify-end">
                                {isHoveringNextSession && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 px-3 py-1.5 h-auto border-stone-200"
                                    onClick={() => {
                                      const nextSessionText = [
                                        "Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.",
                                        "Apply 2D shape formulas in word problems to build real-world problem-solving skills.",
                                        "Introduce multi-step problems involving both perimeter/area and decimal rounding."
                                      ].join('\n\n');
                                      navigator.clipboard.writeText(nextSessionText);
                                    }}
                                  >
                                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                                      <path d="M10 4H5C4.44772 4 4 4.44772 4 5V10C4 10.5523 4.44772 11 5 11H10C10.5523 11 11 10.5523 11 10V5C11 4.44772 10.5523 4 10 4Z"/>
                                      <path d="M2 8C1.45 8 1 7.55 1 7V2C1 1.45 1.45 1 2 1H7C7.55 1 8 1.45 8 2"/>
                                    </svg>
                                    <span className="text-sm">Copy</span>
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Task List */}
                            <div className="space-y-3 pl-1.5">
                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                                </div>
                                <span className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Introduce multi-step problems involving both perimeter/area and decimal rounding.
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6" style={{display: 'flex', flexDirection: 'column'}}>

                      {/* Observations */}
                      <Card
                        className="p-5 min-w-[500px] max-w-[650px] flex-1"
                        onMouseEnter={() => setIsHoveringObservations(true)}
                        onMouseLeave={() => setIsHoveringObservations(false)}
                      >
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
                              {isHoveringObservations && (
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
                              )}
                            </div>

                            {/* Observations List */}
                            <div className="space-y-3 pl-1.5">
                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>21 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Reviewed and recalled formulas for 2D shapes: circle, rectangle, square.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>21 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Demonstrated improved accuracy in identifying decimal positions with visual support.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>19 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Made progress toward independent problem-solving with fewer rounding errors.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>18 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Joined the session late but used remaining time effectively to reinforce key math skills.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>16 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>

                              <div className="flex gap-1.5">
                                <div className="pt-0.5">
                                  <ArrowRight className="w-4 h-4 text-stone-700" />
                                </div>
                                <p className="text-stone-900 font-lexend text-base leading-5 flex-1">
                                  Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.{' '}
                                  <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                                    <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                      <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>14 July 25</span>
                                    </span>
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                      <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                        <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
                                      </span>
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  </div>
                )}

                {activeTab === 'search' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Search functionality coming soon...</p>
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
