import { useState } from "react";
import { Play, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  achievement: string;
  exam: string;
  year: string;
  quote: string;
  rating: number;
  hasVideo: boolean;
  videoId?: string;
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Prachi Kumari",
      achievement: "AIIMS Delhi",
      exam: "NEET 2024",
      year: "2024",
      quote: "Gurukul Classes transformed my preparation journey. The faculty's dedication and personalized attention helped me crack NEET with flying colors. The doubt-clearing sessions were incredibly helpful!",
      rating: 5,
      hasVideo: true,
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      name: "Harsh Kumar",
      achievement: "IIT Kharagpur",
      exam: "JEE Advanced 2024",
      year: "2024",
      quote: "The systematic approach to problem-solving taught here is unmatched. Teachers don't just teach, they mentor. I'm grateful for the foundation that helped me secure a seat at IIT.",
      rating: 5,
      hasVideo: true,
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      name: "Shreya Singh",
      achievement: "IIT Bombay",
      exam: "JEE Advanced 2024",
      year: "2024",
      quote: "From day one, the faculty believed in me more than I believed in myself. The regular tests and detailed analysis helped me identify my weak areas. Forever thankful to Gurukul family!",
      rating: 5,
      hasVideo: false
    },
    {
      id: 4,
      name: "Aryan Raj",
      achievement: "NIT Patna (CSE)",
      exam: "JEE Main 2024",
      year: "2024",
      quote: "The competitive environment and excellent study material made all the difference. The teachers are always available for doubts, even after class hours. Best decision of my life to join Gurukul!",
      rating: 5,
      hasVideo: true,
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 5,
      name: "Ananya Verma",
      achievement: "AIIMS Patna",
      exam: "NEET 2023",
      year: "2023",
      quote: "Biology classes here are exceptional. The way concepts are explained makes them unforgettable. Mock tests prepared me for the actual exam pressure. Highly recommend!",
      rating: 5,
      hasVideo: false
    },
    {
      id: 6,
      name: "Rohit Sharma",
      achievement: "IIT Roorkee",
      exam: "JEE Advanced 2023",
      year: "2023",
      quote: "Physics and Maths faculty are world-class. The shortcuts and techniques taught here saved valuable time in the exam. Gurukul is truly a success platform!",
      rating: 5,
      hasVideo: true,
      videoId: "dQw4w9WgXcQ"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setPlayingVideo(null);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setPlayingVideo(null);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-narrow px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Student Success Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hear From Our Achievers
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from students who transformed their dreams into reality with Gurukul Classes.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Video/Image Side */}
          <div className="relative aspect-video bg-secondary rounded-2xl overflow-hidden">
            {playingVideo && currentTestimonial.hasVideo ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentTestimonial.videoId}?autoplay=1`}
                title="Student Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-primary/20">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4 text-primary-foreground text-3xl font-serif font-bold">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <h3 className="text-secondary-foreground text-xl font-semibold mb-1">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-accent font-medium">{currentTestimonial.achievement}</p>
                  {currentTestimonial.hasVideo && (
                    <Button
                      variant="hero"
                      size="lg"
                      className="mt-6"
                      onClick={() => setPlayingVideo(currentTestimonial.videoId || null)}
                    >
                      <Play className="w-5 h-5" />
                      Watch Video
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quote Side */}
          <div className="flex flex-col justify-center">
            <Quote className="w-12 h-12 text-primary/30 mb-4" />
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 font-serif italic">
              "{currentTestimonial.quote}"
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-lg">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{currentTestimonial.name}</h4>
                <p className="text-primary font-medium">{currentTestimonial.achievement}</p>
                <p className="text-sm text-muted-foreground">{currentTestimonial.exam}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Button variant="outline" size="icon" onClick={prevSlide}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setPlayingVideo(null);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextSlide}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => {
                setActiveIndex(index);
                setPlayingVideo(null);
              }}
              className={`bg-card rounded-xl p-6 shadow-card cursor-pointer transition-all hover:shadow-large ${
                index === activeIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-primary">{testimonial.achievement}</p>
                </div>
                {testimonial.hasVideo && (
                  <Play className="w-5 h-5 text-primary ml-auto" />
                )}
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">
                "{testimonial.quote}"
              </p>
              <div className="flex gap-0.5 mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
