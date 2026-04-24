import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Star, Filter, Search, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  id: number;
  name: string;
  rank: string;
  college: string;
  exam: "NEET" | "JEE Main" | "JEE Advanced";
  year: number;
  score?: string;
  category?: string;
  image?: string;
}

const Results = () => {
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const exams = ["all", "NEET", "JEE Main", "JEE Advanced"];
  const years = ["all", "2024", "2023", "2022", "2021", "2020"];

  const students: Student[] = [
    // 2024 Results
    { id: 1, name: "Prachi Kumari", rank: "AIR 1245", college: "AIIMS Delhi", exam: "NEET", year: 2024, score: "705/720" },
    { id: 2, name: "Harsh Kumar", rank: "AIR 892", college: "IIT Kharagpur", exam: "JEE Advanced", year: 2024, score: "289/360" },
    { id: 3, name: "Shreya Singh", rank: "AIR 456", college: "IIT Bombay", exam: "JEE Advanced", year: 2024, score: "301/360" },
    { id: 4, name: "Ansh Patel", rank: "AIR 3421", college: "NIT Patna", exam: "JEE Main", year: 2024, score: "98.2%ile" },
    { id: 5, name: "Palak Sharma", rank: "AIR 2156", college: "AIIMS Patna", exam: "NEET", year: 2024, score: "685/720" },
    { id: 6, name: "Aryan Raj", rank: "AIR 1023", college: "IIT Roorkee", exam: "JEE Advanced", year: 2024, score: "278/360" },
    { id: 7, name: "Nikita Das", rank: "AIR 5678", college: "NIT Trichy", exam: "JEE Main", year: 2024, score: "97.5%ile" },
    { id: 8, name: "Rahul Verma", rank: "AIR 3890", college: "Government Medical Patna", exam: "NEET", year: 2024, score: "642/720" },
    { id: 9, name: "Sneha Kumari", rank: "AIR 7823", college: "NIT Rourkela", exam: "JEE Main", year: 2024, score: "96.8%ile" },
    { id: 10, name: "Vikash Singh", rank: "AIR 1567", college: "IIT BHU", exam: "JEE Advanced", year: 2024, score: "267/360" },
    
    // 2023 Results
    { id: 11, name: "Ananya Verma", rank: "AIR 1890", college: "AIIMS Patna", exam: "NEET", year: 2023, score: "692/720" },
    { id: 12, name: "Rohit Sharma", rank: "AIR 756", college: "IIT Roorkee", exam: "JEE Advanced", year: 2023, score: "285/360" },
    { id: 13, name: "Priya Singh", rank: "AIR 4521", college: "NIT Patna", exam: "JEE Main", year: 2023, score: "97.8%ile" },
    { id: 14, name: "Amit Kumar", rank: "AIR 2345", college: "IIT Guwahati", exam: "JEE Advanced", year: 2023, score: "256/360" },
    { id: 15, name: "Kavya Rao", rank: "AIR 1123", college: "AIIMS Jodhpur", exam: "NEET", year: 2023, score: "698/720" },
    { id: 16, name: "Deepak Yadav", rank: "AIR 6789", college: "NIT Durgapur", exam: "JEE Main", year: 2023, score: "96.2%ile" },
    
    // 2022 Results
    { id: 17, name: "Shivam Gupta", rank: "AIR 890", college: "IIT Delhi", exam: "JEE Advanced", year: 2022, score: "290/360" },
    { id: 18, name: "Ritu Kumari", rank: "AIR 1567", college: "AIIMS Rishikesh", exam: "NEET", year: 2022, score: "688/720" },
    { id: 19, name: "Manish Thakur", rank: "AIR 5432", college: "NIT Silchar", exam: "JEE Main", year: 2022, score: "97.1%ile" },
    { id: 20, name: "Pooja Sharma", rank: "AIR 2890", college: "Government Medical Darbhanga", exam: "NEET", year: 2022, score: "656/720" },
    
    // 2021 Results
    { id: 21, name: "Aditya Singh", rank: "AIR 1234", college: "IIT Kanpur", exam: "JEE Advanced", year: 2021, score: "275/360" },
    { id: 22, name: "Neha Gupta", rank: "AIR 987", college: "AIIMS Delhi", exam: "NEET", year: 2021, score: "702/720" },
    { id: 23, name: "Saurabh Kumar", rank: "AIR 4567", college: "NIT Patna", exam: "JEE Main", year: 2021, score: "98.0%ile" },
    
    // 2020 Results
    { id: 24, name: "Rajesh Prasad", rank: "AIR 678", college: "IIT Madras", exam: "JEE Advanced", year: 2020, score: "295/360" },
    { id: 25, name: "Anjali Kumari", rank: "AIR 1456", college: "AIIMS Patna", exam: "NEET", year: 2020, score: "695/720" },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesExam = selectedExam === "all" || student.exam === selectedExam;
      const matchesYear = selectedYear === "all" || student.year.toString() === selectedYear;
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.college.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesExam && matchesYear && matchesSearch;
    });
  }, [selectedExam, selectedYear, searchQuery]);

  const getExamColor = (exam: string) => {
    switch (exam) {
      case "NEET": return "from-green-500 to-emerald-500";
      case "JEE Main": return "from-blue-500 to-cyan-500";
      case "JEE Advanced": return "from-amber-500 to-orange-500";
      default: return "from-primary to-accent";
    }
  };

  const getExamBadgeColor = (exam: string) => {
    switch (exam) {
      case "NEET": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "JEE Main": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "JEE Advanced": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  // Statistics
  const stats = useMemo(() => ({
    totalSelections: students.length,
    iitSelections: students.filter(s => s.exam === "JEE Advanced").length,
    nitSelections: students.filter(s => s.exam === "JEE Main").length,
    medicalSelections: students.filter(s => s.exam === "NEET").length,
  }), [students]);

  return (
    <>
      <Helmet>
        <title>Hall of Fame | Gurukul Classes Hajipur</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hall of Fame Hero */}
        <header className="relative bg-secondary text-secondary-foreground py-24 pt-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent blur-3xl scale-150" />
          </div>
          
          <div className="container-narrow px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <Trophy className="w-10 h-10 text-accent animate-pulse" />
                <h1 className="font-serif text-4xl md:text-6xl font-bold">Hall of Fame</h1>
              </div>
              <p className="text-secondary-foreground/70 text-lg max-w-2xl mb-12">
                Celebrating the relentless hard work and extraordinary success of our students.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Trophy, value: stats.totalSelections, label: "Total Selections", color: "text-accent" },
                { icon: Medal, value: stats.iitSelections, label: "IIT Selections", color: "text-amber-500" },
                { icon: Star, value: stats.nitSelections, label: "NIT Selections", color: "text-blue-500" },
                { icon: GraduationCap, value: stats.medicalSelections, label: "Medical Selections", color: "text-green-500" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-2xl p-6 text-center backdrop-blur-sm"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="font-serif text-3xl font-bold">{stat.value}+</div>
                  <div className="text-xs text-secondary-foreground/60 uppercase tracking-widest font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        {/* Dynamic Search & Filter Section */}
        <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border py-6 shadow-soft">
          <div className="container-narrow px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
              {/* Exam Pills */}
              <div className="flex flex-wrap gap-2">
                {exams.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${
                      selectedExam === exam
                        ? "bg-primary text-primary-foreground border-primary shadow-glow"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {exam === "all" ? "All Achievers" : exam}
                  </button>
                ))}
              </div>

              {/* Advanced Search Bar */}
              <div className="flex gap-3 flex-1 lg:max-w-md">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Quick search by name or college..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-background border-border rounded-xl focus:ring-primary focus:border-primary shadow-inner"
                  />
                </div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Live Grid */}
        <section className="section-padding min-h-[60vh]">
          <div className="container-narrow px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Live Results: <span className="text-foreground">{filteredStudents.length} Matches</span>
                </p>
              </div>
              <Button variant="outline" className="rounded-xl font-bold gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredStudents.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No achievers found</h3>
                  <p className="text-muted-foreground">Try searching with a different name or exam type.</p>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:border-primary/30 hover:shadow-large transition-all group"
                    >
                      <div className={`h-2 bg-gradient-to-r ${getExamColor(student.exam)}`} />
                      <div className="p-6">
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getExamColor(student.exam)} flex items-center justify-center text-primary-foreground text-2xl font-bold group-hover:scale-110 transition-transform shadow-xl mb-4 relative`}>
                            {student.image ? (
                              <img src={student.image} alt={student.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              student.name.split(" ").map(n => n[0]).join("")
                            )}
                            <div className="absolute -bottom-1 -right-1 bg-background p-1.5 rounded-full border border-border shadow-soft">
                               <Star className="w-4 h-4 text-accent fill-accent" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-1">{student.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getExamBadgeColor(student.exam)}`}>
                            {student.exam}
                          </span>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Achievement</span>
                            <span className="text-sm font-black text-primary">{student.rank}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Institution</span>
                            <span className="text-xs font-bold text-foreground text-right truncate ml-4" title={student.college}>
                              {student.college}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Year</span>
                            <span className="text-xs font-bold text-foreground">{student.year}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default Results;
