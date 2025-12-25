import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Users, CheckCircle, BookOpen, Target, Award, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CourseDetail {
  id: string;
  title: string;
  duration: string;
  targetClass: string;
  description: string;
  longDescription: string;
  color: string;
  subjects: string[];
  features: string[];
  eligibility: string;
  batchTimings: string[];
  fee: string;
  highlights: string[];
  examsCovered: string[];
  image: string;
}

const courses: Record<string, CourseDetail> = {
  "two-year-foundation": {
    id: "two-year-foundation",
    title: "Two Year Foundation Course",
    duration: "2 Years",
    targetClass: "Class XI & XII",
    description: "Comprehensive preparation for XI, XII Board, JEE Main, JEE Advanced, NEET, KVPY, and State Engineering exams.",
    longDescription: "Our flagship Two Year Foundation Course is meticulously designed for students entering Class XI who aspire to crack competitive exams like JEE and NEET while excelling in their board examinations. This program provides a perfect blend of conceptual clarity, problem-solving skills, and exam-oriented preparation. With synchronized teaching methodology, students learn topics in a manner that helps them excel in both boards and competitive exams.",
    color: "from-primary to-accent",
    subjects: ["Physics", "Chemistry", "Mathematics/Biology"],
    features: [
      "Complete Board + Competitive Exam Preparation",
      "Synchronized teaching for XI & XII syllabus",
      "Regular doubt clearing sessions",
      "Weekly tests and monthly assessments",
      "Comprehensive study materials",
      "Personal mentorship program",
      "Parent-teacher meetings",
      "Performance tracking and analysis"
    ],
    eligibility: "Students who have passed Class X from any recognized board",
    batchTimings: ["Morning: 7:00 AM - 10:00 AM", "Evening: 4:00 PM - 7:00 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "500+ hours of classroom teaching per year",
      "10,000+ practice problems",
      "50+ full-length mock tests",
      "Individual attention with small batch sizes"
    ],
    examsCovered: ["JEE Main", "JEE Advanced", "NEET", "KVPY", "BSEB/CBSE Boards", "State Engineering Exams"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"
  },
  "one-year-target": {
    id: "one-year-target",
    title: "One Year Target Course",
    duration: "1 Year",
    targetClass: "Class XII",
    description: "Intensive preparation for XII Board, JEE Main, JEE Advanced, NEET, and competitive exams.",
    longDescription: "The One Year Target Course is designed for Class XII students who want to maximize their performance in competitive exams while securing excellent marks in board exams. This intensive program covers the complete XII syllabus along with revision of XI concepts, providing comprehensive preparation for JEE/NEET. With focused teaching and rigorous practice, students are prepared to face any challenge.",
    color: "from-secondary to-primary",
    subjects: ["Physics", "Chemistry", "Maths/Bio"],
    features: [
      "Complete XII syllabus coverage",
      "XI concepts revision and reinforcement",
      "Intensive problem-solving sessions",
      "Board exam pattern training",
      "Competitive exam strategies",
      "Regular mock tests",
      "Last month intensive revision",
      "Exam day preparation tips"
    ],
    eligibility: "Students who have passed Class XI from any recognized board",
    batchTimings: ["Morning: 6:30 AM - 10:00 AM", "Evening: 3:30 PM - 7:00 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "700+ hours of intensive teaching",
      "15,000+ practice problems",
      "75+ mock tests",
      "100% syllabus completion before exams"
    ],
    examsCovered: ["JEE Main", "JEE Advanced", "NEET", "BSEB/CBSE Boards"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80"
  },
  "one-year-board": {
    id: "one-year-board",
    title: "One Year Board Exam Course",
    duration: "1 Year",
    targetClass: "Class XI & XII",
    description: "Focused preparation for CBSE/BSEB Board examinations with thorough concept building.",
    longDescription: "Our One Year Board Exam Course is specifically designed for students who want to focus exclusively on excelling in their board examinations. The course provides in-depth coverage of CBSE/BSEB syllabus with emphasis on conceptual understanding, application-based learning, and extensive practice. Students learn to write perfect answers and manage time effectively during exams.",
    color: "from-accent to-primary",
    subjects: ["All Subjects", "Board Focus"],
    features: [
      "Complete NCERT-based teaching",
      "Chapter-wise concept building",
      "Previous year paper analysis",
      "Answer writing practice",
      "Time management training",
      "Sample paper solving",
      "Pre-board examinations",
      "Last minute revision sessions"
    ],
    eligibility: "Students in Class XI or XII",
    batchTimings: ["Morning: 7:00 AM - 9:30 AM", "Evening: 4:30 PM - 7:00 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "400+ hours of focused teaching",
      "Complete NCERT coverage",
      "30+ sample papers practice",
      "100% board exam success rate"
    ],
    examsCovered: ["CBSE Board", "BSEB Board"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80"
  },
  "foundation-viii-x": {
    id: "foundation-viii-x",
    title: "Foundation Course (VIII-X)",
    duration: "1-3 Years",
    targetClass: "Class VIII, IX & X",
    description: "Early preparation for NTSE, OLYMPIAD, and foundation for JEE & NEET aspirants.",
    longDescription: "The Foundation Course is designed to build a strong academic foundation for students from an early age. Starting from Class VIII, students develop analytical thinking, problem-solving abilities, and scientific temperament that forms the base for success in future competitive exams. The course prepares students for Olympiads, NTSE, and builds the essential foundation for JEE/NEET preparation.",
    color: "from-success to-accent",
    subjects: ["Science", "Mathematics", "Mental Ability"],
    features: [
      "Conceptual foundation building",
      "Olympiad preparation",
      "NTSE coaching",
      "Mental ability development",
      "Scientific aptitude building",
      "Interactive learning sessions",
      "Hobby and science projects",
      "Career guidance"
    ],
    eligibility: "Students in Class VIII, IX, or X",
    batchTimings: ["After School: 3:30 PM - 5:30 PM", "Weekend: 9:00 AM - 1:00 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "Early competitive exam exposure",
      "Olympiad medal winners every year",
      "NTSE scholars produced",
      "Fun and engaging learning"
    ],
    examsCovered: ["NTSE", "Science Olympiad", "Math Olympiad", "School Boards"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80"
  },
  "gurukul-achiever": {
    id: "gurukul-achiever",
    title: "Gurukul Achiever",
    duration: "1 Year",
    targetClass: "Class XI & XII",
    description: "Specially designed for BSEB and CBSE Board students aiming for excellence.",
    longDescription: "Gurukul Achiever is our premium program designed for serious students who aim for top ranks in board examinations along with competitive exam preparation. This exclusive program offers personalized attention, extended hours of teaching, and special focus on developing exam temperament. Students in this program receive priority access to all resources and one-on-one mentorship.",
    color: "from-primary to-secondary",
    subjects: ["Complete Board", "Competition Prep"],
    features: [
      "Premium batch with limited seats",
      "Extended teaching hours",
      "One-on-one mentorship",
      "Priority doubt clearing",
      "Extra practice sessions",
      "Personalized study plans",
      "Regular parent updates",
      "Scholarship opportunities"
    ],
    eligibility: "Selection through entrance test and interview",
    batchTimings: ["Special Batch: 6:00 AM - 10:00 AM", "Additional Evening: 5:00 PM - 7:00 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "800+ hours of premium teaching",
      "1:10 teacher-student ratio",
      "100% board exam toppers",
      "Scholarship for meritorious students"
    ],
    examsCovered: ["JEE Main", "JEE Advanced", "NEET", "BSEB/CBSE Boards"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
  },
  "neet-preparation": {
    id: "neet-preparation",
    title: "NEET Preparation",
    duration: "1-2 Years",
    targetClass: "Class XI & XII",
    description: "Dedicated medical entrance preparation with focus on Biology, Physics & Chemistry.",
    longDescription: "Our dedicated NEET Preparation program is tailored for students aspiring to become doctors. With specialized focus on Biology, Physics, and Chemistry as required for NEET-UG, this course provides comprehensive preparation including regular theory classes, practical exposure, and extensive problem practice. Our experienced faculty, many of whom are from medical backgrounds, provide insights that help students excel.",
    color: "from-accent to-success",
    subjects: ["Biology", "Physics", "Chemistry"],
    features: [
      "NEET-focused curriculum",
      "Biology specialist faculty",
      "NCERT-based teaching",
      "MCQ practice sessions",
      "Previous year NEET papers",
      "Medical entrance strategies",
      "Regular NEET mock tests",
      "AIIMS/JIPMER tips"
    ],
    eligibility: "Students in Class XI, XII or Droppers",
    batchTimings: ["Morning: 6:30 AM - 10:00 AM", "Evening: 4:00 PM - 7:30 PM"],
    fee: "Contact for fee structure",
    highlights: [
      "AIIMS selections every year",
      "600+ hours of NEET-focused teaching",
      "50,000+ MCQs practice bank",
      "Dedicated Biology lab sessions"
    ],
    examsCovered: ["NEET-UG", "AIIMS", "JIPMER", "State Medical Entrances"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
  }
};

const Course = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? courses[courseId] : null;

  if (!course) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
            <Link to="/#courses">
              <Button variant="hero">View All Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} | Gurukul Classes Hajipur</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary text-secondary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={course.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container-narrow px-4 relative z-10">
            <Link to="/#courses" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
            
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${course.color} text-primary-foreground text-sm font-medium mb-4`}>
              {course.targetClass}
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-6 text-secondary-foreground/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.targetClass}</span>
              </div>
            </div>
            
            <p className="text-lg text-secondary-foreground/80 max-w-3xl">
              {course.longDescription}
            </p>
          </div>
        </section>

        {/* Course Details */}
        <section className="section-padding">
          <div className="container-narrow px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Features */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                    What You'll Get
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exams Covered */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    Exams Covered
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {course.examsCovered.map((exam, index) => (
                      <span 
                        key={index} 
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${course.color} text-primary-foreground font-medium`}
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    Course Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.highlights.map((highlight, index) => (
                      <div key={index} className="p-4 bg-card rounded-xl border-l-4 border-primary">
                        <span className="text-foreground font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Subjects Covered</h2>
                  <div className="flex flex-wrap gap-3">
                    {course.subjects.map((subject, index) => (
                      <span key={index} className="px-4 py-2 bg-muted rounded-full text-foreground font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-6">Quick Info</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Batch Timings</p>
                        {course.batchTimings.map((timing, i) => (
                          <p key={i} className="text-sm text-muted-foreground">{timing}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Eligibility</p>
                        <p className="text-sm text-muted-foreground">{course.eligibility}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a href="#contact">
                      <Button variant="hero" className="w-full">
                        Enroll Now
                      </Button>
                    </a>
                    <a href="tel:7673076349">
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call: 7673076349
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Course Image */}
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Course;