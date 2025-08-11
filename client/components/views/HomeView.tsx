import React, { useRef, useState } from "react";
import { Student } from "@/types/student";
import { StudentCard } from "@/components/StudentCard";
import { Input } from "@/components/ui/input";
import {
  Search,
  CalendarFold,
  Timer,
  ArrowRight,
  Plus,
  X,
  UserRoundPlus,
  NotebookPen,
  FileAudio,
} from "lucide-react";
import { getTimeBasedGreeting, getSessionsHeading } from "@/utils/dateUtils";
import { getSessionReportStatus } from "@/utils/studentUtils";

interface HomeViewProps {
  students: Student[];
  onStudentClick: (studentId: string, studentList: Student[]) => void;
  onViewChange: (view: string) => void;
  openNotesOverlay: (mode: "view" | "add" | "edit", session: any) => void;
}

export function HomeView({
  students,
  onStudentClick,
  onViewChange,
  openNotesOverlay,
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const homeDropdownRef = useRef<HTMLDivElement>(null);

  const greeting = getTimeBasedGreeting();
  const GreetingIcon =
    greeting.icon === "Haze"
      ? Search
      : greeting.icon === "SunMedium"
        ? Search
        : Search; // Import the actual icons if needed

  // Session data for each date - simplified mapping for today (July 28)
  const dateSessionData: {
    [key: string]: {
      morning: Student[];
      afternoon: Student[];
      evening: Student[];
    };
  } = {
    "28": {
      morning: students.filter((s) => s.id === "13"), // Alex - Done
      afternoon: students.filter((s) => s.id === "14"), // Emma - In progress
      evening: students.filter((s) => s.id === "15"), // Marcus - Waiting
    },
  };

  const getScheduleData = () => {
    const data = dateSessionData["28"] || {
      morning: [],
      afternoon: [],
      evening: [],
    };
    // Filter out any undefined students to prevent errors
    return {
      morning: data.morning.filter((student) => student && student.id),
      afternoon: data.afternoon.filter((student) => student && student.id),
      evening: data.evening.filter((student) => student && student.id),
    };
  };

  return (
    <>
      {/* Header */}
      <div
        className="bg-white rounded-t-lg"
        style={{
          border: "1px none rgb(231, 229, 228)",
          padding: "60px 60px 24px",
        }}
      >
        <div className="flex flex-col items-start justify-start min-h-[125px]">
          <div
            className="flex items-center justify-between w-full mb-6"
            style={{ marginBottom: "24px", paddingRight: "4px" }}
          >
            <div className="flex items-center">
              <GreetingIcon className="w-12 h-12 text-indigo-600" />
              <h1 className="text-4xl font-bold text-stone-800 font-lexend ml-3">
                {greeting.text}, Jessica
              </h1>
            </div>
            <div className="relative" ref={homeDropdownRef}>
              <button
                onClick={() => setShowHomeDropdown(!showHomeDropdown)}
                className="flex items-center justify-center w-11 h-11 bg-white rounded-xl hover:bg-stone-50 transition-colors overflow-hidden border border-stone-200"
                style={{
                  boxShadow: "0 0 8px 0 rgba(80, 70, 229, 0.15)",
                }}
              >
                {showHomeDropdown ? (
                  <X className="w-5 h-5 text-indigo-600" strokeWidth={4} />
                ) : (
                  <Plus className="w-5 h-5 text-indigo-600" strokeWidth={4} />
                )}
              </button>
              {showHomeDropdown && (
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
                        setShowHomeDropdown(false);
                        onViewChange("all");
                      }}
                      className="w-full flex items-center text-sm text-stone-700 hover:bg-indigo-600 hover:text-white group rounded-md overflow-hidden"
                      style={{
                        padding: "10px 8px",
                        transition: "all 0.05s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <UserRoundPlus className="w-5 h-5 mr-2 text-stone-500 group-hover:text-white" />
                      <span className="font-lexend text-sm">New student</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowHomeDropdown(false);
                        onViewChange("sessionnotes");
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
                        setShowHomeDropdown(false);
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
          <div className="w-full relative" style={{ paddingLeft: "4px" }}>
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
              <Search className="w-5 h-5 text-stone-400" />
            </div>
            <Input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-lg font-readex rounded-full border border-stone-200 bg-stone-50 pl-14 pr-6 placeholder:text-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="p-8 space-y-16 overflow-y-auto mobile-scroll"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db #f3f4f6",
          height: "100vh",
          maxHeight: "100svh",
          padding: "72px 64px 60px",
        }}
      >
        {/* Today's Sessions Section */}
        <div>
          <div
            onClick={() => onViewChange("schedule")}
            className="flex items-center mb-4 cursor-pointer group"
          >
            <div className="flex items-center space-x-2">
              <CalendarFold className="w-6 h-6 text-stone-400" />
              <h2 className="text-xl font-normal text-stone-400 font-lexend">
                {getSessionsHeading()}
              </h2>
              <div className="flex items-center text-stone-200 group-hover:text-indigo-600 transition-colors ml-1">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(() => {
              const todaysStudents = getScheduleData()
                .morning.concat(
                  getScheduleData().afternoon,
                  getScheduleData().evening,
                )
                .filter(
                  (student) =>
                    student.sessionDate && student.sessionDate.getDate() === 28,
                );
              return todaysStudents.map((student) => (
                <div key={student.id} className="flex-shrink-0">
                  <StudentCard
                    student={student}
                    onClick={() => {
                      onStudentClick(student.id, todaysStudents);
                    }}
                    scheduleView={true}
                    openNotesOverlay={openNotesOverlay}
                  />
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Late Drafts Section */}
        <div>
          <div
            onClick={() => onViewChange("sessionnotes")}
            className="flex items-center mb-4 cursor-pointer group"
          >
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-stone-400" />
              <h2 className="text-xl font-normal text-stone-400 font-lexend">
                Late session notes
              </h2>
              <div className="flex items-center text-stone-200 group-hover:text-indigo-600 transition-colors ml-1">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(() => {
              const lateDraftStudents = students.filter(
                (student) => getSessionReportStatus(student) === "late",
              );
              return lateDraftStudents.map((student) => (
                <div key={student.id} className="flex-shrink-0">
                  <StudentCard
                    student={student}
                    onClick={() => {
                      onStudentClick(student.id, lateDraftStudents);
                    }}
                    sessionNotesView={true}
                    openNotesOverlay={openNotesOverlay}
                  />
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
