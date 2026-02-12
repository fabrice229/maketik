import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Store, Video, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden flex items-center bg-background">
      {/* Subtle background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-creator/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-8"
            variants={itemVariants}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-small font-medium text-foreground">Plateforme tout-en-un pour le marketing TikTok</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 className="text-foreground mb-6" variants={itemVariants}>
            Vendez plus avec les{" "}
            <span className="text-primary">créateurs TikTok</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            La plateforme africaine qui connecte vendeurs et créateurs de contenu.
            Paiements Mobile Money, escrow sécurisé, résultats mesurables.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <Link to="/auth/seller">
              <Button size="xl">
                <Store className="w-5 h-5 mr-2" />
                Je suis vendeur
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth/creator">
              <Button size="xl" variant="outline">
                <Video className="w-5 h-5 mr-2" />
                Je suis créateur
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {["Inscription gratuite", "Paiement Mobile Money", "Escrow sécurisé"].map((text) => (
              <div
                key={text}
                className="flex items-center justify-center gap-2 p-4 rounded-[16px] bg-card shadow-card"
              >
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-small text-foreground">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
