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
        Our{" "}
        <span className="text-gradient-gold">Performance History</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

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
        <ReactivePanel className="glass flex flex-col p-[1vw]">
          <h2 className="text-sm md:text-base font-bold text-white mb-[0.4vh]">
            Experienced Market Participation
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed mb-[0.4vh]">
            Our team has actively participated in financial markets for over 5
            years, navigating multiple market cycles including:
          </p>
          <ul className="text-xs text-neutral-400 space-y-0.5">
            {["COVID-19 market crash", "Russia-Ukraine geopolitical volatility", "Bull market phases of 2023-2024", "Current evolving market conditions"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </ReactivePanel>

        <ReactivePanel className="glass flex flex-col p-[1vw]">
          <h2 className="text-sm md:text-base font-bold text-white mb-[0.4vh]">
            Strong Performance Track Record
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed mb-[0.4vh]">
            We have maintained an average CAGR of approximately{" "}
            <span className="text-emerald-400 font-semibold">16%</span> over the
            last 5 years through disciplined investing.
          </p>
          <div className="glass rounded-lg p-[0.5vw] text-xs text-neutral-300 italic">
            A &#8377;100 investment growing at{" "}
            <span className="text-emerald-400">16% CAGR</span> reaches approximately{" "}
            <span className="text-emerald-400 font-semibold">&#8377;210</span> in 5
            years, compared to around &#8377;176 at 12% CAGR benchmark growth.
          </div>
          <p className="text-emerald-400 text-xs font-medium mt-[0.4vh]">
            This highlights the power of consistent alpha generation over time.
          </p>
        </ReactivePanel>
      </div>

      {/* Market Cycles Table */}
      <ReactivePanel className="glass flex flex-col p-[1vw] w-full">
        <h2 className="text-sm md:text-base font-bold text-white mb-[1vh] text-center">
          Market Cycles Successfully Navigated
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-xs font-semibold text-neutral-300 py-[0.6vh] px-[0.8vw]">
                  Year
                </th>
                <th className="text-xs font-semibold text-neutral-300 py-[0.6vh] px-[0.8vw]">
                  Market Event
                </th>
                <th className="text-xs font-semibold text-neutral-300 py-[0.6vh] px-[0.8vw]">
                  Investment Outcome
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <motion.tr
                  key={row.year}
                  variants={popupVars}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="text-xs text-emerald-400 font-semibold py-[0.6vh] px-[0.8vw]">
                    {row.year}
                  </td>
                  <td className="text-xs text-neutral-300 py-[0.6vh] px-[0.8vw]">
                    {row.event}
                  </td>
                  <td className="text-xs text-neutral-400 py-[0.6vh] px-[0.8vw]">
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
