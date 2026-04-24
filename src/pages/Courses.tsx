import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoursesSection from "@/components/CoursesSection";

const Courses = () => {
  return (
    <>
      <Helmet>
        <title>Our Courses | Gurukul Classes Hajipur</title>
        <meta name="description" content="Explore our wide range of courses for IIT-JEE, NEET, Foundation, and Board Exams." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="bg-secondary/30 py-12 mb-8">
            <div className="container-narrow px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Educational Programs</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive courses designed to help you excel in competitive and board examinations.
              </p>
            </div>
          </div>
          <CoursesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Courses;
