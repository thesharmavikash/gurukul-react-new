import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Gurukul Classes Hajipur</title>
        <meta name="description" content="Learn more about Gurukul Classes Hajipur, our mission, vision, and our commitment to educational excellence." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="bg-secondary/30 py-12 mb-8">
            <div className="container-narrow px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Gurukul Classes</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Empowering students since 2013 with quality education and expert guidance.
              </p>
            </div>
          </div>
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
