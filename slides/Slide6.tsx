"use client";
import { motion } from "framer-motion";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Slide6() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const noItems = [
    "Promise unrealistic or guaranteed returns",
    "Offer trading tips or speculative recommendations",
    "Claim to double or triple money",
    "Run Telegram or signal groups",
    "Encourage short-term speculation",
    "Engage in high-frequency speculation or pump-and-dump strategies",
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
    >
      <motion.p
        variants={popupVars}
        className="text-red-400 font-medium tracking-widest uppercase text-xs"
      >
        Transparency &amp; Integrity
      </motion.p>

      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-[0.5vh]"
      >
        What We{" "}
        <span className="text-red-400">Do NOT Do</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-red-500 to-red-600 mt-2 mb-[1.5vh] mx-auto" />

      <motion.p
        variants={popupVars}
        className="text-neutral-300 text-sm mb-[1.5vh] max-w-2xl"
      >
        At Beonedge, transparency and integrity are core values. We do not:
      </motion.p>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[1vw] mb-[1.5vh]">
        {noItems.map((item, index) => (
          <ReactivePanel
            key={index}
            variants={popupVars}
            className="glass rounded-xl p-[1.2vw] text-left border border-red-500/10 bg-red-500/[0.03] h-full"
          >
            <div className="flex items-start gap-[0.8vw]">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="flex-1 text-neutral-300 text-sm font-medium leading-snug">{item}</span>
            </div>
          </ReactivePanel>
        ))}
      </div>

      <ReactivePanel
        variants={popupVars}
        className="glass rounded-xl p-[1.2vw] w-full border-l-4 border-l-blue-500 text-center"
      >
        <p className="text-white text-sm font-semibold">
          Our focus remains strictly on long-term disciplined wealth creation.
        </p>
      </ReactivePanel>
    </motion.div>
  );
}
