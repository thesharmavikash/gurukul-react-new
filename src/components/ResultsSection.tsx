import { Button } from "@/components/ui/button";
import { Trophy, Star, Medal, TrendingUp, ArrowRight } from "lucide-react";

const ResultsSection = () => {
  const achievements = [
    {
      exam: "NEET UG",
      year: "2024",
      icon: Trophy,
      stats: [
        { label: "AIIMS Selections", value: "15+" },
        { label: "Government Medical", value: "50+" },
        { label: "Total Qualified", value: "200+" },
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      exam: "JEE Main/Advanced",
      year: "2024",
      icon: Medal,
      stats: [
        { label: "IIT Selections", value: "25+" },
        { label: "NIT Selections", value: "80+" },
        { label: "Total Qualified", value: "300+" },
      ],
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const toppers = [
    { name: "Prachi", rank: "AIIMS Selection", exam: "NEET 2024" },
    { name: "Harsh", rank: "IIT Kharagpur", exam: "JEE Advanced 2024" },
    { name: "Shreya", rank: "IIT Bombay", exam: "JEE Advanced 2024" },
    { name: "Ansh", rank: "NIT Patna", exam: "JEE Main 2024" },
    { name: "Palak", rank: "AIIMS Patna", exam: "NEET 2024" },
    { name: "Aryan", rank: "IIT Roorkee", exam: "JEE Advanced 2024" },
  ];

  return (
    <section id="results" className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-narrow px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold uppercase tracking-wider text-sm mb-4 block">
            Our Success Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Glorious Results Year After Year
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            Our students consistently achieve outstanding results in national level examinations.
          </p>
        </div>

        {/* Results Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold">{item.exam}</h3>
                  <p className="text-secondary-foreground/60">{item.year} Results</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {item.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-serif text-3xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-secondary-foreground/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-2xl font-bold text-center">Top Performers 2024</h3>
            <Star className="w-5 h-5 text-accent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toppers.map((topper, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-4"
              >
                <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold">
                  {topper.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{topper.name}</h4>
                  <p className="text-sm text-accent">{topper.rank}</p>
                  <p className="text-xs text-secondary-foreground/60">{topper.exam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl">
            View Complete Results
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
