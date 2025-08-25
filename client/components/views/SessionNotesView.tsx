import React, { useState, useRef } from "react";
import { Student } from "@/types/student";
import { Input } from "@/components/ui/input";
import {
  UserRound,
  Edit3,
  Clock,
  CircleCheck,
  Circle,
  Calendar,
  Coffee,
  Glasses,
  Pencil,
  ArrowRight,
} from "lucide-react";
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

interface SessionNote {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: "in-progress" | "submitted";
}

// Mock session notes data based on the Figma design
const mockSessionNotes: SessionNote[] = [
  {
    id: "1",
    studentName: "Alex Anders",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "in-progress",
  },
  {
    id: "2",
    studentName: "Emma Edwards",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "in-progress",
  },
  {
    id: "3",
    studentName: "Alex Anders",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted",
  },
  {
    id: "4",
    studentName: "Marcus",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted",
  },
  {
    id: "5",
    studentName: "Marcus",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted",
  },
  {
    id: "6",
    studentName: "Marcus",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted",
  },
];

export function SessionNotesView({
  students,
  onStudentClick,
  openNotesOverlay,
}: SessionNotesViewProps) {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<
    string | null
  >(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("3"); // Default selected note (Alex Anders - submitted)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CircleCheck className="w-4 h-4 text-emerald-600" />;
      case "not-started":
        return <Clock className="w-4 h-4 text-stone-400" />;
      case "in-progress":
      default:
        return <Circle className="w-4 h-4 text-pink-700" />;
    }
  };

  const getFilteredStudentNames = () => {
    const allNames = getUniqueStudentNames(students);
    if (!studentSearchQuery) return allNames;
    return allNames.filter((name) =>
      name.toLowerCase().includes(studentSearchQuery.toLowerCase()),
    );
  };

  const todoNotes = mockSessionNotes.filter(
    (note) => note.status === "in-progress",
  );
  const doneNotes = mockSessionNotes.filter(
    (note) => note.status === "submitted",
  );
  const selectedNote = mockSessionNotes.find(
    (note) => note.id === selectedNoteId,
  );

  return (
    <div className="flex flex-col h-full bg-stone-50 rounded-lg border border-stone-200 shadow-lg">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-stone-200 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-0.5 h-11">
            <h1 className="text-2xl font-bold text-stone-700 font-lexend tracking-normal leading-6 pl-2">
              Session notes
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1 w-56" ref={dropdownRef}>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <UserRound className="w-6 h-6 text-stone-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Filter by student"
                  value={selectedStudentFilter ? "" : studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  onFocus={() => setShowStudentDropdown(true)}
                  className="h-11 rounded-full border border-stone-200 bg-white pl-14 pr-4 text-sm font-lexend"
                />
              </div>
              {showStudentDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  <div className="p-2">
                    {getFilteredStudentNames().map((name, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedStudentFilter(name);
                          setShowStudentDropdown(false);
                          setStudentSearchQuery("");
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-stone-50 rounded font-lexend"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center justify-center w-11 h-11 border border-stone-200 bg-white rounded-full hover:bg-stone-50 transition-colors">
              <Edit3 className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - matching StudentDetail notes pattern */}
      <div className="flex h-full" style={{ padding: "24px" }}>
        {/* Left Sidebar - Session List */}
        <div className="w-[275px] flex flex-col rounded-lg overflow-hidden bg-white border border-stone-200 pb-1.5">
          {/* Header */}
          <div
            className="px-5 pt-5 pb-3"
            style={{
              color: "rgba(87, 83, 77, 1)",
              letterSpacing: "-0.35px",
              font: "900 24px/28px Lexend, sans-serif",
            }}
          >
            Open <span style={{ fontWeight: "400" }}>{todoNotes.length}</span>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto">
            {/* Session notes */}
            {todoNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                className={`flex flex-col gap-0.5 px-6 py-3 transition-colors cursor-pointer ${
                  selectedNoteId === note.id ? "" : "hover:bg-stone-50"
                }`}
                style={{
                  backgroundColor:
                    selectedNoteId === note.id
                      ? "rgba(238, 242, 255, 1)"
                      : undefined,
                }}
              >
                <div className="flex items-center gap-1 py-0.5">
                  {getStatusIcon(note.status)}
                  <span className="text-stone-900 font-lexend text-sm font-medium leading-4 transition-colors">
                    {note.studentName}
                  </span>
                </div>
                <div className="text-stone-700 font-lexend text-xs leading-4 transition-colors pl-5 flex justify-between">
                  <span>{note.date}</span>
                  <span className="text-stone-500">{note.time}</span>
                </div>
              </div>
            ))}

            {/* Done section */}
            <div
              className="px-5 pt-5 pb-3"
              style={{
                color: "rgba(87, 83, 77, 1)",
                letterSpacing: "-0.35px",
                font: "900 24px/28px Lexend, sans-serif",
              }}
            >
              Done <span style={{ fontWeight: "400" }}>{doneNotes.length}</span>
            </div>
            {doneNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                className={`flex flex-col gap-0.5 px-6 py-3 transition-colors cursor-pointer ${
                  selectedNoteId === note.id ? "" : "hover:bg-stone-50"
                }`}
                style={{
                  backgroundColor:
                    selectedNoteId === note.id
                      ? "rgba(238, 242, 255, 1)"
                      : undefined,
                }}
              >
                <div className="flex items-center gap-1 py-0.5">
                  {getStatusIcon(note.status)}
                  <span className="text-stone-900 font-lexend text-sm font-medium leading-4 transition-colors">
                    {note.studentName}
                  </span>
                </div>
                <div className="text-stone-700 font-lexend text-xs leading-4 transition-colors pl-5 flex justify-between">
                  <span>{note.date}</span>
                  <span className="text-stone-500">{note.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="flex-1 pl-4 flex flex-col justify-center items-center"
          style={{ paddingLeft: "24px" }}
        >
          {selectedNote && (
            <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden h-full max-w-[650px] flex flex-col">
              {/* Fixed Header */}
              <div className="flex items-start justify-between p-5 flex-shrink-0">
                <div className="flex items-start gap-1.5 justify-start">
                  <CircleCheck className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 font-lexend tracking-[-0.35px]">
                      {selectedNote.studentName}
                    </h2>
                    <p className="text-stone-600 font-lexend">
                      {selectedNote.date}, {selectedNote.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex self-center bg-white border border-stone-200 rounded-xl h-11 overflow-hidden relative p-[3px]">
                    <div
                      className="absolute bg-indigo-600 rounded-[9px] shadow-sm h-9 w-9 top-[3px] left-[3px]"
                      style={{
                        transition:
                          "left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)",
                      }}
                    />
                    <button className="flex items-center justify-center rounded-[11px] h-9 w-9 relative z-10 transition-colors duration-300 p-1.5 font-lexend text-sm font-medium text-white">
                      <Coffee className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button className="flex items-center justify-center rounded-[11px] h-9 w-9 relative z-10 transition-colors duration-300 p-1.5 font-lexend text-sm font-medium text-stone-500">
                      <Glasses className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <button className="flex items-center justify-center w-11 h-11 bg-white rounded-full hover:bg-stone-50 transition-colors overflow-hidden border border-stone-200">
                    <Pencil
                      className="w-5 h-5 text-indigo-600"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Session Recap Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-stone-900 font-lexend leading-7 mb-3">
                    Recap
                  </h3>
                  <p className="text-stone-700 font-lexend leading-relaxed">
                    Practiced challenging subtraction cases (across zeros),
                    reviewed multiplication, and included sports-themed word
                    problems. Confidence grew as Zack related math to his
                    hobbies.
                  </p>
                </div>

                {/* Observations Section */}
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 font-lexend leading-7 mb-4">
                    Observations
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-stone-500 mt-0.5 flex-shrink-0" />
                      <p className="text-stone-700 font-lexend leading-relaxed">
                        Completed{" "}
                        <span className="font-semibold">complex borrowing</span>{" "}
                        (across two zeros) with one error, then self‑caught.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-stone-500 mt-0.5 flex-shrink-0" />
                      <p className="text-stone-700 font-lexend leading-relaxed">
                        Engaged deeply with{" "}
                        <span className="font-semibold">sports‑related</span>{" "}
                        word problems.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-stone-500 mt-0.5 flex-shrink-0" />
                      <p className="text-stone-700 font-lexend leading-relaxed">
                        Reported feeling{" "}
                        <span className="font-semibold">less nervous</span>{" "}
                        about math at school.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
