import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-36 pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImage}
          alt="Students studying at Gurukul Classes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 px-4">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">Since 2013 | Affiliated to CBSE Delhi</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6"
          >
            Shape Your Future with{" "}
            <span className="text-gradient">Gurukul Classes</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl"
          >
            Premier coaching institute for IIT-JEE, NEET, and Board Examinations.
            Transforming aspirations into achievements since 2013.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#contact" className="mt-2">
              <Button variant="hero" size="xl" className="shadow-glow">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="/results" className="mt-2">
              <Button variant="heroOutline" size="xl">
                View Results 2025
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 md:gap-12"
          >
            {[
              { icon: Users, value: "5000+", label: "Students Enrolled" },
              { icon: Award, value: "95%", label: "Success Rate" },
              { icon: BookOpen, value: "12+", label: "Years Experience" }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <stat.icon className="w-6 h-6 text-accent" />
                  <span className="font-serif text-3xl md:text-4xl font-bold text-secondary-foreground">{stat.value}</span>
                </div>
                <p className="text-secondary-foreground/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-secondary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
