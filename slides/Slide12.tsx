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
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const tableData = [
  {
    parameter: "Investment Approach",
    boe: "Driven by Research Analysis and Quant",
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
    fd: "Multiple Asset",
  },
  {
    parameter: "Transparency",
    boe: "Dedicated Client Dashboard",
    mutual: "Monthly Factsheets",
    traditional: "Periodic Reports",
    fd: "Passbook/Statement",
  },
  {
    parameter: "Return Policy",
    boe: "Consistent Long Term Returns",
    mutual: "Market Linked",
    traditional: "Long Term Lock In",
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
      {/* Eyebrow */}
      <motion.p
        variants={popupVars}
        className="text-emerald-400 font-medium tracking-widest uppercase text-xs"
      >
        The BeOnEdge Advantage
      </motion.p>

      {/* Title */}
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mt-[0.5vh]"
      >
        Why{" "}
        <span className="text-gradient-gold">BeOnEdge</span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-emerald-500 to-blue-500 mt-2 mb-[1.2vh] mx-auto" />

      <motion.p
        variants={popupVars}
        className="text-xs md:text-sm text-neutral-300 text-center max-w-3xl mb-[1.5vh] leading-relaxed"
      >
        We combine the research discipline of institutional investing with the
        personalized service of a boutique wealth management firm—helping clients
        pursue sustainable, risk-conscious long-term wealth creation.
      </motion.p>

      {/* Comparison Table */}
      <motion.div variants={popupVars} className="w-full flex-1 min-h-0 flex">
        <ReactivePanel className="glass-elevated rounded-2xl p-[1.2vw] w-full flex flex-col">
          <table className="w-full h-full text-left border-collapse table-fixed">
            <colgroup>
              <col className="w-[19%]" />
              <col className="w-[22%]" />
              <col className="w-[20%]" />
              <col className="w-[22%]" />
              <col className="w-[17%]" />
            </colgroup>
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/15">
                <th className="py-[1.3vh] px-[0.9vw] text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 rounded-l-lg">
                  Parameter
                </th>
                <th className="py-[1.3vh] px-[0.9vw] text-sm md:text-base font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/[0.1]">
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    BeOnEdge
                  </span>
                </th>
                <th className="py-[1.3vh] px-[0.9vw] text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Mutual Funds
                </th>
                <th className="py-[1.3vh] px-[0.9vw] text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Traditional Wealth Managers
                </th>
                <th className="py-[1.3vh] px-[0.9vw] text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 rounded-r-lg">
                  Bank FD
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <motion.tr
                  key={row.parameter}
                  variants={rowVars}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.04] ${
                    idx % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="py-[1.15vh] px-[0.9vw] text-sm md:text-base font-semibold text-white leading-snug">
                    {row.parameter}
                  </td>
                  <td className="py-[1.15vh] px-[0.9vw] text-sm md:text-base font-semibold text-emerald-400 bg-emerald-500/[0.06] leading-snug">
                    {row.boe}
                  </td>
                  <td className="py-[1.15vh] px-[0.9vw] text-sm md:text-base text-neutral-400 leading-snug">
                    {row.mutual}
                  </td>
                  <td className="py-[1.15vh] px-[0.9vw] text-sm md:text-base text-neutral-400 leading-snug">
                    {row.traditional}
                  </td>
                  <td className="py-[1.15vh] px-[0.9vw] text-sm md:text-base text-neutral-400 leading-snug">
                    {row.fd}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ReactivePanel>
      </motion.div>
    </motion.div>
  );
}
