"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CONTENT_TRANSITION,
  CONTENT_TRANSITION_MS,
  GRAPH_DRAW_MS,
} from "./presentationMotion";

/*
 * Assets Under Management (AUM) accumulation journey.
 *  - Started in 2022 with ~Rs. 30,000 under management.
 *  - Near-flat in the early years, then a steep hockey-stick take-off.
 *  - Reaches Rs. 1.2 Crore at present (mid-2026).
 *  `t` is a decimal year; AUM values are expressed in Rs. Lakhs on the axis.
 */
const TIMELINE_START = 2022;
const TIMELINE_END = 2026.4; // ≈ present (mid-2026)

/** AUM values in Rs. Lakhs (0.3 L = Rs. 30,000, 120 L = Rs. 1.2 Cr). */
const data: {
  t: number;
  aum: number;
  showValue?: boolean;
}[] = [
  { t: 2022.0, aum: 0.3, showValue: true }, // Rs. 30,000
  { t: 2022.5, aum: 0.8 },
  { t: 2023.0, aum: 2.5 },
  { t: 2023.5, aum: 5 },
  { t: 2024.0, aum: 12, showValue: true }, // Rs. 12 Lakh
  { t: 2024.5, aum: 22 },
  { t: 2025.0, aum: 38 },
  { t: 2025.5, aum: 62 },
  { t: 2026.0, aum: 95 },
  { t: TIMELINE_END, aum: 120, showValue: true }, // Rs. 1.2 Crore
];

const chart = {
  width: 820,
  height: 280,
  paddingTop: 18,
  paddingRight: 30,
  paddingBottom: 38,
  paddingLeft: 76,
  minY: 0,
  maxY: 120,
};

const chartWidth = chart.width - chart.paddingLeft - chart.paddingRight;
const chartHeight = chart.height - chart.paddingTop - chart.paddingBottom;
const baselineY = chart.paddingTop + chartHeight;
const yTicks = [0, 20, 40, 60, 80, 100, 120];

/* Format a Lakh value into a human-friendly currency label. */
const formatAum = (lakhs: number): string => {
  if (lakhs >= 100) {
    const cr = lakhs / 100;
    return `₹${Number.isInteger(cr) ? cr : cr.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")} Cr`;
  }
  if (lakhs < 1) {
    return `₹${Math.round(lakhs * 100)}K`;
  }
  return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)} L`;
};

/* X position from a decimal year, mapped across the timeline */
const xForYear = (t: number) =>
  chart.paddingLeft +
  (chartWidth * (t - TIMELINE_START)) / (TIMELINE_END - TIMELINE_START);

const yForValue = (aum: number) =>
  chart.paddingTop +
  ((chart.maxY - aum) / (chart.maxY - chart.minY)) * chartHeight;

/* Year gridline labels along the X-axis + the "Now" marker at the end */
const xTicks = [
  { t: 2022, label: "2022" },
  { t: 2023, label: "2023" },
  { t: 2024, label: "2024" },
  { t: 2025, label: "2025" },
  { t: TIMELINE_END, label: "Now" },
];

const points = data.map((point) => ({
  x: xForYear(point.t),
  y: yForValue(point.aum),
  aum: point.aum,
  showValue: point.showValue ?? false,
}));

const linePath = points
  .map((point, index) => {
    const prefix = index === 0 ? "M" : "L";
    return `${prefix} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  })
  .join(" ");

const areaPath = (() => {
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;
})();

/* Y-axis label center position */
const yLabelX = 18;
const yLabelY = chart.paddingTop + chartHeight / 2;

export default function AumGrowthGraph() {
  const prefersReducedMotion = useReducedMotion();
  const [animationState, setAnimationState] = useState<
    "idle" | "running" | "complete"
  >("idle");

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setAnimationState("running");
    });

    const completionId = window.setTimeout(() => {
      setAnimationState("complete");
    }, GRAPH_DRAW_MS + 420);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(completionId);
    };
  }, [prefersReducedMotion]);

  const resolvedAnimationState = prefersReducedMotion
    ? "complete"
    : animationState;
  const shouldAnimate = resolvedAnimationState !== "idle";

  return (
    <div
      data-testid="aum-growth-graph-container"
      data-graph-animation-state={resolvedAnimationState}
      data-graph-draw-ms={GRAPH_DRAW_MS}
      className="glass rounded-xl w-full overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={CONTENT_TRANSITION}
        className="flex items-center justify-between px-[1.5vw] pt-[1vh]"
      >
        <h3 className="text-sm font-semibold text-white">
          Assets Under Management Growth (2022 – Present)
        </h3>
        <motion.div
          data-testid="aum-growth-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldAnimate ? 1 : 0 }}
          transition={{
            duration: 0.38,
            delay: prefersReducedMotion ? 0 : 0.54,
          }}
          className="flex items-center gap-3 text-xs text-neutral-400"
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Assets Under Management</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...CONTENT_TRANSITION,
          delay: CONTENT_TRANSITION_MS / 1000 / 2,
        }}
        className="relative w-full px-[0.5vw] pb-[0.5vh]"
        style={{ aspectRatio: `${chart.width} / ${chart.height}` }}
      >
        <svg
          data-testid="aum-growth-svg"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Assets under management growth graph from 2022 to 2026"
        >
          <defs>
            <linearGradient id="aumAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Y-axis label — vertical along the axis */}
          <motion.text
            data-testid="aum-growth-axis-label"
            textAnchor="middle"
            className="fill-white/55"
            fontSize="12"
            fontWeight="500"
            letterSpacing="0.05em"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            transform={`translate(${yLabelX}, ${yLabelY}) rotate(-90)`}
          >
            AUM (₹ Lakhs)
          </motion.text>

          {/* Grid lines + Y tick labels */}
          {yTicks.map((tick) => {
            const y =
              chart.paddingTop +
              ((chart.maxY - tick) / (chart.maxY - chart.minY)) * chartHeight;

            return (
              <g key={tick}>
                <line
                  x1={chart.paddingLeft}
                  y1={y}
                  x2={chart.width - chart.paddingRight}
                  y2={y}
                  className="stroke-white/10"
                  strokeDasharray="4 8"
                />
                <motion.text
                  x={chart.paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-white/50"
                  fontSize="11"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: shouldAnimate ? 1 : 0 }}
                  transition={{
                    duration: 0.3,
                    delay: prefersReducedMotion ? 0 : 0.1,
                  }}
                >
                  {tick}
                </motion.text>
              </g>
            );
          })}

          {/* Axes */}
          <motion.line
            x1={chart.paddingLeft}
            y1={chart.paddingTop}
            x2={chart.paddingLeft}
            y2={baselineY}
            className="stroke-white/15"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.line
            x1={chart.paddingLeft}
            y1={baselineY}
            x2={chart.width - chart.paddingRight}
            y2={baselineY}
            className="stroke-white/15"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* X-axis labels (years + "Now") */}
          {xTicks.map((tick) => (
            <motion.text
              key={tick.label}
              x={xForYear(tick.t)}
              y={baselineY + 20}
              textAnchor="middle"
              className="fill-white/60"
              fontSize="11"
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldAnimate ? 1 : 0 }}
              transition={{
                duration: 0.3,
                delay: prefersReducedMotion ? 0 : 0.18,
              }}
            >
              {tick.label}
            </motion.text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#aumAreaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : 0.18,
            }}
          />

          {/* Line path */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.6 }}
            animate={{
              pathLength: shouldAnimate ? 1 : 0,
              opacity: shouldAnimate ? 1 : 0.6,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : GRAPH_DRAW_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1] as const,
              delay: prefersReducedMotion ? 0 : 0.05,
            }}
          />

          {/* Data points + value labels (key points only) */}
          {points.map((point, index) => (
            <g key={`aum-${index}`}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={point.showValue ? 5 : 3.5}
                fill="#10b981"
                className="stroke-dark-graph"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: shouldAnimate ? 1 : 0,
                  scale: shouldAnimate ? 1 : 0.2,
                }}
                transition={{
                  duration: 0.24,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                  delay: prefersReducedMotion ? 0 : 0.34 + index * 0.05,
                }}
              />
              {point.showValue && (
                <motion.text
                  x={point.x}
                  y={point.y - 12}
                  textAnchor={index === points.length - 1 ? "end" : "middle"}
                  fill="#6ee7b7"
                  fontSize="11"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: shouldAnimate ? 1 : 0 }}
                  transition={{
                    duration: 0.3,
                    delay: prefersReducedMotion ? 0 : 0.42 + index * 0.05,
                  }}
                >
                  {formatAum(point.aum)}
                </motion.text>
              )}
            </g>
          ))}

          {/* Milestone annotations: humble start → present AUM */}
          <motion.text
            data-testid="aum-milestone-start"
            x={points[0].x}
            y={baselineY + 33}
            textAnchor="start"
            fill="#94a3b8"
            fontSize="10"
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.6 }}
          >
            Started with ₹30,000
          </motion.text>
          <motion.text
            data-testid="aum-milestone-end"
            x={points[points.length - 1].x}
            y={baselineY + 33}
            textAnchor="end"
            fill="#6ee7b7"
            fontSize="10"
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.7 }}
          >
            ₹1.2 Crore under management
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}
