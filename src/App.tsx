import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import AnimatedPage from "./components/AnimatedPage";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Results = lazy(() => import("./pages/Results"));
const ResultVerification = lazy(() => import("./pages/ResultVerification"));
const GTSEResults = lazy(() => import("./pages/GTSEResults"));
const Course = lazy(() => import("./pages/Course"));
const Courses = lazy(() => import("./pages/Courses"));
const Blog = lazy(() => import("./pages/Blog"));
const Faculty = lazy(() => import("./pages/Faculty"));
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// High-end loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-muted-foreground font-serif animate-pulse">Loading Gurukul Portal...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
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
