import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Results from "./pages/Results";
import ResultVerification from "./pages/ResultVerification";
import GTSEResults from "./pages/GTSEResults";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import Faculty from "./pages/Faculty";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/courses" element={<AnimatedPage><Courses /></AnimatedPage>} />
        <Route path="/gallery" element={<AnimatedPage><Gallery /></AnimatedPage>} />
        <Route path="/results" element={<AnimatedPage><Results /></AnimatedPage>} />
        <Route path="/verify-result" element={<AnimatedPage><ResultVerification /></AnimatedPage>} />
        <Route path="/gtse-results" element={<AnimatedPage><GTSEResults /></AnimatedPage>} />
        <Route path="/course/:courseId" element={<AnimatedPage><Course /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/blog/:slug" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/faculty" element={<AnimatedPage><Faculty /></AnimatedPage>} />
        <Route path="/faculty/:id" element={<AnimatedPage><Faculty /></AnimatedPage>} />
        <Route path="/testimonials" element={<AnimatedPage><Testimonials /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
