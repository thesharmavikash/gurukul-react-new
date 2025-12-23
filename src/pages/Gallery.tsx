import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import gallery images
import classroom1 from "@/assets/gallery/classroom-1.jpg";
import celebration from "@/assets/gallery/celebration.jpg";
import lab from "@/assets/gallery/lab.jpg";
import library from "@/assets/gallery/library.jpg";
import annualDay from "@/assets/gallery/annual-day.jpg";
import awards from "@/assets/gallery/awards.jpg";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  aspectRatio: "landscape" | "portrait" | "square";
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories = ["all", "classrooms", "events", "achievements", "facilities"];

  const images: GalleryImage[] = [
    { id: 1, src: classroom1, title: "Modern Classroom", category: "classrooms", aspectRatio: "landscape" },
    { id: 2, src: celebration, title: "Result Celebration 2024", category: "achievements", aspectRatio: "landscape" },
    { id: 3, src: lab, title: "Chemistry Laboratory", category: "facilities", aspectRatio: "landscape" },
    { id: 4, src: library, title: "Library & Reading Room", category: "facilities", aspectRatio: "portrait" },
    { id: 5, src: annualDay, title: "Annual Day 2024", category: "events", aspectRatio: "landscape" },
    { id: 6, src: awards, title: "Award Ceremony", category: "achievements", aspectRatio: "landscape" },
    { id: 7, src: classroom1, title: "Physics Batch", category: "classrooms", aspectRatio: "landscape" },
    { id: 8, src: celebration, title: "NEET Toppers 2024", category: "achievements", aspectRatio: "landscape" },
    { id: 9, src: lab, title: "Biology Lab Session", category: "facilities", aspectRatio: "landscape" },
    { id: 10, src: annualDay, title: "Cultural Program", category: "events", aspectRatio: "landscape" },
    { id: 11, src: awards, title: "JEE Success Celebration", category: "achievements", aspectRatio: "landscape" },
    { id: 12, src: library, title: "Study Area", category: "facilities", aspectRatio: "portrait" },
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    let newIndex: number;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Photo Gallery | Gurukul Classes Hajipur</title>
        <meta name="description" content="Explore our photo gallery showcasing Gurukul Classes' facilities, events, achievements, and student activities." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-20 pt-28">
          <div className="container-narrow px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-secondary-foreground/70 text-lg max-w-2xl">
              Take a visual tour of our institute, classrooms, events, and the moments that make Gurukul Classes special.
            </p>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="sticky top-0 z-40 bg-card border-b border-border py-4">
          <div className="container-narrow px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <section className="section-padding">
          <div className="container-narrow px-4">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightboxImage(image)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-card hover:shadow-large transition-all">
                    <img
                      src={image.src}
                      alt={image.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        image.aspectRatio === "portrait" ? "h-80" : "h-52"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-secondary-foreground font-semibold">{image.title}</h3>
                        <p className="text-sm text-accent capitalize">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-secondary/95 flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 text-secondary-foreground hover:text-accent transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 p-2 text-secondary-foreground hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="max-w-5xl max-h-[80vh]">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="text-secondary-foreground text-xl font-semibold">{lightboxImage.title}</h3>
                <p className="text-accent capitalize">{lightboxImage.category}</p>
              </div>
            </div>

            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 p-2 text-secondary-foreground hover:text-accent transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
