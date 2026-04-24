import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Testimonials | Gurukul Classes Hajipur</title>
        <meta name="description" content="What our students and parents say about Gurukul Classes Hajipur." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="bg-secondary/30 py-12 mb-8">
            <div className="container-narrow px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Student Success Stories</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear directly from our students and parents about their experience with Gurukul Classes.
              </p>
            </div>
          </div>
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Testimonials;
