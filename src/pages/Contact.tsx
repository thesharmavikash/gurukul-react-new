import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Gurukul Classes Hajipur</title>
        <meta name="description" content="Get in touch with Gurukul Classes Hajipur for admissions and inquiries." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="bg-secondary/30 py-12 mb-8">
            <div className="container-narrow px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get In Touch</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? We're here to help you on your educational journey.
              </p>
            </div>
          </div>
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
