import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CreatorHub</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              La plateforme qui connecte vendeurs et créateurs TikTok pour des campagnes réussies.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Plateforme</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/campaigns" className="text-background/60 hover:text-background transition-colors text-sm">
                  Campagnes
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-background/60 hover:text-background transition-colors text-sm">
                  Créateurs
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-background/60 hover:text-background transition-colors text-sm">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-background/60 hover:text-background transition-colors text-sm">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/60 hover:text-background transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/60 hover:text-background transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-background/60 hover:text-background transition-colors text-sm">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/60 hover:text-background transition-colors text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-background/60 hover:text-background transition-colors text-sm">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2025 CreatorHub. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
