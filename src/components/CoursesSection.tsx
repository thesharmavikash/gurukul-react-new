import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, ArrowRight, GraduationCap, Atom, FlaskConical, Calculator, Dna } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const CoursesSection = () => {
  const courses = [
    {
      id: "two-year-foundation",
      title: "Two Year Foundation Course",
      duration: "2 Years",
      targetClass: "Class XI & XII",
      icon: GraduationCap,
      description: "Comprehensive preparation for XI, XII Board, JEE Main, JEE Advanced, NEET, KVPY, and State Engineering exams.",
      color: "from-primary to-accent",
      subjects: ["Physics", "Chemistry", "Mathematics/Biology"]
    },
    {
      id: "one-year-target",
      title: "One Year Target Course",
      duration: "1 Year",
      targetClass: "Class XII",
      icon: Atom,
      description: "Intensive preparation for XII Board, JEE Main, JEE Advanced, NEET, and competitive exams.",
      color: "from-secondary to-primary",
      subjects: ["Physics", "Chemistry", "Maths/Bio"]
    },
    {
      id: "one-year-board",
      title: "One Year Board Exam Course",
      duration: "1 Year",
      targetClass: "Class XI & XII",
      icon: BookOpen,
      description: "Focused preparation for CBSE/BSEB Board examinations with thorough concept building.",
      color: "from-accent to-primary",
      subjects: ["All Subjects", "Board Focus"]
    },
    {
      id: "foundation-viii-x",
      title: "Foundation Course (VIII-X)",
      duration: "1-3 Years",
      targetClass: "Class VIII, IX & X",
      icon: Calculator,
      description: "Early preparation for NTSE, OLYMPIAD, and foundation for JEE & NEET aspirants.",
      color: "from-success to-accent",
      subjects: ["Science", "Mathematics", "Mental Ability"]
    },
    {
      id: "gurukul-achiever",
      title: "Gurukul Achiever",
      duration: "1 Year",
      targetClass: "Class XI & XII",
      icon: FlaskConical,
      description: "Specially designed for BSEB and CBSE Board students aiming for excellence.",
      color: "from-primary to-secondary",
      subjects: ["Complete Board", "Competition Prep"]
    },
    {
      id: "neet-preparation",
      title: "NEET Preparation",
      duration: "1-2 Years",
      targetClass: "Class XI & XII",
      icon: Dna,
      description: "Dedicated medical entrance preparation with focus on Biology, Physics & Chemistry.",
      color: "from-accent to-success",
      subjects: ["Biology", "Physics", "Chemistry"]
    }
  ];

  return (
    <section id="courses" className="section-padding bg-background">
      <div className="container-narrow px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Our Programs
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Courses Designed for Success
          </h2>
          <p className="text-muted-foreground text-lg">
            Structured programs to help students excel in competitive exams and board examinations 
            with comprehensive preparation strategies.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-large transition-all duration-500 group"
            >
              {/* Card Header with Gradient */}
              <div className={`h-3 bg-gradient-to-r ${course.color}`} />
              
              <div className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <course.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {course.title}
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {course.targetClass}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Subjects Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.subjects.map((subject, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link to={`/course/${course.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
