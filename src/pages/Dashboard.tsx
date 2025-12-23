import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, Calendar, Clock, Download, FileText, 
  Play, CheckCircle, Circle, TrendingUp, Award, Bell,
  ChevronRight, Atom, FlaskConical, Calculator, Dna
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock student data
  const student = {
    name: "Rahul Kumar",
    course: "Two Year Foundation (JEE)",
    batch: "2024-26",
    rollNo: "GC2024/JEE/156"
  };

  const schedule = [
    { time: "7:00 AM - 9:00 AM", subject: "Physics", teacher: "Mr. Chandan Kumar", room: "Hall A", icon: Atom },
    { time: "9:30 AM - 11:30 AM", subject: "Chemistry", teacher: "Mr. Sumit Jha", room: "Lab 1", icon: FlaskConical },
    { time: "12:00 PM - 2:00 PM", subject: "Mathematics", teacher: "Mr. Shekhar Suman", room: "Hall B", icon: Calculator },
    { time: "3:00 PM - 4:30 PM", subject: "Doubt Session", teacher: "All Faculty", room: "Room 5", icon: BookOpen },
  ];

  const materials = [
    { id: 1, title: "Physics - Mechanics Complete Notes", type: "PDF", subject: "Physics", size: "12.5 MB", date: "Dec 20, 2024" },
    { id: 2, title: "Organic Chemistry - Chapter 1-5", type: "PDF", subject: "Chemistry", size: "8.2 MB", date: "Dec 18, 2024" },
    { id: 3, title: "Calculus Video Lecture Series", type: "Video", subject: "Mathematics", size: "1.2 GB", date: "Dec 15, 2024" },
    { id: 4, title: "JEE Main 2024 Question Papers", type: "PDF", subject: "All", size: "45 MB", date: "Dec 10, 2024" },
    { id: 5, title: "Physics - Electromagnetism Notes", type: "PDF", subject: "Physics", size: "15.3 MB", date: "Dec 8, 2024" },
  ];

  const progress = [
    { subject: "Physics", completed: 68, total: 100, color: "bg-blue-500" },
    { subject: "Chemistry", completed: 52, total: 100, color: "bg-green-500" },
    { subject: "Mathematics", completed: 75, total: 100, color: "bg-amber-500" },
  ];

  const announcements = [
    { id: 1, title: "JEE Main 2025 Mock Test Schedule Released", date: "Dec 22, 2024", urgent: true },
    { id: 2, title: "Holiday Notice: Institute closed on Dec 25", date: "Dec 20, 2024", urgent: false },
    { id: 3, title: "Result: Monthly Test December 2024", date: "Dec 18, 2024", urgent: false },
  ];

  const upcomingTests = [
    { name: "Weekly Physics Test", date: "Dec 26, 2024", topics: "Electrostatics", duration: "2 hrs" },
    { name: "Chemistry Unit Test", date: "Dec 28, 2024", topics: "Organic Chemistry Ch 1-3", duration: "3 hrs" },
    { name: "JEE Main Mock Test 5", date: "Jan 2, 2025", topics: "Full Syllabus", duration: "3 hrs" },
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics": return "from-blue-500 to-cyan-500";
      case "Chemistry": return "from-green-500 to-emerald-500";
      case "Mathematics": return "from-amber-500 to-orange-500";
      default: return "from-primary to-accent";
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Dashboard | Gurukul Classes Hajipur</title>
        <meta name="description" content="Access study materials, track your progress, and view class schedules." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-8 pt-28">
          <div className="container-narrow px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Welcome, {student.name}!</h1>
                <p className="text-secondary-foreground/70">
                  {student.course} | Batch: {student.batch} | Roll No: {student.rollNo}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="heroOutline" size="lg">
                  <Bell className="w-4 h-4" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="section-padding">
          <div className="container-narrow px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* Today's Schedule */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Today's Schedule
                    </h2>
                    <span className="text-sm text-muted-foreground">Monday, Dec 23, 2024</span>
                  </div>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSubjectColor(item.subject)} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{item.subject}</h3>
                          <p className="text-sm text-muted-foreground">{item.teacher} • {item.room}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                            <Clock className="w-4 h-4" />
                            {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Study Materials */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Study Materials
                    </h2>
                    <Button variant="ghost" size="sm">
                      View All <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {materials.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/50 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg ${item.type === "Video" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"} flex items-center justify-center flex-shrink-0`}>
                          {item.type === "Video" ? <Play className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">{item.subject} • {item.size} • {item.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Progress Tracking */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Syllabus Progress
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {progress.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-foreground">{item.subject}</span>
                          <span className="text-sm text-muted-foreground">{item.completed}% Complete</span>
                        </div>
                        <Progress value={item.completed} className="h-3" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-accent" />
                      <div>
                        <p className="font-semibold text-foreground">Overall Progress: 65%</p>
                        <p className="text-sm text-muted-foreground">Keep up the great work! You're on track.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Announcements */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Announcements
                  </h2>
                  <div className="space-y-3">
                    {announcements.map((item) => (
                      <Link
                        key={item.id}
                        to="/blog"
                        className="block p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          {item.urgent ? (
                            <span className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/30 mt-2 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3" asChild>
                    <Link to="/blog">View All News</Link>
                  </Button>
                </section>

                {/* Upcoming Tests */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Upcoming Tests
                  </h2>
                  <div className="space-y-4">
                    {upcomingTests.map((test, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground text-sm">{test.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{test.topics}</p>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-primary font-medium">{test.date}</span>
                          <span className="text-muted-foreground">{test.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Quick Links */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-lg font-bold text-foreground mb-4">Quick Links</h2>
                  <div className="space-y-2">
                    {[
                      { label: "View Results", href: "/results" },
                      { label: "Faculty Profiles", href: "/faculty" },
                      { label: "Photo Gallery", href: "/gallery" },
                      { label: "Contact Support", href: "/#contact" },
                    ].map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <span className="text-sm text-foreground">{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
