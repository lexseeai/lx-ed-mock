import React from "react";
import { X } from "lucide-react";

interface SessionData {
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  isCompleted: boolean;
  studentName: string;
}

interface NotesOverlayProps {
  showNotesOverlay: boolean;
  notesMode: "view" | "add" | "edit";
  selectedSession: SessionData | null;
  closeNotesOverlay: () => void;
}

export function NotesOverlay({
  showNotesOverlay,
  notesMode,
  selectedSession,
  closeNotesOverlay,
}: NotesOverlayProps) {
  if (!showNotesOverlay || !selectedSession) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: "rgba(0, 0, 0, 0.60)" }}
      onClick={closeNotesOverlay}
    >
      <div
        className="w-[90%] h-[90%] max-w-6xl bg-white rounded-lg shadow-xl transform transition-transform duration-300 ease-out translate-y-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold text-lg font-lexend">
                {selectedSession.studentName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-lexend">
                {selectedSession.studentName}
              </h2>
              <p className="text-stone-700 font-lexend">
                {selectedSession.month} {selectedSession.day},{" "}
                {selectedSession.year}, {selectedSession.time}
              </p>
            </div>
          </div>
          <div
            onClick={closeNotesOverlay}
            className="p-2 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer bg-white group"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 9999,
              minWidth: "40px",
              minHeight: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X
              className="w-6 h-6 text-stone-700 group-hover:text-indigo-600 transition-colors"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-stone-500 text-lg font-lexend mb-2">
              {notesMode === "add"
                ? "Add session notes"
                : notesMode === "edit"
                  ? "Edit session notes"
                  : "View session notes"}
            </p>
            <p className="text-stone-400 text-sm font-lexend">
              Notes editor would appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
