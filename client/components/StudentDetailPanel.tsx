import React, { useState, useRef } from "react";
import { Student } from "@/types/student";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChevronsRight,
  Maximize2,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  UserRoundPlus,
  NotebookPen,
  FileAudio,
  Clock,
  LoaderCircle,
  CircleCheck,
  Timer,
  Search,
  ArrowRight,
} from "lucide-react";
import { getSubjectColors } from "@/utils/studentUtils";

interface StudentDetailPanelProps {
  showStudentOverlay: boolean;
  selectedStudent: Student | null;
  currentStudentList: Student[];
  onClose: () => void;
  onExpandStudent: () => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  openNotesOverlay: (mode: "view" | "add" | "edit", session: any) => void;
}

export function StudentDetailPanel({
  showStudentOverlay,
  selectedStudent,
  currentStudentList,
  onClose,
  onExpandStudent,
  onNavigatePrevious,
  onNavigateNext,
  canNavigatePrevious,
  canNavigateNext,
  openNotesOverlay,
}: StudentDetailPanelProps) {
  const [studentDetailTab, setStudentDetailTab] = useState("snapshot");
  const [isStudentSearchMode, setIsStudentSearchMode] = useState(false);
  const [studentPanelSearchQuery, setStudentPanelSearchQuery] = useState("");
  const [showSidePanelDropdown, setShowSidePanelDropdown] = useState(false);
  const [studentTabMeasurements, setStudentTabMeasurements] = useState<{
    search?: number;
    snapshot?: number;
    goals?: number;
    sessionNotes?: number;
    assignments?: number;
  }>({});

  const studentPanelSearchInputRef = useRef<HTMLInputElement>(null);
  const sidePanelDropdownRef = useRef<HTMLDivElement>(null);

  // Student panel search mode handlers
  const enterStudentSearchMode = () => {
    setIsStudentSearchMode(true);
    setTimeout(() => {
      studentPanelSearchInputRef.current?.focus();
    }, 10);
  };

  const exitStudentSearchMode = () => {
    setIsStudentSearchMode(false);
    setStudentPanelSearchQuery("");
  };

  // Ref callbacks for student tab measurements
  const searchTabRefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setStudentTabMeasurements((prev) => ({
          ...prev,
          search: el.offsetWidth,
        }));
      });
    }
  };

  const snapshotTabRefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setStudentTabMeasurements((prev) => ({
          ...prev,
          snapshot: el.offsetWidth,
        }));
      });
    }
  };

  const goalsTabRefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setStudentTabMeasurements((prev) => ({
          ...prev,
          goals: el.offsetWidth,
        }));
      });
    }
  };

  const sessionNotesTabRefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setStudentTabMeasurements((prev) => ({
          ...prev,
          sessionNotes: el.offsetWidth,
        }));
      });
    }
  };

  const assignmentsTabRefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setStudentTabMeasurements((prev) => ({
          ...prev,
          assignments: el.offsetWidth,
        }));
      });
    }
  };

  // Calculate student tab position and width
  const getStudentTabPosition = () => {
    const { search, snapshot, goals, sessionNotes, assignments } =
      studentTabMeasurements;

    if (!search || !snapshot || !goals || !sessionNotes || !assignments) {
      return null;
    }

    switch (studentDetailTab) {
      case "search":
        return { left: 6, width: search };
      case "snapshot":
        return { left: 6 + search, width: snapshot };
      case "goals":
        return { left: 6 + search + snapshot, width: goals };
      case "session-notes":
        return { left: 6 + search + snapshot + goals, width: sessionNotes };
      case "assignments":
        return {
          left: 6 + search + snapshot + goals + sessionNotes,
          width: assignments,
        };
      default:
        return { left: 6 + search, width: snapshot };
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    // Only allow explicit closing through close button or sidebar navigation
    if (!open) {
      onClose();
    }
  };

  if (!selectedStudent) return null;

  // Student session data mapping
  const studentSessionData = {
    Alex: {
      next: {
        time: "9:00am",
        date: "Mon 4 August",
        status: "wait",
      },
      previous: {
        time: "9:00am",
        date: "today, 28 July",
        status: "done",
      },
    },
    Carlos: {
      next: {
        time: "8:00pm",
        date: "Tue 29 July",
        status: "wait",
      },
      previous: {
        time: "8:00pm",
        date: "Mon 21 July",
        status: "done",
      },
    },
    Daniel: {
      next: {
        time: "2:00pm",
        date: "Thu 31 July",
        status: "wait",
      },
      previous: {
        time: "2:00pm",
        date: "Thu 24 July",
        status: "done",
      },
    },
    Emma: {
      next: {
        time: "3:00pm",
        date: "Mon 4 August",
        status: "wait",
      },
      previous: {
        time: "3:00pm",
        date: "today, 28 July",
        status: "in-progress",
      },
    },
    Isabella: {
      next: {
        time: "1:30pm",
        date: "Thu 31 July",
        status: "wait",
      },
      previous: {
        time: "1:30pm",
        date: "Mon 21 July",
        status: "late",
      },
    },
    Kai: {
      next: {
        time: "6:00pm",
        date: "Fri 8 August",
        status: "wait",
      },
      previous: null,
    },
    Liam: {
      next: {
        time: "9:00am",
        date: "Thu 31 July",
        status: "wait",
      },
      previous: {
        time: "9:00am",
        date: "Thu 24 July",
        status: "late",
      },
    },
    Luna: {
      next: {
        time: "2:00pm",
        date: "Thu 7 August",
        status: "wait",
      },
      previous: null,
    },
    Marcus: {
      current: {
        time: "7:00pm",
        date: "today, 28 July",
        status: "wait",
      },
      previous: {
        time: "7:00pm",
        date: "Mon 21 July",
        status: "late",
      },
    },
  };

  const sessions = studentSessionData[selectedStudent.name as keyof typeof studentSessionData] || {};

  // Get icon and color based on status
  const getSessionIcon = (status: string) => {
    switch (status) {
      case "wait":
        return { icon: Clock, color: "text-stone-400" };
      case "in-progress":
        return {
          icon: LoaderCircle,
          color: "text-indigo-600",
        };
      case "done":
        return {
          icon: CircleCheck,
          color: "text-green-500",
        };
      case "late":
        return { icon: Timer, color: "text-pink-600" };
      default:
        return { icon: Clock, color: "text-stone-400" };
    }
  };

  // Get button text based on status
  const getButtonText = (status: string) => {
    if (status === "done") return "View notes";
    if (status === "wait") return "Add notes";
    return "Edit notes";
  };

  const sessions_to_show = [];

  // Show next session first (if exists)
  if (sessions.next) {
    sessions_to_show.push({
      ...sessions.next,
      key: "next",
    });
  }

  // Show current session (if exists)
  if (sessions.current) {
    sessions_to_show.push({
      ...sessions.current,
      key: "current",
    });
  }

  // Always show previous session (if exists)
  if (sessions.previous) {
    sessions_to_show.push({
      ...sessions.previous,
      key: "previous",
    });
  }

  return (
    <Sheet
      open={showStudentOverlay}
      onOpenChange={handleSheetOpenChange}
      modal={true}
    >
      <SheetContent
        side="right"
        className="w-[700px] sm:w-[700px] sm:max-w-[700px] p-0 overflow-hidden bg-white"
        style={{
          boxShadow: "-1px 0 2px 0 rgba(0, 0, 0, 1)",
          border: "1px none rgba(68, 64, 60, 1)",
        }}
      >
        <SheetTitle className="sr-only">
          {selectedStudent.name} - Student Details
        </SheetTitle>
        <div className="h-full flex flex-col">
          {/* Fixed Header */}
          <div className="sticky top-0 z-10 bg-white">
            {/* Top Control Row */}
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-stone-100 rounded transition-colors"
                >
                  <ChevronsRight className="w-6 h-6 text-stone-400" />
                </button>
                <button
                  onClick={onExpandStudent}
                  className="p-1 hover:bg-stone-100 rounded transition-colors"
                >
                  <Maximize2
                    className="w-4 h-4 text-stone-400"
                    strokeWidth={2.25}
                  />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onNavigatePrevious}
                  disabled={!canNavigatePrevious}
                  className={`p-1 hover:bg-stone-100 rounded transition-colors ${
                    !canNavigatePrevious
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ChevronUp
                    className={`w-6 h-6 ${
                      canNavigatePrevious
                        ? "text-stone-400"
                        : "text-stone-300"
                    }`}
                  />
                </button>
                <button
                  onClick={onNavigateNext}
                  disabled={!canNavigateNext}
                  className={`p-1 hover:bg-stone-100 rounded transition-colors ${
                    !canNavigateNext
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ChevronDown
                    className={`w-6 h-6 ${
                      canNavigateNext
                        ? "text-stone-400"
                        : "text-stone-300"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Student Info Header */}
            <div
              className="flex flex-col gap-1.5 py-[30px] pb-3"
              style={{ padding: "30px 60px 12px 54px" }}
            >
              <div className="flex items-center justify-between pb-5">
                <div className="flex items-center gap-2">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                    <Avatar className="w-full h-full">
                      <AvatarFallback
                        className={`${getSubjectColors(selectedStudent.subject)} font-medium text-2xl`}
                      >
                        {selectedStudent.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col py-0.5 justify-center gap-0.5">
                    <h1 className="text-[30px] font-semibold text-stone-900 font-lexend leading-9 -tracking-[0.15px]">
                      {selectedStudent.name}
                    </h1>
                    <p className="text-base font-medium text-stone-700 font-lexend leading-5 -tracking-[0.08px]">
                      {selectedStudent.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 px-4 border-stone-200 bg-white hover:bg-stone-50 font-lexend text-sm font-normal text-stone-700 rounded-xl overflow-hidden"
                  >
                    Actions
                    <svg
                      className="w-6 h-6 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 15L12 20L17 15" />
                      <path d="M7 9L12 4L17 9" />
                    </svg>
                  </Button>
                  <div className="relative" ref={sidePanelDropdownRef}>
                    <button
                      onClick={() =>
                        setShowSidePanelDropdown(!showSidePanelDropdown)
                      }
                      className="flex items-center justify-center w-11 h-11 bg-white rounded-xl hover:bg-stone-50 transition-colors overflow-hidden border border-stone-200"
                      style={{
                        boxShadow: "0 0 8px 0 rgba(80, 70, 229, 0.15)",
                      }}
                    >
                      {showSidePanelDropdown ? (
                        <X
                          className="w-5 h-5 text-indigo-600"
                          strokeWidth={4}
                        />
                      ) : (
                        <Plus
                          className="w-5 h-5 text-indigo-600"
                          strokeWidth={4}
                        />
                      )}
                    </button>
                    {showSidePanelDropdown && (
                      <div
                        className="absolute right-0 top-12 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden"
                        style={{
                          width: "210px",
                          boxShadow: "0 0 8px 0 rgba(80, 70, 229, 0.15)",
                        }}
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowSidePanelDropdown(false);
                            }}
                            className="w-full flex items-center text-sm text-stone-700 hover:bg-indigo-600 hover:text-white group rounded-md overflow-hidden"
                            style={{
                              padding: "10px 8px",
                              transition: "all 0.05s ease",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <UserRoundPlus className="w-5 h-5 mr-2 text-stone-500 group-hover:text-white" />
                            <span className="font-lexend text-sm">
                              New student
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSidePanelDropdown(false);
                            }}
                            className="w-full flex items-center text-sm text-stone-700 hover:bg-indigo-600 hover:text-white group rounded-md overflow-hidden"
                            style={{
                              padding: "10px 8px",
                              transition: "all 0.05s ease",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <NotebookPen className="w-5 h-5 mr-2 text-stone-500 group-hover:text-white" />
                            <span className="font-lexend text-sm">
                              New session notes
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSidePanelDropdown(false);
                            }}
                            className="w-full flex items-center text-sm text-stone-700 hover:bg-indigo-600 hover:text-white group rounded-md overflow-hidden"
                            style={{
                              padding: "10px 8px",
                              transition: "all 0.05s ease",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <FileAudio className="w-5 h-5 mr-2 text-stone-500 group-hover:text-white" />
                            <span className="font-lexend text-sm">
                              Create assignment
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Session Times */}
              <div className="flex flex-col">
                {sessions_to_show.map((session, index) => {
                  const iconConfig = getSessionIcon(session.status);
                  const IconComponent = iconConfig.icon;
                  const buttonText = getButtonText(session.status);

                  return (
                    <button
                      key={session.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        const mode =
                          session.status === "done"
                            ? "view"
                            : session.status === "wait"
                              ? "add"
                              : "edit";
                        
                        // Parse session date from the session data
                        const dateStr = session.date
                          .replace("today, ", "")
                          .replace(" August", " August")
                          .replace(" July", " July");
                        const sessionDate = new Date(
                          dateStr + ", 2025",
                        );
                        openNotesOverlay(mode, {
                          date: sessionDate.getDate().toString(),
                          month: sessionDate.toLocaleDateString(
                            "en-US",
                            { month: "long" },
                          ),
                          day: sessionDate.getDate().toString(),
                          year: "2025",
                          time: session.time,
                          isCompleted: session.status === "done",
                          studentName: selectedStudent.name,
                        });
                      }}
                      className="group flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer text-left w-auto"
                      style={{ margin: "0 36px 0 28px" }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 flex justify-end pr-1.5">
                          <IconComponent
                            className={`w-[18px] h-[18px] ${iconConfig.color}`}
                          />
                        </div>
                        <span
                          className="text-base font-lexend leading-4.5 -tracking-[0.08px]"
                          style={{
                            fontWeight:
                              session.key === "previous"
                                ? "400"
                                : "600",
                            color:
                              session.key === "previous"
                                ? "rgba(87, 83, 78, 1)"
                                : "rgba(68, 64, 60, 1)",
                          }}
                        >
                          {session.time}, {session.date}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded bg-white hover:bg-indigo-600 hover:border-indigo-600 transition-colors group/button">
                          <span className="text-stone-400 group-hover/button:text-white font-lexend text-xs font-normal leading-4 transition-colors">
                            {buttonText}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tab Navigation */}
              <div
                className="flex justify-center pt-6"
                style={{ marginLeft: "6px" }}
              >
                {isStudentSearchMode ? (
                  // Search Mode
                  <div className="relative flex p-1.5 border border-input rounded-xl bg-white overflow-hidden h-auto self-center w-full max-w-md focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                    {/* Search Icon - Fixed Position */}
                    <div className="flex items-center justify-center px-3 py-1.5">
                      <Search className="w-5 h-5 text-stone-400" />
                    </div>
                    <input
                      ref={studentPanelSearchInputRef}
                      type="text"
                      value={studentPanelSearchQuery}
                      onChange={(e) =>
                        setStudentPanelSearchQuery(e.target.value)
                      }
                      placeholder="Search..."
                      className="flex-1 pr-3 py-1.5 text-sm font-medium font-lexend bg-transparent border-0 outline-none text-stone-800 placeholder-stone-400"
                    />
                    <button
                      onClick={exitStudentSearchMode}
                      className="flex items-center justify-center px-3 py-1.5 rounded-md text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  // Tab Mode
                  <div className="relative flex p-1.5 border border-stone-200 rounded-xl bg-white overflow-hidden h-auto">
                    {/* Sliding background indicator */}
                    {getStudentTabPosition() && (
                      <div
                        className="absolute bg-indigo-600 shadow-sm rounded-md"
                        style={{
                          height: "32px",
                          top: "6px",
                          left: `${getStudentTabPosition()!.left}px`,
                          width: `${getStudentTabPosition()!.width}px`,
                          transition:
                            "left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)",
                        }}
                      />
                    )}
                    <button
                      ref={searchTabRefCallback}
                      onClick={enterStudentSearchMode}
                      className="relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 text-stone-400 hover:text-stone-600"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    <button
                      ref={snapshotTabRefCallback}
                      onClick={() => setStudentDetailTab("snapshot")}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        studentDetailTab === "snapshot"
                          ? "text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Snapshot
                    </button>
                    <button
                      ref={goalsTabRefCallback}
                      onClick={() => setStudentDetailTab("goals")}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        studentDetailTab === "goals"
                          ? "text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Goals
                    </button>
                    <button
                      ref={sessionNotesTabRefCallback}
                      onClick={() => setStudentDetailTab("session-notes")}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        studentDetailTab === "session-notes"
                          ? "text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Session notes
                    </button>
                    <button
                      ref={assignmentsTabRefCallback}
                      onClick={() => setStudentDetailTab("assignments")}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        studentDetailTab === "assignments"
                          ? "text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      Assignments
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-[60px] pt-5 pb-12">
            {studentDetailTab === "snapshot" && !isStudentSearchMode && (
              <div className="space-y-12">
                {/* Next Session */}
                <div>
                  <div className="pb-3">
                    <h2 className="text-xl font-bold text-stone-900 font-lexend leading-6 -tracking-wide">
                      Next session
                    </h2>
                    <p className="text-sm font-normal text-stone-400 font-lexend mt-1">
                      From session notes 21 July 2025
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Reinforce rounding to 1 decimal place with timed
                        fluency drills for automaticity.
                      </p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Apply 2D shape formulas in word problems to build
                        real-world problem-solving skills.
                      </p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Introduce multi-step problems involving both
                        perimeter/area and decimal rounding.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observations */}
                <div id="observations-section">
                  <div className="pb-3">
                    <h2 className="text-xl font-bold text-stone-900 font-lexend leading-6 -tracking-wide">
                      Observations
                    </h2>
                    <p className="text-sm font-normal text-stone-400 font-lexend mt-1">
                      From the last 7 sessions
                    </p>
                  </div>
                  <div className="space-y-3">
                    {/* Observation items */}
                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Practiced rounding to 1 decimal place using a
                        place value chart to boost fluency and accuracy.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              21 July 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Reviewed and recalled formulas for 2D shapes:
                        circle, rectangle, square.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              21 July 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Demonstrated improved accuracy in identifying
                        decimal positions with visual support.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              14 July 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Made progress toward independent problem-solving
                        with fewer rounding errors.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              7 July 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Joined the session late but used remaining time
                        effectively to reinforce key math skills.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              30 June 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="pt-0.5">
                        <ArrowRight className="w-4 h-4 text-stone-700" />
                      </div>
                      <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                        Worked on comparing fractions using visual models
                        and practiced breaking down multi-step word
                        problems. Demonstrated initial understanding with
                        support and is building confidence in applying
                        strategies.{" "}
                        <span
                          className="relative inline-block group"
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            height: "auto",
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                            style={{
                              lineHeight: "20px",
                              height: "14px",
                              flexGrow: 0,
                              verticalAlign: "4px",
                            }}
                          >
                            <span
                              className="text-stone-400 group-hover:text-white font-lexend font-normal"
                              style={{ fontSize: "8px" }}
                            >
                              23 June 25
                            </span>
                          </span>
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                              <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">
                                View notes
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {studentDetailTab === "snapshot" && isStudentSearchMode && (
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <p className="text-stone-500 font-lexend text-lg mb-2">
                    Search results will appear here
                  </p>
                  <p className="text-stone-400 font-lexend text-sm">
                    Start typing to search through notes and observations
                  </p>
                </div>
              </div>
            )}

            {studentDetailTab === "goals" && (
              <div className="text-center py-12">
                <p className="text-stone-500 font-lexend">
                  Goals content coming soon...
                </p>
              </div>
            )}

            {studentDetailTab === "session-notes" && (
              <div className="text-center py-12">
                <p className="text-stone-500 font-lexend">
                  Session notes content coming soon...
                </p>
              </div>
            )}

            {studentDetailTab === "assignments" && (
              <div className="text-center py-12">
                <p className="text-stone-500 font-lexend">
                  Assignments content coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
