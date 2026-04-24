import { useState, useMemo } from "react";
import { Play, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import testimonialsRaw from "@/data/testimonials.json";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  videoUrl?: string;
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(false);
  const testimonials = testimonialsRaw as Testimonial[];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setPlayingVideo(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setPlayingVideo(false);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section-padding bg-background relative overflow-hidden">
      <div className="container-narrow px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Social Proof
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hear From Our Achievers
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video/Image Showcase */}
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-large bg-card"
          >
            {playingVideo && current.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={`${current.videoUrl}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img src={current.image} alt={current.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                  {current.videoUrl && (
                    <Button 
                      variant="hero" 
                      size="xl" 
                      className="rounded-full w-20 h-20 p-0 shadow-glow"
                      onClick={() => setPlayingVideo(true)}
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </Button>
                  )}
                  <div className="absolute bottom-8 left-8 text-white">
                     <p className="text-2xl font-bold">{current.name}</p>
                     <p className="text-accent font-medium">{current.role}</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Quote Content */}
          <div className="relative">
            <Quote className="absolute -top-10 -left-10 w-24 h-24 text-primary/5 -z-10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
                  "{current.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-primary" />
                  <div>
                    <h4 className="font-bold text-foreground">{current.name}</h4>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-12">
              <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full h-12 w-12 hover:bg-primary hover:text-white">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full h-12 w-12 hover:bg-primary hover:text-white">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
