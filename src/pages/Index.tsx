import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import SuccessCalculator from "@/components/SuccessCalculator";
import FacultySection from "@/components/FacultySection";
import ResultsSection from "@/components/ResultsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Gurukul Classes Hajipur | Best IIT-JEE & NEET Coaching in Bihar</title>
        <meta 
          name="description" 
          content="Gurukul Classes Hajipur - Premier coaching institute for IIT-JEE, NEET, and Board Examinations. 12+ years of excellence with 95% success rate. Enroll now!" 
        />
        <meta 
          name="keywords" 
          content="Gurukul Classes, Hajipur coaching, IIT JEE coaching Bihar, NEET coaching Hajipur, best coaching institute Vaishali" 
        />
        <link rel="canonical" href="https://gurukulclasseshajipur.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Gurukul Classes Hajipur | Best IIT-JEE & NEET Coaching" />
        <meta property="og:description" content="Transform your dreams into reality with Bihar's premier coaching institute. Expert faculty, proven results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gurukulclasseshajipur.com" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Gurukul Classes Hajipur",
            "description": "Premier coaching institute for IIT-JEE, NEET, and Board Examinations in Hajipur, Bihar",
            "url": "https://gurukulclasseshajipur.com",
            "telephone": "+91-7903113441",
            "email": "gurukuljee@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Anjanpeer Chowk",
              "addressLocality": "Hajipur",
              "addressRegion": "Bihar",
              "postalCode": "844101",
              "addressCountry": "IN"
            },
            "foundingDate": "2013",
            "areaServed": "Bihar, India"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <CoursesSection />
          <SuccessCalculator />
          <FacultySection />
          <ResultsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
