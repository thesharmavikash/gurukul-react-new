import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trophy, CheckCircle, Download, Smartphone, MapPin, Calendar, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Mock student data with Roll Numbers for verification
const resultDatabase = [
  { roll: "GC2024001", name: "Prachi Kumari", exam: "NEET", rank: "AIR 1245", score: "705/720", status: "Qualified", college: "AIIMS Delhi" },
  { roll: "GC2024002", name: "Harsh Kumar", exam: "JEE Advanced", rank: "AIR 892", score: "289/360", status: "Qualified", college: "IIT Kharagpur" },
  { roll: "GC2024003", name: "Shreya Singh", exam: "JEE Advanced", rank: "AIR 456", score: "301/360", status: "Qualified", college: "IIT Bombay" },
  { roll: "GC2024004", name: "Ansh Patel", exam: "JEE Main", rank: "AIR 3421", score: "98.2%ile", status: "Qualified", college: "NIT Patna" },
  { roll: "GTSE6101", name: "Aman Raj", exam: "GTSE 2024", rank: "Rank #1", score: "92/100", status: "Scholarship Qualified", class: "6" },
  { roll: "GTSE10101", name: "Sneha Kumari", exam: "GTSE 2024", rank: "Rank #3", score: "88/100", status: "Scholarship Qualified", class: "10" }
];

const ResultVerification = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);
    setError(false);

    // Simulate network delay for "technical portal" feel
    setTimeout(() => {
      const found = resultDatabase.find(r => r.roll.toLowerCase() === rollNumber.toLowerCase());
      if (found) {
        setResult(found);
      } else {
        setError(true);
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Verify Result | Gurukul Classes Portal</title>
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        <div className="container-narrow px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase mb-4"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Official Verification Portal</span>
            </motion.div>
            <h1 className="text-4xl font-serif font-bold mb-4">Student Result Verification</h1>
            <p className="text-muted-foreground">
              Enter your Roll Number to access your digital scorecard and qualifying status.
            </p>
          </div>

          <Card className="max-w-md mx-auto mb-12 border-none shadow-large bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Roll Number / Registration ID</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="e.g. GC2024001 or GTSE6101" 
                      className="pl-10 h-12"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" className="w-full h-12 text-lg shadow-glow" disabled={isSearching}>
                  {isSearching ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Search className="w-5 h-5" />
                    </motion.div>
                  ) : "Verify Identity"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto relative"
              >
                {/* Scorecard Visual */}
                <div className="bg-card border-2 border-primary rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="bg-primary p-6 text-white text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-2 text-accent" />
                    <h2 className="text-2xl font-serif font-bold tracking-tight">Official Digital Scorecard</h2>
                    <p className="text-white/70 text-xs font-mono">{result.roll}</p>
                  </div>
                  
                  <div className="p-10 space-y-8">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Candidate Name</p>
                        <p className="text-xl font-bold">{result.name}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Examination</p>
                        <p className="text-xl font-bold text-primary">{result.exam}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Score / Percentile</p>
                        <p className="text-xl font-bold">{result.score || 'N/A'}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">All India Rank</p>
                        <p className="text-xl font-bold text-accent">{result.rank}</p>
                      </div>
                    </div>

                    <div className="bg-success/5 border border-success/20 rounded-2xl p-4 flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6 text-success" />
                      <span className="font-bold text-success text-lg">{result.status}</span>
                    </div>

                    {result.college && (
                      <div className="text-center py-4 border-t border-dashed border-border">
                        <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-widest">Allotted Institution</p>
                        <p className="text-lg font-serif font-black">{result.college}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-secondary/30 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Verified: {new Date().toLocaleDateString()}</span>
                    </div>
                    <Button variant="outline" className="gap-2 rounded-xl font-bold border-primary text-primary hover:bg-primary hover:text-white">
                      <Download className="w-4 h-4" /> Download Certificate
                    </Button>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 w-24 h-24 hero-gradient rounded-full blur-2xl -z-10 opacity-50" />
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto text-destructive">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Record Not Found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  We couldn't find any results for this roll number. Please check the ID or contact office.
                </p>
                <Button variant="link" onClick={() => setRollNumber("")}>Try again</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default ResultVerification;
