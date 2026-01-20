import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Zap, Menu, X, Store, Video } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong shadow-glass' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-sm">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">CreatorHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              to="/campaigns" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-form relative group"
            >
              Campagnes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              to="/creators" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-form relative group"
            >
              Créateurs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              to="/pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-form relative group"
            >
              Tarifs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/auth/seller">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-seller">
                <Store className="w-4 h-4 mr-2" />
                Vendeur
              </Button>
            </Link>
            <Link to="/auth/creator">
              <Button size="sm" className="bg-creator hover:bg-creator/90 shadow-lg">
                <Video className="w-4 h-4 mr-2" />
                Créateur
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 rounded-xl glass transition-all duration-300 hover:scale-105"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/campaigns" 
                className="px-4 py-3.5 rounded-xl glass transition-all duration-300 text-form font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Campagnes
              </Link>
              <Link 
                to="/creators" 
                className="px-4 py-3.5 rounded-xl glass transition-all duration-300 text-form font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Créateurs
              </Link>
              <Link 
                to="/pricing" 
                className="px-4 py-3.5 rounded-xl glass transition-all duration-300 text-form font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </Link>
              <div className="flex gap-3 mt-4">
                <Link to="/auth/seller" className="flex-1">
                  <Button variant="outline" className="w-full glass">
                    <Store className="w-4 h-4 mr-2" />
                    Vendeur
                  </Button>
                </Link>
                <Link to="/auth/creator" className="flex-1">
                  <Button className="w-full bg-creator hover:bg-creator/90">
                    <Video className="w-4 h-4 mr-2" />
                    Créateur
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
