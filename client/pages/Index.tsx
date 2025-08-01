import React, { useState, useEffect, useRef } from "react";
import { UsersRound, NotebookText, LibraryBig, FileAudio, Rabbit, ChevronsUpDown, PanelLeft, Clock, Calendar, CalendarFold, Bell, ChevronLeft, ChevronRight, ChevronDown, Haze, SunMedium, MoonStar, X, Maximize2, MoreVertical, Loader, Timer, NotebookPen, CircleCheck, Edit, Pencil, ChevronsLeft, ChevronsRight, ChevronUp, ArrowRight, UserRoundSearch, LoaderCircle, UserRound, Search, UserRoundPlus, Plus, ChevronUp as SortAsc, ChevronDown as SortDesc, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetPortal } from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Link, useNavigate } from "react-router-dom";

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

const mockStudents: Student[] = [
  // July 14th - 2 sessions: all done
  { id: "1", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 14), sessionReportCompleted: true, email: "alex.johnson@email.com" }, // Done
  { id: "2", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 6, 14), sessionReportCompleted: true, email: "emma.wilson@email.com" }, // Done

  // July 15th - 1 session: done
  { id: "3", name: "Marcus", subject: "English Tutoring", sessionTime: "10:00am, July 15", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 6, 15), sessionReportCompleted: true, email: "marcus.brown@email.com" }, // Done

  // July 17th - 2 sessions: all done
  { id: "4", name: "Sofia", subject: "History Tutoring", sessionTime: "9:00am, July 17", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 6, 17), sessionReportCompleted: true, email: "sofia.garcia@email.com" }, // Done
  { id: "5", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, July 17", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 6, 17), sessionReportCompleted: true, email: "liam.davis@email.com" }, // Done

  // July 18th - 1 session: done
  { id: "6", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, July 18", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 6, 18), sessionReportCompleted: true, email: "isabella.martinez@email.com" }, // Done

  // July 21st - 3 sessions: 2 done, 1 late
  { id: "7", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: true }, // Done
  { id: "8", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: true }, // Done
  { id: "9", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, July 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 6, 21), sessionReportCompleted: false }, // Late

  // July 23rd - 1 session: late
  { id: "10", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, July 23", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 6, 23), sessionReportCompleted: false }, // Late

  // July 24th - 2 sessions: both late
  { id: "11", name: "Liam", subject: "Math Tutoring", sessionTime: "9:00am, July 24", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 6, 24), sessionReportCompleted: false }, // Late
  { id: "12", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, July 24", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 6, 24), sessionReportCompleted: false }, // Late

  // July 28th - 3 sessions: Alex = done, Emma = in-progress, Marcus = Waiting
  { id: "13", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 6, 28, 9, 0, 0), sessionReportCompleted: true }, // Done (9am, completed)
  { id: "14", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 6, 28, 15, 0, 0), sessionReportCompleted: false }, // In progress (3pm, within window, not completed)
  { id: "15", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, July 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 6, 28, 19, 0, 0), sessionReportCompleted: false }, // Waiting (7pm, future)

  // July 29th - all waiting
  { id: "16", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, July 29", sessionDate: new Date(2025, 6, 29), sessionReportCompleted: false, email: "carlos.rodriguez@email.com" }, // Waiting

  // July 31st - all waiting
  { id: "17", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false, email: "maya.patel@email.com" }, // Waiting
  { id: "18", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false, email: "daniel.kim@email.com" }, // Waiting
  { id: "19", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, July 31", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false, email: "zoe.taylor@email.com" }, // Waiting
  { id: "20", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, July 31", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 6, 31), sessionReportCompleted: false, email: "liam.davis@email.com" }, // Waiting
  { id: "21", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, August 1", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 1), sessionReportCompleted: false, email: "isabella.martinez@email.com" }, // Waiting

  // August sessions - all waiting
  { id: "22", name: "Oliver", subject: "Geography Tutoring", sessionTime: "8:00am, August 4", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false }, // Waiting
  { id: "23", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, August 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false }, // Waiting
  { id: "24", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, August 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false }, // Waiting
  { id: "25", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, August 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 7, 4), sessionReportCompleted: false }, // Waiting
  { id: "26", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, August 5", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos", sessionDate: new Date(2025, 7, 5), sessionReportCompleted: false }, // Waiting
  { id: "27", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, August 6", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 7, 6), sessionReportCompleted: false }, // Waiting
  { id: "28", name: "Luna", subject: "Literature Tutoring", sessionTime: "2:00pm, August 7", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "29", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, August 7", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "30", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, August 7", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "31", name: "Kai", subject: "Computer Science", sessionTime: "6:00pm, August 8", sessionDate: new Date(2025, 7, 8), sessionReportCompleted: false }, // Waiting
  { id: "32", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, August 8", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 8), sessionReportCompleted: false }, // Waiting
  { id: "33", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, August 11", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 7, 11), sessionReportCompleted: false }, // Waiting
  { id: "34", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, August 11", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 7, 11), sessionReportCompleted: false }, // Waiting
  { id: "35", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, August 11", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 7, 11), sessionReportCompleted: false }, // Waiting
  { id: "36", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, August 12", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos", sessionDate: new Date(2025, 7, 12), sessionReportCompleted: false }, // Waiting
  { id: "37", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, August 13", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 7, 13), sessionReportCompleted: false }, // Waiting
  { id: "38", name: "Sofia", subject: "History Tutoring", sessionTime: "9:00am, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "39", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "40", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "41", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, August 15", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 15), sessionReportCompleted: false }, // Waiting
  { id: "42", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, August 18", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 7, 18), sessionReportCompleted: false }, // Waiting
  { id: "43", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, August 18", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 7, 18), sessionReportCompleted: false }, // Waiting
  { id: "44", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, August 18", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 7, 18), sessionReportCompleted: false }, // Waiting
  { id: "45", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, August 19", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos", sessionDate: new Date(2025, 7, 19), sessionReportCompleted: false }, // Waiting
  { id: "46", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, August 20", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 7, 20), sessionReportCompleted: false }, // Waiting
  { id: "47", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, August 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 7, 21), sessionReportCompleted: false }, // Waiting
  { id: "48", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, August 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 21), sessionReportCompleted: false }, // Waiting
  { id: "49", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, August 22", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 22), sessionReportCompleted: false }, // Waiting
  { id: "50", name: "Alex", subject: "Math Tutoring", sessionTime: "9:00am, August 25", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex", sessionDate: new Date(2025, 7, 25), sessionReportCompleted: false }, // Waiting
  { id: "51", name: "Emma", subject: "Science Tutoring", sessionTime: "3:00pm, August 25", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", sessionDate: new Date(2025, 7, 25), sessionReportCompleted: false }, // Waiting
  { id: "52", name: "Marcus", subject: "English Tutoring", sessionTime: "7:00pm, August 25", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus", sessionDate: new Date(2025, 7, 25), sessionReportCompleted: false }, // Waiting
  { id: "53", name: "Carlos", subject: "Chemistry Tutoring", sessionTime: "8:00pm, August 26", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos", sessionDate: new Date(2025, 7, 26), sessionReportCompleted: false }, // Waiting
  { id: "54", name: "Sofia", subject: "History Tutoring", sessionTime: "10:30am, August 27", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia", sessionDate: new Date(2025, 7, 27), sessionReportCompleted: false }, // Waiting
  { id: "55", name: "Liam", subject: "Math Tutoring", sessionTime: "2:00pm, August 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam", sessionDate: new Date(2025, 7, 28), sessionReportCompleted: false }, // Waiting
  { id: "56", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "1:30pm, August 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 28), sessionReportCompleted: false }, // Waiting
  { id: "57", name: "Isabella", subject: "Spanish Tutoring", sessionTime: "11:00am, August 29", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella", sessionDate: new Date(2025, 7, 29), sessionReportCompleted: false }, // Waiting
  { id: "58", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, August 7", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "59", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "60", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, August 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel", sessionDate: new Date(2025, 7, 21), sessionReportCompleted: false }, // Waiting
  { id: "61", name: "Daniel", subject: "Art Tutoring", sessionTime: "2:00pm, August 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel", sessionDate: new Date(2025, 7, 28), sessionReportCompleted: false }, // Waiting
  { id: "62", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, August 7", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "63", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "64", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, August 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe", sessionDate: new Date(2025, 7, 21), sessionReportCompleted: false }, // Waiting
  { id: "65", name: "Zoe", subject: "Music Tutoring", sessionTime: "4:00pm, August 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe", sessionDate: new Date(2025, 7, 28), sessionReportCompleted: false }, // Waiting
  { id: "66", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, August 7", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya", sessionDate: new Date(2025, 7, 7), sessionReportCompleted: false }, // Waiting
  { id: "67", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, August 14", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya", sessionDate: new Date(2025, 7, 14), sessionReportCompleted: false }, // Waiting
  { id: "68", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, August 21", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya", sessionDate: new Date(2025, 7, 21), sessionReportCompleted: false }, // Waiting
  { id: "69", name: "Maya", subject: "Biology Tutoring", sessionTime: "10:00am, August 28", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya", sessionDate: new Date(2025, 7, 28), sessionReportCompleted: false }, // Waiting
];

function getSessionReportStatus(student: Student) {
  if (!student.sessionDate) return 'waiting';

  // Use demo date of July 28, 2025 at 4:00 PM for consistent status calculation
  const now = new Date(2025, 6, 28, 16, 0, 0); // July 28, 2025 4:00 PM
  const sessionDate = student.sessionDate;
  const hoursSinceSession = (now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);

  // If session hasn't happened yet
  if (sessionDate > now) return 'waiting';

  // If session report is completed
  if (student.sessionReportCompleted) return 'done';

  // If session was more than 48 hours ago
  if (hoursSinceSession > 48) return 'late';

  // If session was within 48 hours and not completed
  return 'active';
}

function getSessionBadgeConfig(status: string) {
  switch (status) {
    case 'done':
      return { icon: CircleCheck, color: 'text-green-500' };
    case 'active':
      return { icon: LoaderCircle, color: 'text-indigo-600' };
    case 'late':
      return { icon: Timer, color: 'text-pink-600' };
    case 'waiting':
    default:
      return { icon: Loader, color: 'text-stone-400' };
  }
}

// Helper function to reformat session time for session notes view (Month Day, Time)
function formatSessionTimeForNotes(sessionTime: string): string {
  // Match pattern like "3:00pm, July 28" or "9:00am, July 14"
  const match = sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm)),\s*(.+)/i);
  if (match) {
    const [, time, date] = match;
    return `${date}, ${time}`;
  }
  return sessionTime; // Return original if no match
}

// Helper function to reformat session time to "Month day, time" format
function formatSessionTimeToMonthDayTime(sessionTime: string): string {
  // Match pattern like "9:00am, July 14" and convert to "July 14, 9:00am"
  const match = sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm)),\s*(.+)/i);
  if (match) {
    const [, time, date] = match;
    return `${date}, ${time}`;
  }
  return sessionTime; // Return original if no match
}

// Helper function to convert single time to 45-minute session range
function getSessionTimeRange(timeString: string): string {
  const timeMatch = timeString.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!timeMatch) return timeString;

  const [, hours, minutes, period] = timeMatch;
  const startHour = parseInt(hours);
  const startMin = parseInt(minutes);

  // Convert to 24-hour format for calculation
  let start24Hour = startHour;
  if (period.toLowerCase() === 'pm' && startHour !== 12) {
    start24Hour += 12;
  } else if (period.toLowerCase() === 'am' && startHour === 12) {
    start24Hour = 0;
  }

  // Add 45 minutes
  let endMin = startMin + 45;
  let end24Hour = start24Hour;
  if (endMin >= 60) {
    endMin -= 60;
    end24Hour += 1;
  }

  // Convert back to 12-hour format
  let endHour = end24Hour;
  let endPeriod = 'am';
  if (end24Hour >= 12) {
    endPeriod = 'pm';
    if (end24Hour > 12) {
      endHour = end24Hour - 12;
    }
  }
  if (endHour === 0) {
    endHour = 12;
  }

  const startTime = `${hours}:${minutes.padStart(2, '0')}`;
  const endTime = `${endHour}:${endMin.toString().padStart(2, '0')}`;

  // Use en dash and show period only on end time if different, or both if same
  if (period.toLowerCase() === endPeriod) {
    return `${startTime}–${endTime}${period.toLowerCase()}`;
  } else {
    return `${startTime}${period.toLowerCase()}–${endTime}${endPeriod}`;
  }
}

function StudentCard({ student, onClick, scheduleView = false, dimmed = false, sessionNotesView = false, showNextSession = false }: { student: Student; onClick: () => void; scheduleView?: boolean; dimmed?: boolean; sessionNotesView?: boolean; showNextSession?: boolean }) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Get avatar colors based on tutoring subject
  const getSubjectColors = () => {
    const subject = student.subject?.toLowerCase() || '';

    // Group similar subjects together
    if (subject.includes('math') || subject.includes('algebra') || subject.includes('geometry') || subject.includes('calculus')) {
      return 'bg-blue-100 text-blue-700';
    }
    if (subject.includes('science') || subject.includes('biology') || subject.includes('chemistry') || subject.includes('physics')) {
      return 'bg-green-100 text-green-700';
    }
    if (subject.includes('english') || subject.includes('literature') || subject.includes('writing')) {
      return 'bg-purple-100 text-purple-700';
    }
    if (subject.includes('history') || subject.includes('social')) {
      return 'bg-amber-100 text-amber-700';
    }
    if (subject.includes('spanish') || subject.includes('french') || subject.includes('language')) {
      return 'bg-pink-100 text-pink-700';
    }
    if (subject.includes('art') || subject.includes('music') || subject.includes('creative')) {
      return 'bg-red-100 text-red-700';
    }
    if (subject.includes('computer') || subject.includes('coding') || subject.includes('programming')) {
      return 'bg-indigo-100 text-indigo-700';
    }
    if (subject.includes('geography') || subject.includes('earth')) {
      return 'bg-teal-100 text-teal-700';
    }

    // Default color for unknown subjects
    return 'bg-stone-100 text-stone-700';
  };

  const sessionStatus = getSessionReportStatus(student);
  const badgeConfig = getSessionBadgeConfig(sessionStatus);
  const BadgeIcon = badgeConfig.icon;

  // Get icon for session time based on status
  const getTimeIcon = () => {
    switch (sessionStatus) {
      case 'active': // in progress
        return { icon: LoaderCircle, color: 'text-indigo-600' };
      case 'late': // due soon
        return { icon: Timer, color: 'text-pink-600' };
      case 'done': // submitted
        return { icon: CircleCheck, color: 'text-green-600' };
      case 'waiting':
      default:
        return { icon: Clock, color: 'text-stone-700' };
    }
  };

  const timeIconConfig = getTimeIcon();
  const TimeIcon = timeIconConfig.icon;

  return (
    <Card
      className={`cursor-pointer hover:shadow-sm transition-all duration-200 bg-white border border-stone-200 rounded-xl w-45 ${showNextSession ? 'h-45' : 'h-60'} ${dimmed ? 'opacity-40 hover:opacity-60' : ''}`}
      style={showNextSession ? {height: '180px'} : {}}
      onClick={onClick}
    >
      <CardContent className="p-1.5 flex flex-col justify-between h-full">
        {/* Top section with avatar, name, subject, and session time */}
        <div className={`flex flex-col items-start gap-1 pt-3 ${showNextSession ? 'h-full' : ''}`} style={{padding: showNextSession ? '12px 12px 6px 14px' : '12px 12px 0 14px'}}>
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{marginLeft: '-4px'}}>
            <Avatar className="w-full h-full">
              <AvatarFallback className={`${getSubjectColors()} font-medium text-sm`}>
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <h3 className="text-stone-900 font-lexend font-semibold text-lg leading-[18px] tracking-[-0.09px] mt-1">
            {student.name}
          </h3>

          {/* Subject and Session Time */}
          <div className={`flex flex-col items-start ${showNextSession ? 'justify-end h-full' : 'gap-0.5 pt-3'}`}>
            {student.subject && (
              <div className="text-stone-900 font-lexend text-xs font-normal leading-[18px] tracking-[-0.06px]">
                {student.subject}
              </div>
            )}

            {(student.sessionTime || (showNextSession && student.nextSessionTime)) && (
              <div className="flex items-center gap-1 py-0.5">
                <div className="flex items-center gap-1">
                  {showNextSession ? (
                    <Clock className="w-3 h-3 text-stone-700" />
                  ) : (
                    <TimeIcon className={`w-3 h-3 ${timeIconConfig.color}`} />
                  )}
                  <span className="text-stone-700 font-lexend text-xs font-normal leading-4">
                    {showNextSession
                      ? formatSessionTimeToMonthDayTime(student.nextSessionTime || student.sessionTime)
                      : scheduleView
                        ? (() => {
                            const singleTime = student.sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm))/i)?.[1];
                            return singleTime ? getSessionTimeRange(singleTime) : student.sessionTime;
                          })()
                        : sessionNotesView
                          ? formatSessionTimeForNotes(student.sessionTime)
                          : student.sessionTime
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with session report badge - removed for showNextSession */}
        {!showNextSession && (
          <div className="flex justify-center px-1.5 pb-1.5">
            <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded bg-white">
              <span className="text-stone-400 font-lexend text-xs font-normal leading-4">
                {sessionStatus === 'done' ? 'View notes' : sessionStatus === 'waiting' ? 'Add notes' : 'Edit notes'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Sidebar({ activeView, setActiveView, onThisWeekClick, setShowStudentOverlay, greeting }: { activeView: string; setActiveView: (view: string) => void; onThisWeekClick: () => void; setShowStudentOverlay: (show: boolean) => void; greeting: { text: string; icon: any } }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const GreetingIcon = greeting.icon;

  return (
    <div className={`${isCollapsed ? 'w-16 min-w-16' : 'w-60 min-w-60'} flex flex-col min-h-screen transition-all duration-300 flex-shrink-0`}>
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
            onClick={() => {
              setActiveView('home');
              setShowStudentOverlay(false);
            }}
          >
            <div className="flex items-center space-x-2">
              <GreetingIcon className={`w-4 h-4 ${activeView === 'home' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'home' ? 'text-white' : 'text-white'}`}>{greeting.text}</span>}
            </div>
          </div>

          {/* My Students */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              activeView === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-950'
            }`}
            onClick={() => {
              setActiveView('all');
              setShowStudentOverlay(false);
            }}
          >
            <div className="flex items-center space-x-2">
              <UsersRound className={`w-4 h-4 ${activeView === 'all' ? 'text-white' : 'text-white/80'}`} />
              {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'all' ? 'text-white' : 'text-white'}`}>Students</span>}
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
              onClick={() => {
                setActiveView('schedule');
                onThisWeekClick(); // Navigate to this week (July 28)
                setShowStudentOverlay(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${activeView === 'schedule' ? 'text-white' : 'text-white/80'}`} />
                {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white'}`}>Upcoming</span>}
              </div>
              {!isCollapsed && (
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="px-2 py-1 -mx-2 -my-1">
                      <span className={`text-sm font-lexend ${activeView === 'schedule' ? 'text-white' : 'text-white/50'}`}>7</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="animate-none pointer-events-none">
                    <p>7 this week</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Session Notes */}
            <div
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-1 rounded-lg cursor-pointer h-8 ${
                activeView === 'sessionnotes' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-950'
              }`}
              onClick={() => {
                setActiveView('sessionnotes');
                setShowStudentOverlay(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <NotebookText className={`w-4 h-4 ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/80'}`} />
                {!isCollapsed && <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white'}`}>Notes dues</span>}
              </div>
              {!isCollapsed && (
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="px-2 py-1 -mx-2 -my-1">
                      <span className={`text-sm font-lexend ${activeView === 'sessionnotes' ? 'text-white' : 'text-white/50'}`}>4</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="animate-none pointer-events-none">
                    <p>4 late drafts</p>
                  </TooltipContent>
                </Tooltip>
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

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("home");

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

  // Get sessions heading based on time of day
  const getSessionsHeading = () => {
    const hour = new Date().getHours();
    return hour >= 18 ? "Tomorrow's sessions" : "Today's sessions";
  };
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 28)); // July 28, 2025 to match initial selectedDayDate
  const [hideEmptyDays, setHideEmptyDays] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'hiding' | 'showing' | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState('28'); // Track selected day
  const [currentWeekStart, setCurrentWeekStart] = useState(27); // July 28th is at index 27 (Monday)
  const [showStudentOverlay, setShowStudentOverlay] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentStudentList, setCurrentStudentList] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState('in-progress');
  const [studentDetailTab, setStudentDetailTab] = useState('snapshot');
  const [isStudentSearchMode, setIsStudentSearchMode] = useState(false);
  const [studentPanelSearchQuery, setStudentPanelSearchQuery] = useState("");
  const studentPanelSearchInputRef = useRef<HTMLInputElement>(null);
  // Student filtering states
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string | null>(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  // Session notes filtering states
  const [selectedNotesStudentFilter, setSelectedNotesStudentFilter] = useState<string | null>(null);
  const [showNotesStudentDropdown, setShowNotesStudentDropdown] = useState(false);
  const [notesStudentSearchQuery, setNotesStudentSearchQuery] = useState("");
  const notesDropdownRef = useRef<HTMLDivElement>(null);
  // All students filtering and view states
  const [allStudentsSearchQuery, setAllStudentsSearchQuery] = useState("");
  const [studentsViewMode, setStudentsViewMode] = useState<'cards' | 'list'>('cards');
  // Sorting states for list view
  const [sortField, setSortField] = useState<'name' | 'subject' | 'nextSession' | 'email'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tabPositionsReady, setTabPositionsReady] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const homeDropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const studentDropdownRef = useRef<HTMLDivElement>(null);
  const [buttonMeasurements, setButtonMeasurements] = useState<{
    button1?: number;
    button2?: number;
    button3?: number;
  }>({});

  const navigate = useNavigate();





  // Ref callbacks that measure immediately when elements are mounted
  const button1RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      // Small delay to ensure styles are applied
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

  // Calculate tab position and width
  const getTabPosition = () => {
    const { button1, button2, button3 } = buttonMeasurements;

    if (!button1 || !button2 || !button3) {
      // Return null to hide slider until measurements are ready
      return null;
    }

    switch (activeTab) {
      case 'in-progress':
        return { left: 6, width: button1 };
      case 'due-soon':
        return { left: 6 + button1, width: button2 };
      case 'submitted':
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
      // Find the scrollable container
      const scrollContainer = element.closest('.overflow-y-auto');
      if (scrollContainer) {
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const scrollTop = scrollContainer.scrollTop;
        const targetScroll = scrollTop + (elementTop - containerTop) - 24; // 24px offset upward to show more space above

        scrollContainer.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      } else {
        // Fallback to window scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Sync selectedDate when selectedDayDate changes
  useEffect(() => {
    const allDays = getAllDaysData();

    // First try to find the day in the current week context
    const currentWeekDays = getCurrentWeek();
    let selectedDay = currentWeekDays.find(day => day.date === selectedDayDate);

    // If not found in current week, fall back to searching all days
    if (!selectedDay) {
      selectedDay = allDays.find(day => day.date === selectedDayDate);
    }

    if (selectedDay) {
      // Parse the full date and create a proper Date object
      const [year, month, date] = selectedDay.fullDate.split('-').map(Number);
      const newSelectedDate = new Date(year, month - 1, date); // month is 0-indexed
      setSelectedDate(newSelectedDate);
    }
  }, [selectedDayDate, currentWeekStart]);

  // Close calendar picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendarPicker(false);
      }
    };

    if (showCalendarPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendarPicker]);

  // Close student dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (studentDropdownRef.current && !studentDropdownRef.current.contains(event.target as Node)) {
        setShowStudentDropdown(false);
      }
      if (notesDropdownRef.current && !notesDropdownRef.current.contains(event.target as Node)) {
        setShowNotesStudentDropdown(false);
      }
    };

    if (showStudentDropdown || showNotesStudentDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStudentDropdown, showNotesStudentDropdown]);

  // Close home dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (homeDropdownRef.current && !homeDropdownRef.current.contains(event.target as Node)) {
        setShowHomeDropdown(false);
      }
    };

    if (showHomeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHomeDropdown]);

  // Get unique student names for filtering
  const getUniqueStudentNames = () => {
    const names = [...new Set(mockStudents.map(s => s.name))];
    return names.sort();
  };

  // Filter student names based on search
  const getFilteredStudentNames = () => {
    const allNames = getUniqueStudentNames();
    if (!studentSearchQuery) return allNames;
    return allNames.filter(name =>
      name.toLowerCase().includes(studentSearchQuery.toLowerCase())
    );
  };

  // Get days that have sessions for a specific student
  const getStudentSessionDays = (studentName: string) => {
    const studentSessions = mockStudents.filter(s => s.name === studentName);
    const days = new Set<string>();

    studentSessions.forEach(session => {
      if (session.sessionDate) {
        days.add(session.sessionDate.getDate().toString());
      }
    });

    return Array.from(days);
  };

  // Check if a day should be shown based on student filter
  const shouldShowDay = (dayData: any) => {
    if (!selectedStudentFilter) return true;

    const studentSessionDays = getStudentSessionDays(selectedStudentFilter);
    return studentSessionDays.includes(dayData.date);
  };

  // Get session times for a specific student on a specific date
  const getStudentSessionTimes = (studentName: string, date: string) => {
    const dayData = dateSessionData[date];
    if (!dayData) return [];

    const times = [];

    // Check all time periods for this student
    ['morning', 'afternoon', 'evening'].forEach(period => {
      const periodStudents = dayData[period as keyof typeof dayData];
      const studentInPeriod = periodStudents.find(s => s.name === studentName);
      if (studentInPeriod && studentInPeriod.sessionTime) {
        // Extract just the time from the sessionTime string (e.g., "9:00am" from "9:00am, July 28")
        const timeMatch = studentInPeriod.sessionTime.match(/(\d{1,2}:\d{2}(?:am|pm))/i);
        if (timeMatch) {
          times.push(timeMatch[1]);
        }
      }
    });

    return times;
  };

  const handleStudentClick = (studentId: string, studentList: Student[] = []) => {
    // If we're on the Students view, navigate to full page
    if (activeView === 'all') {
      navigate(`/student/${studentId}`);
      return;
    }

    // Show sidebar panel for 'home', 'schedule' and 'sessionnotes' views
    if (activeView === 'home' || activeView === 'schedule' || activeView === 'sessionnotes') {
      setSelectedStudentId(studentId);
      setCurrentStudentList(studentList);
      setShowStudentOverlay(true);
    } else {
      // For other views, navigate to full page
      navigate(`/student/${studentId}`);
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    // Only allow explicit closing through close button or sidebar navigation
    if (!open) {
      setShowStudentOverlay(false);
      setSelectedStudentId(null);
      setCurrentStudentList([]);
    }
  };

  const handleExpandStudent = () => {
    if (selectedStudentId) {
      setShowStudentOverlay(false);
      navigate(`/student/${selectedStudentId}`);
    }
  };

  const getCurrentStudentIndex = () => {
    return currentStudentList.findIndex(student => student.id === selectedStudentId);
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
    return mockStudents.find(student => student.id === selectedStudentId);
  };

  // Helper functions for different views
  const getAllStudentsSorted = () => {
    return [...mockStudents].sort((a, b) => a.name.localeCompare(b.name));
  };

  // Get unique students with their next session after July 28, 4pm
  const getUniqueStudentsWithNextSession = () => {
    const now = new Date(2025, 6, 28, 16, 0, 0); // July 28, 2025 4:00 PM
    const uniqueStudents = new Map();

    // Group all students by name and find their next session
    mockStudents.forEach(student => {
      if (!student.sessionDate) return;

      // Only consider sessions after 4pm on July 28th
      if (student.sessionDate <= now) return;

      const studentName = student.name;
      if (!uniqueStudents.has(studentName) ||
          (uniqueStudents.get(studentName).sessionDate &&
           student.sessionDate < uniqueStudents.get(studentName).sessionDate)) {
        uniqueStudents.set(studentName, {
          ...student,
          nextSessionTime: student.sessionTime
        });
      }
    });

    return Array.from(uniqueStudents.values()).sort((a, b) => a.name.localeCompare(b.name));
  };

  // Filter students based on search query
  const getFilteredUniqueStudents = () => {
    let students = getUniqueStudentsWithNextSession();

    // Apply search filter
    if (allStudentsSearchQuery.trim()) {
      const query = allStudentsSearchQuery.toLowerCase();
      students = students.filter(student => {
        const name = student.name?.toLowerCase() || '';
        const subject = student.subject?.toLowerCase() || '';
        const sessionTime = student.nextSessionTime?.toLowerCase() || student.sessionTime?.toLowerCase() || '';
        const email = student.email?.toLowerCase() || '';

        return name.includes(query) || subject.includes(query) || sessionTime.includes(query) || email.includes(query);
      });
    }

    // Apply sorting
    return students.sort((a, b) => {
      let aValue = '';
      let bValue = '';

      switch (sortField) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'subject':
          aValue = a.subject || '';
          bValue = b.subject || '';
          break;
        case 'nextSession':
          aValue = a.nextSessionTime || a.sessionTime || '';
          bValue = b.nextSessionTime || b.sessionTime || '';
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  // Handle column sorting
  const handleSort = (field: 'name' | 'subject' | 'nextSession' | 'email') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get header styling for active sort column
  const getHeaderStyle = (field: 'name' | 'subject' | 'nextSession' | 'email') => {
    return sortField === field ? 'font-bold' : 'font-medium';
  };

  // Get sort icon for column headers
  const getSortIcon = (field: 'name' | 'subject' | 'nextSession' | 'email') => {
    if (sortField !== field) return null;
    return sortDirection === 'asc'
      ? <SortAsc className="w-4 h-4 text-stone-600 ml-1" />
      : <SortDesc className="w-4 h-4 text-stone-600 ml-1" />;
  };

  // Comprehensive July/August 2025 day data
  const getAllDaysData = () => {
    return [
      // July 2025
      { date: '1', fullDate: '2025-07-01', day: 'Tue', sessions: 2, isToday: false, month: 'July' },
      { date: '2', fullDate: '2025-07-02', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '3', fullDate: '2025-07-03', day: 'Thu', sessions: 3, isToday: false, month: 'July' },
      { date: '4', fullDate: '2025-07-04', day: 'Fri', sessions: 0, isToday: false, month: 'July' },
      { date: '5', fullDate: '2025-07-05', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '6', fullDate: '2025-07-06', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '7', fullDate: '2025-07-07', day: 'Mon', sessions: 1, isToday: false, month: 'July' },
      { date: '8', fullDate: '2025-07-08', day: 'Tue', sessions: 2, isToday: false, month: 'July' },
      { date: '9', fullDate: '2025-07-09', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '10', fullDate: '2025-07-10', day: 'Thu', sessions: 1, isToday: false, month: 'July' },
      { date: '11', fullDate: '2025-07-11', day: 'Fri', sessions: 3, isToday: false, month: 'July' },
      { date: '12', fullDate: '2025-07-12', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '13', fullDate: '2025-07-13', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '14', fullDate: '2025-07-14', day: 'Mon', sessions: 2, isToday: false, month: 'July' },
      { date: '15', fullDate: '2025-07-15', day: 'Tue', sessions: 1, isToday: false, month: 'July' },
      { date: '16', fullDate: '2025-07-16', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '17', fullDate: '2025-07-17', day: 'Thu', sessions: 2, isToday: false, month: 'July' },
      { date: '18', fullDate: '2025-07-18', day: 'Fri', sessions: 1, isToday: false, month: 'July' },
      { date: '19', fullDate: '2025-07-19', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '20', fullDate: '2025-07-20', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '21', fullDate: '2025-07-21', day: 'Mon', sessions: 3, isToday: false, month: 'July' },
      { date: '22', fullDate: '2025-07-22', day: 'Tue', sessions: 0, isToday: false, month: 'July' },
      { date: '23', fullDate: '2025-07-23', day: 'Wed', sessions: 1, isToday: false, month: 'July' },
      { date: '24', fullDate: '2025-07-24', day: 'Thu', sessions: 2, isToday: false, month: 'July' },
      { date: '25', fullDate: '2025-07-25', day: 'Fri', sessions: 0, isToday: false, month: 'July' },
      { date: '26', fullDate: '2025-07-26', day: 'Sat', sessions: 0, isToday: false, month: 'July' },
      { date: '27', fullDate: '2025-07-27', day: 'Sun', sessions: 0, isToday: false, month: 'July' },
      { date: '28', fullDate: '2025-07-28', day: 'Mon', sessions: 3, isToday: true, month: 'July' },
      { date: '29', fullDate: '2025-07-29', day: 'Tue', sessions: 1, isToday: false, month: 'July' },
      { date: '30', fullDate: '2025-07-30', day: 'Wed', sessions: 0, isToday: false, month: 'July' },
      { date: '31', fullDate: '2025-07-31', day: 'Thu', sessions: 3, isToday: false, month: 'July' },

      // August 2025
      { date: '1', fullDate: '2025-08-01', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '2', fullDate: '2025-08-02', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '3', fullDate: '2025-08-03', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '4', fullDate: '2025-08-04', day: 'Mon', sessions: 3, isToday: false, month: 'August' },
      { date: '5', fullDate: '2025-08-05', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '6', fullDate: '2025-08-06', day: 'Wed', sessions: 3, isToday: false, month: 'August' },
      { date: '7', fullDate: '2025-08-07', day: 'Thu', sessions: 1, isToday: false, month: 'August' },
      { date: '8', fullDate: '2025-08-08', day: 'Fri', sessions: 1, isToday: false, month: 'August' },
      { date: '9', fullDate: '2025-08-09', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '10', fullDate: '2025-08-10', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '11', fullDate: '2025-08-11', day: 'Mon', sessions: 1, isToday: false, month: 'August' },
      { date: '12', fullDate: '2025-08-12', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '13', fullDate: '2025-08-13', day: 'Wed', sessions: 2, isToday: false, month: 'August' },
      { date: '14', fullDate: '2025-08-14', day: 'Thu', sessions: 3, isToday: false, month: 'August' },
      { date: '15', fullDate: '2025-08-15', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '16', fullDate: '2025-08-16', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '17', fullDate: '2025-08-17', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '18', fullDate: '2025-08-18', day: 'Mon', sessions: 2, isToday: false, month: 'August' },
      { date: '19', fullDate: '2025-08-19', day: 'Tue', sessions: 1, isToday: false, month: 'August' },
      { date: '20', fullDate: '2025-08-20', day: 'Wed', sessions: 0, isToday: false, month: 'August' },
      { date: '21', fullDate: '2025-08-21', day: 'Thu', sessions: 2, isToday: false, month: 'August' },
      { date: '22', fullDate: '2025-08-22', day: 'Fri', sessions: 3, isToday: false, month: 'August' },
      { date: '23', fullDate: '2025-08-23', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '24', fullDate: '2025-08-24', day: 'Sun', sessions: 0, isToday: false, month: 'August' },
      { date: '25', fullDate: '2025-08-25', day: 'Mon', sessions: 1, isToday: false, month: 'August' },
      { date: '26', fullDate: '2025-08-26', day: 'Tue', sessions: 0, isToday: false, month: 'August' },
      { date: '27', fullDate: '2025-08-27', day: 'Wed', sessions: 2, isToday: false, month: 'August' },
      { date: '28', fullDate: '2025-08-28', day: 'Thu', sessions: 1, isToday: false, month: 'August' },
      { date: '29', fullDate: '2025-08-29', day: 'Fri', sessions: 0, isToday: false, month: 'August' },
      { date: '30', fullDate: '2025-08-30', day: 'Sat', sessions: 0, isToday: false, month: 'August' },
      { date: '31', fullDate: '2025-08-31', day: 'Sun', sessions: 0, isToday: false, month: 'August' }
    ];
  };

  const getCurrentWeek = () => {
    const allDays = getAllDaysData();

    // Use currentWeekStart if it's set, otherwise calculate from selectedDayDate
    if (currentWeekStart >= 0 && currentWeekStart < allDays.length) {
      return allDays.slice(currentWeekStart, currentWeekStart + 7);
    }

    // Fallback: find by selectedDayDate
    const currentIndex = allDays.findIndex(day => day.date === selectedDayDate);

    if (currentIndex === -1) return allDays.slice(0, 7);

    // Find the Monday of the current week
    const currentDay = allDays[currentIndex];
    const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(currentDay.day);
    const mondayIndex = currentIndex - dayIndex;

    // Get the complete week (Monday through Sunday)
    return allDays.slice(Math.max(0, mondayIndex), Math.max(7, mondayIndex + 7));
  };

  const getCurrentMondayMonth = () => {
    const currentWeek = getCurrentWeek();
    const monday = currentWeek.find(day => day.day === 'Mon');
    return monday ? monday.month : 'July';
  };

  const jumpToDate = (targetDate: Date) => {
    const allDays = getAllDaysData();
    const targetDateStr = targetDate.getDate().toString();
    const targetMonth = targetDate.toLocaleDateString('en-US', { month: 'long' });

    // Find the target day in our data
    const targetDay = allDays.find(day =>
      day.date === targetDateStr && day.month === targetMonth
    );

    if (targetDay) {
      setSelectedDayDate(targetDay.date);

      // Find the Monday of this week and set as week start
      const targetIndex = allDays.findIndex(day => day === targetDay);
      const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(targetDay.day);
      const mondayIndex = targetIndex - dayIndex;

      setCurrentWeekStart(Math.max(0, mondayIndex));
      setShowCalendarPicker(false);
    }
  };

  const selectToday = () => {
    // Today is July 28th (Monday) - jump to this date
    jumpToDate(new Date(2025, 6, 28)); // July 28, 2025
  };

  const navigateTime = (direction: 'prev' | 'next') => {
    const allDays = getAllDaysData();

    if (direction === 'prev') {
      // Go to previous week
      const newWeekStart = Math.max(0, currentWeekStart - 7);
      setCurrentWeekStart(newWeekStart);

      // Set selected day to the Monday of this week
      const newMonday = allDays[newWeekStart];
      if (newMonday) {
        setSelectedDayDate(newMonday.date);
      }
    } else {
      // Go to next week
      const newWeekStart = Math.min(allDays.length - 7, currentWeekStart + 7);
      setCurrentWeekStart(newWeekStart);

      // Set selected day to the Monday of this week
      const newMonday = allDays[newWeekStart];
      if (newMonday) {
        setSelectedDayDate(newMonday.date);
      }
    }
  };

  // Session data for each date
  const dateSessionData: { [key: string]: { morning: Student[], afternoon: Student[], evening: Student[] } } = {
    // July 14th - 2 sessions: all done
    '14': {
      morning: [mockStudents[0]], // Alex - Done
      afternoon: [mockStudents[1]], // Emma - Done
      evening: []
    },
    // July 15th - 1 session: done
    '15': {
      morning: [mockStudents[2]], // Marcus - Done
      afternoon: [],
      evening: []
    },
    // July 17th - 2 sessions: all done
    '17': {
      morning: [mockStudents[3]], // Sofia - Done
      afternoon: [mockStudents[4]], // Liam - Done
      evening: []
    },
    // July 18th - 1 session: done
    '18': {
      morning: [mockStudents[5]], // Isabella - Done
      afternoon: [],
      evening: []
    },
    // July 21st - 3 sessions: 2 done, 1 late
    '21': {
      morning: [mockStudents[6]], // Alex - Done
      afternoon: [mockStudents[7]], // Emma - Done
      evening: [mockStudents[8]] // Marcus - Late
    },
    // July 23rd - 1 session: late
    '23': {
      morning: [mockStudents[9]], // Sofia - Late
      afternoon: [],
      evening: []
    },
    // July 24th - 2 sessions: both late
    '24': {
      morning: [mockStudents[10]], // Liam - Late
      afternoon: [mockStudents[11]], // Isabella - Late
      evening: []
    },
    // July 28th - 3 sessions: Alex & Emma = In process, Marcus = Waiting
    '28': {
      morning: [mockStudents[12]], // Alex - In process
      afternoon: [mockStudents[13]], // Emma - In process
      evening: [mockStudents[14]] // Marcus - Waiting
    },
    // July 29th - all waiting
    '29': {
      morning: [],
      afternoon: [mockStudents[15]], // Carlos - Waiting
      evening: []
    },
    // July 31st - all waiting
    '31': {
      morning: [mockStudents[16]], // Maya - Waiting
      afternoon: [mockStudents[17], mockStudents[18]], // Daniel, Zoe - Waiting
      evening: []
    },
    // August 4th - waiting
    '4': {
      morning: [mockStudents[19]], // Oliver - Waiting
      afternoon: [],
      evening: []
    },
    // August 7th - waiting
    '7': {
      morning: [],
      afternoon: [mockStudents[20]], // Luna - Waiting
      evening: []
    },
    // August 8th - waiting
    '8': {
      morning: [],
      afternoon: [],
      evening: [mockStudents[21]] // Kai - Waiting
    }
  };

  const getScheduleData = () => {
    const data = dateSessionData[selectedDayDate] || { morning: [], afternoon: [], evening: [] };
    // Filter out any undefined students to prevent errors
    return {
      morning: data.morning.filter(student => student && student.id),
      afternoon: data.afternoon.filter(student => student && student.id),
      evening: data.evening.filter(student => student && student.id)
    };
  };

  const getSessionNotesStudents = () => {
    return mockStudents.filter(s => s.sessionReportDue).sort((a, b) => {
      // Sort by session time for session notes
      if (!a.sessionTime) return 1;
      if (!b.sessionTime) return -1;
      return a.sessionTime.localeCompare(b.sessionTime);
    });
  };

  // Helper functions to categorize session notes by status
  const getInProgressNotes = () => {
    return mockStudents
      .filter(student => {
        const status = getSessionReportStatus(student);
        // Include both 'active' (in-progress) and 'waiting' students with sessions on July 28th
        if (status === 'active') return true;
        if (status === 'waiting' && student.sessionDate) {
          const sessionDate = student.sessionDate;
          return sessionDate.getDate() === 28 && sessionDate.getMonth() === 6; // July 28th
        }
        return false;
      })
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  const getDueSoonNotes = () => {
    return mockStudents
      .filter(student => getSessionReportStatus(student) === 'late')
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  const getSubmittedNotes = () => {
    return mockStudents
      .filter(student => getSessionReportStatus(student) === 'done')
      .sort((a, b) => {
        // Sort by most recent session date first
        if (!a.sessionDate || !b.sessionDate) return 0;
        return b.sessionDate.getTime() - a.sessionDate.getTime();
      });
  };

  // Helper function to get session count for a specific date
  const getSessionCountForDate = (date: Date) => {
    const dateStr = date.getDate().toString();
    const monthStr = date.toLocaleDateString('en-US', { month: 'long' });

    // Find matching day in our calendar data
    const allDays = getAllDaysData();
    const matchingDay = allDays.find(day =>
      day.date === dateStr && day.month === monthStr
    );

    return matchingDay ? matchingDay.sessions : 0;
  };

  // Helper function to render session dots
  const renderSessionDots = (sessionCount: number, isSelected: boolean = false, isCurrentMonth: boolean = true) => {
    if (sessionCount === 0) return null;

    let dotCount = 1;
    if (sessionCount >= 2 && sessionCount <= 4) dotCount = 2;
    if (sessionCount >= 5) dotCount = 3;

    let dotColor = 'bg-stone-300'; // Default for current month
    if (isSelected) {
      dotColor = 'bg-white';
    } else if (!isCurrentMonth) {
      dotColor = 'bg-stone-400'; // Non-active months use stone-400
    }

    return (
      <div className="flex justify-center gap-0.5 mt-0.5">
        {Array.from({ length: dotCount }, (_, i) => (
          <div key={i} className={`w-1 h-1 ${dotColor} rounded-full`}></div>
        ))}
      </div>
    );
  };

  const studentsWithUpcomingSessions = mockStudents.filter(s => s.upcomingSession);
  const studentsWithOpenTasks = mockStudents.filter(s => s.sessionReportDue);
  const allStudents = mockStudents.slice(9); // Show the Jayden students in "All students"

  return (
    <TooltipProvider>
      <div className="h-screen bg-indigo-900 flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} onThisWeekClick={selectToday} setShowStudentOverlay={setShowStudentOverlay} greeting={greeting} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Content */}
        <div className="flex-1 p-3 h-full min-w-0" style={{ scrollBehavior: 'smooth' }}>
          {/* My students panel card */}
          <div className={`${activeView === 'home' ? 'bg-white' : 'bg-stone-50'} rounded-lg h-full flex flex-col min-w-0`} style={{boxShadow: '0 0 4px 1px rgba(30, 27, 75, 0.01)', border: '1px none rgb(231, 229, 228)'}}>
            {/* Header inside card - Different headers for different views */}
            {activeView === 'home' && (
              <div className="bg-white rounded-t-lg" style={{border: '1px none rgb(231, 229, 228)', padding: '60px 60px 24px'}}>
                <div className="flex flex-col items-start justify-start min-h-[125px]">
                  <div className="flex items-center justify-between w-full mb-6" style={{marginBottom: '24px', paddingRight: '4px'}}>
                    <div className="flex items-center">
                      <GreetingIcon className="w-12 h-12 text-indigo-600" />
                      <h1 className="text-4xl font-bold text-stone-800 font-lexend ml-3">
                        {greeting.text}, John
                      </h1>
                    </div>
                    <div className="relative" ref={homeDropdownRef}>
                      <button
                        onClick={() => setShowHomeDropdown(!showHomeDropdown)}
                        className="flex items-center justify-center w-11 h-11 bg-white rounded-xl hover:bg-stone-50 transition-colors overflow-hidden border border-stone-200"
                        style={{boxShadow: '0 0 8px 0 rgba(80, 70, 229, 0.15)'}}
                      >
                        <Plus className="w-5 h-5 text-indigo-600" strokeWidth={4} />
                      </button>
                      {showHomeDropdown && (
                        <div className="absolute right-0 top-12 w-56 bg-white border border-stone-200 rounded-lg shadow-lg z-50">
                          <div className="py-2">
                            <button
                              onClick={() => {
                                setShowHomeDropdown(false);
                                setActiveView('all');
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                              <UserRoundPlus className="w-4 h-4 mr-3 text-stone-500" />
                              Add student
                            </button>
                            <button
                              onClick={() => {
                                setShowHomeDropdown(false);
                                setActiveView('sessionnotes');
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                              <NotebookPen className="w-4 h-4 mr-3 text-stone-500" />
                              New session notes
                            </button>
                            <button
                              onClick={() => {
                                setShowHomeDropdown(false);
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                              <FileAudio className="w-4 h-4 mr-3 text-stone-500" />
                              Create assignment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full relative" style={{paddingLeft: '4px'}}>
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
            )}

            {activeView === 'schedule' && (
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2 relative" ref={calendarRef}>
                      <button
                        className="flex items-center space-x-2 hover:bg-stone-100 rounded pr-2"
                        onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                      >
                      <h1 className="text-3xl font-bold text-stone-800 font-lexend">
                        {getCurrentMondayMonth()} 2025
                      </h1>
                      <ChevronDown className="w-6 h-6 text-stone-400" />
                      </button>

                      {/* Calendar Picker */}
                    {showCalendarPicker && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg p-4 z-[100] min-w-80">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => {
                              const newDate = new Date(selectedDate);
                              newDate.setMonth(newDate.getMonth() - 1);
                              setSelectedDate(newDate);
                            }}
                            className="p-1 hover:bg-stone-100 rounded"
                          >
                            <ChevronLeft className="w-4 h-4 text-indigo-600" />
                          </button>
                          <span className="font-medium font-lexend text-stone-800">
                            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                          <button
                            onClick={() => {
                              const newDate = new Date(selectedDate);
                              newDate.setMonth(newDate.getMonth() + 1);
                              setSelectedDate(newDate);
                            }}
                            className="p-1 hover:bg-stone-100 rounded"
                          >
                            <ChevronRight className="w-4 h-4 text-indigo-600" />
                          </button>
                        </div>



                        {/* Simple calendar grid */}
                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <div key={day} className="text-center p-2 text-stone-500 font-lexend text-xs">
                            {day}
                          </div>
                        ))}
                          {Array.from({length: 42}, (_, i) => {
                            // Start from Monday - calculate the first Monday of the month view
                            const firstOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                            const firstDayOfWeek = (firstOfMonth.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
                            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - firstDayOfWeek + 1);

                            const isSelected = date.getDate() === selectedDate.getDate() &&
                                             date.getMonth() === selectedDate.getMonth() &&
                                             date.getFullYear() === selectedDate.getFullYear();
                            const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                            const sessionCount = getSessionCountForDate(date);
                            const hasNoSessions = sessionCount === 0;
                            const shouldGrayOut = hideEmptyDays && hasNoSessions && isCurrentMonth;

                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedDate(date);
                                  jumpToDate(date);
                                }}
                                className={`w-9 h-9 flex flex-col items-center justify-center text-center rounded hover:bg-stone-700/10 font-lexend text-sm ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : shouldGrayOut
                                      ? 'text-stone-200'
                                      : isCurrentMonth
                                        ? 'text-stone-700'
                                        : sessionCount > 0
                                          ? 'text-stone-400'
                                          : hideEmptyDays
                                            ? 'text-stone-200'
                                            : 'text-stone-400'
                                }`}
                              >
                                <div className="leading-none">
                                  {date.getDate()}
                                </div>
                                {sessionCount > 0 ?
                                  renderSessionDots(sessionCount, isSelected, isCurrentMonth) :
                                  <div className="h-1.5"></div>
                                }
                              </button>
                            );
                          })}
                        </div>

                        {/* Separator */}
                        <div className="border-t border-stone-200 my-4"></div>

                        {/* Hide empty days toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-lexend text-gray-700">Hide empty days</span>
                          <button
                            onClick={() => {
                              if (isToggling) return; // Prevent rapid clicking
                              setIsToggling(true);
                              setAnimationDirection(hideEmptyDays ? 'showing' : 'hiding');

                              // Start animation, then change state, then cleanup
                              setTimeout(() => {
                                setHideEmptyDays(!hideEmptyDays);
                                setTimeout(() => {
                                  setIsToggling(false);
                                  setAnimationDirection(null);
                                }, 500); // Match animation duration
                              }, 50);
                            }}
                            className={`relative w-9 h-5 rounded-full transition-colors ${
                              hideEmptyDays ? 'bg-indigo-600' : 'bg-stone-600'
                            }`}
                            style={{
                              backgroundColor: hideEmptyDays ? '#4f46e5' : '#5d5955'
                            }}
                          >
                            <div
                              className={`absolute w-4 h-4 rounded-full bg-white shadow-lg transition-transform top-0.5 ${
                                hideEmptyDays ? 'translate-x-4' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1 w-56" ref={studentDropdownRef}>
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <UserRound className="w-6 h-6 text-stone-400" />
                      </div>
                      {selectedStudentFilter && (
                        <button
                          onClick={() => {
                            setSelectedStudentFilter(null);
                            setStudentSearchQuery("");
                            // Reset to highlighting today when student filter is cleared
                            setSelectedDayDate('28');
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-stone-100 rounded"
                        >
                          <X className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                        </button>
                      )}
                      <Input
                        type="text"
                        placeholder={selectedStudentFilter || "Filter by student"}
                        value={selectedStudentFilter ? "" : studentSearchQuery}
                        onChange={(e) => {
                          if (!selectedStudentFilter) {
                            setStudentSearchQuery(e.target.value);
                          }
                        }}
                        onFocus={() => {
                          setShowStudentDropdown(true);
                          if (selectedStudentFilter) {
                            setStudentSearchQuery("");
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !selectedStudentFilter) {
                            const filteredNames = getFilteredStudentNames();
                            if (filteredNames.length === 1) {
                              setSelectedStudentFilter(filteredNames[0]);
                              setShowStudentDropdown(false);
                              setStudentSearchQuery("");
                            }
                          }
                        }}
                        className={`pl-14 ${selectedStudentFilter ? 'pr-10' : 'pr-4.5'} h-11 font-readex text-base rounded-full overflow-hidden bg-transparent ${selectedStudentFilter ? 'text-stone-900 font-medium placeholder:text-stone-900 placeholder:font-medium' : 'placeholder:text-stone-400'}`}
                        readOnly={!!selectedStudentFilter}
                      />

                      {/* Dropdown */}
                      {showStudentDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          {getFilteredStudentNames().map((name) => (
                            <button
                              key={name}
                              onClick={() => {
                                setSelectedStudentFilter(name);
                                setShowStudentDropdown(false);
                                setStudentSearchQuery("");

                                // Highlight the first day when student is selected
                                const allDays = getAllDaysData();
                                const activeMonth = selectedDate.toLocaleDateString('en-US', { month: 'long' });
                                const studentSessionDays = getStudentSessionDays(name);
                                const monthDaysWithStudentSessions = allDays.filter(day =>
                                  day.month === activeMonth &&
                                  studentSessionDays.includes(day.date) &&
                                  day.sessions > 0
                                );

                                if (monthDaysWithStudentSessions.length > 0) {
                                  setSelectedDayDate(monthDaysWithStudentSessions[0].date);
                                }
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                            >
                              <span className="text-stone-900 font-lexend text-sm">{name}</span>
                            </button>
                          ))}
                          {getFilteredStudentNames().length === 0 && (
                            <div className="px-4 py-2 text-stone-500 text-sm">
                              No students found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Back Arrow */}
                    <button
                      onClick={() => navigateTime('prev')}
                      className="flex p-2.5 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-50 h-11"
                    >
                      <ChevronLeft className="w-6 h-6 text-indigo-600" />
                    </button>

                    {/* Today Button */}
                    <button
                      onClick={selectToday}
                      className="flex px-4 py-2 items-center justify-center rounded-lg border border-stone-200 bg-white hover:bg-stone-50 h-11"
                    >
                      <span className="text-stone-900 font-lexend text-base font-normal leading-6">Today</span>
                    </button>

                    {/* Forward Arrow */}
                    <button
                      onClick={() => navigateTime('next')}
                      className="flex p-2.5 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-50 h-11"
                    >
                      <ChevronRight className="w-6 h-6 text-indigo-600" />
                    </button>
                  </div>
                </div>

                {/* Week Calendar */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {(() => {
                      const currentWeek = getCurrentWeek();

                      const getAnimationClass = (dayData: any, originalIndex: number) => {
                        const isEmpty = dayData.sessions === 0;

                        if (!isToggling) {
                          return 'day-card-base';
                        }

                        if (isEmpty) {
                          if (animationDirection === 'hiding') {
                            return 'day-card-slide-behind';
                          } else if (animationDirection === 'showing') {
                            return 'day-card-emerge';
                          }
                        } else {
                          // Non-empty cards move to fill gaps or make space
                          if (animationDirection === 'hiding') {
                            return 'day-card-fill-gap';
                          } else if (animationDirection === 'showing') {
                            return 'day-card-make-space';
                          }
                        }

                        return 'day-card-base';
                      };

                      const getZIndex = (dayData: any, originalIndex: number) => {
                        const isEmpty = dayData.sessions === 0;

                        if (isEmpty && isToggling && animationDirection === 'hiding') {
                          return 1; // Empty cards go behind
                        }

                        // Earlier dates have higher z-index (leftmost has highest)
                        // Keep these values low to not conflict with modals/overlays
                        return 10 - originalIndex;
                      };

                      const getMoveDistance = (dayData: any, originalIndex: number) => {
                        if (dayData.sessions === 0) {
                          // Empty cards slide far left to go behind the nearest session card to their left
                          return -200; // Fixed distance to slide behind
                        }

                        // For session cards: count consecutive empty cards immediately to the left
                        let consecutiveEmptyToLeft = 0;
                        for (let i = originalIndex - 1; i >= 0; i--) {
                          if (currentWeek[i] && currentWeek[i].sessions === 0) {
                            consecutiveEmptyToLeft++;
                          } else {
                            break; // Stop at first non-empty card
                          }
                        }

                        return consecutiveEmptyToLeft * -104; // Move by the number of consecutive empty cards
                      };

                      // Show all days during animation, filter after based on new rules
                      let visibleDays;
                      if (isToggling) {
                        visibleDays = currentWeek;
                      } else if (selectedStudentFilter) {
                        // When student is filtered: show all dates in the active month where that student has sessions
                        const allDays = getAllDaysData();
                        const activeMonth = selectedDate.toLocaleDateString('en-US', { month: 'long' });

                        // Get all days in the active month where the selected student has sessions
                        const studentSessionDays = getStudentSessionDays(selectedStudentFilter);
                        const monthDaysWithStudentSessions = allDays.filter(day =>
                          day.month === activeMonth &&
                          studentSessionDays.includes(day.date) &&
                          day.sessions > 0
                        );

                        visibleDays = monthDaysWithStudentSessions;
                      } else if (hideEmptyDays) {
                        // When hiding empty days: show only days with sessions, but always include Monday
                        const monday = currentWeek.find(day => day.day === 'Mon');
                        const daysWithSessions = currentWeek.filter(day => day.sessions > 0);

                        // Create set to avoid duplicates, then convert back to array maintaining order
                        const uniqueDays = new Map();
                        if (monday) uniqueDays.set(monday.date, monday);
                        daysWithSessions.forEach(day => uniqueDays.set(day.date, day));
                        visibleDays = Array.from(uniqueDays.values()).sort((a, b) =>
                          currentWeek.indexOf(a) - currentWeek.indexOf(b)
                        );
                      } else {
                        // When showing empty days: show all 7 days of the week
                        visibleDays = currentWeek;
                      }

                      return visibleDays.map((dayData, index) => {
                        const originalIndex = currentWeek.findIndex(day => day.date === dayData.date);
                        const moveDistance = getMoveDistance(dayData, originalIndex);

                        const isSelected = selectedDayDate === dayData.date;

                        return (
                          <button
                            key={dayData.date}
                            onClick={() => setSelectedDayDate(dayData.date)}
                            className={`flex w-24 h-24 p-3 pb-2 flex-col justify-between items-start rounded-xl border cursor-pointer flex-shrink-0 ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600 scale-100'
                                : 'border-stone-200 bg-white hover:bg-stone-50 scale-100'
                            } ${getAnimationClass(dayData, originalIndex)}`}
                            style={{
                              zIndex: getZIndex(dayData, originalIndex),
                              '--move-distance': `${moveDistance}px`
                            }}
                          >
                        {/* Top section with date and today indicator */}
                        <div className="flex flex-col items-start w-full gap-0.5">
                          <div className="flex justify-between items-center w-full">
                            <div className={`text-2xl font-black leading-none font-lexend ${
                              isSelected
                                ? 'text-white'
                                : dayData.sessions === 0
                                  ? 'text-stone-400'
                                  : 'text-stone-700'
                            }`}>
                              {dayData.date}
                            </div>
                            {dayData.isToday && (
                              <div className={`text-xs leading-none font-lexend opacity-50 ${
                                isSelected
                                  ? 'text-white'
                                  : dayData.sessions === 0
                                    ? 'text-stone-400'
                                    : 'text-stone-700'
                              }`}>
                                Today
                              </div>
                            )}
                          </div>
                          <div className={`text-base font-medium leading-none font-lexend w-full text-left ${
                            isSelected
                              ? 'text-white'
                              : dayData.sessions === 0
                                ? 'text-stone-400'
                                : 'text-stone-700'
                          }`}>
                            {dayData.day}
                          </div>
                        </div>

                        {/* Bottom section with sessions */}
                        {dayData.sessions > 0 && (
                          <div className="flex flex-col items-start gap-0.5 w-full">
                            {selectedStudentFilter ? (
                              // Show session times when student is filtered
                              getStudentSessionTimes(selectedStudentFilter, dayData.date).map((time, index) => (
                                <div key={index} className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? 'text-white' : 'text-stone-700'
                                }`}>
                                  {time}
                                </div>
                              ))
                            ) : (
                              // Show session count when no student filter
                              <div className="flex items-start gap-1 w-full">
                                <div className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? 'text-white' : 'text-stone-700'
                                }`}>
                                  {dayData.sessions}
                                </div>
                                <div className={`text-xs font-normal leading-none font-lexend ${
                                  isSelected ? 'text-white' : 'text-stone-700'
                                }`}>
                                  {dayData.sessions === 1 ? 'session' : 'sessions'}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                          </button>
                        );
                      });
                    })()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Header for All Students view */}
            {activeView === 'all' && (
              <div className="px-6 pt-4 pb-6 bg-white border-b border-stone-200 rounded-t-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-stone-900 font-lexend text-3xl font-bold leading-9 tracking-[-0.75px]">
                    Students
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Cards/List Toggle */}
                    <div className="relative flex border border-stone-200 rounded-xl bg-white overflow-hidden h-11 self-center" style={{padding: '3px'}}>
                      {/* Sliding background indicator */}
                      <div
                        className="absolute bg-indigo-600 shadow-sm"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '9px',
                          top: '3px',
                          left: studentsViewMode === 'cards' ? '3px' : '39px',
                          transition: 'left 0.15s cubic-bezier(0.34, 1.25, 0.64, 1)'
                        }}
                      />
                      <button
                        onClick={() => setStudentsViewMode('cards')}
                        className={`relative flex items-center justify-center p-1.5 text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden ${
                          studentsViewMode === 'cards'
                            ? 'text-white z-10'
                            : 'text-stone-400 hover:text-stone-600 z-10'
                        }`}
                        style={{width: '36px', height: '36px', borderRadius: '11px'}}
                      >
                        <LayoutGrid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setStudentsViewMode('list')}
                        className={`relative flex items-center justify-center p-1.5 text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden ${
                          studentsViewMode === 'list'
                            ? 'text-white z-10'
                            : 'text-stone-400 hover:text-stone-600 z-10'
                        }`}
                        style={{width: '36px', height: '36px', borderRadius: '11px'}}
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
                      className={`pl-14 ${allStudentsSearchQuery ? 'pr-10' : 'pr-4'} h-11 font-readex text-sm rounded-full overflow-hidden bg-transparent border border-stone-200 w-full mx-auto`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Header for Session Notes view */}
            {activeView === 'sessionnotes' && (
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
                        value={selectedNotesStudentFilter ? "" : notesStudentSearchQuery}
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
                          if (e.key === 'Enter' && !selectedNotesStudentFilter) {
                            const filteredNames = getFilteredStudentNames().filter(name => {
                              // Filter to show only students that appear in session notes
                              const allNotesStudents = [...getInProgressNotes(), ...getDueSoonNotes(), ...getSubmittedNotes()];
                              return allNotesStudents.some(student => student.name === name);
                            });
                            if (filteredNames.length === 1) {
                              setSelectedNotesStudentFilter(filteredNames[0]);
                              setShowNotesStudentDropdown(false);
                              setNotesStudentSearchQuery("");
                            }
                          }
                        }}
                        className={`pl-14 ${selectedNotesStudentFilter ? 'pr-10' : 'pr-4.5'} h-11 font-readex text-base rounded-full overflow-hidden bg-transparent ${selectedNotesStudentFilter ? 'text-stone-900 font-medium placeholder:text-stone-900 placeholder:font-medium' : 'placeholder:text-stone-400'}`}
                        readOnly={!!selectedNotesStudentFilter}
                      />

                      {/* Dropdown */}
                      {showNotesStudentDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          {getFilteredStudentNames().filter(name => {
                            // Filter to show only students that appear in session notes
                            const allNotesStudents = [...getInProgressNotes(), ...getDueSoonNotes(), ...getSubmittedNotes()];
                            return allNotesStudents.some(student => student.name === name);
                          }).filter(name =>
                            name.toLowerCase().includes(notesStudentSearchQuery.toLowerCase())
                          ).map((name) => (
                            <button
                              key={name}
                              onClick={() => {
                                setSelectedNotesStudentFilter(name);
                                setShowNotesStudentDropdown(false);
                                setNotesStudentSearchQuery("");
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                            >
                              <span className="text-stone-900 font-lexend text-sm">{name}</span>
                            </button>
                          ))}
                          {getFilteredStudentNames().filter(name => {
                            const allNotesStudents = [...getInProgressNotes(), ...getDueSoonNotes(), ...getSubmittedNotes()];
                            return allNotesStudents.some(student => student.name === name);
                          }).filter(name =>
                            name.toLowerCase().includes(notesStudentSearchQuery.toLowerCase())
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
                          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V9" stroke="#5046e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.7813 1.96892C14.0797 1.67055 14.4844 1.50293 14.9063 1.50293C15.3283 1.50293 15.733 1.67055 16.0313 1.96892C16.3297 2.26729 16.4973 2.67196 16.4973 3.09392C16.4973 3.51588 16.3297 3.92055 16.0313 4.21892L9.27157 10.9794C9.09348 11.1574 8.87347 11.2876 8.63182 11.3582L6.47707 11.9882C6.41253 12.007 6.34412 12.0081 6.279 11.9914C6.21388 11.9748 6.15444 11.9409 6.10691 11.8933C6.05937 11.8458 6.02549 11.7864 6.0088 11.7212C5.99212 11.6561 5.99325 11.5877 6.01207 11.5232L6.64207 9.36842C6.71297 9.12696 6.84347 8.90721 7.02157 8.72942L13.7813 1.96892Z" stroke="#5046e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                      onClick={() => scrollToSection('in-progress')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'in-progress'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Due soon
                    </button>
                    <button
                      ref={button2RefCallback}
                      onClick={() => scrollToSection('due-soon')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'due-soon'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Late draft
                    </button>
                    <button
                      ref={button3RefCallback}
                      onClick={() => scrollToSection('submitted')}
                      className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                        activeTab === 'submitted'
                          ? 'text-white'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      Just sent
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Content inside card - Different margins for different views */}
            <div className={`${
                activeView === 'schedule'
                  ? 'pl-0 pr-4 pb-6 pt-0'
                  : activeView === 'sessionnotes'
                    ? 'p-9'
                    : activeView === 'home'
                      ? 'p-8'
                      : activeView === 'all' && studentsViewMode === 'list'
                        ? 'p-9 pb-0'
                        : 'p-9'
              } space-y-6 flex-1 overflow-y-auto`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db #f3f4f6',
                padding: activeView === 'home' ? '72px 64px 32px' :
                        (activeView === 'sessionnotes' || activeView === 'schedule') ? '32px 64px' : '32px'
              }}>
              {activeView === 'home' && (
                <div className="space-y-16">
                  {/* Today's Sessions Section */}
                  <div>
                    <div
                      onClick={() => setActiveView('schedule')}
                      className="flex items-center mb-4 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2">
                        <CalendarFold className="w-6 h-6 text-stone-400" />
                        <h2 className="text-xl font-normal text-stone-400 font-lexend">{getSessionsHeading()}</h2>
                        <div className="flex items-center text-stone-200 group-hover:text-indigo-600 transition-colors ml-1">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {(() => {
                        const todaysStudents = getScheduleData().morning.concat(getScheduleData().afternoon, getScheduleData().evening)
                          .filter(student => student.sessionDate && student.sessionDate.getDate() === 28);
                        return todaysStudents.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                handleStudentClick(student.id, todaysStudents);
                              }}
                              scheduleView={true}
                            />
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Late Drafts Section */}
                  <div>
                    <div
                      onClick={() => setActiveView('sessionnotes')}
                      className="flex items-center mb-4 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2">
                        <Timer className="w-6 h-6 text-stone-400" />
                        <h2 className="text-xl font-normal text-stone-400 font-lexend">Late drafts</h2>
                        <div className="flex items-center text-stone-200 group-hover:text-indigo-600 transition-colors ml-1">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {(() => {
                        const lateDraftStudents = mockStudents
                          .filter(student => getSessionReportStatus(student) === 'late');
                        return lateDraftStudents.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                handleStudentClick(student.id, lateDraftStudents);
                              }}
                              sessionNotesView={true}
                            />
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'all' && (
                <section className={studentsViewMode === 'list' ? 'h-full flex flex-col' : ''}>
                  {studentsViewMode === 'cards' ? (
                    <div className="flex justify-center">
                      <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-center max-w-full">
                        {getFilteredUniqueStudents().map((student) => (
                          <StudentCard
                            key={student.name}
                            student={student}
                            onClick={() => handleStudentClick(student.id, getFilteredUniqueStudents())}
                            showNextSession={true}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-stone-200 bg-white flex flex-col overflow-hidden" style={{height: 'calc(100vh - 236px)'}}>
                      {/* Fixed Header */}
                      <div className="border-b border-stone-200 sticky top-0 z-10">
                        <div className="w-full">
                          <div className="flex items-center h-12 text-sm font-medium text-stone-700">
                            <div className="w-12 px-4"></div>
                            <div
                              className={`w-48 px-4 pl-8 cursor-pointer select-none ${getHeaderStyle('name')} hover:text-stone-900 flex items-center`}
                              onClick={() => handleSort('name')}
                            >
                              Name
                              {getSortIcon('name')}
                            </div>
                            <div
                              className={`w-40 px-4 cursor-pointer select-none ${getHeaderStyle('subject')} hover:text-stone-900 flex items-center`}
                              onClick={() => handleSort('subject')}
                            >
                              Focus
                              {getSortIcon('subject')}
                            </div>
                            <div
                              className={`w-40 px-4 cursor-pointer select-none ${getHeaderStyle('nextSession')} hover:text-stone-900 flex items-center`}
                              onClick={() => handleSort('nextSession')}
                            >
                              Next session
                              {getSortIcon('nextSession')}
                            </div>
                            <div
                              className={`flex-1 px-4 cursor-pointer select-none ${getHeaderStyle('email')} hover:text-stone-900 flex items-center`}
                              onClick={() => handleSort('email')}
                            >
                              Email
                              {getSortIcon('email')}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Scrollable Body */}
                      <div className="flex-1 overflow-y-auto" style={{paddingBottom: '36px'}}>
                        <div className="w-full">
                          {getFilteredUniqueStudents().map((student) => {
                            const getInitials = (name: string) => name.charAt(0).toUpperCase();
                            const getSubjectColors = () => {
                              const subject = student.subject?.toLowerCase() || '';
                              if (subject.includes('math')) return 'bg-blue-100 text-blue-700';
                              if (subject.includes('science') || subject.includes('biology') || subject.includes('chemistry')) return 'bg-green-100 text-green-700';
                              if (subject.includes('english') || subject.includes('literature')) return 'bg-purple-100 text-purple-700';
                              if (subject.includes('history')) return 'bg-amber-100 text-amber-700';
                              if (subject.includes('spanish') || subject.includes('language')) return 'bg-pink-100 text-pink-700';
                              if (subject.includes('art') || subject.includes('music')) return 'bg-red-100 text-red-700';
                              if (subject.includes('computer') || subject.includes('coding')) return 'bg-indigo-100 text-indigo-700';
                              if (subject.includes('geography')) return 'bg-teal-100 text-teal-700';
                              return 'bg-stone-100 text-stone-700';
                            };

                            return (
                              <div
                                key={student.name}
                                className="flex items-center cursor-pointer hover:bg-stone-50 border-b border-stone-100 min-h-[68px]"
                                onClick={() => handleStudentClick(student.id, getFilteredUniqueStudents())}
                              >
                                <div className="w-12 px-4 py-4">
                                  <Avatar className="w-10 h-10">
                                    <AvatarFallback className={`${getSubjectColors()} font-medium text-sm`}>
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
                                    {formatSessionTimeToMonthDayTime(student.nextSessionTime || student.sessionTime)}
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
                            <p className="text-sm font-lexend mt-1">Try adjusting your search terms</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {activeView === 'schedule' && (
                <div className="space-y-6 min-w-0 overflow-hidden flex flex-col items-start justify-start">





                  {/* Time Periods */}
                  <div className="space-y-8 min-w-0 mr-16">
                    {/* Morning */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Haze className="w-6 h-6 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Morning</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().morning.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                              dimmed={selectedStudentFilter && student.name !== selectedStudentFilter}
                            />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Afternoon */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <SunMedium className="w-6 h-6 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Afternoon</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().afternoon.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                              dimmed={selectedStudentFilter && student.name !== selectedStudentFilter}
                            />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Evening */}
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <MoonStar className="w-6 h-6 text-stone-400" />
                        <h3 className="text-xl font-normal text-stone-400 font-lexend">Evening</h3>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                        {getScheduleData().evening.map((student) => (
                          <div key={student.id} className="flex-shrink-0">
                            <StudentCard
                              student={student}
                              onClick={() => {
                                const allDayStudents = [...getScheduleData().morning, ...getScheduleData().afternoon, ...getScheduleData().evening];
                                handleStudentClick(student.id, allDayStudents);
                              }}
                              scheduleView={true}
                              dimmed={selectedStudentFilter && student.name !== selectedStudentFilter}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeView === 'sessionnotes' && (
                <div className="space-y-12">
                  {/* In Progress Section */}
                  <section id="in-progress">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">Due soon</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getInProgressNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getInProgressNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getInProgressNotes())}
                          sessionNotesView={true}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Due Soon Section */}
                  <section id="due-soon">
                    <div className="flex items-center gap-2 mb-4">
                      <Timer className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">Late drafts</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getDueSoonNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getDueSoonNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getDueSoonNotes())}
                          sessionNotesView={true}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Submitted Section */}
                  <section id="submitted">
                    <div className="flex items-center gap-2 mb-4">
                      <CircleCheck className="w-6 h-6 text-stone-400" />
                      <h2 className="text-xl font-normal text-stone-400 font-lexend">Just sent</h2>
                      <span className="text-sm text-stone-400 font-lexend">({getSubmittedNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).length})</span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,_180px)] gap-4 justify-start">
                      {getSubmittedNotes().filter(student =>
                        !selectedNotesStudentFilter || student.name === selectedNotesStudentFilter
                      ).map((student) => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          onClick={() => handleStudentClick(student.id, getSubmittedNotes())}
                          sessionNotesView={true}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Sheet */}
      <Sheet open={showStudentOverlay} onOpenChange={handleSheetOpenChange} modal={true}>
        <SheetContent side="right" className="w-[700px] sm:w-[700px] sm:max-w-[700px] p-0 overflow-hidden bg-white" style={{boxShadow: '-1px 0 2px 0 rgba(0, 0, 0, 1)', border: '1px none rgba(68, 64, 60, 1)'}}>
          <SheetTitle className="sr-only">
            {getSelectedStudent()?.name} - Student Details
          </SheetTitle>
          {selectedStudentId && getSelectedStudent() ? (
            <div className="h-full flex flex-col">
              {/* Fixed Header */}
              <div className="sticky top-0 z-10 bg-white">
                {/* Top Control Row */}
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowStudentOverlay(false)}
                      className="p-1 hover:bg-stone-100 rounded transition-colors"
                    >
                      <ChevronsRight className="w-6 h-6 text-stone-400" />
                    </button>
                    <button
                      onClick={handleExpandStudent}
                      className="p-1 hover:bg-stone-100 rounded transition-colors"
                    >
                      <Maximize2 className="w-4 h-4 text-stone-400" strokeWidth={2.25} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={navigatePrevious}
                      disabled={!canNavigatePrevious()}
                      className={`p-1 hover:bg-stone-100 rounded transition-colors ${
                        !canNavigatePrevious() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <ChevronUp className={`w-6 h-6 ${
                        canNavigatePrevious() ? 'text-stone-400' : 'text-stone-300'
                      }`} />
                    </button>
                    <button
                      onClick={navigateNext}
                      disabled={!canNavigateNext()}
                      className={`p-1 hover:bg-stone-100 rounded transition-colors ${
                        !canNavigateNext() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <ChevronDown className={`w-6 h-6 ${
                        canNavigateNext() ? 'text-stone-400' : 'text-stone-300'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Student Info Header */}
                <div className="flex flex-col gap-1.5 py-[30px] pb-3" style={{padding: '30px 60px 12px 54px'}}>
                  <div className="flex items-center justify-between pb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                        <Avatar className="w-full h-full">
                          <AvatarFallback className={`${
                            (() => {
                              const student = getSelectedStudent();
                              if (!student?.subject) return 'bg-stone-100 text-stone-700';
                              const subject = student.subject.toLowerCase();
                              if (subject.includes('math') || subject.includes('algebra') || subject.includes('geometry') || subject.includes('calculus')) {
                                return 'bg-blue-100 text-blue-700';
                              }
                              if (subject.includes('science') || subject.includes('biology') || subject.includes('chemistry') || subject.includes('physics')) {
                                return 'bg-green-100 text-green-700';
                              }
                              if (subject.includes('english') || subject.includes('literature') || subject.includes('writing')) {
                                return 'bg-purple-100 text-purple-700';
                              }
                              if (subject.includes('history') || subject.includes('social')) {
                                return 'bg-amber-100 text-amber-700';
                              }
                              if (subject.includes('spanish') || subject.includes('french') || subject.includes('language')) {
                                return 'bg-pink-100 text-pink-700';
                              }
                              if (subject.includes('art') || subject.includes('music') || subject.includes('creative')) {
                                return 'bg-red-100 text-red-700';
                              }
                              if (subject.includes('computer') || subject.includes('coding') || subject.includes('programming')) {
                                return 'bg-indigo-100 text-indigo-700';
                              }
                              if (subject.includes('geography') || subject.includes('earth')) {
                                return 'bg-teal-100 text-teal-700';
                              }
                              return 'bg-stone-100 text-stone-700';
                            })()
                          } font-medium text-2xl`}>
                            {getSelectedStudent()?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col py-0.5 justify-center gap-0.5">
                        <h1 className="text-[30px] font-semibold text-stone-900 font-lexend leading-9 -tracking-[0.15px]">
                          {getSelectedStudent()?.name}
                        </h1>
                        <p className="text-base font-medium text-stone-700 font-lexend leading-5 -tracking-[0.08px]">
                          {getSelectedStudent()?.subject}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-1 px-4 py-2 border border-stone-200 bg-white">
                      <span className="text-sm font-medium text-stone-700 font-lexend">Actions</span>
                      <ChevronsUpDown className="w-6 h-6 text-stone-300" />
                    </Button>
                  </div>

                  {/* Session Times */}
                  <div className="flex flex-col">
                    {(() => {
                      const student = getSelectedStudent();
                      if (!student) return null;

                      // Today is July 28, 2025
                      const today = new Date(2025, 6, 28); // July 28, 2025

                      // Student session data mapping
                      const studentSessionData = {
                        'Alex': {
                          next: { time: '9:00am', date: 'Mon 4 August', status: 'wait' },
                          previous: { time: '9:00am', date: 'today, 28 July', status: 'done' }
                        },
                        'Carlos': {
                          next: { time: '8:00pm', date: 'Tue 29 July', status: 'wait' },
                          previous: { time: '8:00pm', date: 'Mon 21 July', status: 'done' }
                        },
                        'Daniel': {
                          next: { time: '2:00pm', date: 'Thu 31 July', status: 'wait' },
                          previous: { time: '2:00pm', date: 'Thu 24 July', status: 'done' }
                        },
                        'Emma': {
                          next: { time: '3:00pm', date: 'Mon 4 August', status: 'wait' },
                          previous: { time: '3:00pm', date: 'today, 28 July', status: 'in-progress' }
                        },
                        'Isabella': {
                          next: { time: '1:30pm', date: 'Thu 31 July', status: 'wait' },
                          previous: { time: '1:30pm', date: 'Mon 21 July', status: 'late' }
                        },
                        'Kai': {
                          next: { time: '6:00pm', date: 'Fri 8 August', status: 'wait' },
                          previous: null
                        },
                        'Liam': {
                          next: { time: '9:00am', date: 'Thu 31 July', status: 'wait' },
                          previous: { time: '9:00am', date: 'Thu 24 July', status: 'late' }
                        },
                        'Luna': {
                          next: { time: '2:00pm', date: 'Thu 7 August', status: 'wait' },
                          previous: null
                        },
                        'Marcus': {
                          current: { time: '7:00pm', date: 'today, 28 July', status: 'wait' },
                          previous: { time: '7:00pm', date: 'Mon 21 July', status: 'late' }
                        }
                      };

                      const sessions = studentSessionData[student.name] || {};

                      // Get icon and color based on status
                      const getSessionIcon = (status: string) => {
                        switch (status) {
                          case 'wait':
                            return { icon: Clock, color: 'text-stone-400' };
                          case 'in-progress':
                            return { icon: LoaderCircle, color: 'text-indigo-600' };
                          case 'done':
                            return { icon: CircleCheck, color: 'text-green-500' };
                          case 'late':
                            return { icon: Timer, color: 'text-pink-600' };
                          default:
                            return { icon: Clock, color: 'text-stone-400' };
                        }
                      };

                      // Get button text based on status
                      const getButtonText = (status: string) => {
                        if (status === 'done') return 'View notes';
                        if (status === 'wait') return 'Add notes';
                        return 'Edit notes';
                      };

                      const sessions_to_show = [];

                      // Show next session first (if exists)
                      if (sessions.next) {
                        sessions_to_show.push({
                          ...sessions.next,
                          key: 'next'
                        });
                      }

                      // Show current session (if exists)
                      if (sessions.current) {
                        sessions_to_show.push({
                          ...sessions.current,
                          key: 'current'
                        });
                      }

                      // Always show previous session (if exists)
                      if (sessions.previous) {
                        sessions_to_show.push({
                          ...sessions.previous,
                          key: 'previous'
                        });
                      }

                      return sessions_to_show.map((session, index) => {
                        const iconConfig = getSessionIcon(session.status);
                        const IconComponent = iconConfig.icon;
                        const buttonText = getButtonText(session.status);

                        return (
                          <button
                            key={session.key}
                            className="group flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer text-left w-auto"
                            style={{margin: '0 36px 0 28px'}}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 flex justify-end pr-1.5">
                                <IconComponent className={`w-[18px] h-[18px] ${iconConfig.color}`} />
                              </div>
                              <span className="text-base font-lexend leading-4.5 -tracking-[0.08px]" style={{
                                fontWeight: session.key === 'previous' ? '400' : '600',
                                color: session.key === 'previous' ? 'rgba(87, 83, 78, 1)' : 'rgba(68, 64, 60, 1)'
                              }}>
                                {session.time}, {session.date}
                              </span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded bg-white">
                                <span className="text-stone-400 font-lexend text-xs font-normal leading-4">
                                  {buttonText}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      });
                    })()}
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex justify-center pt-6" style={{marginLeft: '6px'}}>
                    <div className="flex p-1.5 border border-stone-200 rounded-xl bg-white">
                      <button
                        onClick={() => setStudentDetailTab('next-session')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all ${
                          studentDetailTab === 'next-session'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        Next session
                      </button>
                      <button
                        onClick={() => {
                          setStudentDetailTab('observations');
                          scrollToSection('observations-section');
                        }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all ${
                          studentDetailTab === 'observations'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        Observations
                      </button>
                      <button
                        onClick={() => setStudentDetailTab('goals')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all ${
                          studentDetailTab === 'goals'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        Goals
                      </button>
                      <button
                        onClick={() => setStudentDetailTab('session-notes')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all ${
                          studentDetailTab === 'session-notes'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        Session Notes
                      </button>
                      <button
                        onClick={() => setStudentDetailTab('assignments')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-all ${
                          studentDetailTab === 'assignments'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        Assignments
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-[60px] pt-5 pb-12">
                {studentDetailTab === 'next-session' && (
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
                            Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.
                          </p>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                            Apply 2D shape formulas in word problems to build real-world problem-solving skills.
                          </p>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <div className="w-4 h-4 rounded-md border-2 border-stone-700"></div>
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                            Introduce multi-step problems involving both perimeter/area and decimal rounding.
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
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <ArrowRight className="w-4 h-4 text-stone-700" />
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
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
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <ArrowRight className="w-4 h-4 text-stone-700" />
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
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
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <ArrowRight className="w-4 h-4 text-stone-700" />
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                            Demonstrated improved accuracy in identifying decimal positions with visual support.{' '}
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
                        <div className="flex items-start gap-1.5">
                          <div className="pt-0.5">
                            <ArrowRight className="w-4 h-4 text-stone-700" />
                          </div>
                          <p className="text-base font-normal text-stone-900 font-lexend leading-5">
                            Made progress toward independent problem-solving with fewer rounding errors.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                              <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>7 July 25</span>
                              </span>
                              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                  <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
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
                            Joined the session late but used remaining time effectively to reinforce key math skills.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                              <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>30 June 25</span>
                              </span>
                              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                  <span className="text-stone-900 font-lexend text-sm whitespace-nowrap">View notes</span>
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
                            Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.{' '}
                            <span className="relative inline-block group" style={{verticalAlign: 'middle', marginLeft: '4px', height: 'auto', lineHeight: '20px'}}>
                              <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer" style={{lineHeight: '20px', height: '14px', flexGrow: 0, verticalAlign: '4px'}}>
                                <span className="text-stone-400 group-hover:text-white font-lexend font-normal" style={{fontSize: '8px'}}>23 June 25</span>
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
                  </div>
                )}

                {studentDetailTab === 'observations' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Observations content coming soon...</p>
                  </div>
                )}

                {studentDetailTab === 'goals' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Goals content coming soon...</p>
                  </div>
                )}

                {studentDetailTab === 'session-notes' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Session notes content coming soon...</p>
                  </div>
                )}

                {studentDetailTab === 'assignments' && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">Assignments content coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-stone-500">Loading student details...</div>
            </div>
          )}
        </SheetContent>
      </Sheet>


      </div>
    </TooltipProvider>
  );
}
