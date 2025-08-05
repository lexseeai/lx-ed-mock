import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  UsersRound,
  NotebookText,
  LibraryBig,
  FileAudio,
  Rabbit,
  ChevronsUpDown,
  PanelLeft,
  Clock,
  Calendar,
  CalendarFold,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Haze,
  SunMedium,
  MoonStar,
  X,
  Maximize2,
  MoreVertical,
  Loader,
  Timer,
  NotebookPen,
  CircleCheck,
  Edit,
  Pencil,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  UserRoundSearch,
  LoaderCircle,
  UserRound,
  Search,
  UserRoundPlus,
  Plus,
  Siren,
  Copy,
  Edit3,
  RefreshCw,
  Eye,
  FileText,
  Brain,
  LayoutGrid,
  List,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

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

interface SessionData {
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  isCompleted: boolean;
}

// Mock student data that matches the sidebar content
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, July 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 6, 14),
    sessionReportCompleted: true,
    email: "alex.johnson@email.com",
  },
  {
    id: "2",
    name: "Emma",
    subject: "Science Tutoring",
    sessionTime: "3:00pm, July 14",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    sessionDate: new Date(2025, 6, 14),
    sessionReportCompleted: true,
    email: "emma.wilson@email.com",
  },
  {
    id: "3",
    name: "Marcus",
    subject: "History Tutoring",
    sessionTime: "4:00pm, July 28",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    sessionDate: new Date(2025, 6, 28),
    sessionReportCompleted: false,
    email: "marcus.brown@email.com",
  },
  {
    id: "4",
    name: "Isabella",
    subject: "Spanish Tutoring",
    sessionTime: "11:00am, July 21",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella",
    sessionDate: new Date(2025, 6, 21),
    sessionReportCompleted: false,
    email: "isabella.garcia@email.com",
  },
  {
    id: "5",
    name: "Carlos",
    subject: "Physics Tutoring",
    sessionTime: "8:00pm, July 29",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 6, 29),
    sessionReportCompleted: false,
    email: "carlos.rodriguez@email.com",
  },
  {
    id: "6",
    name: "Daniel",
    subject: "Biology Tutoring",
    sessionTime: "2:00pm, July 24",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel",
    sessionDate: new Date(2025, 6, 24),
    sessionReportCompleted: false,
    email: "daniel.lee@email.com",
  },
  {
    id: "7",
    name: "Liam",
    subject: "Chemistry Tutoring",
    sessionTime: "9:00am, July 24",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    sessionDate: new Date(2025, 6, 24),
    sessionReportCompleted: false,
    email: "liam.smith@email.com",
  },
  {
    id: "8",
    name: "Kai",
    subject: "English Tutoring",
    sessionTime: "6:00pm, August 1",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Kai",
    sessionDate: new Date(2025, 7, 1),
    sessionReportCompleted: false,
    email: "kai.chen@email.com",
  },
  {
    id: "9",
    name: "Oliver",
    subject: "Geography Tutoring",
    sessionTime: "8:00am, August 4",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver",
    sessionDate: new Date(2025, 7, 4),
    sessionReportCompleted: false,
    email: "oliver.jones@email.com",
  },
  {
    id: "23",
    name: "Alex",
    subject: "Math Tutoring",
    sessionTime: "9:00am, August 4",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    sessionDate: new Date(2025, 7, 4),
    sessionReportCompleted: false,
    email: "alex.johnson@email.com",
  },
  {
    id: "16",
    name: "Carlos",
    subject: "Physics Tutoring",
    sessionTime: "8:00pm, July 29",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",
    sessionDate: new Date(2025, 6, 29),
    sessionReportCompleted: false,
    email: "carlos.rodriguez@email.com",
  },
  {
    id: "17",
    name: "Maya",
    subject: "Biology Tutoring",
    sessionTime: "10:00am, July 31",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    sessionDate: new Date(2025, 6, 31),
    sessionReportCompleted: false,
    email: "maya.patel@email.com",
  },
  {
    id: "19",
    name: "Zoe",
    subject: "Music Tutoring",
    sessionTime: "4:00pm, July 31",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    sessionDate: new Date(2025, 6, 31),
    sessionReportCompleted: false,
    email: "zoe.taylor@email.com",
  },
  {
    id: "28",
    name: "Luna",
    subject: "Literature Tutoring",
    sessionTime: "1:00pm, August 6",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna",
    sessionDate: new Date(2025, 7, 6),
    sessionReportCompleted: false,
    email: "luna.rodriguez@email.com",
  },
  {
    id: "10",
    name: "Sofia",
    subject: "History Tutoring",
    sessionTime: "10:30am, July 23",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia",
    sessionDate: new Date(2025, 6, 23),
    sessionReportCompleted: false,
    email: "sofia.garcia@email.com",
  },
];

function Sidebar({
  activeView,
  setActiveView,
  selectedStudentId,
}: {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedStudentId: string | null;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return { text: "Good morning", icon: Haze };
    } else if (hour < 18) {
      return { text: "Good afternoon", icon: SunMedium };
    } else {
      return { text: "Good evening", icon: MoonStar };
    }
  };

  const greeting = getTimeBasedGreeting();
  const GreetingIcon = greeting.icon;

  // Find the selected student
  const selectedStudent = mockStudents.find((s) => s.id === selectedStudentId);

  return (
    <div
      className={`${isCollapsed ? "w-16 min-w-16" : "w-60 min-w-60"} flex flex-col min-h-screen-safe transition-all duration-300 flex-shrink-0 bg-indigo-900`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pl-4 pr-0 py-4">
        {!isCollapsed && (
          <h1 className="text-lg font-medium text-white font-lexend">
            Lexsee Educator
          </h1>
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
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              activeView === "home"
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-950"
            }`}
            onClick={() => setActiveView("home")}
          >
            <div className="flex items-center space-x-2">
              <GreetingIcon
                className={`w-4 h-4 ${activeView === "home" ? "text-white" : "text-white/80"}`}
              />
              {!isCollapsed && (
                <span
                  className={`text-sm font-lexend ${activeView === "home" ? "text-white" : "text-white"}`}
                >
                  {greeting.text}
                </span>
              )}
            </div>
          </div>

          {/* My Students - Highlighted when on student page */}
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              selectedStudent
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-950"
            }`}
            onClick={() => setActiveView("all")}
          >
            <div className="flex items-center space-x-2">
              <UsersRound
                className={`w-4 h-4 ${selectedStudent ? "text-white" : "text-white/80"}`}
              />
              {!isCollapsed && (
                <span
                  className={`text-sm font-lexend ${selectedStudent ? "text-white" : "text-white"}`}
                >
                  Students
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Spacer above sessions */}
        <div className="my-3"></div>

        {/* Sessions Section */}
        <div>
          {/* Sessions Label */}
          {!isCollapsed && (
            <span className="text-xs font-medium text-white/50 font-lexend ml-3 mt-3 mb-1 block">
              Sessions
            </span>
          )}
          <div className="space-y-1">
            {/* Schedule */}
            <div
              className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 py-1 rounded-lg cursor-pointer h-9 leading-6 ${
                activeView === "schedule"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-indigo-950"
              }`}
              onClick={() => setActiveView("schedule")}
            >
              <div className="flex items-center space-x-2">
                <Calendar
                  className={`w-4 h-4 ${activeView === "schedule" ? "text-white" : "text-white/80"}`}
                />
                {!isCollapsed && (
                  <span
                    className={`text-sm font-lexend ${activeView === "schedule" ? "text-white" : "text-white"}`}
                  >
                    Upcoming
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <span
                  className={`text-sm font-lexend ${activeView === "schedule" ? "text-white" : "text-white/50"}`}
                >
                  7
                </span>
              )}
            </div>

            {/* Session Notes */}
            <div
              className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 py-1 rounded-lg cursor-pointer h-8 ${
                activeView === "sessionnotes"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-indigo-950"
              }`}
              onClick={() => setActiveView("sessionnotes")}
            >
              <div className="flex items-center space-x-2">
                <NotebookText
                  className={`w-4 h-4 ${activeView === "sessionnotes" ? "text-white" : "text-white/80"}`}
                />
                {!isCollapsed && (
                  <span
                    className={`text-sm font-lexend ${activeView === "sessionnotes" ? "text-white" : "text-white"}`}
                  >
                    Notes dues
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <span
                  className={`text-sm font-lexend ${activeView === "sessionnotes" ? "text-white" : "text-white/50"}`}
                >
                  4
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="my-3"></div>

        {/* Other Navigation Items */}
        <div className="space-y-1 flex-1">
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}
          >
            <LibraryBig className="w-4 h-4 text-white/80" />
            {!isCollapsed && (
              <span className="text-sm text-white font-lexend ml-2">
                Library
              </span>
            )}
          </div>

          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}
          >
            <FileAudio className="w-4 h-4 text-white/80" />
            {!isCollapsed && (
              <span className="text-sm text-white font-lexend ml-2">
                Assignments
              </span>
            )}
          </div>

          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg hover:bg-indigo-950 h-8`}
          >
            <Rabbit className="w-4 h-4 text-white/80" />
            {!isCollapsed && (
              <span className="text-sm text-white font-lexend ml-2">
                Lexsee Reader
              </span>
            )}
          </div>
        </div>
      </div>

      {/* User Profile at Bottom */}
      <div className="py-3 pl-3 pr-0">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-2 py-1 rounded-lg hover:bg-indigo-950`}
        >
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 rounded-xl">
              <AvatarFallback className="bg-stone-200 text-stone-600 text-xs rounded-xl">
                JR
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <span className="text-sm font-medium text-white font-lexend">
                Jessica Reed
              </span>
            )}
          </div>
          {!isCollapsed && (
            <ChevronsUpDown className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </div>
    </div>
  );
}

function getSubjectColors(subject: string) {
  const subjectLower = subject?.toLowerCase() || "";

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

  return "bg-stone-100 text-stone-700";
}

export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("snapshot");
  const [activeView, setActiveView] = useState("student");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("july-18");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [toggleView, setToggleView] = useState<"brain" | "filetext">("brain");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotesOverlay, setShowNotesOverlay] = useState(false);
  const [notesMode, setNotesMode] = useState<"view" | "add" | "edit">("view");
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search mode handlers
  const enterSearchMode = () => {
    setIsSearchMode(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };

  const exitSearchMode = () => {
    setIsSearchMode(false);
    setSearchQuery("");
  };

  // Tab measurement state and refs for sliding indicator
  const [buttonMeasurements, setButtonMeasurements] = useState<{
    button1?: number;
    button2?: number;
    button3?: number;
    button4?: number;
    button5?: number;
  }>({});

  // Ref callbacks that measure immediately when elements are mounted
  const button1RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      // Use requestAnimationFrame for immediate measurement without delay
      requestAnimationFrame(() => {
        setButtonMeasurements((prev) => ({ ...prev, button1: el.offsetWidth }));
      });
    }
  };

  const button2RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setButtonMeasurements((prev) => ({ ...prev, button2: el.offsetWidth }));
      });
    }
  };

  const button3RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setButtonMeasurements((prev) => ({ ...prev, button3: el.offsetWidth }));
      });
    }
  };

  const button4RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setButtonMeasurements((prev) => ({ ...prev, button4: el.offsetWidth }));
      });
    }
  };

  const button5RefCallback = (el: HTMLButtonElement | null) => {
    if (el) {
      requestAnimationFrame(() => {
        setButtonMeasurements((prev) => ({ ...prev, button5: el.offsetWidth }));
      });
    }
  };

  // Calculate tab position and width
  const getTabPosition = () => {
    const { button1, button2, button3, button4, button5 } = buttonMeasurements;

    if (!button1 || !button2 || !button3 || !button4 || !button5) {
      return null;
    }

    switch (activeTab) {
      case "search":
        return { left: 6, width: button1 };
      case "snapshot":
        return { left: 6 + button1, width: button2 };
      case "goals":
        return { left: 6 + button1 + button2, width: button3 };
      case "session-notes":
        return { left: 6 + button1 + button2 + button3, width: button4 };
      case "assignments":
        return {
          left: 6 + button1 + button2 + button3 + button4,
          width: button5,
        };
      default:
        return { left: 6 + button1, width: button2 };
    }
  };

  // Find the student data
  const student = mockStudents.find((s) => s.id === studentId);

  const handleBackClick = () => {
    // Store the desired view in sessionStorage so the Index page can read it
    sessionStorage.setItem("returnToView", "all");
    navigate("/");
  };

  // Get student-specific session content
  const getStudentSessionContent = () => {
    const studentContentMap = {
      "1": {
        // Alex
        nextSessionItems: [
          "Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.",
          "Apply 2D shape formulas in word problems to build real-world problem-solving skills.",
          "Introduce multi-step problems involving both perimeter/area and decimal rounding.",
        ],
        nextSessionDate: "4 Aug 25",
        previousSessionDate: "28 July 25",
        nextSessionTime: "9:00-9:45am",
        previousSessionTime: "9:00-9:45am",
      },
      "2": {
        // Emma
        nextSessionItems: [
          "Review chemical bonding concepts and practice drawing Lewis structures.",
          "Complete lab analysis of molecular structures and their properties.",
          "Apply periodic trends to predict chemical behavior in reactions.",
        ],
        nextSessionDate: "1 Aug 25",
        previousSessionDate: "14 July 25",
        nextSessionTime: "3:00-3:45pm",
        previousSessionTime: "3:00-3:45pm",
      },
      "3": {
        // Marcus
        nextSessionItems: [
          "Analyze primary source documents from the American Civil War era.",
          "Compare different historical perspectives on Reconstruction policies.",
          "Practice writing thesis statements for historical argumentative essays.",
        ],
        nextSessionDate: "5 Aug 25",
        previousSessionDate: "28 July 25",
        nextSessionTime: "4:00-4:45pm",
        previousSessionTime: "4:00-4:45pm",
      },
      "4": {
        // Isabella
        nextSessionItems: [
          "Practice subjunctive mood in hypothetical situations and formal requests.",
          "Review irregular verb conjugations in preterite and imperfect tenses.",
          "Conduct conversation practice focusing on cultural topics from Spain.",
        ],
        nextSessionDate: "2 Aug 25",
        previousSessionDate: "21 July 25",
        nextSessionTime: "11:00-11:45am",
        previousSessionTime: "11:00-11:45am",
      },
      "5": {
        // Carlos
        nextSessionItems: [
          "Solve projectile motion problems using kinematic equations.",
          "Apply conservation of momentum in collision scenarios.",
          "Practice energy calculations for pendulum and spring systems.",
        ],
        nextSessionDate: "3 Aug 25",
        previousSessionDate: "29 July 25",
        nextSessionTime: "8:00-8:45pm",
        previousSessionTime: "8:00-8:45pm",
      },
      "6": {
        // Daniel
        nextSessionItems: [
          "Study cellular respiration and photosynthesis energy cycles.",
          "Compare prokaryotic and eukaryotic cell structures and functions.",
          "Practice genetics problems involving Punnett squares and inheritance patterns.",
        ],
        nextSessionDate: "4 Aug 25",
        previousSessionDate: "24 July 25",
        nextSessionTime: "2:00-2:45pm",
        previousSessionTime: "2:00-2:45pm",
      },
      "7": {
        // Liam
        nextSessionItems: [
          "Balance chemical equations and calculate molar relationships.",
          "Study acid-base reactions and pH calculations.",
          "Practice stoichiometry problems with limiting reactants.",
        ],
        nextSessionDate: "6 Aug 25",
        previousSessionDate: "24 July 25",
        nextSessionTime: "9:00-9:45am",
        previousSessionTime: "9:00-9:45am",
      },
      "8": {
        // Kai
        nextSessionItems: [
          "Analyze literary devices in modern poetry and their effects on meaning.",
          "Practice writing analytical essays with strong thesis statements.",
          "Study character development techniques in contemporary fiction.",
        ],
        nextSessionDate: "7 Aug 25",
        previousSessionDate: "1 Aug 25",
        nextSessionTime: "6:00-6:45pm",
        previousSessionTime: "6:00-6:45pm",
      },
      "9": {
        // Oliver
        nextSessionItems: [
          "Study plate tectonics and their impact on landform creation.",
          "Analyze climate patterns and their effects on global ecosystems.",
          "Practice map reading skills and geographic coordinate systems.",
        ],
        nextSessionDate: "8 Aug 25",
        previousSessionDate: "4 Aug 25",
        nextSessionTime: "8:00-8:45am",
        previousSessionTime: "8:00-8:45am",
      },
      "23": {
        // Alex (duplicate)
        nextSessionItems: [
          "Reinforce rounding to 1 decimal place with timed fluency drills for automaticity.",
          "Apply 2D shape formulas in word problems to build real-world problem-solving skills.",
          "Introduce multi-step problems involving both perimeter/area and decimal rounding.",
        ],
        nextSessionDate: "4 Aug 25",
        previousSessionDate: "28 July 25",
        nextSessionTime: "9:00-9:45am",
        previousSessionTime: "9:00-9:45am",
      },
      "16": {
        // Carlos (duplicate)
        nextSessionItems: [
          "Solve projectile motion problems using kinematic equations.",
          "Apply conservation of momentum in collision scenarios.",
          "Practice energy calculations for pendulum and spring systems.",
        ],
        nextSessionDate: "3 Aug 25",
        previousSessionDate: "29 July 25",
        nextSessionTime: "8:00-8:45pm",
        previousSessionTime: "8:00-8:45pm",
      },
      "17": {
        // Maya
        nextSessionItems: [
          "Study cellular respiration pathways and ATP production mechanisms.",
          "Compare photosynthesis and cellular respiration energy cycles.",
          "Practice genetics problems with Punnett squares and inheritance patterns.",
        ],
        nextSessionDate: "5 Aug 25",
        previousSessionDate: "31 July 25",
        nextSessionTime: "10:00-10:45am",
        previousSessionTime: "10:00-10:45am",
      },
      "19": {
        // Zoe
        nextSessionItems: [
          "Practice chord progressions and harmonic analysis techniques.",
          "Study rhythm patterns in different musical time signatures.",
          "Compose a short melody using pentatonic and major scales.",
        ],
        nextSessionDate: "6 Aug 25",
        previousSessionDate: "31 July 25",
        nextSessionTime: "4:00-4:45pm",
        previousSessionTime: "4:00-4:45pm",
      },
      "28": {
        // Luna
        nextSessionItems: [
          "Analyze symbolism and themes in contemporary poetry collections.",
          "Practice close reading techniques for complex narrative structures.",
          "Write analytical essays comparing different literary movements.",
        ],
        nextSessionDate: "10 Aug 25",
        previousSessionDate: "6 Aug 25",
        nextSessionTime: "1:00-1:45pm",
        previousSessionTime: "1:00-1:45pm",
      },
      "10": {
        // Sofia
        nextSessionItems: [
          "Examine primary source documents from the Industrial Revolution.",
          "Compare different historical perspectives on social reform movements.",
          "Practice constructing historical arguments with supporting evidence.",
        ],
        nextSessionDate: "7 Aug 25",
        previousSessionDate: "23 July 25",
        nextSessionTime: "10:30-11:15am",
        previousSessionTime: "10:30-11:15am",
      },
    };

    return studentContentMap[studentId] || studentContentMap["1"]; // Default to Alex if not found
  };

  const studentContent = getStudentSessionContent();

  const handleSidebarNavigation = (view: string) => {
    // All sidebar navigation should go back to main app with the appropriate view
    sessionStorage.setItem("returnToView", view);
    navigate("/");
  };

  if (!student) {
    return (
      <TooltipProvider>
        <div className="min-h-screen-safe bg-stone-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Student not found
            </h1>
            <p className="text-gray-600 mb-4">
              The student you're looking for doesn't exist.
            </p>
            <Button variant="outline" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const openNotesOverlay = (
    mode: "view" | "add" | "edit",
    session: SessionData,
  ) => {
    setNotesMode(mode);
    setSelectedSession(session);
    setShowNotesOverlay(true);
  };

  const closeNotesOverlay = () => {
    console.log("Closing notes overlay");
    setShowNotesOverlay(false);
  };

  // Add ESC key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showNotesOverlay) {
        closeNotesOverlay();
      }
    };

    if (showNotesOverlay) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [showNotesOverlay]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Session Notes Overlay Component
  const SessionNotesOverlay = () => {
    if (!showNotesOverlay) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        style={{ background: "rgba(0, 0, 0, 0.60)" }}
        onClick={closeNotesOverlay}
      >
        {/* Main Notes Card */}
        <div
          className="w-[90%] h-[90%] max-w-6xl bg-white rounded-lg shadow-xl transform transition-transform duration-300 ease-out translate-y-0 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg font-lexend">
                  {getInitials(student.name)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-lexend">
                  {student.name}
                </h2>
                <p className="text-stone-700 font-lexend">
                  {selectedSession
                    ? `${selectedSession.month} ${selectedSession.day}, ${selectedSession.year}, ${selectedSession.time}`
                    : "July 28, 2025, 9:00–9:45am"}
                </p>
              </div>
            </div>
            <div
              onClick={(e) => {
                console.log("Close button clicked");
                e.preventDefault();
                e.stopPropagation();
                closeNotesOverlay();
              }}
              onMouseDown={(e) => {
                console.log("Close button mouse down");
                e.preventDefault();
                e.stopPropagation();
                closeNotesOverlay();
              }}
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

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50">
                {/* Left Toolbar */}
                <div className="flex items-center">
                  {/* Lexsee Assist */}
                  <div className="flex items-center gap-3 px-6 py-2 border-r border-stone-200">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M7.95258 11.6252C7.88562 11.3656 7.75034 11.1288 7.5608 10.9392C7.37126 10.7497 7.13439 10.6144 6.87483 10.5474L2.27358 9.36094C2.19508 9.33866 2.12599 9.29138 2.07679 9.22627C2.02759 9.16117 2.00098 9.08179 2.00098 9.00019C2.00098 8.91858 2.02759 8.83921 2.07679 8.7741C2.12599 8.709 2.19508 8.66172 2.27358 8.63944L6.87483 7.45219C7.13429 7.38529 7.3711 7.25012 7.56063 7.06072C7.75017 6.87132 7.88551 6.6346 7.95258 6.37519L9.13908 1.77394C9.16114 1.69513 9.20837 1.62569 9.27357 1.57623C9.33878 1.52677 9.41837 1.5 9.50021 1.5C9.58205 1.5 9.66164 1.52677 9.72684 1.57623C9.79204 1.62569 9.83928 1.69513 9.86133 1.77394L11.0471 6.37519C11.114 6.63474 11.2493 6.87161 11.4389 7.06115C11.6284 7.25069 11.8653 7.38598 12.1248 7.45294L16.7261 8.63869C16.8052 8.66051 16.875 8.70769 16.9247 8.77299C16.9744 8.83829 17.0014 8.91811 17.0014 9.00019C17.0014 9.08227 16.9744 9.16208 16.9247 9.22738C16.875 9.29268 16.8052 9.33986 16.7261 9.36169L12.1248 10.5474C11.8653 10.6144 11.6284 10.7497 11.4389 10.9392C11.2493 11.1288 11.114 11.3656 11.0471 11.6252L9.86058 16.2264C9.83853 16.3052 9.7913 16.3747 9.72609 16.4241C9.66089 16.4736 9.5813 16.5004 9.49946 16.5004C9.41762 16.5004 9.33803 16.4736 9.27282 16.4241C9.20762 16.3747 9.16039 16.3052 9.13833 16.2264L7.95258 11.6252Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15.5 2.25V5.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M17 3.75H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3.5 12.75V14.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4.25 13.5H2.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-indigo-600 font-medium text-sm font-lexend">
                        Lexsee Assist
                      </span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-indigo-600" />
                  </div>

                  {/* Microphone */}
                  <div className="px-3 py-2 border-r border-stone-200">
                    <svg
                      className="w-5 h-5 text-stone-700"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M9.5 1.5C8.90326 1.5 8.33097 1.73705 7.90901 2.15901C7.48705 2.58097 7.25 3.15326 7.25 3.75V9C7.25 9.59674 7.48705 10.169 7.90901 10.591C8.33097 11.0129 8.90326 11.25 9.5 11.25C10.0967 11.25 10.669 11.0129 11.091 10.591C11.5129 10.169 11.75 9.59674 11.75 9V3.75C11.75 3.15326 11.5129 2.58097 11.091 2.15901C10.669 1.73705 10.0967 1.5 9.5 1.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14.75 7.5V9C14.75 10.3924 14.1969 11.7277 13.2123 12.7123C12.2277 13.6969 10.8924 14.25 9.5 14.25C8.10761 14.25 6.77226 13.6969 5.78769 12.7123C4.80312 11.7277 4.25 10.3924 4.25 9V7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9.5 14.25V16.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Text Format Dropdown */}
                  <div className="flex items-center gap-3 px-3 py-2 border-r border-stone-200">
                    <span className="text-stone-700 text-sm font-lexend">
                      Regular Text
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </div>

                  {/* Format Buttons */}
                  <div className="flex items-center px-3 py-2 border-r border-stone-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 w-8 h-8 rounded bg-indigo-50"
                    >
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M5 9H11.75C12.5456 9 13.3087 9.31607 13.8713 9.87868C14.4339 10.4413 14.75 11.2044 14.75 12C14.75 12.7956 14.4339 13.5587 13.8713 14.1213C13.3087 14.6839 12.5456 15 11.75 15H5.75C5.55109 15 5.36032 14.921 5.21967 14.7803C5.07902 14.6397 5 14.4489 5 14.25V3.75C5 3.55109 5.07902 3.36032 5.21967 3.21967C5.36032 3.07902 5.55109 3 5.75 3H11C11.7956 3 12.5587 3.31607 13.1213 3.87868C13.6839 4.44129 14 5.20435 14 6C14 6.79565 13.6839 7.55871 13.1213 8.12132C12.5587 8.68393 11.7956 9 11 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 w-8 h-8">
                      <svg
                        className="w-4 h-4 text-stone-700"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M14.75 3H8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11 15H4.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11.75 3L7.25 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 w-8 h-8">
                      <svg
                        className="w-4 h-4 text-stone-700"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M5 3V7.5C5 8.69347 5.47411 9.83807 6.31802 10.682C7.16193 11.5259 8.30653 12 9.5 12C10.6935 12 11.8381 11.5259 12.682 10.682C13.5259 9.83807 14 8.69347 14 7.5V3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3.5 15H15.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 w-8 h-8">
                      <svg
                        className="w-4 h-4 text-stone-700"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M12.4992 3H7.24923C6.88917 2.99981 6.53433 3.08604 6.21451 3.25143C5.89468 3.41682 5.61923 3.65655 5.41127 3.95048C5.20332 4.24441 5.06894 4.58396 5.01942 4.94059C4.96991 5.29723 5.00671 5.66054 5.12673 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11 9C11.7956 9 12.5587 9.31607 13.1213 9.87868C13.6839 10.4413 14 11.2044 14 12C14 12.7956 13.6839 13.5587 13.1213 14.1213C12.5587 14.6839 11.7956 15 11 15H5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3.5 9H15.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Button>
                  </div>

                  {/* Link Button */}
                  <div className="px-3 py-2">
                    <svg
                      className="w-5 h-5 text-stone-700"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M16.2497 15.7501H6.49968C6.3019 15.7505 6.10599 15.7118 5.92321 15.6363C5.74044 15.5607 5.57441 15.4498 5.43468 15.3098L2.43918 12.3106C2.15797 12.0293 2 11.6478 2 11.2501C2 10.8523 2.15797 10.4708 2.43918 10.1896L9.93918 2.68955C10.0785 2.5502 10.2439 2.43966 10.4259 2.36424C10.6079 2.28882 10.803 2.25 11.0001 2.25C11.1971 2.25 11.3922 2.28882 11.5742 2.36424C11.7562 2.43966 11.9216 2.5502 12.0609 2.68955L16.5602 7.18956C16.8414 7.47085 16.9994 7.85231 16.9994 8.25005C16.9994 8.6478 16.8414 9.02926 16.5602 9.31055L10.1252 15.7501"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4.3125 8.31738L10.9335 14.9384"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right Toolbar */}
                <div className="flex items-center gap-4 px-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <svg
                      className="w-5 h-5 text-stone-700"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M7.25 10.5L3.5 6.75L7.25 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3.5 6.75H11.375C11.9167 6.75 12.4531 6.8567 12.9536 7.064C13.454 7.2713 13.9088 7.57514 14.2918 7.95818C14.6749 8.34123 14.9787 8.79596 15.186 9.29643C15.3933 9.7969 15.5 10.3333 15.5 10.875C15.5 11.4167 15.3933 11.9531 15.186 12.4536C14.9787 12.954 14.6749 13.4088 14.2918 13.7918C13.9088 14.1749 13.454 14.4787 12.9536 14.686C12.4531 14.8933 11.9167 15 11.375 15H8.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 opacity-50">
                    <svg
                      className="w-5 h-5 text-stone-700"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M11.75 10.5L15.5 6.75L11.75 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M15.5 6.75H7.625C6.53098 6.75 5.48177 7.1846 4.70818 7.95818C3.9346 8.73177 3.5 9.78098 3.5 10.875C3.5 11.4167 3.6067 11.9531 3.814 12.4536C4.0213 12.954 4.32514 13.4088 4.70818 13.7918C5.48177 14.5654 6.53098 15 7.625 15H10.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Text Editor */}
              <div className="flex-1 p-6">
                <div className="w-full bg-white">
                  {/* This would be where the rich text editor content goes */}
                  <div className="text-stone-500 text-lg">
                    {notesMode === "add"
                      ? "Start typing your notes..."
                      : notesMode === "edit"
                        ? "Edit session notes..."
                        : "View session notes..."}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-[425px] bg-stone-100 border-l border-stone-200 flex flex-col h-full">
              {/* Tabs */}
              <div className="p-4">
                <div className="flex bg-white rounded-lg border border-stone-200">
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-lg shadow-sm">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M3 1.5H16.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M15 4.5H4.5C3.67157 4.5 3 5.17157 3 6V12C3 12.8284 3.67157 13.5 4.5 13.5H15C15.8284 13.5 16.5 12.8284 16.5 12V6C16.5 5.17157 15.8284 4.5 15 4.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3 16.5H16.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-indigo-600 font-semibold text-sm font-lexend">
                      Academic Coaching
                    </span>
                    <ChevronDown className="w-4 h-4 text-indigo-600 opacity-50" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 py-2">
                    <svg
                      className="w-5 h-5 text-stone-400"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M11.6519 16.2644C11.6803 16.3354 11.7299 16.396 11.7938 16.4381C11.8577 16.4801 11.933 16.5016 12.0095 16.4997C12.086 16.4977 12.16 16.4724 12.2217 16.4271C12.2834 16.3818 12.3298 16.3188 12.3546 16.2464L17.2296 1.99642C17.2536 1.92997 17.2582 1.85805 17.2428 1.78909C17.2274 1.72012 17.1927 1.65697 17.1428 1.607C17.0928 1.55704 17.0297 1.52234 16.9607 1.50696C16.8917 1.49159 16.8198 1.49617 16.7534 1.52017L2.50335 6.39517C2.43098 6.41999 2.36792 6.46636 2.32266 6.52805C2.27739 6.58974 2.25208 6.6638 2.25012 6.74029C2.24816 6.81678 2.26965 6.89204 2.3117 6.95597C2.35375 7.01989 2.41434 7.06943 2.48535 7.09792L8.43285 9.48292C8.62087 9.5582 8.79169 9.67077 8.93503 9.81384C9.07836 9.95692 9.19124 10.1275 9.26685 10.3154L11.6519 16.2644Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.1405 1.61035L8.93555 9.8146"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-stone-400 font-semibold text-sm font-lexend">
                      Session notes
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* This would contain the AI suggestions */}
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium">
                    Apply suggestions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 19 18" fill="none">
                      <path
                        d="M14 4.5L5.75 12.75L2 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17 7.5L11.375 13.125L10.25 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </Button>
                </div>
                <p className="text-center text-stone-400 text-xs mt-3 font-lexend">
                  Lexsee can make mistakes, so double-check it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="h-screen-mobile bg-indigo-900 flex">
        <Sidebar
          activeView={activeView}
          setActiveView={handleSidebarNavigation}
          selectedStudentId={studentId || null}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Content */}
          <div className="flex-1 p-3 h-full min-w-0">
            <Card className="h-full flex flex-col min-w-0">
              {/* Header */}
              <div
                className="bg-white border-b border-stone-200 rounded-t-lg"
                style={{
                  padding: "18px 24px 0 18px",
                  border: "1px none rgb(231, 229, 228)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 group hover:bg-transparent"
                      onClick={handleBackClick}
                    >
                      <ArrowLeft className="w-5 h-5 text-stone-300 group-hover:text-indigo-600 transition-colors" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Avatar className="w-full h-full">
                          <AvatarFallback
                            className={`${getSubjectColors(student.subject || "")} font-medium text-lg`}
                          >
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-stone-900 font-lexend">
                          {student.name}
                        </h1>
                        <p className="text-sm text-stone-600 font-lexend">
                          {student.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-11 px-4 border-stone-200 bg-white hover:bg-stone-50 font-lexend text-sm font-normal text-stone-700 rounded-xl overflow-hidden"
                    >
                      Actions
                      <svg
                        className="w-6 h-6 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 15L12 20L17 15" />
                        <path d="M7 9L12 4L17 9" />
                      </svg>
                    </Button>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center justify-center w-11 h-11 bg-white rounded-xl hover:bg-stone-50 transition-colors overflow-hidden border border-stone-200"
                        style={{
                          boxShadow: "0 0 8px 0 rgba(80, 70, 229, 0.15)",
                        }}
                      >
                        {showDropdown ? (
                          <X
                            className="w-5 h-5 text-indigo-600"
                            strokeWidth={4}
                          />
                        ) : (
                          <Plus
                            className="w-5 h-5 text-indigo-600"
                            strokeWidth={4}
                          />
                        )}
                      </button>
                      {showDropdown && (
                        <div
                          className="absolute right-0 top-12 w-60 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden"
                          style={{
                            boxShadow: "0 0 8px 0 rgba(80, 70, 229, 0.15)",
                          }}
                        >
                          <div className="p-2">
                            <button
                              onClick={() => {
                                setShowDropdown(false);
                                setActiveView("all");
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-indigo-600 hover:text-white transition-colors group rounded-md overflow-hidden"
                            >
                              <UserRoundPlus className="w-6 h-6 mr-3 text-stone-500 group-hover:text-white" />
                              <span className="font-lexend text-base">
                                Add student
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setShowDropdown(false);
                                setActiveView("sessionnotes");
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-indigo-600 hover:text-white transition-colors group rounded-md overflow-hidden"
                            >
                              <NotebookPen className="w-6 h-6 mr-3 text-stone-500 group-hover:text-white" />
                              <span className="font-lexend text-base">
                                New session notes
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setShowDropdown(false);
                              }}
                              className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-indigo-600 hover:text-white transition-colors group rounded-md overflow-hidden"
                            >
                              <FileAudio className="w-6 h-6 mr-3 text-stone-500 group-hover:text-white" />
                              <span className="font-lexend text-base">
                                Create assignment
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation / Search */}
              <div
                className="border-b border-stone-200"
                style={{ padding: "12px 24px 24px" }}
              >
                <div className="flex justify-center">
                  {isSearchMode ? (
                    // Search Mode
                    <div className="relative flex p-1.5 border border-input rounded-xl bg-white overflow-hidden h-auto self-center w-full max-w-md focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                      {/* Search Icon - Fixed Position */}
                      <div className="flex items-center justify-center px-3 py-1.5">
                        <Search className="w-5 h-5 text-stone-400" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="flex-1 pr-3 py-1.5 text-sm font-medium font-lexend bg-transparent border-0 outline-none text-stone-800 placeholder-stone-400"
                      />
                      <button
                        onClick={exitSearchMode}
                        className="flex items-center justify-center px-3 py-1.5 rounded-md text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    // Tab Mode
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
                        onClick={enterSearchMode}
                        className="relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 text-stone-400 hover:text-stone-600"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                      <button
                        ref={button2RefCallback}
                        onClick={() => setActiveTab("snapshot")}
                        className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                          activeTab === "snapshot"
                            ? "text-white"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        Snapshot
                      </button>
                      <button
                        ref={button3RefCallback}
                        onClick={() => setActiveTab("goals")}
                        className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                          activeTab === "goals"
                            ? "text-white"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        Goals
                      </button>
                      <button
                        ref={button4RefCallback}
                        onClick={() => setActiveTab("session-notes")}
                        className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                          activeTab === "session-notes"
                            ? "text-white"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        Session notes
                      </button>
                      <button
                        ref={button5RefCallback}
                        onClick={() => setActiveTab("assignments")}
                        className={`relative flex px-3 py-1.5 rounded-md text-sm font-medium font-lexend transition-colors duration-200 overflow-hidden z-10 ${
                          activeTab === "assignments"
                            ? "text-white"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        Assignments
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 overflow-y-auto mobile-scroll rounded-b-lg ${activeTab === "session-notes" ? "bg-stone-50" : "p-8 bg-stone-50"}`} style={{ paddingBottom: activeTab === "session-notes" ? "0px" : "60px" }}>
                {activeTab === "snapshot" && !isSearchMode && (
                  <div className="flex justify-center">
                    <div className="flex gap-6 items-stretch">
                      {/* Left Column - Session Cards and For Next Session */}
                      <div className="flex flex-col gap-6">
                        {/* Sessions Group */}
                        <div
                          className="flex flex-row gap-3"
                          style={{ flexDirection: "row" }}
                        >
                          {/* July 28 Card */}
                          <Card className="w-[150px] h-[150px] p-3 pb-2 flex flex-col justify-between">
                            <CardContent className="p-0 flex flex-col gap-0.5">
                              <div className="text-stone-400 font-lexend text-base font-medium leading-4">
                                {
                                  studentContent.previousSessionDate.split(
                                    " ",
                                  )[1]
                                }
                              </div>
                              <div className="text-stone-400 font-lexend text-2xl font-black leading-6">
                                {
                                  studentContent.previousSessionDate.split(
                                    " ",
                                  )[0]
                                }
                              </div>
                              <div className="text-stone-400 font-lexend text-base font-medium leading-4">
                                Mon
                              </div>

                              {/* Session Time */}
                              <div className="flex items-center gap-1 py-0.5 mt-1.5">
                                <CircleCheck className="w-3 h-3 text-green-500" />
                                <span className="text-stone-400 font-lexend text-xs">
                                  {studentContent.previousSessionTime}
                                </span>
                              </div>
                            </CardContent>

                            {/* View Notes Button */}
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  const dateParts =
                                    studentContent.previousSessionDate.split(
                                      " ",
                                    );
                                  openNotesOverlay("view", {
                                    date: dateParts[0],
                                    month: dateParts[1],
                                    day: dateParts[0],
                                    year: "2025",
                                    time: studentContent.previousSessionTime,
                                    isCompleted: true,
                                  });
                                }}
                                className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors cursor-pointer"
                              >
                                View notes
                              </button>
                            </div>
                          </Card>

                          {/* August 4 Card */}
                          <Card className="w-[150px] h-[150px] p-3 pb-2 flex flex-col justify-between">
                            <CardContent className="p-0 flex flex-col gap-0.5">
                              <div className="text-stone-700 font-lexend text-base font-medium leading-4">
                                {studentContent.nextSessionDate.split(" ")[1]}
                              </div>
                              <div className="text-stone-700 font-lexend text-2xl font-black leading-6">
                                {studentContent.nextSessionDate.split(" ")[0]}
                              </div>
                              <div className="text-stone-700 font-lexend text-base font-medium leading-4">
                                Mon
                              </div>

                              {/* Session Time */}
                              <div className="flex items-center gap-1 py-0.5 mt-1.5">
                                <Clock className="w-3 h-3 text-stone-700" />
                                <span className="text-stone-700 font-lexend text-xs">
                                  {studentContent.nextSessionTime}
                                </span>
                              </div>
                            </CardContent>

                            {/* Add Notes Button */}
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  const dateParts =
                                    studentContent.nextSessionDate.split(" ");
                                  openNotesOverlay("add", {
                                    date: dateParts[0],
                                    month: dateParts[1],
                                    day: dateParts[0],
                                    year: "2025",
                                    time: studentContent.nextSessionTime,
                                    isCompleted: false,
                                  });
                                }}
                                className="flex items-center px-1.5 py-0.5 border border-stone-200 rounded text-xs text-stone-400 font-lexend hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors cursor-pointer"
                              >
                                Add notes
                              </button>
                            </div>
                          </Card>
                        </div>

                        {/* For Next Session */}
                        <Card
                          className="p-5 flex-1"
                          style={{ width: "312px" }}
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col gap-6">
                              {/* Header with icon and copy button */}
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0.5">
                                  {/* Icon and Title */}
                                  <div className="flex items-end gap-1.5 justify-start">
                                    <Siren className="w-6 h-6 text-stone-700 mt-0.5" />
                                    <h2
                                      className="text-stone-900 font-lexend text-xl font-bold"
                                      style={{ lineHeight: "20px" }}
                                    >
                                      Next session
                                    </h2>
                                  </div>
                                  {/* From section - flush left */}
                                  <div className="flex items-center gap-1 pl-1">
                                    <span className="text-stone-400 font-lexend text-xs">
                                      From notes
                                    </span>
                                    <span
                                      className="relative flex group"
                                      style={{
                                        lineHeight: "16px",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const dateParts =
                                            studentContent.nextSessionDate.split(
                                              " ",
                                            );
                                          openNotesOverlay("view", {
                                            date: dateParts[0],
                                            month: dateParts[1],
                                            day: dateParts[0],
                                            year: "2025",
                                            time: studentContent.nextSessionTime,
                                            isCompleted: true,
                                          });
                                        }}
                                        className="bg-stone-50 group-hover:bg-stone-700 transition-colors cursor-pointer rounded-full text-stone-400 group-hover:text-white font-lexend text-xs"
                                        style={{
                                          padding: "2px 6px",
                                          lineHeight: "12px",
                                        }}
                                      >
                                        {studentContent.nextSessionDate}
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                </div>

                                {/* Copy Button - Always visible icon-only button */}
                                <div className="w-16 flex justify-end">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center justify-center w-8 h-8 p-0 border-stone-200 bg-transparent hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                                        onClick={() => {
                                          const nextSessionText =
                                            studentContent.nextSessionItems.join(
                                              "\n\n",
                                            );
                                          navigator.clipboard.writeText(
                                            nextSessionText,
                                          );
                                        }}
                                      >
                                        <svg
                                          className="w-3 h-3 text-stone-400 hover:text-stone-600 transition-colors duration-200"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          stroke="currentColor"
                                        >
                                          <path d="M10 4H5C4.44772 4 4 4.44772 4 5V10C4 10.5523 4.44772 11 5 11H10C10.5523 11 11 10.5523 11 10V5C11 4.44772 10.5523 4 10 4Z" />
                                          <path d="M2 8C1.45 8 1 7.55 1 7V2C1 1.45 1.45 1 2 1H7C7.55 1 8 1.45 8 2" />
                                        </svg>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Copy next session text</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>

                              {/* Task List */}
                              <div className="space-y-3 pl-1.5">
                                {studentContent.nextSessionItems.map(
                                  (item, index) => (
                                    <div key={index} className="flex gap-1.5">
                                      <div className="pt-[3px]">
                                        <div className="w-3.5 h-3.5 rounded-md border-2 border-stone-700"></div>
                                      </div>
                                      <span
                                        className="font-lexend text-sm leading-5 flex-1"
                                        style={{ color: "rgba(41, 37, 36, 1)" }}
                                      >
                                        {item}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Main Content Area */}
                      <div
                        className="flex-1 space-y-6"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {/* Observations */}
                        <Card
                          className="p-5 min-w-[500px] max-w-[650px] flex-1"
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col gap-6">
                              {/* Header with icon and copy button */}
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0.5">
                                  {/* Icon and Title */}
                                  <div className="flex items-end gap-1.5 justify-start">
                                    <svg
                                      className="w-6 h-6 text-stone-900 mt-0.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path d="M16 2V4" />
                                      <path d="M17.915 22C17.915 20.4087 17.2829 18.8826 16.1577 17.7574C15.0325 16.6321 13.5063 16 11.915 16C10.3237 16 8.79762 16.6321 7.6724 17.7574C6.54718 18.8826 5.91504 20.4087 5.91504 22" />
                                      <path d="M8 2V4" />
                                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
                                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" />
                                    </svg>
                                    <h2
                                      className="text-stone-900 font-lexend text-xl font-bold"
                                      style={{ lineHeight: "20px" }}
                                    >
                                      Observations
                                    </h2>
                                  </div>
                                  {/* Subtitle section - flush left */}
                                  <div className="flex items-center pl-1">
                                    <span className="text-stone-400 font-lexend text-xs">
                                      From the last 7 sessions
                                    </span>
                                  </div>
                                </div>

                                {/* Copy Button - Always visible icon-only button */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center justify-center w-8 h-8 p-0 border-stone-200 bg-transparent hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                                      onClick={() => {
                                        const observationsText = [
                                      "**Met goal independently** — Solved 10 three-digit subtraction problems with borrowing at 80% accuracy. (25 July)",
                                      "**Self-checks work** — Used independent self-checking strategies for multi-step word problems. (25 July)",
                                      "**Highly engaged** — Asked to take \"teacher mode\" and quiz the specialist, showing math confidence. (25 July)",
                                      "**Connects math to interests** ��� Engaged more deeply with math when sports or real-life topics are included. (18 July)",
                                      "**Self-corrects complex errors** — Caught mistakes in complex borrowing, particularly with zeros. (18 July)",
                                      "**Motivation responds to games & breaks** — Competitive games and strategic breaks increase focus and stamina. (11 July)",
                                      "**Needs routine on low-energy days** — Predictable structure and reduced task load are effective for keeping Zack engaged when tired. (4 July)",
                                    ].join("\n\n");
                                    navigator.clipboard.writeText(
                                      observationsText,
                                    );
                                  }}
                                >
                                  <svg
                                    className="w-3 h-3 text-stone-400 hover:text-stone-600 transition-colors duration-200"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path d="M10 4H5C4.44772 4 4 4.44772 4 5V10C4 10.5523 4.44772 11 5 11H10C10.5523 11 11 10.5523 11 10V5C11 4.44772 10.5523 4 10 4Z" />
                                      <path d="M2 8C1.45 8 1 7.55 1 7V2C1 1.45 1.45 1 2 1H7C7.55 1 8 1.45 8 2" />
                                    </svg>
                                  </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copy observations text</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>

                              {/* Observations List */}
                              <div className="space-y-3 pl-1.5">
                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Met goal independently</span> — Solved 10 three-digit subtraction problems with borrowing at 80% accuracy.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "25",
                                            month: "July",
                                            day: "25",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          25 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Self-checks work</span> — Used independent self-checking strategies for multi-step word problems.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "25",
                                            month: "July",
                                            day: "25",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          25 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Highly engaged</span> — Asked to take "teacher mode" and quiz the specialist, showing math confidence.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "25",
                                            month: "July",
                                            day: "25",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          25 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Connects math to interests</span> — Engaged more deeply with math when sports or real-life topics are included.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "18",
                                            month: "July",
                                            day: "18",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          18 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Self-corrects complex errors</span> — Caught mistakes in complex borrowing, particularly with zeros.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "18",
                                            month: "July",
                                            day: "18",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          18 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Motivation responds to games & breaks</span> — Competitive games and strategic breaks increase focus and stamina.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "11",
                                            month: "July",
                                            day: "11",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          11 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>

                                <div className="flex gap-1.5">
                                  <div className="pt-[3px]">
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                  </div>
                                  <p className="text-stone-900 font-lexend text-sm leading-5 flex-1">
                                    <span className="font-semibold">Needs routine on low-energy days</span> — Predictable structure and reduced task load are effective for keeping Zack engaged when tired.{" "}
                                    <span
                                      className="relative inline-block group"
                                      style={{
                                        verticalAlign: "middle",
                                        marginLeft: "4px",
                                        height: "auto",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openNotesOverlay("view", {
                                            date: "4",
                                            month: "July",
                                            day: "4",
                                            year: "2025",
                                            time: "9:00–9:45am",
                                            isCompleted: true,
                                          });
                                        }}
                                        className="inline-flex items-center justify-center px-1 py-0.5 rounded-full bg-stone-100 group-hover:bg-stone-700 transition-colors cursor-pointer"
                                        style={{
                                          lineHeight: "20px",
                                          height: "14px",
                                          flexGrow: 0,
                                          verticalAlign: "4px",
                                        }}
                                      >
                                        <span
                                          className="text-stone-400 group-hover:text-white font-lexend font-normal"
                                          style={{ fontSize: "8px" }}
                                        >
                                          4 July 25
                                        </span>
                                      </span>
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                        <span className="block bg-stone-100 px-3 py-1.5 rounded shadow-md pointer-events-none">
                                          <span className="flex items-center gap-1 text-stone-900 font-lexend text-sm whitespace-nowrap">
                                            View notes
                                            <ArrowRight className="w-6 h-6 text-indigo-600" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </p>
                                </div>


                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "snapshot" && isSearchMode && (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <p className="text-stone-500 font-lexend text-lg mb-2">
                        Search results will appear here
                      </p>
                      <p className="text-stone-400 font-lexend text-sm">
                        Start typing to search through notes and observations
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "search" && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">
                      Search functionality coming soon...
                    </p>
                  </div>
                )}

                {activeTab === "goals" && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">
                      Goals content coming soon...
                    </p>
                  </div>
                )}

                {activeTab === "session-notes" && (
                  <div className="flex h-full bg-white">
                    {/* Left Sidebar - Session List */}
                    <div className="w-[275px] bg-white border-r border-stone-200 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between py-3 px-[18px] bg-white">
                        <h2 className="text-xl font-bold text-stone-700 font-lexend -tracking-[0.35px]">Session Notes</h2>
                        <Search className="w-6 h-6 text-stone-500" />
                      </div>

                      {/* Session List - flush to edges */}
                      <div className="flex-1 overflow-y-auto pb-5 bg-white">
                        {[
                          {
                            id: "august-1",
                            date: "August 1",
                            title: "Friday, 9:00–9:45am",
                            status: "upcoming"
                          },
                          {
                            id: "july-25",
                            date: "July 25",
                            title: "Friday, 9:00–9:45am",
                            status: "overdue"
                          },
                          {
                            id: "july-18",
                            date: "July 18",
                            title: "Complex Borrowing and Personal Interests",
                            status: "completed"
                          },
                          {
                            id: "july-11",
                            date: "July 11",
                            title: "Games and Real-World Math Connections",
                            status: "completed"
                          },
                          {
                            id: "july-4",
                            date: "July 4",
                            title: "Supporting Focus During Low-Energy Days",
                            status: "completed"
                          },
                          {
                            id: "june-27",
                            date: "June 27",
                            title: "Structured Routine and Peer Teaching",
                            status: "completed"
                          },
                          {
                            id: "june-20",
                            date: "June 20",
                            title: "Building Stamina with Timed Subtraction",
                            status: "completed"
                          },
                          {
                            id: "june-13",
                            date: "June 13",
                            title: "Introduction to Borrowing and Place Value",
                            status: "completed"
                          }
                        ].map((session) => (
                          <div
                            key={session.id}
                            className={`px-6 py-3 cursor-pointer transition-colors ${
                              selectedSessionId === session.id ? "flex flex-col gap-0.5" : ""
                            }`}
                            style={selectedSessionId === session.id ? {backgroundColor: "rgba(237, 236, 252, 1)"} : {}}
                            onClick={() => setSelectedSessionId(session.id)}
                          >
                            <div className="flex items-center gap-1 py-0.5">
                              {session.status === "upcoming" && (
                                <Clock className="w-4 h-4 text-stone-700" />
                              )}
                              {session.status === "overdue" && (
                                <Timer className="w-4 h-4 text-pink-600" />
                              )}
                              {session.status === "completed" && (
                                <CircleCheck className="w-4 h-4 text-green-500" />
                              )}
                              <div className={`text-sm font-medium font-lexend leading-4 transition-colors ${
                                selectedSessionId === session.id ? "text-stone-900" : "text-stone-700"
                              }`}>
                                {session.date}
                              </div>
                            </div>
                            <div className={`text-xs font-normal font-lexend leading-4 transition-colors ${
                              selectedSessionId === session.id ? "text-stone-900 pl-0.5" : "text-stone-700"
                            }`}>
                              {session.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-8 px-4 flex flex-col justify-center items-center" style={{backgroundColor: "rgba(247, 247, 247, 1)"}}>
                      {selectedSessionId === "july-18" && (
                        <div className="bg-white rounded-md border border-stone-200 overflow-hidden h-full max-w-[650px] flex flex-col">
                          {/* Fixed Header */}
                          <div className="flex items-start justify-between p-5 border border-stone-200 border-b-0 flex-shrink-0">
                            <div className="flex items-start gap-1.5 justify-start">
                              <CircleCheck className="w-6 h-6 text-green-500 mt-0.5" />
                              <div>
                                <h2 className="text-2xl font-semibold text-stone-900 font-lexend">
                                  July 18 2025
                                </h2>
                                <p className="text-stone-600 font-lexend">Friday, 9:00-9:45am</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="flex self-center bg-white border border-stone-200 rounded-xl h-11 overflow-hidden relative p-[3px]">
                                <div
                                  className={`absolute bg-indigo-600 rounded-[9px] shadow-sm h-9 w-9 top-[3px] transition-[left] duration-300 ease-[cubic-bezier(0.34,1.25,0.64,1)] ${
                                    toggleView === "brain" ? "left-[3px]" : "left-[39px]"
                                  }`}
                                />
                                <button
                                  onClick={() => setToggleView("brain")}
                                  className={`flex items-center justify-center rounded-[11px] h-9 w-9 relative z-10 transition-colors duration-300 p-1.5 font-lexend text-sm font-medium ${
                                    toggleView === "brain" ? "text-white" : "text-stone-500"
                                  }`}
                                >
                                  <Brain className="w-5 h-5" strokeWidth={2} />
                                </button>
                                <button
                                  onClick={() => setToggleView("filetext")}
                                  className={`flex items-center justify-center rounded-[11px] h-9 w-9 relative z-10 transition-colors duration-300 p-1.5 font-lexend text-sm font-medium ${
                                    toggleView === "filetext" ? "text-white" : "text-stone-500"
                                  }`}
                                >
                                  <FileText className="w-5 h-5" strokeWidth={2} />
                                </button>
                              </div>
                              <button
                                className="flex items-center justify-center w-11 h-11 rounded-full border border-stone-200 transition-colors"
                                onClick={() => {
                                  openNotesOverlay("view", {
                                    date: "18",
                                    month: "July",
                                    day: "18",
                                    year: "2025",
                                    time: "9:00–9:45am",
                                    isCompleted: true,
                                    studentName: "Alex"
                                  });
                                }}
                              >
                                <Pencil className="w-5 h-5 text-indigo-600" strokeWidth={2} />
                              </button>
                            </div>
                          </div>

                          {/* Scrollable Content */}
                          <div className="flex-1 overflow-y-auto px-5 pl-[50px] py-8">
                            {toggleView === "brain" ? (
                              <>
                                {/* Complex Borrowing Section */}
                                <div
                                  className="relative group"
                                  onMouseEnter={() => setHoveredSection("borrowing")}
                                  onMouseLeave={() => setHoveredSection(null)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 flex flex-col gap-0">
                                      <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                        Complex Borrowing and Personal Interests
                                      </h3>
                                  <p className="text-stone-700 font-lexend text-sm leading-relaxed pr-[30px]">
                                    Practiced challenging subtraction cases (across zeros), reviewed multiplication, and included sports-themed word problems. Confidence grew as Zack related math to his hobbies.
                                  </p>
                                    </div>

                                    {/* Action Icons */}
                                    <div className={`flex items-center gap-1 transition-opacity ${
                                      hoveredSection === "borrowing" ? "opacity-100" : "opacity-0"
                                    }`}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <Copy className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy text</p>
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <Edit3 className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Edit text</p>
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <RefreshCw className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Regenerate text</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>

                                {/* Observations Section */}
                                <div
                                  className="relative group mt-8"
                                  onMouseEnter={() => setHoveredSection("observations")}
                                  onMouseLeave={() => setHoveredSection(null)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 flex flex-col gap-0">
                                      <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Observations
                                  </h3>
                                      <div className="text-stone-700 font-lexend text-sm leading-relaxed space-y-2">
                                        <div className="flex items-start gap-1.5 pr-[30px]">
                                          <div className="pt-[3px]">
                                            <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                          </div>
                                          <p><span className="font-semibold">Completed complex borrowing</span> (across two zeros) with one error, then self-caught.</p>
                                        </div>
                                        <div className="flex items-start gap-1.5 pr-[30px]">
                                          <div className="pt-[3px]">
                                            <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                          </div>
                                          <p><span className="font-semibold">Engaged deeply with sports-related</span> word problems.</p>
                                        </div>
                                        <div className="flex items-start gap-1.5 pr-[30px]">
                                          <div className="pt-[3px]">
                                            <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                          </div>
                                          <p>Reported feeling <span className="font-semibold">less nervous</span> about math at school.</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action Icons */}
                                    <div className={`flex items-center gap-1 transition-opacity ${
                                      hoveredSection === "observations" ? "opacity-100" : "opacity-0"
                                    }`}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <Copy className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy text</p>
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <Edit3 className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Edit text</p>
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-stone-100">
                                            <RefreshCw className="w-4 h-4 text-stone-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Regenerate text</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              /* Paper/FileText View - Markdown Content */
                              <div className="space-y-8 pr-[30px]">
                                {/* Student goal */}
                                <div>
                                  <h3 className="text-xl font-semibold text-stone-900 font-lexend">
                                    Student goal
                                  </h3>
                                  <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                    By August 1, 2025, Alex will solve 10 3-digit subtraction problems with borrowing at 80% using just paper and pencil.
                                  </p>
                                </div>

                                {/* Session summary */}
                                <div className="mt-12">
                                  <h3 className="text-xl font-normal text-stone-900 font-lexend">
                                    Session summary
                                  </h3>
                                </div>

                                {/* Objectives of the session */}
                                <div className="mt-4">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Objectives of the session
                                  </h3>
                                  <div className="space-y-2">
                                    <div className="flex items-start gap-1.5">
                                      <span className="text-stone-700 font-lexend text-sm mt-1">1.</span>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Practiced 3-digit subtraction with more complex borrowing cases (borrowing across zeros and multiple digits).
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <span className="text-stone-700 font-lexend text-sm mt-1">2.</span>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Introduced a brief multiplication review and word problems that relate to Alex's hobbies (sports statistics).
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Progression towards goals */}
                                <div className="mt-6">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Progression towards goals
                                  </h3>
                                  <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                    Alex completed 8 problems with 75% accuracy, a continued improvement. He made one mistake with borrowing across two zeros but was able to catch the error with guidance. He enjoyed the sports-related problems and showed more willingness to attempt challenging questions.
                                  </p>
                                </div>

                                {/* Skill areas addressed */}
                                <div className="mt-8">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Skill areas addressed
                                  </h3>
                                  <div className="space-y-2">
                                    <div className="flex items-start gap-1.5">
                                      <div className="pt-[3px]">
                                        <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                      </div>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Subtraction with borrowing (complex cases)
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <div className="pt-[3px]">
                                        <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                      </div>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Connecting math to personal interests
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <div className="pt-[3px]">
                                        <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                      </div>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Self-correction techniques
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Additional observations */}
                                <div className="mt-8">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Additional observations
                                  </h3>
                                  <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                    Alex's confidence improved when he saw connections between math and real life. He was proud to solve a sports stats word problem on his own. He mentioned feeling "less nervous" about math at school.
                                  </p>
                                </div>

                                {/* Next session */}
                                <div className="mt-8">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Next session
                                  </h3>
                                  <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                    Review mistakes from this session and practice self-checking. Add one new type of problem (multi-step word problem) if ready.
                                  </p>
                                </div>

                                {/* Try these at home */}
                                <div className="mt-8">
                                  <h3 className="text-base font-semibold text-stone-900 font-lexend">
                                    Try these at home
                                  </h3>
                                  <div className="space-y-2">
                                    <div className="flex items-start gap-1.5">
                                      <div className="pt-[3px]">
                                        <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                      </div>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Create word problems based on Alex's interests.
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <div className="pt-[3px]">
                                        <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                                      </div>
                                      <p className="text-stone-700 font-lexend text-sm leading-relaxed">
                                        Practice subtraction with borrowing, focusing on self-checking answers.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Default selection - July 18 session */}
                      {!selectedSessionId && setSelectedSessionId("july-18")}

                      {/* Placeholder for other sessions */}
                      {selectedSessionId && selectedSessionId !== "july-18" && (
                        <div className="p-8 text-center bg-white rounded-md border border-stone-200 overflow-hidden">
                          <p className="text-stone-500 font-lexend">
                            Session content for {selectedSessionId} will be added here.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "assignments" && (
                  <div className="text-center py-12">
                    <p className="text-stone-500 font-lexend">
                      Assignments content coming soon...
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Session Notes Overlay */}
      <SessionNotesOverlay />
    </TooltipProvider>
  );
}
