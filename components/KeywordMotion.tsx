"use client";
import { motion } from "framer-motion";

export default function KeywordMotion() {
  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.4, // stagger each word
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      color: "#facc15", // Tailwind yellow-400
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const words = ["Affordable.", "Authentic.", "Effective"];

  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary flex flex-wrap justify-center gap-2">
        {words.map((w, i) => (
          <motion.span
            key={w}
            custom={i}
            variants={wordVariant}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className={
              i === 1
                ? "text-yellow-500 inline-block cursor-pointer"
                : "inline-block cursor-pointer"
            }
          >
            {w}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
