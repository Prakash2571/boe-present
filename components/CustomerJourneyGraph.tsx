"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CONTENT_TRANSITION,
  CONTENT_TRANSITION_MS,
  GRAPH_DRAW_MS,
} from "./presentationMotion";

/* Customer journey: growth from 0 customers in 2023 to 120 in 2026 */
const data = [
  { year: "2023", customers: 0 },
  { year: "2024", customers: 30 },
  { year: "2025", customers: 70 },
  { year: "2026", customers: 120 },
];

const chart = {
  width: 760,
  height: 360,
  paddingTop: 20,
  paddingRight: 28,
  paddingBottom: 40,
  paddingLeft: 80,
  minY: 0,
  maxY: 120,
};

const chartWidth = chart.width - chart.paddingLeft - chart.paddingRight;
const chartHeight = chart.height - chart.paddingTop - chart.paddingBottom;
const baselineY = chart.paddingTop + chartHeight;
const yTicks = [0, 20, 40, 60, 80, 100, 120];

const points = data.map((point, index) => {
  const x =
    chart.paddingLeft + (chartWidth * index) / Math.max(data.length - 1, 1);
  const y =
    chart.paddingTop +
    ((chart.maxY - point.customers) / (chart.maxY - chart.minY)) * chartHeight;

  return { x, y, year: point.year, customers: point.customers };
});

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

export default function CustomerJourneyGraph() {
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
      data-testid="customer-journey-graph-container"
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
          Aggregate Clients Growth (2023 – Present)
        </h3>
        <motion.div
          data-testid="customer-journey-legend"
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
            <span>Aggregate Clients</span>
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
          data-testid="customer-journey-svg"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Customer growth journey graph from 2023 to 2026"
        >
          <defs>
            <linearGradient
              id="customerAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Y-axis label — vertical along the axis */}
          <motion.text
            data-testid="customer-journey-axis-label"
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
            Aggregate Clients
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

          {/* X-axis year labels */}
          {points.map((point, index) => (
            <motion.text
              key={point.year}
              x={point.x}
              y={baselineY + 22}
              textAnchor="middle"
              className="fill-white/60"
              fontSize="11"
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldAnimate ? 1 : 0 }}
              transition={{
                duration: 0.3,
                delay: prefersReducedMotion ? 0 : 0.18 + index * 0.05,
              }}
            >
              {point.year}
            </motion.text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#customerAreaGradient)"
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

          {/* Data points + value labels */}
          {points.map((point, index) => (
            <g key={`customer-${point.year}`}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="4.5"
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
                  delay: prefersReducedMotion ? 0 : 0.34 + index * 0.08,
                }}
              />
              <motion.text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                fill="#6ee7b7"
                fontSize="11"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: shouldAnimate ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  delay: prefersReducedMotion ? 0 : 0.42 + index * 0.08,
                }}
              >
                {point.customers}
              </motion.text>
            </g>
          ))}

          {/* Milestone annotations: college start → own office */}
          <motion.text
            data-testid="milestone-start"
            x={points[0].x}
            y={baselineY + 38}
            textAnchor="start"
            fill="#94a3b8"
            fontSize="10"
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.6 }}
          >
            0 clients · started in college
          </motion.text>
          <motion.text
            data-testid="milestone-end"
            x={points[points.length - 1].x}
            y={baselineY + 38}
            textAnchor="end"
            fill="#6ee7b7"
            fontSize="10"
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.7 }}
          >
            120 aggregate clients · our own office
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}
