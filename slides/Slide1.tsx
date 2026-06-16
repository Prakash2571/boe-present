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

export default function Slide1() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const threeItems = [
    { text: "Deep fundamental research", color: "text-emerald-300", hoverBorder: "hover:border-emerald-500/40", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
    { text: "Risk-managed portfolio construction", color: "text-blue-300", hoverBorder: "hover:border-blue-500/40", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    { text: "Strategic asset allocation", color: "text-amber-300", hoverBorder: "hover:border-amber-500/40", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
    >
      <motion.p
          variants={popupVars}
          className="text-blue-400 font-medium tracking-widest uppercase mb-[1vh] text-xs"
        >
          What is Beonedge?
        </motion.p>

        <motion.div
          variants={popupVars}
          className="flex items-center justify-center gap-3 mb-[0.5vh]"
        >
          <img
            src="/images/B.png"
            alt="BeOnEdge logo"
            className="h-9 w-auto flex-shrink-0"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(251,191,36,0.55)) drop-shadow(0 0 18px rgba(251,191,36,0.25))",
            }}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            BeOnEdge{" "}
            <span className="text-gradient-gold">
              Wealth Management
            </span>
          </h1>
        </motion.div>

        <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 mb-[1.5vh]" />
      <motion.div
        variants={popupVars}
        className="glass-elevated rounded-2xl p-[2vw] w-full flex flex-col items-center text-center"
      >

        <motion.p
          variants={popupVars}
          className="text-sm text-neutral-300 leading-relaxed max-w-3xl mb-[1.5vh]"
        >
          Beonedge is a research-driven wealth management firm focused on helping investors grow their capital through disciplined investing and strategic asset allocation.
        </motion.p>

        <ReactivePanel className="w-full text-left glass p-[1.2vw] rounded-xl mb-[1.5vh]">
          <h3 className="text-base md:text-lg font-semibold mb-[1vh] text-white">
            We allocate client capital across:
          </h3>
          <div className="grid grid-cols-3 gap-[0.8vw]">
            {["Equity Markets", "Commodities", "Fixed Income Instruments"].map((item, i) => (
              <motion.div
                key={i}
                variants={popupVars}
                className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 px-[0.8vw] py-[0.6vh]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-sm text-neutral-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </ReactivePanel>

        <motion.div
          variants={popupVars}
          className="w-full text-left glass p-[1.2vw] rounded-xl"
        >
          <h3 className="text-sm text-neutral-300 mb-[1vh] italic">
            Our objective is to generate sustainable long-term returns by combining:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[0.8vw] mb-[1vh]">
            {threeItems.map((item, i) => (
              <ReactivePanel
                key={i}
                className={`glass p-[1vw] rounded-lg flex items-center justify-center text-center cursor-default`}
              >
                <p className={`font-medium text-sm ${item.color}`}>{item.text}</p>
              </ReactivePanel>
            ))}
          </div>
          <p className="text-neutral-400 text-sm text-center leading-relaxed">
            We aim to help investors grow their hard-earned money beyond traditional investment options such as bank deposits and passive index returns, while maintaining a disciplined approach to risk.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
