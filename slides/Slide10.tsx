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

export default function Slide10() {
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
        We{" "}
        <span className="text-gradient-gold">
          Navigated Through
        </span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[2vh] mx-auto" />

      {/* Table Panel */}
      <ReactivePanel className="glass flex flex-col p-[1.5vw] w-full">
        <h2 className="text-base md:text-lg font-bold text-white mb-[1.5vh] text-center">
          Market Cycles Successfully Navigated
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-sm md:text-base font-semibold text-neutral-300 py-[1vh] px-[1vw]">
                  Year
                </th>
                <th className="text-sm md:text-base font-semibold text-neutral-300 py-[1vh] px-[1vw]">
                  Market Event
                </th>
                <th className="text-sm md:text-base font-semibold text-neutral-300 py-[1vh] px-[1vw]">
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
                  <td className="text-sm md:text-base text-emerald-400 font-semibold py-[1.2vh] px-[1vw]">
                    {row.year}
                  </td>
                  <td className="text-sm md:text-base text-neutral-300 py-[1.2vh] px-[1vw]">
                    {row.event}
                  </td>
                  <td className="text-sm md:text-base text-neutral-400 py-[1.2vh] px-[1vw]">
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
