import React from "react";
import { Student } from "@/types/student";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, LoaderCircle, Timer, Loader, Clock } from "lucide-react";
import {
  getSessionReportStatus,
  getSubjectColors,
  getInitials,
} from "@/utils/studentUtils";
import {
  formatSessionTimeForNotes,
  formatSessionTimeToMonthDayTime,
  getSessionTimeRange,
} from "@/utils/dateUtils";

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  scheduleView?: boolean;
  dimmed?: boolean;
  sessionNotesView?: boolean;
  showNextSession?: boolean;
  openNotesOverlay?: (mode: "view" | "add" | "edit", session: any) => void;
}

export function StudentCard({
  student,
  onClick,
  scheduleView = false,
  dimmed = false,
  sessionNotesView = false,
  showNextSession = false,
  openNotesOverlay,
}: StudentCardProps) {
  const sessionStatus = getSessionReportStatus(student);

  // Get icon for session time based on status
  const getTimeIcon = () => {
    switch (sessionStatus) {
      case "active": // in progress
        return { icon: LoaderCircle, color: "text-indigo-600" };
      case "late": // due soon
        return { icon: Timer, color: "text-pink-600" };
      case "done": // submitted
        return { icon: CircleCheck, color: "text-green-600" };
      case "waiting":
      default:
        return { icon: Clock, color: "text-stone-700" };
    }
  };

  const timeIconConfig = getTimeIcon();
  const TimeIcon = timeIconConfig.icon;

  return (
    <Card
      className={`cursor-pointer hover:shadow-sm transition-all duration-200 bg-white border border-stone-200 rounded-xl w-45 ${showNextSession ? "h-45" : "h-60"} ${dimmed ? "opacity-40 hover:opacity-60" : ""}`}
      style={showNextSession ? { height: "180px" } : {}}
      onClick={onClick}
    >
      <CardContent className="p-1.5 flex flex-col justify-between h-full">
        {/* Top section with avatar, name, subject, and session time */}
        <div
          className={`flex flex-col items-start gap-1 pt-3 ${showNextSession ? "h-full" : ""}`}
          style={{
            padding: showNextSession
              ? "12px 12px 6px 14px"
              : "12px 12px 0 14px",
          }}
        >
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
            style={{ marginLeft: "-4px" }}
          >
            <Avatar className="w-full h-full">
              <AvatarFallback
                className={`${getSubjectColors(student.subject)} font-medium text-sm`}
              >
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <h3 className="text-stone-900 font-lexend font-semibold text-lg leading-[18px] tracking-[-0.09px] mt-1">
            {student.name}
          </h3>

          {/* Subject and Session Time */}
          <div
            className={`flex flex-col items-start ${showNextSession ? "justify-end h-full" : "gap-0.5 pt-3"}`}
          >
            {student.subject && (
              <div className="text-stone-900 font-lexend text-xs font-normal leading-[18px] tracking-[-0.06px]">
                {student.subject}
              </div>
            )}

            {(student.sessionTime ||
              (showNextSession && student.nextSessionTime)) && (
              <div className="flex items-center gap-1 py-0.5">
                <div className="flex items-center gap-1">
                  {showNextSession ? (
                    <Clock className="w-3 h-3 text-stone-700" />
                  ) : (
                    <TimeIcon className={`w-3 h-3 ${timeIconConfig.color}`} />
                  )}
                  <span className="text-stone-700 font-lexend text-xs font-normal leading-4">
                    {showNextSession
                      ? formatSessionTimeToMonthDayTime(
                          student.nextSessionTime || student.sessionTime || "",
                        )
                      : scheduleView
                        ? (() => {
                            const singleTime = student.sessionTime?.match(
                              /(\d{1,2}:\d{2}(?:am|pm))/i,
                            )?.[1];
                            return singleTime
                              ? getSessionTimeRange(singleTime)
                              : student.sessionTime || "";
                          })()
                        : sessionNotesView
                          ? formatSessionTimeForNotes(student.sessionTime || "")
                          : student.sessionTime}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with session report badge - removed for showNextSession */}
        {!showNextSession && openNotesOverlay && (
          <div className="flex justify-center px-1.5 pb-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const mode =
                  sessionStatus === "done"
                    ? "view"
                    : sessionStatus === "waiting"
                      ? "add"
                      : "edit";
                const sessionDate = student.sessionDate || new Date();
                openNotesOverlay(mode, {
                  date: sessionDate.getDate().toString(),
                  month: sessionDate.toLocaleDateString("en-US", {
                    month: "long",
                  }),
                  day: sessionDate.getDate().toString(),
                  year: sessionDate.getFullYear().toString(),
                  time: student.sessionTime || "",
                  isCompleted: sessionStatus === "done",
                  studentName: student.name,
                });
              }}
              className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded bg-white hover:bg-indigo-600 hover:border-indigo-600 transition-colors group"
            >
              <span className="text-stone-400 group-hover:text-white font-lexend text-xs font-normal leading-4 transition-colors">
                {sessionStatus === "done"
                  ? "View notes"
                  : sessionStatus === "waiting"
                    ? "Add notes"
                    : "Edit notes"}
              </span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
