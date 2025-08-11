import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  UsersRound,
  NotebookText,
  LibraryBig,
  FileAudio,
  Rabbit,
  ChevronsUpDown,
  PanelLeft,
  Calendar,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onThisWeekClick: () => void;
  setShowStudentOverlay: (show: boolean) => void;
  greeting: { text: string; icon: any };
}

export function Sidebar({
  activeView,
  setActiveView,
  onThisWeekClick,
  setShowStudentOverlay,
  greeting,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const GreetingIcon = greeting.icon;

  return (
    <div
      className={`${isCollapsed ? "w-16 min-w-16" : "w-60 min-w-60"} flex flex-col min-h-screen-safe transition-all duration-300 flex-shrink-0`}
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
            onClick={() => {
              setActiveView("home");
              setShowStudentOverlay(false);
            }}
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

          {/* My Students */}
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-1 rounded-lg cursor-pointer h-8 ${
              activeView === "all"
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-950"
            }`}
            onClick={() => {
              setActiveView("all");
              setShowStudentOverlay(false);
            }}
          >
            <div className="flex items-center space-x-2">
              <UsersRound
                className={`w-4 h-4 ${activeView === "all" ? "text-white" : "text-white/80"}`}
              />
              {!isCollapsed && (
                <span
                  className={`text-sm font-lexend ${activeView === "all" ? "text-white" : "text-white"}`}
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
              onClick={() => {
                setActiveView("schedule");
                onThisWeekClick(); // Navigate to this week (July 28)
                setShowStudentOverlay(false);
              }}
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
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="px-2 py-1 -mx-2 -my-1">
                      <span
                        className={`text-sm font-lexend ${activeView === "schedule" ? "text-white" : "text-white/50"}`}
                      >
                        7
                      </span>
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
              className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 py-1 rounded-lg cursor-pointer h-8 ${
                activeView === "sessionnotes"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-indigo-950"
              }`}
              onClick={() => {
                setActiveView("sessionnotes");
                setShowStudentOverlay(false);
              }}
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
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="px-2 py-1 -mx-2 -my-1">
                      <span
                        className={`text-sm font-lexend ${activeView === "sessionnotes" ? "text-white" : "text-white/50"}`}
                      >
                        4
                      </span>
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
