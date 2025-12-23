import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", phone: "", email: "", course: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      lines: ["7673076349", "6206355817", "7717755697"],
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["gurukuljee@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["Anjanpeer Chowk, Hajipur", "Nawada Chowk Near, Jadhua", "Vaishali - 844101, Bihar"],
    },
    {
      icon: Clock,
      title: "Timings",
      lines: ["Mon - Sat: 7:00 AM - 8:00 PM", "Sunday: 9:00 AM - 2:00 PM"],
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-narrow px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Success Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            Admissions open for Session 2025. Contact us for enrollment details and course information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Enquiry Form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter email (optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Interested Course *
                </label>
                <select
                  required
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  <option value="">Select a course</option>
                  <option value="two-year-foundation">Two Year Foundation Course (XI-XII)</option>
                  <option value="one-year-target">One Year Target Course</option>
                  <option value="board-exam">One Year Board Exam Course</option>
                  <option value="foundation-viii-x">Foundation Course (VIII-X)</option>
                  <option value="gurukul-achiever">Gurukul Achiever</option>
                  <option value="neet-prep">NEET Preparation</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Any specific queries..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Enquiry
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Map Embed Placeholder */}
            <div className="bg-muted rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground">Google Maps Location</p>
                <a 
                  href="https://maps.google.com/?q=Hajipur,Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
