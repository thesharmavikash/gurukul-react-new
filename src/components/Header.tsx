import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeCustomizer from "./ThemeCustomizer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "GTSE Results", href: "/gtse-results" },
    { name: "Results", href: "/results" },
    { name: "Verify Result", href: "/verify-result" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4">
        <div className="container-narrow flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:7903113441" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">7903113441</span>
            </a>
            <a href="mailto:gurukuljee@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">gurukuljee@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden lg:inline">Anjanpeer Chowk, Hajipur, Vaishali - 844101</span>
            <span className="lg:hidden">Hajipur, Bihar</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card/95 backdrop-blur-lg shadow-medium">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-20 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-glow">
                GC
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-foreground">Gurukul Classes</h1>
                <p className="text-xs text-muted-foreground">A True Success Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all ${
                    location.pathname === link.href ? "text-primary after:w-full" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
                  aria-label="Toggle theme"
                >
                  {mounted && (theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />)}
                </button>
                
                <ThemeCustomizer />
              </div>

              <Button variant="hero" size="lg" asChild>
                <a href="tel:7903113441">Call Us</a>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex xl:hidden items-center gap-4">
              <ThemeCustomizer />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-secondary text-foreground"
                aria-label="Toggle theme"
              >
                {mounted && (theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />)}
              </button>
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden border-t border-border py-4 px-4 animate-fade-in max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-foreground hover:text-primary font-medium transition-colors py-2 ${
                      location.pathname === link.href ? "text-primary" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button variant="hero" className="mt-2" asChild>
                  <a href="tel:7903113441">Call Us</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
