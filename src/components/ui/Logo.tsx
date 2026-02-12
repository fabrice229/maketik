import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Variants, Transition } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

const Logo = ({ size = "md", animated = false, showText = true, className }: LogoProps) => {
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon - M stylisé */}
      {animated ? (
        <motion.div
          className={cn(
            sizeClasses[size],
            "relative rounded-[10px] bg-primary flex items-center justify-center"
          )}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-3/4 h-3/4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M8 32V12L20 24L32 12V32"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20"
              cy="10"
              r="3"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            />
          </svg>
        </motion.div>
      ) : (
        <div
          className={cn(
            sizeClasses[size],
            "relative rounded-[10px] bg-primary flex items-center justify-center"
          )}
        >
          <svg
            viewBox="0 0 40 40"
            className="w-3/4 h-3/4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 32V12L20 24L32 12V32"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="10" r="3" fill="white" />
          </svg>
        </div>
      )}

      {/* Text */}
      {showText && (
        <div className={cn("font-display font-bold", textSizes[size])}>
          {animated ? (
            <span className="flex">
              {"MakeTik".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={i < 4 ? "text-foreground" : "bg-gradient-to-r from-seller to-creator bg-clip-text text-transparent"}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ) : (
            <span>
              <span className="text-foreground">Make</span>
              <span className="bg-gradient-to-r from-seller to-creator bg-clip-text text-transparent">Tik</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
