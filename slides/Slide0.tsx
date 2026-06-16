"use client";
import { motion } from "framer-motion";

const blobs = [
  {
    color: "rgba(59,130,246,0.24)",
    size: 680,
    initial: { x: -200, y: -180 },
    animate: { x: [-200, 80, -120, -200], y: [-180, 60, 200, -180] },
    duration: 14,
  },
  {
    color: "rgba(99,102,241,0.20)",
    size: 580,
    initial: { x: 220, y: 160 },
    animate: { x: [220, -60, 300, 220], y: [160, -100, 80, 160] },
    duration: 17,
  },
  {
    color: "rgba(245,158,11,0.16)",
    size: 480,
    initial: { x: 100, y: -240 },
    animate: { x: [100, -180, 200, 100], y: [-240, 120, -80, -240] },
    duration: 20,
  },
  {
    color: "rgba(139,92,246,0.14)",
    size: 520,
    initial: { x: -280, y: 200 },
    animate: { x: [-280, 160, -100, -280], y: [200, -60, 300, 200] },
    duration: 16,
  },
  {
    color: "rgba(6,182,212,0.11)",
    size: 420,
    initial: { x: 300, y: -100 },
    animate: { x: [300, -100, 200, 300], y: [-100, 200, -200, -100] },
    duration: 22,
  },
];

export default function Slide0() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      {/* Fluid animated background blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          initial={{ x: blob.initial.x, y: blob.initial.y, opacity: 0.7 }}
          animate={{
            x: blob.animate.x,
            y: blob.animate.y,
            opacity: [0.7, 1, 0.6, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: blob.duration,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            filter: "blur(48px)",
          }}
        />
      ))}

      {/* Subtle vignette overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,10,20,0.55) 100%)",
        }}
      />

      {/* Main glassmorphism panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 glass-elevated rounded-2xl px-[4vw] py-[4vh] flex flex-col items-center text-center max-w-2xl w-full mx-auto"
        style={{
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Logo + name row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-[1.2vw] mb-2"
        >
          {/* Logo — inherited filter applied via globals.css */}
          <div className="flex-shrink-0 hero-logo-container">
            <img
              src="/images/B.png"
              alt="BeOnEdge logo"
              className="h-14 w-auto"
            />
          </div>

          {/* Company name — indigo gradient */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gradient-indigo">
            BeOnEdge
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-base md:text-lg font-light text-white/80 tracking-[0.25em] uppercase mt-1"
        >
          Wealth Management
        </motion.p>

        {/* Divider line — grows from center */}
        <div className="relative mt-[1.8vh] mb-[1.8vh] w-full flex justify-center overflow-hidden h-[2px]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "center" }}
            className="w-32 h-full bg-gradient-to-r from-blue-400/60 via-indigo-400/80 to-cyan-400/60 rounded-full"
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-neutral-400 text-sm italic leading-relaxed max-w-md"
        >
          Research-driven investing for disciplined wealth creation
        </motion.p>

        {/* Press Space prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-[3vh]"
        >
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-neutral-500 text-xs tracking-widest uppercase"
          >
            Press Space to begin
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
