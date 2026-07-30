"use client";
import { motion } from "framer-motion";
import CustomerJourneyGraph from "@/components/CustomerJourneyGraph";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Slide9() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  };

  const stats = [
    { value: "0 → 120", label: "Aggregate clients", accent: "text-emerald-400" },
    { value: "May 2025", label: "Officially registered", accent: "text-amber-400" },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full"
    >
      {/* Title */}
      <motion.p
        variants={popupVars}
        className="text-emerald-400 font-medium tracking-widest uppercase text-xs"
      >
        Traction &amp; Trust
      </motion.p>

      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mt-[0.5vh]"
      >
        Our Customer{" "}
        <span className="text-gradient-gold">
          Journey
        </span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-[1vw] mb-[1.2vh] w-full max-w-2xl mx-auto">
        {stats.map((stat) => (
          // NOTE: the flex layout must live *inside* ReactivePanel — it renders
          // children in its own wrapper div, so flex classes on the panel
          // itself would not reach these spans (they'd sit inline).
          <ReactivePanel key={stat.label} className="glass rounded-xl p-[1.4vw]">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className={`text-2xl md:text-3xl font-bold leading-tight ${stat.accent}`}>
                {stat.value}
              </span>
              <span className="mt-[0.5vh] text-sm md:text-base text-neutral-400 leading-snug">
                {stat.label}
              </span>
            </div>
          </ReactivePanel>
        ))}
      </div>

      {/* Chart — dominant element */}
      <ReactivePanel className="w-full">
        <CustomerJourneyGraph />
      </ReactivePanel>

      {/* Caption bar */}
      <ReactivePanel className="glass mt-[0.5vh] w-full p-[0.8vw]">
        <p className="text-sm text-neutral-300 text-center leading-relaxed">
          What began in <span className="text-white font-medium">2023</span> as a student venture grew slowly at first.
          After being <span className="text-amber-400 font-semibold">officially registered in May 2025</span>, momentum
          took off — reaching <span className="text-emerald-400 font-semibold">120 aggregate clients</span> today from our
          own office. <span className="text-blue-400 font-medium">App &amp; website launching soon</span>, with much more
          development on the way.
        </p>
      </ReactivePanel>
    </motion.div>
  );
}
