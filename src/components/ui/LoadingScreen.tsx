import { motion } from "framer-motion";
import Logo from "./Logo";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      onAnimationComplete={() => {
        setTimeout(() => {
          onComplete?.();
        }, 2800);
      }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -right-20 w-96 h-96 bg-seller/20 rounded-full blur-[120px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-20 w-80 h-80 bg-creator/20 rounded-full blur-[120px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </div>

      {/* Logo */}
      <Logo size="xl" animated showText />

      {/* Loading bar */}
      <motion.div
        className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-seller via-primary to-creator rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 1.7, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-4 text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Connecter créateurs et vendeurs
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
