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
  // iPad-specific viewport height fix
  useEffect(() => {
    const updateViewport = () => {
      // For iPad Safari, use the smaller of visualViewport or window height
      let height = window.innerHeight;

      if (window.visualViewport) {
        height = Math.min(window.visualViewport.height, window.innerHeight);
      }

      // Set custom property for CSS fallback
      document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);

      // Force immediate layout update on iOS
      if (navigator.userAgent.includes('iPad') || navigator.userAgent.includes('iPhone')) {
        document.body.style.height = `${height}px`;
        setTimeout(() => {
          document.body.style.height = '';
        }, 10);
      }
    };

    updateViewport();

    // More frequent updates for iOS
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport);
      window.visualViewport.addEventListener('scroll', updateViewport);
    }

    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewport, 200); // Delay for orientation change
    });

    // Initial delay update for iOS
    setTimeout(updateViewport, 100);
    setTimeout(updateViewport, 500);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
        window.visualViewport.removeEventListener('scroll', updateViewport);
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
