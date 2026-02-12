import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X, Store, Video } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

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
      scrolled ? 'bg-card/95 backdrop-blur-md shadow-card border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="group">
            <Logo size="md" className="transition-transform duration-200 group-hover:scale-105" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: "/campaigns", label: "Campagnes" },
              { to: "/creators", label: "Créateurs" },
              { to: "/pricing", label: "Tarifs" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sidebar"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/auth/seller">
              <Button variant="ghost" size="sm">
                <Store className="w-4 h-4 mr-2" />
                Vendeur
              </Button>
            </Link>
            <Link to="/auth/creator">
              <Button size="sm">
                <Video className="w-4 h-4 mr-2" />
                Créateur
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-[10px] border border-border bg-card transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {[
                { to: "/campaigns", label: "Campagnes" },
                { to: "/creators", label: "Créateurs" },
                { to: "/pricing", label: "Tarifs" },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-[12px] text-sidebar font-medium hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-4">
                <Link to="/auth/seller" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Store className="w-4 h-4 mr-2" />
                    Vendeur
                  </Button>
                </Link>
                <Link to="/auth/creator" className="flex-1">
                  <Button className="w-full">
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
