import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronRight, CheckCircle, GraduationCap, Target, Send, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const questions = [
  {
    id: 1,
    question: "Which class are you currently in?",
    options: ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Target (Dropper)"],
  },
  {
    id: 2,
    question: "What is your primary target?",
    options: ["IIT JEE", "NEET", "Board Exams", "Foundation/Olympiad"],
  },
  {
    id: 3,
    question: "How many hours can you dedicate daily to self-study?",
    options: ["2-4 Hours", "4-6 Hours", "6-8 Hours", "8+ Hours"],
  },
  {
    id: 4,
    question: "What is your current level of preparation?",
    options: ["Beginner (Just starting)", "Intermediate (Know basics)", "Advanced (Solving pyqs)"],
  },
  {
    id: 5,
    question: "Which subject do you find most challenging?",
    options: ["Physics", "Chemistry", "Mathematics", "Biology"],
  }
];

const SuccessCalculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const target = answers[1];
    const classLevel = answers[0];
    
    if (classLevel.includes("8") || classLevel.includes("9") || classLevel.includes("10")) {
      return {
        score: 85,
        course: "Foundation Course (VIII-X)",
        path: "/course/foundation-viii-x",
        message: "You are at the perfect age to build a rock-solid foundation. Starting early gives you a massive advantage for JEE/NEET."
      };
    }
    
    if (target === "IIT JEE") {
      return {
        score: 75,
        course: classLevel.includes("11") ? "Two Year Foundation Course" : "One Year Target Course",
        path: classLevel.includes("11") ? "/course/two-year-foundation" : "/course/one-year-target",
        message: "Your focus on IIT-JEE requires rigorous practice. Our expert faculty will guide you through advanced concepts and problem-solving."
      };
    }

    if (target === "NEET") {
      return {
        score: 78,
        course: "NEET Preparation",
        path: "/course/neet-preparation",
        message: "For NEET, conceptual depth in Biology is key. Our medical specialists will help you master NCERT and beyond."
      };
    }

    return {
      score: 80,
      course: "One Year Board Exam Course",
      path: "/course/one-year-board",
      message: "Excellence in Boards is the first step to a great career. Our program ensures you score 95%+ with confidence."
    };
  };

  const recommendation = showResult ? getRecommendation() : null;

  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="container-narrow px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4"
          >
            <Calculator className="w-4 h-4" />
            <span>Success Diagnostic Tool</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Calculate Your Prep Readiness</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Answer 5 simple questions to get a personalized preparation strategy and course recommendation instantly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <Card className="border-none shadow-large overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="h-2 bg-secondary w-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / questions.length) * 100}%` }}
                  className="h-full bg-primary"
                />
              </div>
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <span className="text-primary font-bold">Step {step + 1} of {questions.length}</span>
                      <h3 className="text-2xl font-serif font-bold">{questions[step].question}</h3>
                    </div>

                    <div className="grid gap-3">
                      {questions[step].options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="justify-between h-14 text-left px-6 hover:border-primary hover:bg-primary/5 group"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="border-none shadow-glow bg-card text-center p-10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="w-20 h-20 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  <Target className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-2">Readiness Score: {recommendation?.score}%</h3>
                <p className="text-muted-foreground mb-8">{recommendation?.message}</p>
                
                <div className="p-6 bg-secondary/50 rounded-2xl mb-8 inline-block w-full">
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest block mb-2">Recommended Program</span>
                  <span className="text-xl font-bold">{recommendation?.course}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="xl" asChild>
                    <a href={`https://wa.me/917903113441?text=My prep readiness score is ${recommendation?.score}%. I'm interested in the ${recommendation?.course}.`} target="_blank">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Discuss on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="xl" onClick={() => { setStep(0); setAnswers([]); setShowResult(false); }}>
                    Start Over
                  </Button>
                </div>
              </Card>
              
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-soft">
                   <CheckCircle className="w-5 h-5 text-success" />
                   <span className="text-sm font-medium">Detailed Syllabus Analysis</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-soft">
                   <CheckCircle className="w-5 h-5 text-success" />
                   <span className="text-sm font-medium">Personalized Mentorship Plan</span>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />
    </section>
  );
};

export default SuccessCalculator;
