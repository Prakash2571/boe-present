"use client";

import type { PointerEvent, ReactNode } from "react";
import type { Variants } from "framer-motion";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ReactivePanel({
  children,
  className,
  variants = defaultVariants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useSpring(0, { stiffness: 220, damping: 24 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.22), transparent 42%)`;

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - b.left) / b.width) * 100;
    const y = ((e.clientY - b.top) / b.height) * 100;
    glowX.set(x);
    glowY.set(y);
    glowOpacity.set(1);
    rotateX.set((50 - y) / 8);
    rotateY.set((x - 50) / 7);
  };

  return (
    <motion.div
      variants={variants}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      whileHover={
        prefersReducedMotion
          ? { y: -3 }
          : { y: -8, scale: 1.01, transition: { duration: 0.22 } }
      }
      className={`relative overflow-hidden transition-[box-shadow] duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.38),0_0_28px_rgba(255,255,255,0.05)] ${className ?? ""}`}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: prefersReducedMotion ? 0 : glowOpacity,
          backgroundImage: glare,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
