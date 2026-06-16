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

const innerVars = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const boxVars = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export default function Slide4() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const modes = [
    {
      title: "1. SIP",
      subtitle: "(Systematic Investment Plan)",
      borderColor: "border-l-blue-500",
      subtitleColor: "text-blue-400",
      tagBg: "bg-blue-500/15 text-blue-300 border-blue-500/25",
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            <span className="min-w-0 flex-1 rounded-full border border-blue-500/25 bg-blue-500/15 px-2.5 py-1 text-center text-xs font-semibold text-blue-300">Minimum: ₹500/month</span>
            <span className="min-w-0 flex-1 rounded-full border border-blue-500/25 bg-blue-500/15 px-2.5 py-1 text-center text-xs font-semibold text-blue-300">Duration: 12 months</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">Investors choose a fixed amount that will be invested automatically every month on a predetermined date.</p>
          <div className="glass inline-flex max-w-full self-start rounded-lg px-2.5 py-0.5">
            <span className="text-neutral-400 text-sm">Example:</span>{" "}
            <span className="text-white font-medium text-sm">4th of every month</span>
          </div>
          <p className="text-sm italic leading-relaxed text-neutral-400">This method promotes discipline and long-term wealth creation.</p>
        </>
      ),
    },
    {
      title: "2. One-Time Investment",
      subtitle: null,
      borderColor: "border-l-indigo-500",
      subtitleColor: "",
      tagBg: "",
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            <span className="min-w-0 flex-1 rounded-full border border-indigo-500/25 bg-indigo-500/15 px-2.5 py-1 text-center text-xs font-semibold text-indigo-300">Minimum: ₹10,000</span>
            <span className="min-w-0 flex-1 rounded-full border border-indigo-500/25 bg-indigo-500/15 px-2.5 py-1 text-center text-xs font-semibold text-indigo-300">Holding Period: 12 months</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">This is suitable for investors who wish to deploy capital in a lump sum and participate in long-term market growth.</p>
        </>
      ),
    },
    {
      title: "3. PMS",
      subtitle: "(Portfolio Management Service)",
      borderColor: "border-l-emerald-500",
      subtitleColor: "text-emerald-400",
      tagBg: "",
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            <span className="min-w-0 flex-1 rounded-full border border-emerald-500/25 bg-emerald-500/15 px-2.5 py-1 text-center text-xs font-semibold text-emerald-300">Minimum Capital: ₹5,00,000</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-white">Our PMS model is performance based.</p>
          <ul className="space-y-[0.5vh] text-sm text-neutral-300">
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
              <span className="leading-relaxed">Profit sharing applies only after outperforming benchmark returns.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
              <span className="leading-relaxed">If benchmark returns are not beaten → no commission.</span>
            </li>
          </ul>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-1.5">
            <p className="text-sm font-medium leading-relaxed text-center text-neutral-300">
              This ensures complete alignment between investor and manager performance.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center"
    >
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold mb-[0.5vh] text-center text-white tracking-tight"
      >
        Modes of{" "}
        <span className="text-gradient-gold">
          Investment
        </span>
      </motion.h1>

      <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 mb-[1.5vh]" />

      <div className="w-full max-w-[58rem] space-y-[1.2vh]">
        {modes.map((mode, idx) => (
          <ReactivePanel
            key={idx}
            variants={boxVars}
            className={`glass-elevated flex min-w-0 flex-col gap-3 border-l-2 p-4 md:p-5 lg:flex-row lg:items-stretch lg:gap-5 ${mode.borderColor} cursor-default`}
          >
            <motion.div variants={innerVars} className="min-w-0 lg:w-[34%] lg:flex-shrink-0">
              <h2 className="text-base md:text-lg font-bold text-white mb-0.5">{mode.title}</h2>
              {mode.subtitle && <p className={`font-medium text-sm ${mode.subtitleColor}`}>{mode.subtitle}</p>}
            </motion.div>
            <motion.div variants={innerVars} className="min-w-0 space-y-2 lg:flex-1">
              {mode.content}
            </motion.div>
          </ReactivePanel>
        ))}
      </div>
    </motion.div>
  );
}
