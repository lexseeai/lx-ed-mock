import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

// Data and types
import { Student } from "@/types/student";
import { mockStudents } from "@/data/mockStudents";

// Components
import { Sidebar } from "@/components/Sidebar";
import { StudentDetailPanel } from "@/components/StudentDetailPanel";
import { NotesOverlay } from "@/components/NotesOverlay";
import { HomeView } from "@/components/views/HomeView";
import { AllStudentsView } from "@/components/views/AllStudentsView";
import { ScheduleView } from "@/components/views/ScheduleView";
import { SessionNotesView } from "@/components/views/SessionNotesView";

// Utils
import { getTimeBasedGreeting } from "@/utils/dateUtils";

interface SessionData {
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  isCompleted: boolean;
  studentName: string;
}

export default function Index() {
  const [activeView, setActiveView] = useState("home");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 28)); // July 28, 2025
  const [selectedDayDate, setSelectedDayDate] = useState("28"); // Track selected day
  const [currentWeekStart, setCurrentWeekStart] = useState(27); // July 28th is at index 27 (Monday)
  const [hideEmptyDays, setHideEmptyDays] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "hiding" | "showing" | null
  >(null);

  // Student panel state
  const [showStudentOverlay, setShowStudentOverlay] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [currentStudentList, setCurrentStudentList] = useState<Student[]>([]);

  // Notes overlay state
  const [showNotesOverlay, setShowNotesOverlay] = useState(false);
  const [notesMode, setNotesMode] = useState<"view" | "add" | "edit">("view");
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null,
  );

  // Session notes tab state
  const [activeTab, setActiveTab] = useState("in-progress");
  const [buttonMeasurements, setButtonMeasurements] = useState<{
    button1?: number;
    button2?: number;
    button3?: number;
  }>({});

  const navigate = useNavigate();

  // Check for return view from sessionStorage
  useEffect(() => {
    const returnToView = sessionStorage.getItem("returnToView");
    if (returnToView) {
      setActiveView(returnToView);
      sessionStorage.removeItem("returnToView");
    }
  }, []);

  // Ref callbacks for tab measurements
  const button1RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements((prev) => ({ ...prev, button1: el.offsetWidth }));
      }, 10);
    }
  };

  const button2RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements((prev) => ({ ...prev, button2: el.offsetWidth }));
      }, 10);
    }
  };

  const button3RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      setTimeout(() => {
        setButtonMeasurements((prev) => ({ ...prev, button3: el.offsetWidth }));
      }, 10);
    }
  };

  // Calculate tab position and width
  const getTabPosition = () => {
    const { button1, button2, button3 } = buttonMeasurements;

    if (!button1 || !button2 || !button3) {
      return null;
    }

    switch (activeTab) {
      case "in-progress":
        return { left: 6, width: button1 };
      case "due-soon":
        return { left: 6 + button1, width: button2 };
      case "submitted":
        return { left: 6 + button1 + button2, width: button3 };
      default:
        return { left: 6, width: button1 };
    }
  };

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const scrollContainer = element.closest(".overflow-y-auto");
      if (scrollContainer) {
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const scrollTop = scrollContainer.scrollTop;
        const targetScroll = scrollTop + (elementTop - containerTop) - 24;

        scrollContainer.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Student handlers
  const handleStudentClick = (
    studentId: string,
    studentList: Student[] = [],
  ) => {
    if (activeView === "all") {
      const student = mockStudents.find((s) => s.id === studentId);
      if (student) {
        const studentIdMap: Record<string, string> = {
          Alex: "23",
          Emma: "2",
          Marcus: "3",
          Isabella: "4",
          Carlos: "16",
          Daniel: "6",
          Liam: "7",
          Kai: "8",
          Oliver: "9",
          Maya: "17",
          Zoe: "19",
          Luna: "28",
          Sofia: "10",
        };
        const detailPageId = studentIdMap[student.name] || studentId;
        navigate(`/student/${detailPageId}`);
      }
      return;
    }

    if (
      activeView === "home" ||
      activeView === "schedule" ||
      activeView === "sessionnotes"
    ) {
      setSelectedStudentId(studentId);
      setCurrentStudentList(studentList);
      setShowStudentOverlay(true);
    } else {
      navigate(`/student/${studentId}`);
    }
  };

  const handleExpandStudent = () => {
    if (selectedStudentId) {
      setShowStudentOverlay(false);
      const student = mockStudents.find((s) => s.id === selectedStudentId);
      if (student) {
        const studentIdMap: Record<string, string> = {
          Alex: "23",
          Emma: "2",
          Marcus: "3",
          Isabella: "4",
          Carlos: "16",
          Daniel: "6",
          Liam: "7",
          Kai: "8",
          Oliver: "9",
          Maya: "17",
          Zoe: "19",
          Luna: "28",
          Sofia: "10",
        };
        const detailPageId = studentIdMap[student.name] || selectedStudentId;
        navigate(`/student/${detailPageId}`);
      }
    }
  };

  const getCurrentStudentIndex = () => {
    return currentStudentList.findIndex(
      (student) => student.id === selectedStudentId,
    );
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
    return mockStudents.find((student) => student.id === selectedStudentId);
  };

  const closeStudentPanel = () => {
    setShowStudentOverlay(false);
    setSelectedStudentId(null);
    setCurrentStudentList([]);
  };

  // Notes overlay handlers
  const openNotesOverlay = (
    mode: "view" | "add" | "edit",
    session: SessionData,
  ) => {
    setNotesMode(mode);
    setSelectedSession(session);
    setShowNotesOverlay(true);
  };

  const closeNotesOverlay = () => {
    setShowNotesOverlay(false);
    setSelectedSession(null);
  };

  // Today handler
  const handleThisWeekClick = () => {
    setSelectedDayDate("28");
    setCurrentWeekStart(27);
  };

  const greeting = getTimeBasedGreeting();

  return (
    <TooltipProvider>
      <div
        className="h-screen-mobile bg-indigo-900 flex"
        style={{
          height: "100vh",
          maxHeight: "100vh",
          minHeight: "100vh",
        }}
      >
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onThisWeekClick={handleThisWeekClick}
          setShowStudentOverlay={setShowStudentOverlay}
          greeting={greeting}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          <div
            className="flex-1 p-3 min-w-0 h-full mobile-scroll"
            style={{ scrollBehavior: "smooth", overflow: "hidden" }}
          >
            <div
              className={`${activeView === "home" ? "bg-white" : "bg-stone-50"} rounded-lg h-full flex flex-col min-w-0`}
              style={{
                boxShadow: "0 0 4px 1px rgba(30, 27, 75, 0.01)",
                border: "1px none rgb(231, 229, 228)",
              }}
            >
              {/* Render different views */}
              {activeView === "home" && (
                <HomeView
                  students={mockStudents}
                  onStudentClick={handleStudentClick}
                  onViewChange={setActiveView}
                  openNotesOverlay={openNotesOverlay}
                />
              )}

              {activeView === "all" && (
                <AllStudentsView
                  students={mockStudents}
                  onStudentClick={handleStudentClick}
                  openNotesOverlay={openNotesOverlay}
                />
              )}

              {activeView === "schedule" && (
                <ScheduleView
                  students={mockStudents}
                  onStudentClick={handleStudentClick}
                  openNotesOverlay={openNotesOverlay}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedDayDate={selectedDayDate}
                  setSelectedDayDate={setSelectedDayDate}
                  currentWeekStart={currentWeekStart}
                  setCurrentWeekStart={setCurrentWeekStart}
                  hideEmptyDays={hideEmptyDays}
                  setHideEmptyDays={setHideEmptyDays}
                  isToggling={isToggling}
                  setIsToggling={setIsToggling}
                  animationDirection={animationDirection}
                  setAnimationDirection={setAnimationDirection}
                />
              )}

              {activeView === "sessionnotes" && (
                <SessionNotesView
                  students={mockStudents}
                  onStudentClick={handleStudentClick}
                  openNotesOverlay={openNotesOverlay}
                  activeTab={activeTab}
                  onTabChange={scrollToSection}
                  getTabPosition={getTabPosition}
                  button1RefCallback={button1RefCallback}
                  button2RefCallback={button2RefCallback}
                  button3RefCallback={button3RefCallback}
                />
              )}
            </div>
          </div>
        </div>

        {/* Student Details Panel */}
        <StudentDetailPanel
          showStudentOverlay={showStudentOverlay}
          selectedStudent={getSelectedStudent()}
          currentStudentList={currentStudentList}
          onClose={closeStudentPanel}
          onExpandStudent={handleExpandStudent}
          onNavigatePrevious={navigatePrevious}
          onNavigateNext={navigateNext}
          canNavigatePrevious={canNavigatePrevious()}
          canNavigateNext={canNavigateNext()}
          openNotesOverlay={openNotesOverlay}
        />

        {/* Notes Overlay */}
        <NotesOverlay
          showNotesOverlay={showNotesOverlay}
          notesMode={notesMode}
          selectedSession={selectedSession}
          closeNotesOverlay={closeNotesOverlay}
        />
      </div>
    </TooltipProvider>
  );
}
