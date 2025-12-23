import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-36 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
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
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">Since 2013 | Affiliated to CBSE Delhi</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6 animate-fade-in stagger-1">
            Shape Your Future with{" "}
            <span className="text-gradient">Gurukul Classes</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl animate-fade-in stagger-2">
            Premier coaching institute for IIT-JEE, NEET, and Board Examinations. 
            Transforming aspirations into achievements since 2013.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in stagger-3">
            <Button variant="hero" size="xl">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              View Results 2025
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 animate-fade-in stagger-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Users className="w-6 h-6 text-accent" />
                <span className="font-serif text-3xl md:text-4xl font-bold text-secondary-foreground">5000+</span>
              </div>
              <p className="text-secondary-foreground/70 text-sm">Students Enrolled</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Award className="w-6 h-6 text-accent" />
                <span className="font-serif text-3xl md:text-4xl font-bold text-secondary-foreground">95%</span>
              </div>
              <p className="text-secondary-foreground/70 text-sm">Success Rate</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-accent" />
                <span className="font-serif text-3xl md:text-4xl font-bold text-secondary-foreground">12+</span>
              </div>
              <p className="text-secondary-foreground/70 text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-secondary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
