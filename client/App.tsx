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
  // Fix viewport height for iOS Safari
  useEffect(() => {
    const setViewportHeight = () => {
      // Get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // For iPad/iOS Safari, also set visual viewport if available
      if (window.visualViewport) {
        const visualVh = window.visualViewport.height * 0.01;
        document.documentElement.style.setProperty('--visual-vh', `${visualVh}px`);
      }
    };

    // Set initial value
    setViewportHeight();

    // For iPad/iOS Safari, listen to visual viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setViewportHeight);
      window.visualViewport.addEventListener('scroll', setViewportHeight);
    }

    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      // Delay for orientation change to complete
      setTimeout(setViewportHeight, 100);
    });

    // Additional iPad-specific events
    window.addEventListener('scroll', setViewportHeight);

    // Force update after a short delay on load
    setTimeout(setViewportHeight, 300);

    // Cleanup
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setViewportHeight);
        window.visualViewport.removeEventListener('scroll', setViewportHeight);
      }
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      window.removeEventListener('scroll', setViewportHeight);
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
