import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo size="md" />
            </Link>
            <p className="text-background/50 leading-relaxed max-w-xs mb-6 text-small">
              La plateforme qui connecte vendeurs et créateurs TikTok pour des campagnes marketing réussies.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-[10px] bg-background/10 flex items-center justify-center transition-colors hover:bg-primary"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Plateforme",
              links: [
                { to: "/campaigns", label: "Campagnes" },
                { to: "/creators", label: "Créateurs" },
                { to: "/pricing", label: "Tarifs" },
              ],
            },
            {
              title: "Ressources",
              links: [
                { to: "/help", label: "Centre d'aide" },
                { to: "/blog", label: "Blog" },
                { to: "/faq", label: "FAQ" },
              ],
            },
            {
              title: "Légal",
              links: [
                { to: "/privacy", label: "Confidentialité" },
                { to: "/terms", label: "CGU" },
                { to: "/cookies", label: "Cookies" },
              ],
            },
          ].map(section => (
            <div key={section.title}>
              <h4 className="font-display font-semibold mb-4 text-[16px]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-background/50 hover:text-background transition-colors text-small">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-small">© 2025 MakeTik. Tous droits réservés.</p>
          <p className="text-background/40 text-small">Fait avec ❤️ pour les créateurs africains</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
