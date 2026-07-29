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

const tableData = [
  {
    parameter: "Investment Approach",
    boe: "Research-Driven",
    mutual: "Fund Mandate Based",
    traditional: "Product Driven",
    fd: "Fixed Interest",
  },
  {
    parameter: "Portfolio Management",
    boe: "Actively Managed",
    mutual: "Scheme Managed",
    traditional: "Advisor Dependent",
    fd: "Not Applicable",
  },
  {
    parameter: "Risk Management",
    boe: "Dynamic & Active",
    mutual: "Fund-Level",
    traditional: "Varies",
    fd: "Very Low Risk",
  },
  {
    parameter: "Asset Allocation",
    boe: "Flexible",
    mutual: "Limited by Scheme",
    traditional: "Product Dependent",
    fd: "Single Asset",
  },
  {
    parameter: "Transparency",
    boe: "Dedicated Client Dashboard",
    mutual: "Monthly Factsheets",
    traditional: "Periodic Reports",
    fd: "Passbook/Statement",
  },
  {
    parameter: "Decision Making",
    boe: "Fundamental Research",
    mutual: "Fund Manager",
    traditional: "Relationship Manager",
    fd: "Fixed Terms",
  },
  {
    parameter: "Return Potential",
    boe: "Competitive Long-Term CAGR",
    mutual: "Market Linked",
    traditional: "Product Dependent",
    fd: "Fixed Returns",
  },
  {
    parameter: "Benchmark Focus",
    boe: "Target to Outperform",
    mutual: "Benchmark Relative",
    traditional: "Varies",
    fd: "No Benchmark",
  },
  {
    parameter: "Client Alignment",
    boe: "Long-Term Wealth Creation",
    mutual: "Fund Objective",
    traditional: "Product Distribution",
    fd: "Capital Preservation",
  },
  {
    parameter: "Investment Experience",
    boe: "Personalized",
    mutual: "Standardized",
    traditional: "Semi-Personalized",
    fd: "Standard Banking",
  },
];

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
        className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center"
      >
        How We{" "}
        <span className="text-gradient-gold">Compare</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.5vh] mx-auto" />

      {/* Comparison Table */}
      <motion.div variants={popupVars} className="w-full flex-1 min-h-0">
        <ReactivePanel className="glass rounded-2xl p-[1vw] w-full h-full overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-[0.8vh] px-[0.6vw] text-xs md:text-sm font-semibold text-neutral-400">
                  Parameter
                </th>
                <th className="py-[0.8vh] px-[0.6vw] text-xs md:text-sm font-bold text-emerald-400">
                  BeOnEdge
                </th>
                <th className="py-[0.8vh] px-[0.6vw] text-xs md:text-sm font-semibold text-neutral-400">
                  Mutual Funds
                </th>
                <th className="py-[0.8vh] px-[0.6vw] text-xs md:text-sm font-semibold text-neutral-400">
                  Traditional Wealth Managers
                </th>
                <th className="py-[0.8vh] px-[0.6vw] text-xs md:text-sm font-semibold text-neutral-400">
                  Bank FD
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr
                  key={row.parameter}
                  className={`border-b border-white/5 ${
                    idx % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="py-[0.6vh] px-[0.6vw] text-xs md:text-sm font-medium text-neutral-300">
                    {row.parameter}
                  </td>
                  <td className="py-[0.6vh] px-[0.6vw] text-xs md:text-sm font-semibold text-emerald-400">
                    {row.boe}
                  </td>
                  <td className="py-[0.6vh] px-[0.6vw] text-xs md:text-sm text-neutral-400">
                    {row.mutual}
                  </td>
                  <td className="py-[0.6vh] px-[0.6vw] text-xs md:text-sm text-neutral-400">
                    {row.traditional}
                  </td>
                  <td className="py-[0.6vh] px-[0.6vw] text-xs md:text-sm text-neutral-400">
                    {row.fd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactivePanel>
      </motion.div>

      {/* Bottom heading */}
      <motion.h2
        variants={popupVars}
        className="text-lg md:text-xl font-bold text-white mt-[1.5vh] text-center"
      >
        Why Investors Choose{" "}
        <span className="text-gradient-gold">BeOnEdge</span>
      </motion.h2>
    </motion.div>
  );
}
