import "./global.css";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDetail from "./pages/StudentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Simple viewport height fix for iPad Safari
  useEffect(() => {
    const updateViewport = () => {
      // Use visualViewport if available (modern iOS), otherwise window.innerHeight
      const height = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
    };

    updateViewport();

    // Listen for changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport);
    }
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
      }
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student/:studentId" element={<StudentDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
