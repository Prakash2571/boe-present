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

export default function Slide3() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const services = [
    {
      title: "Systematic Investment Plan (SIP)",
      description:
        "A disciplined investment approach where investors contribute a fixed amount periodically.",
      num: "01",
      accent: "from-blue-400 to-cyan-400",
    },
    {
      title: "One-Time Investment",
      description:
        "For investors who want to deploy capital at once and stay invested for the long term.",
      num: "02",
      accent: "from-indigo-400 to-purple-400",
    },
    {
      title: "Portfolio Management Service (PMS)",
      description:
        "Customized portfolio management for larger investors with performance-linked profit sharing.",
      num: "03",
      accent: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
    >
      <motion.h1
        variants={popupVars}
        className="text-3xl md:text-4xl font-bold mb-[0.5vh] text-white tracking-tight"
      >
        Services We{" "}
        <span className="text-gradient-gold">
          Provide
        </span>
      </motion.h1>

      <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 mb-[1.5vh]" />

      <motion.p
        variants={popupVars}
        className="text-sm text-neutral-300 leading-relaxed max-w-3xl mb-[2vh]"
      >
        BeOnEdge offers multiple investment options depending on investor requirements.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2vw] w-full">
        {services.map((service, index) => (
          <ReactivePanel
            key={index}
            variants={popupVars}
            className="group glass-elevated rounded-xl p-[1.5vw] flex flex-col h-full text-left"
          >
            <div className="text-5xl md:text-6xl font-black text-white/5 group-hover:text-blue-400/15 transition-colors duration-300 mb-[1.5vh] leading-none">
              {service.num}
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-[1vh]">
              {service.title}
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed flex-grow">
              {service.description}
            </p>

            <div className={`mt-[1.5vh] w-12 h-[2px] rounded-full bg-gradient-to-r ${service.accent} group-hover:w-full transition-all duration-500`} />
          </ReactivePanel>
        ))}
      </div>
    </motion.div>
  );
}
