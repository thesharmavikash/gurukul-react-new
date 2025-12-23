import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Star, Filter, Search, Download, GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  id: string;
  roll_number: string;
  student_name: string;
  father_name: string | null;
  exam_type: string;
  year: number;
  rank: number | null;
  score: string | null;
  percentile: number | null;
  college: string | null;
  photo_url: string | null;
}

const Results = () => {
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rollNumberSearch, setRollNumberSearch] = useState("");
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedResult, setSearchedResult] = useState<StudentResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const exams = ["all", "NEET", "JEE Main", "JEE Advanced"];
  const years = ["all", "2024", "2023", "2022", "2021", "2020"];

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("student_results")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false });

      if (!error && data) {
        setResults(data);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  const handleRollNumberSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumberSearch.trim()) return;

    setSearching(true);
    setSearchError("");
    setSearchedResult(null);

    const { data, error } = await supabase
      .from("student_results")
      .select("*")
      .eq("is_published", true)
      .ilike("roll_number", rollNumberSearch.trim())
      .maybeSingle();

    if (error) {
      setSearchError("An error occurred while searching.");
    } else if (!data) {
      setSearchError("No result found for this roll number.");
    } else {
      setSearchedResult(data);
    }

    setSearching(false);
  };

  const clearRollNumberSearch = () => {
    setRollNumberSearch("");
    setSearchedResult(null);
    setSearchError("");
  };

  const filteredResults = results.filter((student) => {
    const matchesExam = selectedExam === "all" || student.exam_type === selectedExam;
    const matchesYear = selectedYear === "all" || student.year.toString() === selectedYear;
    const matchesSearch = 
      student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.college?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
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
    totalSelections: results.length,
    iitSelections: results.filter(s => s.exam_type === "JEE Advanced").length,
    nitSelections: results.filter(s => s.exam_type === "JEE Main").length,
    medicalSelections: results.filter(s => s.exam_type === "NEET").length,
  };

  return (
    <>
      <Helmet>
        <title>Results | Gurukul Classes Hajipur - Our Achievers</title>
        <meta name="description" content="View year-wise results of Gurukul Classes students in NEET, JEE Main, and JEE Advanced. Search your result by roll number." />
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

            {/* Roll Number Search */}
            <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3">Search Your Result</h3>
              <form onSubmit={handleRollNumberSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground/50" />
                  <Input
                    placeholder="Enter your roll number..."
                    value={rollNumberSearch}
                    onChange={(e) => setRollNumberSearch(e.target.value)}
                    className="pl-10 bg-secondary-foreground/5 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                  />
                </div>
                <Button type="submit" disabled={searching || !rollNumberSearch.trim()}>
                  {searching ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Search
                </Button>
                {(searchedResult || searchError) && (
                  <Button type="button" variant="outline" onClick={clearRollNumberSearch}>
                    Clear
                  </Button>
                )}
              </form>

              {/* Search Result */}
              {searchError && (
                <p className="mt-4 text-destructive">{searchError}</p>
              )}

              {searchedResult && (
                <div className="mt-6 bg-card rounded-xl p-6 border border-border">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getExamColor(searchedResult.exam_type)} flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0`}>
                      {searchedResult.student_name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="font-serif text-xl font-semibold text-foreground">
                          {searchedResult.student_name}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getExamBadgeColor(searchedResult.exam_type)}`}>
                          {searchedResult.exam_type}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Roll Number</span>
                          <p className="font-semibold text-foreground">{searchedResult.roll_number}</p>
                        </div>
                        {searchedResult.father_name && (
                          <div>
                            <span className="text-muted-foreground">Father's Name</span>
                            <p className="font-semibold text-foreground">{searchedResult.father_name}</p>
                          </div>
                        )}
                        {searchedResult.rank && (
                          <div>
                            <span className="text-muted-foreground">Rank</span>
                            <p className="font-semibold text-primary">AIR {searchedResult.rank}</p>
                          </div>
                        )}
                        {searchedResult.score && (
                          <div>
                            <span className="text-muted-foreground">Score</span>
                            <p className="font-semibold text-foreground">{searchedResult.score}</p>
                          </div>
                        )}
                        {searchedResult.college && (
                          <div className="sm:col-span-2">
                            <span className="text-muted-foreground">College</span>
                            <p className="font-semibold text-foreground">{searchedResult.college}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Year</span>
                          <p className="font-semibold text-foreground">{searchedResult.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                Showing <span className="font-semibold text-foreground">{filteredResults.length}</span> results
              </p>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-16">
                <GraduationCap className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResults.map((student, index) => (
                  <div
                    key={student.id}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-large transition-all group animate-fade-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    {/* Gradient Header */}
                    <div className={`h-2 bg-gradient-to-r ${getExamColor(student.exam_type)}`} />
                    
                    <div className="p-5">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getExamColor(student.exam_type)} flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform`}>
                          {student.student_name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{student.student_name}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getExamBadgeColor(student.exam_type)}`}>
                            {student.exam_type}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Roll No.</span>
                          <span className="font-mono text-foreground">{student.roll_number}</span>
                        </div>
                        {student.rank && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rank</span>
                            <span className="font-semibold text-primary">AIR {student.rank}</span>
                          </div>
                        )}
                        {student.score && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Score</span>
                            <span className="font-medium text-foreground">{student.score}</span>
                          </div>
                        )}
                        {student.college && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">College</span>
                            <span className="font-medium text-foreground text-right max-w-[60%] truncate" title={student.college}>
                              {student.college}
                            </span>
                          </div>
                        )}
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
