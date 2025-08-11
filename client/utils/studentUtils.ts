import { Student } from "@/types/student";

export function getSessionReportStatus(student: Student) {
  if (!student.sessionDate) return "waiting";

  // Use demo date of July 28, 2025 at 4:00 PM for consistent status calculation
  const now = new Date(2025, 6, 28, 16, 0, 0); // July 28, 2025 4:00 PM
  const sessionDate = student.sessionDate;
  const hoursSinceSession =
    (now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);

  // If session hasn't happened yet
  if (sessionDate > now) return "waiting";

  // If session report is completed
  if (student.sessionReportCompleted) return "done";

  // If session was more than 48 hours ago
  if (hoursSinceSession > 48) return "late";

  // If session was within 48 hours and not completed
  return "active";
}

export function getSessionBadgeConfig(status: string) {
  switch (status) {
    case "done":
      return { icon: "CircleCheck", color: "text-green-500" };
    case "active":
      return { icon: "LoaderCircle", color: "text-indigo-600" };
    case "late":
      return { icon: "Timer", color: "text-pink-600" };
    case "waiting":
    default:
      return { icon: "Loader", color: "text-stone-400" };
  }
}

// Get unique students with their next session after July 28, 4pm
export function getUniqueStudentsWithNextSession(students: Student[]) {
  const now = new Date(2025, 6, 28, 16, 0, 0); // July 28, 2025 4:00 PM
  const uniqueStudents = new Map();

  // Group all students by name and find their next session
  students.forEach((student) => {
    if (!student.sessionDate) return;

    // Only consider sessions after 4pm on July 28th
    if (student.sessionDate <= now) return;

    const studentName = student.name;
    if (
      !uniqueStudents.has(studentName) ||
      (uniqueStudents.get(studentName).sessionDate &&
        student.sessionDate < uniqueStudents.get(studentName).sessionDate)
    ) {
      uniqueStudents.set(studentName, {
        ...student,
        nextSessionTime: student.sessionTime,
      });
    }
  });

  return Array.from(uniqueStudents.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

// Get avatar colors based on tutoring subject
export function getSubjectColors(subject?: string) {
  const subjectLower = subject?.toLowerCase() || "";

  // Group similar subjects together
  if (
    subjectLower.includes("math") ||
    subjectLower.includes("algebra") ||
    subjectLower.includes("geometry") ||
    subjectLower.includes("calculus")
  ) {
    return "bg-blue-100 text-blue-700";
  }
  if (
    subjectLower.includes("science") ||
    subjectLower.includes("biology") ||
    subjectLower.includes("chemistry") ||
    subjectLower.includes("physics")
  ) {
    return "bg-green-100 text-green-700";
  }
  if (
    subjectLower.includes("english") ||
    subjectLower.includes("literature") ||
    subjectLower.includes("writing")
  ) {
    return "bg-purple-100 text-purple-700";
  }
  if (subjectLower.includes("history") || subjectLower.includes("social")) {
    return "bg-amber-100 text-amber-700";
  }
  if (
    subjectLower.includes("spanish") ||
    subjectLower.includes("french") ||
    subjectLower.includes("language")
  ) {
    return "bg-pink-100 text-pink-700";
  }
  if (
    subjectLower.includes("art") ||
    subjectLower.includes("music") ||
    subjectLower.includes("creative")
  ) {
    return "bg-red-100 text-red-700";
  }
  if (
    subjectLower.includes("computer") ||
    subjectLower.includes("coding") ||
    subjectLower.includes("programming")
  ) {
    return "bg-indigo-100 text-indigo-700";
  }
  if (subjectLower.includes("geography") || subjectLower.includes("earth")) {
    return "bg-teal-100 text-teal-700";
  }

  // Default color for unknown subjects
  return "bg-stone-100 text-stone-700";
}

export function getInitials(name: string) {
  return name.charAt(0).toUpperCase();
}

// Helper functions to categorize session notes by status
export function getInProgressNotes(students: Student[]) {
  return students
    .filter((student) => {
      const status = getSessionReportStatus(student);
      // Include both 'active' (in-progress) and 'waiting' students with sessions on July 28th
      if (status === "active") return true;
      if (status === "waiting" && student.sessionDate) {
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
}

export function getDueSoonNotes(students: Student[]) {
  return students
    .filter((student) => getSessionReportStatus(student) === "late")
    .sort((a, b) => {
      // Sort by most recent session date first
      if (!a.sessionDate || !b.sessionDate) return 0;
      return b.sessionDate.getTime() - a.sessionDate.getTime();
    });
}

export function getSubmittedNotes(students: Student[]) {
  return students
    .filter((student) => getSessionReportStatus(student) === "done")
    .sort((a, b) => {
      // Sort by most recent session date first
      if (!a.sessionDate || !b.sessionDate) return 0;
      return b.sessionDate.getTime() - a.sessionDate.getTime();
    });
}

// Get unique student names for filtering
export function getUniqueStudentNames(students: Student[]) {
  const names = [...new Set(students.map((s) => s.name))];
  return names.sort();
}

// Get days that have sessions for a specific student
export function getStudentSessionDays(students: Student[], studentName: string) {
  const studentSessions = students.filter((s) => s.name === studentName);
  const days = new Set<string>();

  studentSessions.forEach((session) => {
    if (session.sessionDate) {
      days.add(session.sessionDate.getDate().toString());
    }
  });

  return Array.from(days);
}
