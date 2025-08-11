import React, { useState } from "react";
import { Student } from "@/types/student";
import { StudentCard } from "@/components/StudentCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Search,
  X,
  UserRoundPlus,
  LayoutGrid,
  Table as TableIcon,
  ChevronUp as SortAsc,
  ChevronDown as SortDesc,
} from "lucide-react";
import {
  getUniqueStudentsWithNextSession,
  getSubjectColors,
  getInitials,
} from "@/utils/studentUtils";
import { formatSessionTimeToMonthDayTime } from "@/utils/dateUtils";

interface AllStudentsViewProps {
  students: Student[];
  onStudentClick: (studentId: string, studentList: Student[]) => void;
  openNotesOverlay: (mode: "view" | "add" | "edit", session: any) => void;
}

export function AllStudentsView({
  students,
  onStudentClick,
  openNotesOverlay,
}: AllStudentsViewProps) {
  const [allStudentsSearchQuery, setAllStudentsSearchQuery] = useState("");
  const [studentsViewMode, setStudentsViewMode] = useState<"cards" | "list">(
    "cards",
  );
  const [sortField, setSortField] = useState<
    "name" | "subject" | "nextSession" | "email"
  >("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter students based on search query
  const getFilteredUniqueStudents = () => {
    let filteredStudents = getUniqueStudentsWithNextSession(students);

    // Apply search filter
    if (allStudentsSearchQuery.trim()) {
      const query = allStudentsSearchQuery.toLowerCase();
      filteredStudents = filteredStudents.filter((student) => {
        const name = student.name?.toLowerCase() || "";
        const subject = student.subject?.toLowerCase() || "";
        const sessionTime =
          student.nextSessionTime?.toLowerCase() ||
          student.sessionTime?.toLowerCase() ||
          "";
        const email = student.email?.toLowerCase() || "";

        return (
          name.includes(query) ||
          subject.includes(query) ||
          sessionTime.includes(query) ||
          email.includes(query)
        );
      });
    }

    // Apply sorting
    return filteredStudents.sort((a, b) => {
      let aValue = "";
      let bValue = "";

      switch (sortField) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "subject":
          aValue = a.subject || "";
          bValue = b.subject || "";
          break;
        case "nextSession":
          aValue = a.nextSessionTime || a.sessionTime || "";
          bValue = b.nextSessionTime || b.sessionTime || "";
          break;
        case "email":
          aValue = a.email || "";
          bValue = b.email || "";
          break;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Handle column sorting
  const handleSort = (field: "name" | "subject" | "nextSession" | "email") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get header styling for active sort column
  const getHeaderStyle = (
    field: "name" | "subject" | "nextSession" | "email",
  ) => {
    return sortField === field ? "font-bold" : "font-medium";
  };

  // Get sort icon for column headers
  const getSortIcon = (field: "name" | "subject" | "nextSession" | "email") => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <SortAsc className="w-4 h-4 text-stone-600 ml-1" />
    ) : (
      <SortDesc className="w-4 h-4 text-stone-600 ml-1" />
    );
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="text-stone-900 font-lexend text-3xl font-bold leading-9 tracking-[-0.75px]">
            Students
          </div>
          <div className="flex items-center gap-2.5">
            {/* Cards/List Toggle */}
            <div
              className="relative flex border border-stone-200 rounded-xl bg-white overflow-hidden h-11 self-center"
              style={{ padding: "3px" }}
            >
              {/* Sliding background indicator */}
              <div
                className="absolute bg-indigo-600 shadow-sm"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  top: "3px",
                  left: studentsViewMode === "cards" ? "3px" : "39px",
                  transition: "left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)",
                }}
              />
              <button
                onClick={() => setStudentsViewMode("cards")}
                className={`relative flex items-center justify-center p-1.5 text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden ${
                  studentsViewMode === "cards"
                    ? "text-white z-10"
                    : "text-stone-400 hover:text-stone-600 z-10"
                }`}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "11px",
                }}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStudentsViewMode("list")}
                className={`relative flex items-center justify-center p-1.5 text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden ${
                  studentsViewMode === "list"
                    ? "text-white z-10"
                    : "text-stone-400 hover:text-stone-600 z-10"
                }`}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "11px",
                }}
              >
                <TableIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Add Student Button */}
            <Tooltip delayDuration={0} disableHoverableContent>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center w-11 h-11 border border-stone-200 bg-transparent rounded-full hover:bg-stone-50 transition-colors">
                  <UserRoundPlus className="w-5 h-5 text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="animate-none pointer-events-none">
                <p>Add student</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {/* Centered Search Field */}
        <div className="flex justify-center">
          <div className="relative w-96 mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <Search className="w-6 h-6 text-stone-400" />
            </div>
            {allStudentsSearchQuery && (
              <button
                onClick={() => setAllStudentsSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-stone-100 rounded"
              >
                <X className="w-4 h-4 text-stone-400 hover:text-stone-600" />
              </button>
            )}
            <Input
              type="text"
              placeholder="Find by name, topic or session"
              value={allStudentsSearchQuery}
              onChange={(e) => setAllStudentsSearchQuery(e.target.value)}
              className={`pl-14 ${allStudentsSearchQuery ? "pr-10" : "pr-4"} h-11 font-readex text-sm rounded-full overflow-hidden bg-transparent border border-stone-200 w-full mx-auto`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`${
          studentsViewMode === "list" ? "p-9 pb-0" : "p-9"
        } space-y-6 overflow-y-auto mobile-scroll`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db #f3f4f6",
          height: "100vh",
          maxHeight: "100svh",
          padding: "32px 32px 60px",
        }}
      >
        <section
          className={studentsViewMode === "list" ? "h-full flex flex-col" : ""}
        >
          {studentsViewMode === "cards" ? (
            <div className="flex justify-center">
              <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-center max-w-full">
                {getFilteredUniqueStudents().map((student) => (
                  <StudentCard
                    key={student.name}
                    student={student}
                    onClick={() =>
                      onStudentClick(student.id, getFilteredUniqueStudents())
                    }
                    showNextSession={true}
                    openNotesOverlay={openNotesOverlay}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="rounded-lg border border-stone-200 bg-white flex flex-col overflow-hidden"
              style={{ height: "calc(100vh - 236px)" }}
            >
              {/* Fixed Header */}
              <div className="border-b border-stone-200 sticky top-0 z-10">
                <div className="w-full">
                  <div className="flex items-center h-12 text-sm font-medium text-stone-700">
                    <div className="w-12 px-4"></div>
                    <div
                      className={`w-48 px-4 pl-8 cursor-pointer select-none ${getHeaderStyle("name")} hover:text-stone-900 flex items-center`}
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {getSortIcon("name")}
                    </div>
                    <div
                      className={`w-40 px-4 cursor-pointer select-none ${getHeaderStyle("subject")} hover:text-stone-900 flex items-center`}
                      onClick={() => handleSort("subject")}
                    >
                      Focus
                      {getSortIcon("subject")}
                    </div>
                    <div
                      className={`w-40 px-4 cursor-pointer select-none ${getHeaderStyle("nextSession")} hover:text-stone-900 flex items-center`}
                      onClick={() => handleSort("nextSession")}
                    >
                      Next session
                      {getSortIcon("nextSession")}
                    </div>
                    <div
                      className={`flex-1 px-4 cursor-pointer select-none ${getHeaderStyle("email")} hover:text-stone-900 flex items-center`}
                      onClick={() => handleSort("email")}
                    >
                      Email
                      {getSortIcon("email")}
                    </div>
                  </div>
                </div>
              </div>
              {/* Scrollable Body */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ paddingBottom: "36px" }}
              >
                <div className="w-full">
                  {getFilteredUniqueStudents().map((student) => {
                    return (
                      <div
                        key={student.name}
                        className="flex items-center cursor-pointer hover:bg-stone-50 border-b border-stone-100 min-h-[68px]"
                        onClick={() =>
                          onStudentClick(
                            student.id,
                            getFilteredUniqueStudents(),
                          )
                        }
                      >
                        <div className="w-12 px-4 py-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback
                              className={`${getSubjectColors(student.subject)} font-medium text-sm`}
                            >
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-48 px-4 py-4 pl-8">
                          <div className="font-medium text-stone-900 font-lexend">
                            {student.name}
                          </div>
                        </div>
                        <div className="w-40 px-4 py-4">
                          <div className="text-stone-600 font-lexend text-sm">
                            {student.subject}
                          </div>
                        </div>
                        <div className="w-40 px-4 py-4">
                          <div className="text-stone-600 font-lexend text-sm">
                            {formatSessionTimeToMonthDayTime(
                              student.nextSessionTime ||
                                student.sessionTime ||
                                "",
                            )}
                          </div>
                        </div>
                        <div className="flex-1 px-4 py-4">
                          <div className="text-stone-600 font-lexend text-sm">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {getFilteredUniqueStudents().length === 0 && (
                  <div className="text-center py-12 text-stone-500">
                    <Search className="w-8 h-8 mx-auto mb-3 text-stone-300" />
                    <p className="font-lexend">No students found</p>
                    <p className="text-sm font-lexend mt-1">
                      Try adjusting your search terms
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
