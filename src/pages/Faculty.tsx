import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Award, BookOpen, GraduationCap, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import facultyRaw from "@/data/faculty.json";

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
  category: "foundation" | "mains-advanced";
  level: "HOD" | "Senior" | "Faculty";
  email?: string;
  phone?: string;
}

const facultyData = facultyRaw as FacultyMember[];

const getSubjectColor = (subject: string) => {
  switch (subject) {
    case "Physics": return "from-blue-500 to-cyan-500";
    case "Chemistry": return "from-green-500 to-emerald-500";
    case "Mathematics": return "from-amber-500 to-orange-500";
    case "Biology": return "from-pink-500 to-rose-500";
    default: return "from-primary to-accent";
  }
};

const FacultyCard = ({ faculty, index }: { faculty: FacultyMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Link
      to={`/faculty/${faculty.id}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-large transition-all block"
    >
      <div className={`h-32 bg-gradient-to-br ${getSubjectColor(faculty.subject)} flex items-center justify-center relative`}>
        <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center text-3xl font-serif font-bold text-foreground shadow-lg group-hover:scale-110 transition-transform">
          {faculty.name.split(' ').slice(-1)[0].charAt(0)}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider text-primary">
            {faculty.level}
          </span>
          <span className="px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider">
            {faculty.subject}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {faculty.name}
        </h3>
        <p className="text-primary font-medium text-sm mb-1">{faculty.designation}</p>
        <p className="text-muted-foreground text-xs mb-4">{faculty.qualification}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {faculty.experience}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const FacultyList = () => {
  const foundationFaculty = facultyData.filter(f => f.category === "foundation");
  const mainsAdvancedFaculty = facultyData.filter(f => f.category === "mains-advanced");

  const levelOrder = { "HOD": 0, "Senior": 1, "Faculty": 2 };
  const sortFaculty = (list: FacultyMember[]) => [...list].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Expert Faculty | Gurukul Classes Hajipur</title>
      </Helmet>

      <header className="bg-secondary text-secondary-foreground py-20 pt-28 relative overflow-hidden">
        <div className="container-narrow px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Faculty Team</h1>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl">
            Mentors with deep expertise in Foundation building and JEE/NEET excellence.
          </p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-narrow px-4 space-y-20">
          {/* Mains & Advanced Section */}
          <section>
            <div className="flex items-center gap-4 mb-10 border-b border-border pb-4">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold">Mains & Advanced Specialists</h2>
                <p className="text-muted-foreground text-sm">Focus on high-level conceptual depth and problem-solving</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortFaculty(mainsAdvancedFaculty).map((faculty, idx) => (
                <FacultyCard key={faculty.id} faculty={faculty} index={idx} />
              ))}
            </div>
          </section>

          {/* Foundation Section */}
          <section>
            <div className="flex items-center gap-4 mb-10 border-b border-border pb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-accent flex items-center justify-center text-white">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold">Foundation Mentors</h2>
                <p className="text-muted-foreground text-sm">Building core concepts for Class VIII to X</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortFaculty(foundationFaculty).map((faculty, idx) => (
                <FacultyCard key={faculty.id} faculty={faculty} index={idx} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const FacultyProfile = () => {
  const { id } = useParams();
  const faculty = facultyData.find(f => f.id === id);

  if (!faculty) return <div className="p-20 text-center">Faculty not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{faculty.name} | Faculty</title></Helmet>
      <header className={`bg-gradient-to-br ${getSubjectColor(faculty.subject)} text-primary-foreground py-20 pt-28`}>
        <div className="container-narrow px-4">
          <Link to="/faculty" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Faculty
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center text-5xl font-serif font-bold text-foreground shadow-2xl border-4 border-white/20">
              {faculty.name.split(' ').slice(-1)[0].charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm mb-4 inline-block">{faculty.category.toUpperCase()} • {faculty.level}</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{faculty.name}</h1>
              <p className="text-xl opacity-90">{faculty.designation}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="section-padding container-narrow px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Professional Bio</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{faculty.bio}</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2"><Star className="w-6 h-6 text-accent" /> Specializations</h2>
              <div className="flex flex-wrap gap-3">
                {faculty.specialization.map(s => <span key={s} className="px-4 py-2 bg-secondary rounded-lg text-secondary-foreground font-medium">{s}</span>)}
              </div>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2"><Award className="w-6 h-6 text-primary" /> Key Achievements</h2>
              <div className="space-y-3">
                {faculty.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Star className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground text-sm">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-glow">
              <h3 className="text-xl font-serif font-bold mb-6 border-b border-white/20 pb-4">Fast Facts</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"><GraduationCap className="w-5 h-5" /></div>
                  <div><p className="text-[10px] uppercase opacity-60">Qualification</p><p className="font-bold text-sm">{faculty.qualification}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                  <div><p className="text-[10px] uppercase opacity-60">Experience</p><p className="font-bold text-sm">{faculty.experience}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"><BookOpen className="w-5 h-5" /></div>
                  <div><p className="text-[10px] uppercase opacity-60">Subject</p><p className="font-bold text-sm">{faculty.subject}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Faculty = () => {
  const { id } = useParams();
  return id ? <FacultyProfile /> : <FacultyList />;
};

export default Faculty;
