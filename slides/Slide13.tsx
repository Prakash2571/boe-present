"use client";
import { motion } from "framer-motion";
import AumGrowthGraph from "@/components/AumGrowthGraph";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Slide13() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  };

  const stats = [
    { value: "₹30K → ₹1.2 Cr", label: "AUM grown since 2022", accent: "text-emerald-400" },
    { value: "400x", label: "Growth in assets managed", accent: "text-amber-400" },
    { value: "2022 – 2026", label: "In just four years", accent: "text-blue-400" },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full"
    >
      {/* Eyebrow */}
      <motion.p
        variants={popupVars}
        className="text-emerald-400 font-medium tracking-widest uppercase text-xs"
      >
        Proven Momentum
      </motion.p>

      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mt-[0.5vh]"
      >
        Our Assets Under{" "}
        <span className="text-gradient-gold">Management</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[0.8vh] mx-auto" />

      {/* Subheading */}
      <motion.p
        variants={popupVars}
        className="text-xs md:text-sm text-neutral-300 text-center max-w-3xl mb-[1vh] leading-relaxed"
      >
        From a modest <span className="text-white font-medium">₹30,000</span> in 2022 to{" "}
        <span className="text-emerald-400 font-semibold">₹1.2 Crore</span> today — compounded
        steadily through disciplined, research-driven wealth management.
      </motion.p>

      {/* Stat cards */}
      <div className="w-full grid grid-cols-3 gap-[1vw] mb-[1vh]">
        {stats.map((stat) => (
          <ReactivePanel key={stat.label} className="glass flex flex-col items-center text-center p-[1.2vw]">
            <span className={`text-xl md:text-2xl font-bold ${stat.accent}`}>{stat.value}</span>
            <span className="text-sm text-neutral-400 mt-[0.3vh]">{stat.label}</span>
          </ReactivePanel>
        ))}
      </div>

      {/* Chart — dominant element */}
      <ReactivePanel className="w-full">
        <AumGrowthGraph />
      </ReactivePanel>

      {/* Caption bar */}
      <ReactivePanel className="glass mt-[0.5vh] w-full p-[0.8vw]">
        <p className="text-sm text-neutral-300 text-center leading-relaxed">
          Every rupee under our care reflects earned trust. What began at{" "}
          <span className="text-white font-medium">₹30,000 in 2022</span> has scaled to{" "}
          <span className="text-emerald-400 font-semibold">₹1.2 Crore in 2026</span> — and with our
          expanding client base, we are just getting started.
        </p>
      </ReactivePanel>
    </motion.div>
  );
}
