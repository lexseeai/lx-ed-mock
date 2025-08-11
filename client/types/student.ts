export interface Student {
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
  nextSessionTime?: string;
}
