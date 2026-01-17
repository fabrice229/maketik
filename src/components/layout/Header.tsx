import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CreatorHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/campaigns" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-form"
            >
              Campagnes
            </Link>
            <Link 
              to="/creators" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-form"
            >
              Créateurs
            </Link>
            <Link 
              to="/pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-form"
            >
              Tarifs
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Connexion
            </Button>
            <Button size="sm">
              Commencer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/campaigns" 
                className="px-4 py-3 rounded-lg hover:bg-muted transition-colors text-form"
                onClick={() => setMobileMenuOpen(false)}
              >
                Campagnes
              </Link>
              <Link 
                to="/creators" 
                className="px-4 py-3 rounded-lg hover:bg-muted transition-colors text-form"
                onClick={() => setMobileMenuOpen(false)}
              >
                Créateurs
              </Link>
              <Link 
                to="/pricing" 
                className="px-4 py-3 rounded-lg hover:bg-muted transition-colors text-form"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </Link>
              <div className="flex gap-2 mt-2 px-4">
                <Button variant="outline" className="flex-1">
                  Connexion
                </Button>
                <Button className="flex-1">
                  Commencer
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
