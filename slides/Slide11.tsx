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

  const researchItems = [
    { text: "Deep fundamental research", color: "text-emerald-400" },
    { text: "Market data analysis", color: "text-blue-400" },
    { text: "Statistical models", color: "text-amber-400" },
    { text: "Continuous monitoring", color: "text-purple-400" },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full"
    >
      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center"
      >
        Performance{" "}
        <span className="text-gradient-gold">
          Comparison
        </span>
        {" "}(6 Years)
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Graph — dominant full-width element */}
      <ReactivePanel className="w-full flex-1 min-h-0">
        <GraphAnimation6Year />
      </ReactivePanel>

      {/* Research-Driven Approach bottom bar */}
      <ReactivePanel className="glass mt-[1vh] w-full p-[0.8vw]">
        <div className="flex items-center justify-center gap-[1.5vw]">
          <span className="text-sm font-semibold text-white">Research-Driven Approach</span>
          <span className="text-white/20">|</span>
          {researchItems.map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${item.color.replace("text-", "bg-")}`} />
              <span className={`text-xs ${item.color}`}>{item.text}</span>
            </div>
          ))}
        </div>
      </ReactivePanel>
    </motion.div>
  );
}
