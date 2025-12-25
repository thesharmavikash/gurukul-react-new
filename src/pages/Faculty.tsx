import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Award, BookOpen, GraduationCap, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  designation: string;
  specialization: string[];
  achievements: string[];
  bio: string;
  email?: string;
  phone?: string;
}

const facultyData: FacultyMember[] = [
  {
    id: "santosh-kumar",
    name: "Santosh Kumar",
    subject: "English",
    qualification: "M.A., B.Ed.",
    experience: "15+ Years",
    designation: "Principal",
    specialization: ["English Literature", "Communication Skills", "Administrative Leadership"],
    achievements: [
      "Founded Gurukul Classes in 2013",
      "Mentored 5000+ students",
      "Developed comprehensive curriculum framework"
    ],
    bio: "Santosh Kumar sir is the visionary founder and principal of Gurukul Classes. With over 15 years of experience in education, he has built an institution that has transformed thousands of student lives. His leadership and dedication have made Gurukul Classes the premier coaching institute in Hajipur."
  },
  {
    id: "chandan-kumar",
    name: "Mr. Chandan Kumar",
    subject: "Physics",
    qualification: "M.Sc. Physics, B.Ed.",
    experience: "12+ Years",
    designation: "Senior Faculty - Physics",
    specialization: ["Mechanics", "Electromagnetism", "Modern Physics", "JEE Advanced Problem Solving"],
    achievements: [
      "100+ students selected in IIT through JEE Advanced",
      "Author of 'Physics Problem Solving Techniques'",
      "State-level Physics Olympiad coordinator"
    ],
    bio: "Mr. Chandan Kumar is known for his exceptional ability to simplify complex physics concepts. His teaching methodology focuses on building strong fundamentals and developing problem-solving intuition. Students admire his patience and dedication to clearing every doubt."
  },
  {
    id: "raushan-jha",
    name: "Mr. Raushan Jha",
    subject: "Physics",
    qualification: "M.Sc. Physics",
    experience: "8+ Years",
    designation: "Faculty - Physics",
    specialization: ["Optics", "Thermodynamics", "Waves", "NEET Physics"],
    achievements: [
      "Developed innovative teaching modules for NEET Physics",
      "50+ AIIMS selections under guidance",
      "Expert in numerical problem solving"
    ],
    bio: "Mr. Raushan Jha brings energy and enthusiasm to every physics class. His interactive teaching style and real-world examples make physics come alive for students. He specializes in NEET physics preparation and has an excellent track record."
  },
  {
    id: "sumit-jha",
    name: "Mr. Sumit Jha",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry",
    experience: "10+ Years",
    designation: "Senior Faculty - Chemistry",
    specialization: ["Organic Chemistry", "Reaction Mechanisms", "JEE Chemistry"],
    achievements: [
      "Created comprehensive organic chemistry reaction guide",
      "200+ IIT/NIT selections",
      "Chemistry Olympiad trainer"
    ],
    bio: "Mr. Sumit Jha has mastered the art of teaching organic chemistry. His systematic approach to reaction mechanisms has helped countless students overcome their fear of organic chemistry. He is known for his memorable mnemonics and tricks."
  },
  {
    id: "rahul-jha",
    name: "Mr. Rahul Jha",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry, NET Qualified",
    experience: "7+ Years",
    designation: "Faculty - Chemistry",
    specialization: ["Physical Chemistry", "Inorganic Chemistry", "NEET Chemistry"],
    achievements: [
      "100% result in physical chemistry tests",
      "Developed visual learning modules",
      "NEET Chemistry expert"
    ],
    bio: "Mr. Rahul Jha's expertise lies in making physical and inorganic chemistry accessible to all students. His use of visual aids, models, and practical demonstrations helps students grasp abstract concepts easily."
  },
  {
    id: "shekhar-suman",
    name: "Mr. Shekhar Suman",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics",
    experience: "11+ Years",
    designation: "Senior Faculty - Mathematics",
    specialization: ["Calculus", "Coordinate Geometry", "Algebra", "JEE Advanced Mathematics"],
    achievements: [
      "150+ students scored 95+ in JEE Maths",
      "Author of 'Mathematics Shortcut Techniques'",
      "Mathematics Olympiad guide"
    ],
    bio: "Mr. Shekhar Suman is a mathematics wizard who can solve any problem with multiple approaches. His teaching emphasizes understanding concepts rather than memorizing formulas. Students love his shortcut techniques that save valuable time in exams."
  },
  {
    id: "ritu-raj",
    name: "Mr. Ritu Raj",
    subject: "Biology",
    qualification: "M.Sc. Biology, B.Ed.",
    experience: "9+ Years",
    designation: "Senior Faculty - Biology",
    specialization: ["Human Physiology", "Genetics", "Ecology", "NEET Biology"],
    achievements: [
      "80+ AIIMS/Government Medical selections",
      "NEET Biology success rate: 95%",
      "Created visual learning resources for biology"
    ],
    bio: "Mr. Ritu Raj makes biology fascinating through his storytelling approach. His detailed diagrams and flowcharts have become study staples for all NEET aspirants. He emphasizes NCERT-based learning with conceptual depth."
  },
  {
    id: "atul-kumar",
    name: "Mr. Atul Kumar",
    subject: "Physics",
    qualification: "M.Sc. Physics",
    experience: "6+ Years",
    designation: "Faculty - Physics",
    specialization: ["Mechanics", "SHM & Waves", "Foundation Physics"],
    achievements: [
      "Specialist in foundation batch training",
      "Developed step-by-step problem solving approach",
      "Excellent student feedback ratings"
    ],
    bio: "Mr. Atul Kumar excels in building strong physics foundations for younger students. His patient teaching style and step-by-step approach help students develop confidence in physics from the very beginning."
  }
];

const getSubjectColor = (subject: string) => {
  switch (subject) {
    case "Physics": return "from-blue-500 to-cyan-500";
    case "Chemistry": return "from-green-500 to-emerald-500";
    case "Mathematics": return "from-amber-500 to-orange-500";
    case "Biology": return "from-pink-500 to-rose-500";
    default: return "from-primary to-accent";
  }
};

// Faculty Listing Component
const FacultyList = () => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const subjects = ["all", "Physics", "Chemistry", "Mathematics", "Biology", "English"];

  const filteredFaculty = selectedSubject === "all" 
    ? facultyData 
    : facultyData.filter(f => f.subject === selectedSubject);

  return (
    <>
      <Helmet>
        <title>Our Faculty | Gurukul Classes Hajipur</title>
        <meta name="description" content="Meet our expert faculty members who guide students to success in IIT-JEE, NEET, and Board Examinations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-20 pt-28">
          <div className="container-narrow px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
            <p className="text-secondary-foreground/70 text-lg max-w-2xl">
              Meet the dedicated educators who shape future engineers and doctors with their expertise and passion for teaching.
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="sticky top-0 z-40 bg-card border-b border-border py-4 shadow-soft">
          <div className="container-narrow px-4">
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubject === subject
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {subject === "all" ? "All Subjects" : subject}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Grid */}
        <section className="section-padding">
          <div className="container-narrow px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty, index) => (
                <Link
                  key={faculty.id}
                  to={`/faculty/${faculty.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-large transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-br ${getSubjectColor(faculty.subject)} flex items-center justify-center relative`}>
                    <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center text-3xl font-serif font-bold text-foreground shadow-lg group-hover:scale-110 transition-transform">
                      {faculty.name.split(' ').slice(-1)[0].charAt(0)}
                    </div>
                    <span className="absolute top-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-xs font-medium">
                      {faculty.subject}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-2">{faculty.designation}</p>
                    <p className="text-muted-foreground text-sm mb-4">{faculty.qualification}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {faculty.experience}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="w-3 h-3" /> {faculty.achievements.length} Achievements
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {faculty.specialization.slice(0, 2).map((spec, i) => (
                          <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Single Faculty Profile Component
const FacultyProfile = () => {
  const { id } = useParams();
  const faculty = facultyData.find(f => f.id === id);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Faculty Not Found</h1>
          <Button asChild>
            <Link to="/faculty">Back to Faculty</Link>
          </Button>
        </div>
      </div>
    );
  }

  const otherFaculty = facultyData.filter(f => f.subject === faculty.subject && f.id !== faculty.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{faculty.name} - {faculty.subject} Faculty | Gurukul Classes</title>
        <meta name="description" content={`${faculty.name} - ${faculty.designation} at Gurukul Classes. ${faculty.qualification}. ${faculty.experience} of teaching experience.`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className={`bg-gradient-to-br ${getSubjectColor(faculty.subject)} text-primary-foreground py-20 pt-28`}>
          <div className="container-narrow px-4">
            <Link to="/faculty" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Faculty
            </Link>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center text-4xl font-serif font-bold text-foreground shadow-lg">
                {faculty.name.split(' ').slice(-1)[0].charAt(0)}
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-primary-foreground/20 backdrop-blur-sm rounded-full text-sm mb-2">
                  {faculty.subject}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{faculty.name}</h1>
                <p className="text-primary-foreground/80 text-lg">{faculty.designation}</p>
                <p className="text-primary-foreground/60">{faculty.qualification}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="section-padding">
          <div className="container-narrow px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{faculty.bio}</p>
                </section>

                {/* Specialization */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {faculty.specialization.map((spec, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${getSubjectColor(faculty.subject)} text-primary-foreground text-sm font-medium`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Achievements */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Key Achievements
                  </h2>
                  <div className="space-y-3">
                    {faculty.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-foreground">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Qualification</p>
                        <p className="font-medium text-foreground text-sm">{faculty.qualification}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-medium text-foreground text-sm">{faculty.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Subject</p>
                        <p className="font-medium text-foreground text-sm">{faculty.subject}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact */}
                <section className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">Contact Institute</h3>
                  <div className="space-y-3">
                    <a href="tel:7673076349" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">7673076349</span>
                    </a>
                    <a href="mailto:gurukuljee@gmail.com" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">gurukuljee@gmail.com</span>
                    </a>
                  </div>
                </section>

                {/* Other Faculty */}
                {otherFaculty.length > 0 && (
                  <section className="bg-card rounded-2xl p-6 shadow-card">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-4">Other {faculty.subject} Faculty</h3>
                    <div className="space-y-3">
                      {otherFaculty.map((f) => (
                        <Link
                          key={f.id}
                          to={`/faculty/${f.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getSubjectColor(f.subject)} flex items-center justify-center text-primary-foreground font-bold`}>
                            {f.name.split(' ').slice(-1)[0].charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{f.name}</p>
                            <p className="text-xs text-muted-foreground">{f.designation}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const Faculty = () => {
  const { id } = useParams();
  return id ? <FacultyProfile /> : <FacultyList />;
};

export default Faculty;
