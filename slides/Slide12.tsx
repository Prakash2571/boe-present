"use client";
import { motion } from "framer-motion";
import ReactivePanel from "@/components/ReactivePanel";

const popupVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

export default function Slide12() {
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
        Why{" "}
        <span className="text-gradient-gold">BeOnEdge</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Subheading */}
      <motion.p
        variants={popupVars}
        className="text-sm md:text-base text-neutral-400 text-center max-w-4xl mb-[3vh] leading-relaxed"
      >
        We combine the research discipline of institutional investing with the
        personalized service of a boutique wealth management firm&mdash;helping
        clients pursue sustainable, risk-conscious long-term wealth creation.
      </motion.p>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] w-full">
        {/* Box 1 - Experienced Market Participation */}
        <ReactivePanel className="glass flex flex-col p-[1.5vw] rounded-2xl">
          <motion.div variants={popupVars}>
            <h2 className="text-base md:text-lg font-bold text-white mb-[1.5vh]">
              Experienced Market Participation
            </h2>
            <p className="text-sm md:text-base text-neutral-300 mb-[1.5vh] leading-relaxed">
              Our team has actively participated in financial markets for over 5
              years, navigating multiple market cycles including:
            </p>
            <ul className="space-y-[0.8vh] text-sm md:text-base text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                COVID-19 market crash
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                Russia-Ukraine geopolitical volatility
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                Bull market phases of 2023&ndash;2024
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                Current evolving market conditions
              </li>
            </ul>
          </motion.div>
        </ReactivePanel>

        {/* Box 2 - Strong Performance Track Record */}
        <ReactivePanel className="glass flex flex-col p-[1.5vw] rounded-2xl">
          <motion.div variants={popupVars}>
            <h2 className="text-base md:text-lg font-bold text-white mb-[1.5vh]">
              Strong Performance Track Record
            </h2>
            <ul className="space-y-[1.2vh] text-sm md:text-base text-neutral-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                We have maintained an average CAGR of approximately 16% over the
                last 5 years through disciplined investing.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                A &#8377;100 investment growing at 16% CAGR reaches approximately
                &#8377;210 in 5 years, compared to around &#8377;176 at 12% CAGR
                benchmark growth.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                This highlights the power of consistent alpha generation over
                time.
              </li>
            </ul>
          </motion.div>
        </ReactivePanel>
      </div>
    </motion.div>
  );
}
