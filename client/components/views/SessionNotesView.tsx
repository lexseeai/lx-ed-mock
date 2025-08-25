import React, { useState, useRef } from "react";
import { Student } from "@/types/student";
import { Input } from "@/components/ui/input";
import { UserRound, Edit3, Clock, CircleCheck } from "lucide-react";
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
    status: "in-progress"
  },
  {
    id: "2", 
    studentName: "Emma Edwards",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "in-progress"
  },
  {
    id: "3",
    studentName: "Alex Anders",
    date: "Fri, 18 July 25", 
    time: "9:00–9:45am",
    status: "submitted"
  },
  {
    id: "4",
    studentName: "Marcus",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am", 
    status: "submitted"
  },
  {
    id: "5",
    studentName: "Marcus",
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted"
  },
  {
    id: "6",
    studentName: "Marcus", 
    date: "Fri, 18 July 25",
    time: "9:00–9:45am",
    status: "submitted"
  }
];

export function SessionNotesView({
  students,
  onStudentClick,
  openNotesOverlay,
}: SessionNotesViewProps) {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string | null>(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("3"); // Default selected note (Alex Anders - submitted)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFilteredStudentNames = () => {
    const allNames = getUniqueStudentNames(students);
    if (!studentSearchQuery) return allNames;
    return allNames.filter((name) =>
      name.toLowerCase().includes(studentSearchQuery.toLowerCase()),
    );
  };

  const todoNotes = mockSessionNotes.filter(note => note.status === "in-progress");
  const doneNotes = mockSessionNotes.filter(note => note.status === "submitted");
  const selectedNote = mockSessionNotes.find(note => note.id === selectedNoteId);

  return (
    <div className="flex flex-col h-full bg-stone-50 rounded-lg border border-stone-200 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-white border-b border-stone-200 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-end gap-0.5">
            <h1 className="text-2xl font-black text-stone-700 font-lexend tracking-tight">
              Session Notes
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

      {/* Main Content */}
      <div className="flex flex-1 p-6 gap-[18px] h-0 min-h-0">
        {/* Left Column - Session Lists */}
        <div className="flex flex-col gap-6">
          {/* To do List */}
          <div className="w-[350px] min-w-[300px] max-w-[350px] p-[18px] bg-white border border-stone-200 rounded-lg">
            <div className="flex items-end gap-2.5 mb-4">
              <h2 className="text-3xl font-black text-stone-700 font-lexend tracking-tight">
                To<span style={{letterSpacing: '-7.9px'}}> </span>do
              </h2>
            </div>
            <div className="space-y-3">
              {todoNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-md cursor-pointer hover:bg-stone-50"
                  onClick={() => setSelectedNoteId(note.id)}
                >
                  <div className="flex items-start">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_6475_2778)">
                          <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#BE185D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_6475_2778">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-sm font-bold text-stone-700 font-lexend">
                        {note.studentName}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pl-[26px] mt-1">
                    <span className="text-sm text-stone-700 font-lexend">
                      {note.date}
                    </span>
                    <span className="text-sm text-stone-400 font-lexend">
                      {note.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Done List */}
          <div className="w-[350px] min-w-[300px] max-w-[350px] p-[18px_18px_0_18px] bg-white border border-stone-200 rounded-lg flex-1">
            <div className="flex items-end gap-2.5 mb-4">
              <h2 className="text-3xl font-black text-stone-700 font-lexend tracking-tight">
                Done
              </h2>
            </div>
            <div className="flex h-8 items-end gap-2.5 mb-4">
              <span className="text-xs text-stone-400 font-lexend tracking-tight">
                July
              </span>
            </div>
            <div className="space-y-3">
              {doneNotes.map((note, index) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-md cursor-pointer hover:bg-stone-50 ${
                    selectedNoteId === note.id ? "bg-indigo-600" : ""
                  }`}
                  onClick={() => setSelectedNoteId(note.id)}
                >
                  <div className="flex items-start">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_6477_3339)">
                          <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke={selectedNoteId === note.id ? "white" : "#059669"} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke={selectedNoteId === note.id ? "white" : "#059669"} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_6477_3339">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className={`text-sm font-bold font-lexend ${
                        selectedNoteId === note.id ? "text-white" : "text-stone-700"
                      }`}>
                        {note.studentName}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pl-[26px] mt-1">
                    <span className={`text-sm font-lexend ${
                      selectedNoteId === note.id ? "text-white" : "text-stone-700"
                    }`}>
                      {note.date}
                    </span>
                    <span className={`text-sm font-lexend ${
                      selectedNoteId === note.id ? "text-white opacity-50" : "text-stone-400"
                    }`}>
                      {note.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Session Notes Detail */}
        <div className="flex-1 bg-white border border-stone-200 rounded-lg flex flex-col min-w-[500px] max-w-[650px]">
          {selectedNote && (
            <>
              {/* Header */}
              <div className="p-[18px] border-b-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 w-[391px]">
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.5 12L11.5 14L15.5 10" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="text-2xl font-bold text-stone-900 font-lexend tracking-tight leading-5 flex-1 overflow-hidden text-ellipsis">
                      {selectedNote.studentName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5 h-11">
                    <div className="flex h-11 p-[8px_4px] items-center gap-1 border border-stone-200 bg-white rounded-lg">
                      <div className="flex w-9 h-9 items-center justify-center gap-2.5 rounded-[11px] bg-indigo-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.83301 1.66602V3.33268" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.167 1.66602V3.33268" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.8333 6.66602C14.0543 6.66602 14.2663 6.75381 14.4226 6.91009C14.5789 7.06637 14.6667 7.27834 14.6667 7.49935V14.166C14.6667 15.0501 14.3155 15.8979 13.6904 16.523C13.0652 17.1482 12.2174 17.4993 11.3333 17.4993H6.33333C5.44928 17.4993 4.60143 17.1482 3.97631 16.523C3.35119 15.8979 3 15.0501 3 14.166V7.49935C3 7.27834 3.0878 7.06637 3.24408 6.91009C3.40036 6.75381 3.61232 6.66602 3.83333 6.66602H15.5C16.3841 6.66602 17.2319 7.0172 17.857 7.64233C18.4821 8.26745 18.8333 9.11529 18.8333 9.99935C18.8333 10.8834 18.4821 11.7313 17.857 12.3564C17.2319 12.9815 16.3841 13.3327 15.5 13.3327H14.6667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.5 1.66602V3.33268" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex w-9 h-9 items-center justify-center gap-2.5 rounded-[11px]">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.50033 15.8327C7.34127 15.8327 8.83366 14.3403 8.83366 12.4993C8.83366 10.6584 7.34127 9.16602 5.50033 9.16602C3.65938 9.16602 2.16699 10.6584 2.16699 12.4993C2.16699 14.3403 3.65938 15.8327 5.50033 15.8327Z" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.5003 15.8327C17.3413 15.8327 18.8337 14.3403 18.8337 12.4993C18.8337 10.6584 17.3413 9.16602 15.5003 9.16602C13.6594 9.16602 12.167 10.6584 12.167 12.4993C12.167 14.3403 13.6594 15.8327 15.5003 15.8327Z" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.1663 12.5007C12.1663 12.0586 11.9907 11.6347 11.6782 11.3221C11.3656 11.0096 10.9417 10.834 10.4997 10.834C10.0576 10.834 9.63372 11.0096 9.32116 11.3221C9.0086 11.6347 8.83301 12.0586 8.83301 12.5007" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.58301 10.8327L4.66634 5.83268C5.24967 4.74935 5.83301 4.16602 7.16634 4.16602" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.4163 10.8327L16.333 5.83268C15.7497 4.74935 15.083 4.16602 13.833 4.16602" stroke="#A8A29E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <button className="flex w-11 h-11 p-4 items-center justify-center gap-1 border border-stone-200 bg-white rounded-full">
                      <Edit3 className="w-5 h-5 flex-shrink-0 text-indigo-600" />
                    </button>
                  </div>
                </div>
                <div className="flex pl-[30px] items-start gap-1.5 mt-2">
                  <span className="text-base text-stone-900 font-lexend w-[580px]">
                    Fri, 18 July 2025, 9:00–9:45am
                  </span>
                </div>
              </div>

              {/* Session Recap Section */}
              <div className="flex p-[0_50px] flex-col items-start gap-1.5">
                <div className="flex h-[30px] items-center">
                  <h4 className="text-xl font-bold text-stone-900 font-lexend tracking-tight">
                    Session recap
                  </h4>
                </div>
                <p className="text-sm text-stone-900 font-lexend leading-[22.75px]">
                  Practiced challenging subtraction cases (across zeros), reviewed multiplication, 
                  and included sports-themed word problems. Confidence grew as Zack related math to his hobbies.
                </p>
              </div>

              {/* Observations Section */}
              <div className="flex p-[0_50px] flex-col items-start gap-1.5 mt-6">
                <div className="flex h-[30px] justify-between items-center w-full">
                  <h4 className="text-xl font-bold text-stone-900 font-lexend tracking-tight">
                    Observations
                  </h4>
                  <div className="flex w-[30px] h-[30px] items-center gap-1"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex pl-1.5 items-start gap-1.5">
                    <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 9H14.75" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 3.75L14.75 9L9.5 14.25" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="flex-1 text-sm text-stone-900 font-lexend leading-[22.75px]">
                      Completed <span className="font-bold">complex borrowing</span> (across two zeros) with one error, then self‑caught.
                    </p>
                  </div>
                  <div className="flex pl-1.5 items-start gap-1.5">
                    <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 9H14.75" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 3.75L14.75 9L9.5 14.25" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="flex-1 text-sm text-stone-900 font-lexend leading-[22.75px]">
                      Engaged deeply with <span className="font-bold">sports‑related</span> word problems
                    </p>
                  </div>
                  <div className="flex pl-1.5 items-start gap-1.5">
                    <div className="flex pt-0.5 flex-col justify-center items-start gap-2.5">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 9H14.75" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 3.75L14.75 9L9.5 14.25" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="flex-1 text-sm text-stone-900 font-lexend leading-[22.75px]">
                      Reported feeling <span className="font-bold">less nervous</span> about math at school.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
