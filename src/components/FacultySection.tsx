import { Atom, FlaskConical, Calculator, Dna, BookOpen } from "lucide-react";

const FacultySection = () => {
  const faculty = [
    {
      name: "Santosh Kumar",
      role: "Principal",
      subject: "English",
      qualification: "M.A, B.Ed",
      icon: BookOpen,
      image: "", // Add image URL when available
    },
    {
      name: "Mr. Chandan Kumar",
      role: "Senior Faculty",
      subject: "Physics",
      qualification: "M.Sc Physics",
      icon: Atom,
      image: "",
    },
    {
      name: "Mr. Raushan Jha",
      role: "Faculty",
      subject: "Physics",
      qualification: "M.Sc Physics",
      icon: Atom,
      image: "",
    },
    {
      name: "Mr. Atul Kumar",
      role: "Faculty",
      subject: "Physics",
      qualification: "M.Sc Physics",
      icon: Atom,
      image: "",
    },
    {
      name: "Mr. Sumit Jha",
      role: "Faculty",
      subject: "Chemistry",
      qualification: "M.Sc Chemistry",
      icon: FlaskConical,
      image: "",
    },
    {
      name: "Mr. Rahul Jha",
      role: "Faculty",
      subject: "Chemistry",
      qualification: "M.Sc Chemistry",
      icon: FlaskConical,
      image: "",
    },
    {
      name: "Mr. Shekhar Suman",
      role: "Faculty",
      subject: "Mathematics",
      qualification: "M.Sc Mathematics",
      icon: Calculator,
      image: "",
    },
    {
      name: "Mr. Ritu Raj",
      role: "Faculty",
      subject: "Biology",
      qualification: "M.Sc Biology",
      icon: Dna,
      image: "",
    },
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "from-blue-500 to-cyan-500";
      case "Chemistry":
        return "from-green-500 to-emerald-500";
      case "Mathematics":
        return "from-amber-500 to-orange-500";
      case "Biology":
        return "from-pink-500 to-rose-500";
      default:
        return "from-primary to-accent";
    }
  };

  return (
    <section id="faculty" className="section-padding bg-card">
      <div className="container-narrow px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Our Team
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert Faculty Members
          </h2>
          <p className="text-muted-foreground text-lg">
            Learn from experienced educators dedicated to nurturing future engineers and doctors.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 text-center hover:shadow-large transition-all duration-500 group"
            >
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${getSubjectColor(member.subject)} flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden`}>
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <member.icon className="w-10 h-10 text-primary-foreground" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-soft">
                  <span className="text-xs font-bold text-primary">
                    {member.subject.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {member.subject}
              </p>
              <p className="text-muted-foreground text-xs">
                {member.qualification}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            And many more experienced faculty members across all subjects...
          </p>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
