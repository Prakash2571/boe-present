"use client";
import { motion } from "framer-motion";
import GraphAnimation6Year from "@/components/GraphAnimation6Year";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Slide11() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full"
    >
      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center"
      >
        Performance{" "}
        <span className="text-gradient-gold">
          Comparison
        </span>
        {" "}(6 Years)
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Graph — dominant full-width element.
          No flex-1 here: letting the panel take its natural (aspect-ratio)
          height is what allows justify-center to actually centre the stack. */}
      <ReactivePanel className="w-full">
        <GraphAnimation6Year />
      </ReactivePanel>
    </motion.div>
  );
}
