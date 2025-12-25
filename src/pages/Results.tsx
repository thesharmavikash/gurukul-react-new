import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Star, Filter, Search, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const filteredStudents = students.filter((student) => {
    const matchesExam = selectedExam === "all" || student.exam === selectedExam;
    const matchesYear = selectedYear === "all" || student.year.toString() === selectedYear;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesExam && matchesYear && matchesSearch;
  });

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
  const stats = {
    totalSelections: students.length,
    iitSelections: students.filter(s => s.exam === "JEE Advanced").length,
    nitSelections: students.filter(s => s.exam === "JEE Main").length,
    medicalSelections: students.filter(s => s.exam === "NEET").length,
  };

  return (
    <>
      <Helmet>
        <title>Results | Gurukul Classes Hajipur - Our Achievers</title>
        <meta name="description" content="View year-wise results of Gurukul Classes students in NEET, JEE Main, and JEE Advanced. Our students consistently achieve top ranks in national level examinations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-20 pt-28">
          <div className="container-narrow px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Results</h1>
            <p className="text-secondary-foreground/70 text-lg max-w-2xl mb-8">
              A testament to hard work, dedication, and expert guidance. View our students' achievements across years.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-4 text-center">
                <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold">{stats.totalSelections}+</div>
                <div className="text-sm text-secondary-foreground/60">Total Selections</div>
              </div>
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-4 text-center">
                <Medal className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold">{stats.iitSelections}+</div>
                <div className="text-sm text-secondary-foreground/60">IIT Selections</div>
              </div>
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-4 text-center">
                <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold">{stats.nitSelections}+</div>
                <div className="text-sm text-secondary-foreground/60">NIT Selections</div>
              </div>
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-4 text-center">
                <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold">{stats.medicalSelections}+</div>
                <div className="text-sm text-secondary-foreground/60">Medical Selections</div>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="sticky top-0 z-40 bg-card border-b border-border py-4 shadow-soft">
          <div className="container-narrow px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Exam Filter */}
              <div className="flex flex-wrap gap-2">
                <Filter className="w-5 h-5 text-muted-foreground hidden md:block" />
                {exams.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedExam === exam
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {exam === "all" ? "All Exams" : exam}
                  </button>
                ))}
              </div>

              {/* Year Filter & Search */}
              <div className="flex gap-3 w-full md:w-auto">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or college..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <section className="section-padding">
          <div className="container-narrow px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredStudents.length}</span> results
              </p>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-16">
                <GraduationCap className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-large transition-all group animate-fade-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    {/* Gradient Header */}
                    <div className={`h-2 bg-gradient-to-r ${getExamColor(student.exam)}`} />
                    
                    <div className="p-5">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getExamColor(student.exam)} flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform overflow-hidden`}>
                          {student.image ? (
                            <img 
                              src={student.image} 
                              alt={student.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            student.name.split(" ").map(n => n[0]).join("")
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getExamBadgeColor(student.exam)}`}>
                            {student.exam}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rank</span>
                          <span className="font-semibold text-primary">{student.rank}</span>
                        </div>
                        {student.score && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Score</span>
                            <span className="font-medium text-foreground">{student.score}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">College</span>
                          <span className="font-medium text-foreground text-right max-w-[60%] truncate" title={student.college}>
                            {student.college}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year</span>
                          <span className="font-medium text-foreground">{student.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Results;
