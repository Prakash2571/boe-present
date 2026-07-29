"use client";
import { motion } from "framer-motion";

export default function Slide12() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white/60 tracking-tight text-center">
        Content Coming Soon
      </h1>
    </motion.div>
  );
}
