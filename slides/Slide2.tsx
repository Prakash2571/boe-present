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

export default function Slide2() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center"
    >
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold mb-[0.5vh] text-white tracking-tight text-center"
      >
        Our Aim &{" "}
        <span className="text-gradient-gold">
          Investment Philosophy
        </span>
      </motion.h1>

      <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 mb-[1.5vh] mx-auto" />

      <motion.p
        variants={popupVars}
        className="text-sm text-neutral-300 mb-[1.5vh] border-l-2 border-blue-500 pl-3"
      >
        At BeOnEdge, our philosophy is built on two core principles.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2vw]">
        {/* Principle 1 — Growth focus: emerald accent */}
        <ReactivePanel
          variants={popupVars}
          className="glass-elevated rounded-xl p-[1.5vw] flex flex-col"
        >
          <h2 className="text-base md:text-lg font-bold text-white mb-[1vh] flex items-center">
            <span className="text-emerald-400 mr-2 text-xl">1.</span> Consistent Wealth Creation
          </h2>

          <p className="text-neutral-300 mb-[1.5vh] leading-relaxed text-sm">
            Our long-term goal is to deliver returns that outperform benchmark indices and traditional savings instruments through disciplined investing.
          </p>

          <div className="bg-emerald-900/25 border border-emerald-500/25 rounded-lg p-[1vw] mb-[1.5vh]">
            <p className="text-xs text-emerald-300 mb-0.5">Expected long-term target range:</p>
            <p className="text-base font-bold text-white tracking-wide">
              12–15% CAGR{" "}
              <span className="text-sm font-normal text-emerald-300">over market cycles</span>
            </p>
          </div>

          <p className="text-white font-medium mb-[1vh] text-sm">This is achieved through:</p>
          <ul className="space-y-[0.6vh] flex-grow">
            {[
              "Strategic asset allocation",
              "Fundamental research",
              "Risk management",
              "Market cycle awareness",
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={popupVars}
                className="flex items-center text-neutral-300 text-sm"
              >
                <svg
                  className="w-3.5 h-3.5 text-emerald-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="flex-1">{item}</span>
              </motion.li>
            ))}
          </ul>
        </ReactivePanel>

        {/* Principle 2 — Protection focus: blue accent */}
        <ReactivePanel
          variants={popupVars}
          className="glass-elevated rounded-xl p-[1.5vw] flex flex-col"
        >
          <h2 className="text-base md:text-lg font-bold text-white mb-[1vh] flex items-center">
            <span className="text-blue-400 mr-2 text-xl">2.</span> Capital Protection First
          </h2>

          <p className="text-neutral-300 mb-[1.5vh] leading-relaxed text-sm">
            Preserving client capital during adverse market conditions is equally important as generating returns.
          </p>

          <div className="glass rounded-lg p-[1.2vw] border border-white/10 flex-grow">
            <p className="text-white font-medium mb-[1vh] text-sm">
              Our investment strategy focuses on:
            </p>
            <ul className="space-y-[0.6vh]">
              {[
                "Managing downside risk",
                "Reducing volatility during market stress",
                "Protecting capital during extreme market conditions",
                "Disciplined portfolio diversification across asset classes",
                "Strict downside risk controls with predefined stop-loss levels",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={popupVars}
                  className="flex items-start text-neutral-300 text-sm"
                >
                  <div className="flex-shrink-0 w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <span className="flex-1">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </ReactivePanel>
      </div>
    </motion.div>
  );
}
