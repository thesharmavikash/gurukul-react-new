import { CheckCircle, Target, Lightbulb, Heart } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "To provide quality education and guidance for Engineering & Medical entrance exams"
    },
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "Experienced faculty committed to bringing out the best in every student"
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Creating an environment that inspires students to explore their potential"
    }
  ];

  const highlights = [
    "Complete syllabus coverage on time",
    "Regular doubt clearing sessions",
    "Comprehensive study materials",
    "Weekly tests and assessments",
    "Personal attention to each student",
    "Motivational sessions"
  ];

  return (
    <section id="about" className="section-padding bg-card">
      <div className="container-narrow px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Building Dreams Since 2013
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Gurukul Classes is a coaching institute run by Gurukul Vidyapeeth affiliated to CBSE Delhi. 
              Started in 2013, we have created a glorious success story from our very first batch.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is to deliver exceptional results in Engineering, Medical Entrance Exams, 
              and Board Examinations. We believe in hard work, discipline, and continuous motivation. 
              Gurukul Classes is the only institute in Hajipur that ensures complete syllabus coverage on time.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 flex gap-5 hover:shadow-medium transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
