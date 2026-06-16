"use client";
import { motion } from "framer-motion";
import GraphAnimation from "@/components/GraphAnimation";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Slide5() {
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
      className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full"
    >
      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center"
      >
        Why Choose{" "}
        <span className="text-gradient-gold">
          BeOnEdge?
        </span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Two info cards — compact row */}
      <div className="w-full grid grid-cols-2 gap-[1vw] mb-[1vh]">
        <ReactivePanel className="glass flex flex-col p-[1.2vw]">
          <h2 className="text-base md:text-lg font-bold text-white mb-[0.5vh]">
            Experienced Market Participation
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed mb-[0.5vh]">
            Our team has actively participated in financial markets for over 5
            years, navigating multiple market cycles including:
          </p>
          <ul className="text-sm text-neutral-400 space-y-0.5">
            {["COVID-19 market crash", "Russia-Ukraine geopolitical volatility", "Bull market phases of 2023–2024", "Current evolving market conditions"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </ReactivePanel>

        <ReactivePanel className="glass flex flex-col p-[1.2vw]">
          <h2 className="text-base md:text-lg font-bold text-white mb-[0.5vh]">
            Strong Performance Track Record
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed mb-[0.5vh]">
            We have maintained an average CAGR of approximately{" "}
            <span className="text-emerald-400 font-semibold">16%</span> over the
            last 5 years through disciplined investing.
          </p>
          <div className="glass rounded-lg p-[0.6vw] text-sm text-neutral-300 italic">
            A ₹100 investment growing at{" "}
            <span className="text-emerald-400">16% CAGR</span> reaches approximately{" "}
            <span className="text-emerald-400 font-semibold">₹210</span> in 5
            years, compared to around ₹176 at 12% CAGR benchmark growth.
          </div>
          <p className="text-emerald-400 text-sm font-medium mt-[0.5vh]">
            This highlights the power of consistent alpha generation over time.
          </p>
        </ReactivePanel>
      </div>

      {/* Chart — dominant element */}
      <ReactivePanel className="w-full">
        <GraphAnimation />
      </ReactivePanel>

      {/* Research bar — tight under chart */}
      <ReactivePanel className="glass mt-[0.5vh] w-full p-[0.8vw]">
        <div className="flex items-center gap-[2vw] w-full">
          <h2 className="text-base md:text-lg font-bold text-white whitespace-nowrap">
            Research-Driven Approach
          </h2>
          <ul className="flex flex-1 justify-around items-center text-sm text-neutral-400">
            {["Deep fundamental research", "Market data analysis", "Statistical models", "Continuous monitoring"].map((label) => (
              <li key={label} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </ReactivePanel>
    </motion.div>
  );
}
