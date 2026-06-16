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

export default function Slide8() {
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
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
    >
      <motion.p
        variants={popupVars}
        className="text-blue-400 font-medium tracking-widest uppercase text-xs"
      >
        Get In Touch
      </motion.p>

      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-[0.5vh]"
      >
        Contact{" "}
        <span className="text-gradient-gold">
          Us
        </span>
      </motion.h1>
      <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 mb-[1.5vh] mx-auto" />

      <motion.div
        variants={popupVars}
        className="glass-elevated rounded-xl p-[1.5vw] w-full"
      >
        <div className="flex items-center justify-center gap-3 mb-[1.5vh]">
          <img
            src="/images/B.png"
            alt="BeOnEdge logo"
            className="h-8 w-auto flex-shrink-0"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(96,165,250,0.7)) drop-shadow(0 0 20px rgba(96,165,250,0.3))",
            }}
          />
          <h2 className="text-base md:text-lg font-bold text-white">
            BeOnEdge Wealth Management
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[1.2vw]">
          {/* Address */}
          <ReactivePanel
            variants={popupVars}
            className="p-[1.2vw] glass rounded-xl group h-full"
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-11 h-11 rounded-full bg-blue-500/15 flex items-center justify-center mb-[1vh] group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Address</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                College Road, Powarh<br />
                Ghatsila – 832303
              </p>
            </div>
          </ReactivePanel>

          {/* Phone */}
          <ReactivePanel
            variants={popupVars}
            className="p-[1.2vw] glass rounded-xl group h-full"
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-11 h-11 rounded-full bg-indigo-500/15 flex items-center justify-center mb-[1vh] group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Phone</h3>
              <p className="text-neutral-300 text-sm flex flex-col gap-0.5">
                <a href="tel:+918789136062" className="hover:text-white transition-colors">+91 8789136062</a>
                <a href="tel:+916201907898" className="hover:text-white transition-colors">+91 6201907898</a>
              </p>
            </div>
          </ReactivePanel>

          {/* Website */}
          <ReactivePanel
            variants={popupVars}
            className="p-[1.2vw] glass rounded-xl group h-full"
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-11 h-11 rounded-full bg-cyan-500/15 flex items-center justify-center mb-[1vh] group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Website</h3>
              <a href="https://beonedge.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                beonedge.in
              </a>
            </div>
          </ReactivePanel>
        </div>
      </motion.div>
    </motion.div>
  );
}
