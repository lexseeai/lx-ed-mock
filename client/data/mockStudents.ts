import { Student } from "@/types/student";

export const mockStudents: Student[] = [
  // July 14th - 2 sessions: all done
  {
    id: "1",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, July 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 6, 14),
    sessionReportCompleted: true,
    email: "alex.johnson@email.com",
  }, // Done
  {
    id: "2",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, July 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 6, 14),
    sessionReportCompleted: true,
    email: "emma.wilson@email.com",
  }, // Done

  // July 15th - 1 session: done
  {
    id: "3",
    name: "Marcus",
    subject: "English Tutoring",
    sessionTime: "10:00am, July 15",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 6, 15),
    sessionReportCompleted: true,
    email: "marcus.brown@email.com",
  }, // Done

  // July 17th - 2 sessions: all done
  {
    id: "4",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "9:00am, July 17",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 6, 17),
    sessionReportCompleted: true,
    email: "sofia.garcia@email.com",
  }, // Done
  {
    id: "5",
    name: "Liam",
    subject: "Math Tutoring",
    sessionTime: "2:00pm, July 17",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 6, 17),
    sessionReportCompleted: true,
    email: "liam.davis@email.com",
  }, // Done

  // July 18th - 1 session: done
  {
    id: "6",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, July 18",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 6, 18),
    sessionReportCompleted: true,
    email: "isabella.martinez@email.com",
  }, // Done

  // July 21st - 3 sessions: 2 done, 1 late
  {
    id: "7",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, July 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 6, 21),
    sessionReportCompleted: true,
  }, // Done
  {
    id: "8",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, July 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 6, 21),
    sessionReportCompleted: true,
  }, // Done
  {
    id: "9",
    name: "Marcus",
    subject: "English Tutoring",
    sessionTime: "7:00pm, July 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 6, 21),
    sessionReportCompleted: false,
  }, // Late

  // July 23rd - 1 session: late
  {
    id: "10",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, July 23",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 6, 23),
    sessionReportCompleted: false,
  }, // Late

  // July 24th - 2 sessions: both late
  {
    id: "11",
    name: "Liam",
    subject: "Math Tutoring",
    sessionTime: "9:00am, July 24",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 6, 24),
    sessionReportCompleted: false,
  }, // Late
  {
    id: "12",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "1:30pm, July 24",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 6, 24),
    sessionReportCompleted: false,
  }, // Late

  // July 28th - 3 sessions: Alex = done, Emma = in-progress, Marcus = Waiting
  {
    id: "13",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, July 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 6, 28, 9, 0, 0),
    sessionReportCompleted: true,
  }, // Done (9am, completed)
  {
    id: "14",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, July 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 6, 28, 15, 0, 0),
    sessionReportCompleted: false,
  }, // In progress (3pm, within window, not completed)
  // Marcus July 28 session removed - next session is August 5

  // July 29th - all waiting
  {
    id: "16",
    name: "Carlos",
    subject: "Physics Tutoring",
    sessionTime: "8:00pm, August 3",
    sessionDate: new Date(2025, 7, 3),
    sessionReportCompleted: false,
    email: "carlos.rodriguez@email.com",
  }, // Waiting

  // July 31st - all waiting
  {
    id: "17",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, August 5",
    sessionDate: new Date(2025, 7, 5),
    sessionReportCompleted: false,
    email: "maya.patel@email.com",
  }, // Waiting
  {
    id: "18",
    name: "Daniel",
    subject: "Biology Tutoring",
    sessionTime: "2:00pm, August 4",
    sessionDate: new Date(2025, 7, 4),
    sessionReportCompleted: false,
    email: "daniel.kim@email.com",
  }, // Waiting
  {
    id: "19",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, August 6",
    sessionDate: new Date(2025, 7, 6),
    sessionReportCompleted: false,
    email: "zoe.taylor@email.com",
  }, // Waiting
  {
    id: "20",
    name: "Liam",
    subject: "Chemistry Tutoring",
    sessionTime: "9:00am, August 6",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 7, 6),
    sessionReportCompleted: false,
    email: "liam.davis@email.com",
  }, // Waiting
  {
    id: "21",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, August 2",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 2),
    sessionReportCompleted: false,
    email: "isabella.martinez@email.com",
  }, // Waiting

  // August sessions - all waiting
  {
    id: "22",
    name: "Oliver",
    subject: "Geography Tutoring",
    sessionTime: "8:00am, August 8",
    sessionDate: new Date(2025, 7, 8),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "23",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, August 4",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 7, 4),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "24",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, August 1",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 7, 1),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "25",
    name: "Marcus",
    subject: "History Tutoring",
    sessionTime: "4:00pm, August 5",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 7, 5),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "26",
    name: "Carlos",
    subject: "Physics Tutoring",
    sessionTime: "8:00pm, August 3",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 7, 3),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "27",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, August 7",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "28",
    name: "Luna",
    subject: "Literature Tutoring",
    sessionTime: "1:00pm, August 10",
    sessionDate: new Date(2025, 7, 10),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "29",
    name: "Liam",
    subject: "Chemistry Tutoring",
    sessionTime: "9:00am, August 6",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 7, 6),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "30",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "1:30pm, August 7",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "31",
    name: "Kai",
    subject: "English Tutoring",
    sessionTime: "6:00pm, August 7",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "32",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, August 8",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 8),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "33",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, August 11",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 7, 11),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "34",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, August 11",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 7, 11),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "35",
    name: "Marcus",
    subject: "English Tutoring",
    sessionTime: "7:00pm, August 11",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 7, 11),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "36",
    name: "Carlos",
    subject: "Chemistry Tutoring",
    sessionTime: "8:00pm, August 12",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 7, 12),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "37",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, August 13",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 7, 13),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "38",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "9:00am, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "39",
    name: "Liam",
    subject: "Math Tutoring",
    sessionTime: "2:00pm, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "40",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "1:30pm, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "41",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, August 15",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 15),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "42",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, August 18",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 7, 18),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "43",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, August 18",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 7, 18),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "44",
    name: "Marcus",
    subject: "English Tutoring",
    sessionTime: "7:00pm, August 18",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 7, 18),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "45",
    name: "Carlos",
    subject: "Chemistry Tutoring",
    sessionTime: "8:00pm, August 19",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 7, 19),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "46",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, August 20",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 7, 20),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "47",
    name: "Liam",
    subject: "Math Tutoring",
    sessionTime: "2:00pm, August 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 7, 21),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "48",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "1:30pm, August 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 21),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "49",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, August 22",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 22),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "50",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, August 25",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 7, 25),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "51",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, August 25",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 7, 25),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "52",
    name: "Marcus",
    subject: "English Tutoring",
    sessionTime: "7:00pm, August 25",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 7, 25),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "53",
    name: "Carlos",
    subject: "Chemistry Tutoring",
    sessionTime: "8:00pm, August 26",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 7, 26),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "54",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, August 27",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 7, 27),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "55",
    name: "Liam",
    subject: "Math Tutoring",
    sessionTime: "2:00pm, August 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 7, 28),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "56",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "1:30pm, August 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 28),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "57",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, August 29",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 7, 29),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "58",
    name: "Daniel",
    subject: "Art Tutoring",
    sessionTime: "2:00pm, August 7",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "59",
    name: "Daniel",
    subject: "Art Tutoring",
    sessionTime: "2:00pm, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "60",
    name: "Daniel",
    subject: "Art Tutoring",
    sessionTime: "2:00pm, August 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel",
    sessionDate: new Date(2025, 7, 21),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "61",
    name: "Daniel",
    subject: "Art Tutoring",
    sessionTime: "2:00pm, August 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel",
    sessionDate: new Date(2025, 7, 28),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "62",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, August 7",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "63",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "64",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, August 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    sessionDate: new Date(2025, 7, 21),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "65",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, August 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    sessionDate: new Date(2025, 7, 28),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "66",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, August 7",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    sessionDate: new Date(2025, 7, 7),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "67",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, August 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    sessionDate: new Date(2025, 7, 14),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "68",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, August 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    sessionDate: new Date(2025, 7, 21),
    sessionReportCompleted: false,
  }, // Waiting
  {
    id: "69",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, August 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    sessionDate: new Date(2025, 7, 28),
    sessionReportCompleted: false,
  }, // Waiting
];
