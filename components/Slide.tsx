"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import {
  SLIDE_SHELL_TRANSITION,
  SLIDE_TRANSITION_MS,
} from "./presentationMotion";

interface SlideProps {
  children: ReactNode;
  isActive: boolean;
  slideIndex: number;
  totalSlides: number;
}

type Blob = {
  color: string;
  size: number;
  ix: number;
  iy: number;
  ax: number[];
  ay: number[];
  dur: number;
};

const THEMES: Record<number, Blob[]> = {
  // Slide 1 — blue / indigo (brand intro)
  1: [
    { color: "rgba(59,130,246,0.22)",  size: 620, ix: -200, iy: -160, ax: [-200,  80, -110, -200], ay: [-160,  70,  190, -160], dur: 15 },
    { color: "rgba(99,102,241,0.17)",  size: 520, ix:  220, iy:  140, ax: [ 220, -70,  260,  220], ay: [ 140, -110,   70,  140], dur: 18 },
    { color: "rgba(139,92,246,0.12)",  size: 430, ix:   70, iy: -210, ax: [  70,-160,  190,   70], ay: [-210,  110,  -80, -210], dur: 22 },
    { color: "rgba(6,182,212,0.09)",   size: 380, ix: -280, iy:  190, ax: [-280, 120, -100, -280], ay: [ 190,  -60,  280,  190], dur: 19 },
  ],
  // Slide 2 — emerald / blue (growth + protection)
  2: [
    { color: "rgba(16,185,129,0.22)",  size: 640, ix: -200, iy: -170, ax: [-200,  80, -120, -200], ay: [-170,  70,  200, -170], dur: 14 },
    { color: "rgba(59,130,246,0.16)",  size: 530, ix:  220, iy:  140, ax: [ 220, -60,  280,  220], ay: [ 140, -100,   80,  140], dur: 18 },
    { color: "rgba(6,182,212,0.12)",   size: 440, ix:   70, iy: -220, ax: [  70,-170,  170,   70], ay: [-220,  110,  -80, -220], dur: 22 },
    { color: "rgba(52,211,153,0.09)",  size: 360, ix: -270, iy:  200, ax: [-270, 130, -100, -270], ay: [ 200,  -50,  280,  200], dur: 20 },
  ],
  // Slide 3 — blue / indigo / emerald (services)
  3: [
    { color: "rgba(59,130,246,0.20)",  size: 600, ix: -180, iy: -150, ax: [-180, 100,  -90, -180], ay: [-150,  80,  170, -150], dur: 16 },
    { color: "rgba(99,102,241,0.16)",  size: 510, ix:  240, iy:  120, ax: [ 240, -50,  260,  240], ay: [ 120, -110,   80,  120], dur: 19 },
    { color: "rgba(16,185,129,0.12)",  size: 420, ix:   90, iy: -200, ax: [  90,-140,  200,   90], ay: [-200,  120,  -70, -200], dur: 23 },
    { color: "rgba(6,182,212,0.08)",   size: 360, ix: -260, iy:  180, ax: [-260, 110, -100, -260], ay: [ 180,  -60,  260,  180], dur: 21 },
  ],
  // Slide 4 — indigo / emerald / blue (investment modes)
  4: [
    { color: "rgba(99,102,241,0.22)",  size: 620, ix: -220, iy: -170, ax: [-220,  70, -130, -220], ay: [-170,  90,  200, -170], dur: 15 },
    { color: "rgba(16,185,129,0.17)",  size: 530, ix:  200, iy:  150, ax: [ 200, -80,  250,  200], ay: [ 150,  -90,   80,  150], dur: 17 },
    { color: "rgba(59,130,246,0.13)",  size: 440, ix:   70, iy: -210, ax: [  70,-160,  190,   70], ay: [-210,  110,  -80, -210], dur: 20 },
    { color: "rgba(139,92,246,0.08)",  size: 360, ix: -260, iy:  190, ax: [-260, 130,  -90, -260], ay: [ 190,  -50,  270,  190], dur: 23 },
  ],
  // Slide 5 — emerald dominant (performance / why choose)
  5: [
    { color: "rgba(16,185,129,0.26)",  size: 680, ix: -200, iy: -180, ax: [-200,  80, -120, -200], ay: [-180,  60,  200, -180], dur: 14 },
    { color: "rgba(52,211,153,0.18)",  size: 560, ix:  240, iy:  140, ax: [ 240, -60,  290,  240], ay: [ 140, -100,   80,  140], dur: 17 },
    { color: "rgba(59,130,246,0.11)",  size: 450, ix:   80, iy: -220, ax: [  80,-170,  200,   80], ay: [-220,  110,  -80, -220], dur: 21 },
    { color: "rgba(6,182,212,0.09)",   size: 370, ix: -270, iy:  200, ax: [-270, 120, -110, -270], ay: [ 200,  -60,  280,  200], dur: 18 },
  ],
  // Slide 6 — red / crimson (what we do NOT do)
  6: [
    { color: "rgba(239,68,68,0.20)",   size: 640, ix: -190, iy: -160, ax: [-190,  90, -110, -190], ay: [-160,  70,  190, -160], dur: 15 },
    { color: "rgba(220,38,38,0.14)",   size: 530, ix:  230, iy:  140, ax: [ 230, -70,  270,  230], ay: [ 140, -100,   70,  140], dur: 18 },
    { color: "rgba(251,113,133,0.10)", size: 440, ix:   70, iy: -210, ax: [  70,-150,  190,   70], ay: [-210,  100,  -80, -210], dur: 22 },
    { color: "rgba(99,102,241,0.07)",  size: 360, ix: -260, iy:  190, ax: [-260, 110, -100, -260], ay: [ 190,  -60,  260,  190], dur: 20 },
  ],
  // Slide 7 — indigo / cyan (client tracking / transparency)
  7: [
    { color: "rgba(99,102,241,0.24)",  size: 660, ix: -210, iy: -170, ax: [-210,  80, -120, -210], ay: [-170,  80,  200, -170], dur: 14 },
    { color: "rgba(6,182,212,0.18)",   size: 550, ix:  220, iy:  150, ax: [ 220, -60,  260,  220], ay: [ 150, -100,   80,  150], dur: 17 },
    { color: "rgba(139,92,246,0.13)",  size: 450, ix:   80, iy: -220, ax: [  80,-160,  200,   80], ay: [-220,  110,  -80, -220], dur: 21 },
    { color: "rgba(59,130,246,0.09)",  size: 370, ix: -270, iy:  200, ax: [-270, 120, -110, -270], ay: [ 200,  -60,  280,  200], dur: 19 },
  ],
  // Slide 8 — blue / cyan (contact)
  8: [
    { color: "rgba(59,130,246,0.22)",  size: 640, ix: -200, iy: -160, ax: [-200,  80, -120, -200], ay: [-160,  70,  190, -160], dur: 15 },
    { color: "rgba(6,182,212,0.17)",   size: 540, ix:  230, iy:  140, ax: [ 230, -60,  270,  230], ay: [ 140, -100,   80,  140], dur: 18 },
    { color: "rgba(99,102,241,0.12)",  size: 450, ix:   80, iy: -200, ax: [  80,-150,  200,   80], ay: [-200,  110,  -70, -200], dur: 22 },
    { color: "rgba(14,165,233,0.08)",  size: 370, ix: -260, iy:  190, ax: [-260, 120, -100, -260], ay: [ 190,  -60,  270,  190], dur: 20 },
  ],
};

export default function Slide({
  children,
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!isActive) return null;

  const blobs = THEMES[slideIndex] ?? [];

  return (
    <motion.section
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.97, y: 28 }
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.02, y: -20 }
      }
      transition={SLIDE_SHELL_TRANSITION}
      data-testid="active-slide"
      data-slide-index={slideIndex}
      data-slide-transition-ms={SLIDE_TRANSITION_MS}
      aria-roledescription="slide"
      aria-label={`Slide ${slideIndex + 1} of ${totalSlides}`}
      className="absolute inset-0 flex h-[100dvh] w-full items-center justify-center px-[3vw] py-[2vh] overflow-hidden"
    >
      {/* Fluid background blobs wrapper */}
      {!prefersReducedMotion && blobs.length > 0 && (
        <div className="fluid-blobs-container pointer-events-none absolute inset-0">
          {blobs.map((blob, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              initial={{ x: blob.ix, y: blob.iy, opacity: 0.7 }}
              animate={{
                x: blob.ax,
                y: blob.ay,
                opacity: [0.7, 1, 0.55, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: blob.dur,
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1],
              }}
              style={{
                width: blob.size,
                height: blob.size,
                left: "50%",
                top: "50%",
                marginLeft: -blob.size / 2,
                marginTop: -blob.size / 2,
                background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
                filter: "blur(52px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette to keep edges dark and content readable */}
      <div
        aria-hidden="true"
        className="slide-vignette pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(4,10,20,0.50) 100%)",
        }}
      />

      <div
        data-testid="layout-container"
        className="relative z-10 flex h-full w-full max-w-[1400px] flex-col justify-center overflow-hidden px-[3vw] py-[2vh] min-h-0"
      >
        {/* Watermark logo — shown on all content slides, hidden on intro */}
        {slideIndex > 0 && (
          <div className="absolute top-3 right-3 z-50 pointer-events-none select-none">
            <img
              src="/images/B.png"
              alt=""
              aria-hidden="true"
              className="logo-watermark h-8 w-auto"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 4px rgba(255,255,255,0.15))",
                opacity: 0.2,
              }}
            />
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
