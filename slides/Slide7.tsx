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

export default function Slide7() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.06 },
    },
  };

  const features = [
    { title: "Track their investments", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { title: "Monitor portfolio performance", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { title: "View transaction history", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { title: "Stay updated on portfolio allocation", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" },
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
        className="text-indigo-400 font-medium tracking-widest uppercase text-xs"
      >
        Transparency in Action
      </motion.p>

      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-[0.5vh]"
      >
        Client Investment{" "}
        <span className="text-gradient-gold">
          Tracking
        </span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-2 mb-[1.5vh] mx-auto" />

      <motion.div
        variants={popupVars}
        className="glass-elevated rounded-xl p-[1.5vw] w-full text-left shadow-[0_0_40px_rgba(99,102,241,0.08)]"
      >
        <p className="text-neutral-300 text-sm mb-[0.8vh] leading-relaxed">
          We believe investors should have complete transparency regarding their investments.
        </p>

        <p className="text-neutral-300 text-sm mb-[1vh]">
          Beonedge has developed a dedicated client portal where investors can:
        </p>

        <div className="grid grid-cols-2 gap-[1.2vw] mb-[1.2vh]">
          {features.map((item, index) => (
            <ReactivePanel
              key={index}
              className="glass rounded-lg p-[1vw] h-full"
            >
              <div className="flex items-center gap-[0.8vw] w-full">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span className="flex-1 text-neutral-300 text-sm font-medium">{item.title}</span>
              </div>
            </ReactivePanel>
          ))}
        </div>

        <ReactivePanel className="glass rounded-lg p-[1vw] text-center border border-cyan-500/15 bg-cyan-500/[0.03]">
          <p className="text-neutral-400 text-sm italic">
            This platform is currently available for clients and will soon be expanded with a full public website and landing page.
          </p>
        </ReactivePanel>
      </motion.div>
    </motion.div>
  );
}
