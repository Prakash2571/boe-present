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

const rowVars = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const tableData = [
  { year: "2020", event: "COVID-19 Market Crash", outcome: "Capital Preservation" },
  { year: "2021", event: "Economic Recovery", outcome: "Captured Market Upside" },
  { year: "2022", event: "Russia\u2013Ukraine Conflict", outcome: "Risk-Controlled Returns" },
  { year: "2023", event: "Inflation & Rate Hikes", outcome: "Benchmark Outperformance" },
  { year: "2024", event: "Elections & Oil Volatility", outcome: "Consistent Alpha Generation" },
  { year: "2025\u201326", event: "Global Geopolitical Uncertainty", outcome: "Stable Long-Term Performance" },
];

export default function Slide5() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

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
        Proven Track Record
      </motion.p>

      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mt-[0.5vh]"
      >
        Our{" "}
        <span className="text-gradient-gold">Performance History</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.2vh] mx-auto" />

      {/* Subheading */}
      <motion.p
        variants={popupVars}
        className="text-xs md:text-sm text-neutral-300 leading-relaxed text-center max-w-4xl mb-[1.5vh]"
      >
        Over the past six years, our research-driven investment process has
        consistently delivered superior risk-adjusted returns across multiple
        market environments through disciplined asset allocation, fundamental
        research, and proactive risk management.
      </motion.p>

      {/* Two info cards - side by side */}
      <div className="w-full grid grid-cols-2 gap-[1vw] mb-[1.5vh]">
        {/* Card 1 — Market participation */}
        <ReactivePanel
          variants={popupVars}
          className="glass-elevated flex flex-col p-[1.1vw] border-l-2 border-l-blue-500"
        >
          <div className="flex items-center gap-[0.7vw] mb-[0.8vh]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l4-4 3 3 5-6" />
              </svg>
            </div>
            <h2 className="text-sm md:text-base font-bold text-white leading-tight">
              Experienced Market Cycle
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed mb-[0.8vh]">
            Our team has actively participated in financial markets for over{" "}
            <span className="text-blue-400 font-semibold">5 years</span>,
            navigating multiple market cycles including:
          </p>
          <ul className="text-xs text-neutral-400 space-y-[0.6vh]">
            {["COVID-19 market crash", "Russia-Ukraine geopolitical volatility", "Bull market phases of 2023-2024", "Current evolving market conditions"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </ReactivePanel>

        {/* Card 2 — Track record */}
        <ReactivePanel
          variants={popupVars}
          className="glass-elevated flex flex-col p-[1.1vw] border-l-2 border-l-emerald-500"
        >
          <div className="flex items-center gap-[0.7vw] mb-[0.8vh]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-sm md:text-base font-bold text-white leading-tight">
              Strong Performance Track Record
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed mb-[0.8vh]">
            We have maintained an average CAGR of approximately{" "}
            <span className="text-emerald-400 font-bold text-sm">16%</span> over
            the last 5 years through disciplined investing.
          </p>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-[0.7vw] text-xs text-neutral-300 leading-relaxed">
            A &#8377;100 investment growing at{" "}
            <span className="text-emerald-400 font-semibold">16% CAGR</span> reaches
            approximately{" "}
            <span className="text-emerald-400 font-bold text-sm">&#8377;210</span> in
            5 years, compared to around{" "}
            <span className="text-neutral-200 font-medium">&#8377;176</span> at 12%
            CAGR benchmark growth.
          </div>
          <p className="text-emerald-400 text-xs font-medium mt-[0.8vh] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            This highlights the power of consistent alpha generation over time.
          </p>
        </ReactivePanel>
      </div>

      {/* Market Cycles Table */}
      <ReactivePanel variants={popupVars} className="glass-elevated flex flex-col p-[1.1vw] w-full">
        <h2 className="text-sm md:text-base font-bold text-white mb-[1vh] text-center flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Market Cycles Successfully Navigated
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        </h2>

        <div className="w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/15">
                <th className="text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-400 py-[0.7vh] px-[0.9vw] rounded-l-lg w-[16%]">
                  Year
                </th>
                <th className="text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-400 py-[0.7vh] px-[0.9vw] w-[42%]">
                  Market Event
                </th>
                <th className="text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-400 py-[0.7vh] px-[0.9vw] rounded-r-lg w-[42%]">
                  Investment Outcome
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <motion.tr
                  key={row.year}
                  variants={rowVars}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.04] ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="text-xs md:text-sm text-emerald-400 font-bold py-[0.7vh] px-[0.9vw] whitespace-nowrap">
                    {row.year}
                  </td>
                  <td className="text-xs md:text-sm text-neutral-200 py-[0.7vh] px-[0.9vw]">
                    {row.event}
                  </td>
                  <td className="text-xs md:text-sm text-neutral-400 py-[0.7vh] px-[0.9vw]">
                    {row.outcome}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReactivePanel>
    </motion.div>
  );
}
