import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Courses", href: "#courses" },
    { name: "Faculty", href: "#faculty" },
    { name: "Results", href: "#results" },
    { name: "Contact", href: "#contact" },
  ];

  const courses = [
    "Two Year Foundation",
    "One Year Target",
    "Board Exam Course",
    "Foundation (VIII-X)",
    "Gurukul Achiever",
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-narrow px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
                GC
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Gurukul Classes</h3>
                <p className="text-xs text-secondary-foreground/60">A True Success Platform</p>
              </div>
            </div>
            <p className="text-secondary-foreground/70 text-sm mb-6">
              Premier coaching institute for IIT-JEE, NEET, and Board Examinations since 2013.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course, i) => (
                <li key={i}>
                  <a
                    href="#courses"
                    className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/70">
                  <p>7673076349</p>
                  <p>6206355817</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground/70">gurukuljee@gmail.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground/70">
                  Anjanpeer Chowk, Hajipur<br />
                  Vaishali - 844101, Bihar
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-narrow px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Gurukul Classes Hajipur. All rights reserved.
          </p>
          <p className="text-secondary-foreground/60 text-sm">
            Website: <a href="https://gurukulclasseshajipur.com" className="hover:text-accent">gurukulclasseshajipur.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
