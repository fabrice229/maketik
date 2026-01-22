import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/ui/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <Logo size="md" className="transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-background/60 leading-relaxed max-w-xs mb-6">
              La plateforme qui connecte vendeurs et créateurs TikTok pour des campagnes marketing réussies.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-105"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold mb-6">Plateforme</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/campaigns" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Campagnes
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Créateurs
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-6">Ressources</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/help" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-6">Légal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-background/60 hover:text-background transition-colors duration-300 text-sm">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2025 MakeTik. Tous droits réservés.
          </p>
          <p className="text-background/50 text-sm">
            Fait avec ❤️ pour les créateurs africains
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
