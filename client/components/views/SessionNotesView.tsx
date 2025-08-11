import React, { useState, useRef } from "react";
import { Student } from "@/types/student";
import { StudentCard } from "@/components/StudentCard";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { UserRound, X, Clock, Timer, CircleCheck } from "lucide-react";
import {
  getInProgressNotes,
  getDueSoonNotes,
  getSubmittedNotes,
  getUniqueStudentNames,
} from "@/utils/studentUtils";

interface SessionNotesViewProps {
  students: Student[];
  onStudentClick: (studentId: string, studentList: Student[]) => void;
  openNotesOverlay: (mode: "view" | "add" | "edit", session: any) => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getTabPosition: () => { left: number; width: number } | null;
  button1RefCallback: (el: HTMLButtonElement | null) => void;
  button2RefCallback: (el: HTMLButtonElement | null) => void;
  button3RefCallback: (el: HTMLButtonElement | null) => void;
}

export function SessionNotesView({
  students,
  onStudentClick,
  openNotesOverlay,
  activeTab,
  onTabChange,
  getTabPosition,
  button1RefCallback,
  button2RefCallback,
  button3RefCallback,
}: SessionNotesViewProps) {
  const [selectedNotesStudentFilter, setSelectedNotesStudentFilter] = useState<
    string | null
  >(null);
  const [showNotesStudentDropdown, setShowNotesStudentDropdown] =
    useState(false);
  const [notesStudentSearchQuery, setNotesStudentSearchQuery] = useState("");
  const notesDropdownRef = useRef<HTMLDivElement>(null);

  // Filter student names based on search
  const getFilteredStudentNames = () => {
    const allNames = getUniqueStudentNames(students);
    if (!notesStudentSearchQuery) return allNames;
    return allNames.filter((name) =>
      name.toLowerCase().includes(notesStudentSearchQuery.toLowerCase()),
    );
  };

  const inProgressNotes = getInProgressNotes(students);
  const dueSoonNotes = getDueSoonNotes(students);
  const submittedNotes = getSubmittedNotes(students);

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-end gap-0.5">
            <h1 className="text-3xl font-bold text-stone-800 font-lexend tracking-tight">
              Session notes
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1 w-56" ref={notesDropdownRef}>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <UserRound className="w-6 h-6 text-stone-400" />
              </div>
              {selectedNotesStudentFilter && (
                <button
                  onClick={() => {
                    setSelectedNotesStudentFilter(null);
                    setNotesStudentSearchQuery("");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-stone-100 rounded"
                >
                  <X className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                </button>
              )}
              <Input
                type="text"
                placeholder={selectedNotesStudentFilter || "Filter by student"}
                value={
                  selectedNotesStudentFilter ? "" : notesStudentSearchQuery
                }
                onChange={(e) => {
                  if (!selectedNotesStudentFilter) {
                    setNotesStudentSearchQuery(e.target.value);
                  }
                }}
                onFocus={() => {
                  setShowNotesStudentDropdown(true);
                  if (selectedNotesStudentFilter) {
                    setNotesStudentSearchQuery("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !selectedNotesStudentFilter) {
                    const filteredNames = getFilteredStudentNames().filter(
                      (name) => {
                        // Filter to show only students that appear in session notes
                        const allNotesStudents = [
                          ...inProgressNotes,
                          ...dueSoonNotes,
                          ...submittedNotes,
                        ];
                        return allNotesStudents.some(
                          (student) => student.name === name,
                        );
                      },
                    );
                    if (filteredNames.length === 1) {
                      setSelectedNotesStudentFilter(filteredNames[0]);
                      setShowNotesStudentDropdown(false);
                      setNotesStudentSearchQuery("");
                    }
                  }
                }}
                className={`pl-14 ${selectedNotesStudentFilter ? "pr-10" : "pr-4.5"} h-11 font-readex text-base rounded-full overflow-hidden bg-transparent ${selectedNotesStudentFilter ? "text-stone-900 font-medium placeholder:text-stone-900 placeholder:font-medium" : "placeholder:text-stone-400"}`}
                readOnly={!!selectedNotesStudentFilter}
              />

              {/* Dropdown */}
              {showNotesStudentDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {getFilteredStudentNames()
                    .filter((name) => {
                      // Filter to show only students that appear in session notes
                      const allNotesStudents = [
                        ...inProgressNotes,
                        ...dueSoonNotes,
                        ...submittedNotes,
                      ];
                      return allNotesStudents.some(
                        (student) => student.name === name,
                      );
                    })
                    .filter((name) =>
                      name
                        .toLowerCase()
                        .includes(notesStudentSearchQuery.toLowerCase()),
                    )
                    .map((name) => (
                      <button
                        key={name}
                        onClick={() => {
                          setSelectedNotesStudentFilter(name);
                          setShowNotesStudentDropdown(false);
                          setNotesStudentSearchQuery("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        <span className="text-stone-900 font-lexend text-sm">
                          {name}
                        </span>
                      </button>
                    ))}
                  {getFilteredStudentNames()
                    .filter((name) => {
                      const allNotesStudents = [
                        ...inProgressNotes,
                        ...dueSoonNotes,
                        ...submittedNotes,
                      ];
                      return allNotesStudents.some(
                        (student) => student.name === name,
                      );
                    })
                    .filter((name) =>
                      name
                        .toLowerCase()
                        .includes(notesStudentSearchQuery.toLowerCase()),
                    ).length === 0 && (
                    <div className="px-4 py-2 text-stone-500 text-sm">
                      No students found
                    </div>
                  )}
                </div>
              )}
            </div>
            <Tooltip delayDuration={0} disableHoverableContent>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center w-11 h-11 border border-input bg-transparent rounded-full hover:bg-stone-50 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V9"
                      stroke="#5046e5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.7813 1.96892C14.0797 1.67055 14.4844 1.50293 14.9063 1.50293C15.3283 1.50293 15.733 1.67055 16.0313 1.96892C16.3297 2.26729 16.4973 2.67196 16.4973 3.09392C16.4973 3.51588 16.3297 3.92055 16.0313 4.21892L9.27157 10.9794C9.09348 11.1574 8.87347 11.2876 8.63182 11.3582L6.47707 11.9882C6.41253 12.007 6.34412 12.0081 6.279 11.9914C6.21388 11.9748 6.15444 11.9409 6.10691 11.8933C6.05937 11.8458 6.02549 11.7864 6.0088 11.7212C5.99212 11.6561 5.99325 11.5877 6.01207 11.5232L6.64207 9.36842C6.71297 9.12696 6.84347 8.90721 7.02157 8.72942L13.7813 1.96892Z"
                      stroke="#5046e5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent className="animate-none pointer-events-none">
                <p>New session notes</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="relative flex p-1.5 border border-stone-200 rounded-xl bg-white overflow-hidden h-auto self-center">
            {/* Sliding background indicator */}
            {getTabPosition() && (
              <div
                className="absolute bg-indigo-600 shadow-sm rounded-md"
                style={{
                  height: "32px",
                  top: "6px",
                  left: `${getTabPosition()!.left}px`,
                  width: `${getTabPosition()!.width}px`,
                  transition:
                    "left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)",
                }}
              />
            )}
            <button
              ref={button1RefCallback}
              onClick={() => onTabChange("in-progress")}
              className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                activeTab === "in-progress"
                  ? "text-white"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              Due soon
            </button>
            <button
              ref={button2RefCallback}
              onClick={() => onTabChange("due-soon")}
              className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                activeTab === "due-soon"
                  ? "text-white"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              Late draft
            </button>
            <button
              ref={button3RefCallback}
              onClick={() => onTabChange("submitted")}
              className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                activeTab === "submitted"
                  ? "text-white"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              Just sent
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="p-9 space-y-12 overflow-y-auto mobile-scroll"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db #f3f4f6",
          height: "100vh",
          maxHeight: "100svh",
          padding: "32px 64px 60px",
        }}
      >
        {/* In Progress Section */}
        <section id="in-progress">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-stone-400" />
            <h2 className="text-xl font-normal text-stone-400 font-lexend">
              Due soon
            </h2>
            <span className="text-sm text-stone-400 font-lexend">
              (
              {
                inProgressNotes.filter(
                  (student) =>
                    !selectedNotesStudentFilter ||
                    student.name === selectedNotesStudentFilter,
                ).length
              }
              )
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
            {inProgressNotes
              .filter(
                (student) =>
                  !selectedNotesStudentFilter ||
                  student.name === selectedNotesStudentFilter,
              )
              .map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => onStudentClick(student.id, inProgressNotes)}
                  sessionNotesView={true}
                  openNotesOverlay={openNotesOverlay}
                />
              ))}
          </div>
        </section>

        {/* Due Soon Section */}
        <section id="due-soon">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-6 h-6 text-stone-400" />
            <h2 className="text-xl font-normal text-stone-400 font-lexend">
              Late session notes
            </h2>
            <span className="text-sm text-stone-400 font-lexend">
              (
              {
                dueSoonNotes.filter(
                  (student) =>
                    !selectedNotesStudentFilter ||
                    student.name === selectedNotesStudentFilter,
                ).length
              }
              )
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
            {dueSoonNotes
              .filter(
                (student) =>
                  !selectedNotesStudentFilter ||
                  student.name === selectedNotesStudentFilter,
              )
              .map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => onStudentClick(student.id, dueSoonNotes)}
                  sessionNotesView={true}
                  openNotesOverlay={openNotesOverlay}
                />
              ))}
          </div>
        </section>

        {/* Submitted Section */}
        <section id="submitted">
          <div className="flex items-center gap-2 mb-4">
            <CircleCheck className="w-6 h-6 text-stone-400" />
            <h2 className="text-xl font-normal text-stone-400 font-lexend">
              Just sent
            </h2>
            <span className="text-sm text-stone-400 font-lexend">
              (
              {
                submittedNotes.filter(
                  (student) =>
                    !selectedNotesStudentFilter ||
                    student.name === selectedNotesStudentFilter,
                ).length
              }
              )
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
            {submittedNotes
              .filter(
                (student) =>
                  !selectedNotesStudentFilter ||
                  student.name === selectedNotesStudentFilter,
              )
              .map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => onStudentClick(student.id, submittedNotes)}
                  sessionNotesView={true}
                  openNotesOverlay={openNotesOverlay}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
