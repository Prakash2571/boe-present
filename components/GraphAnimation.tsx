"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTENT_TRANSITION, CONTENT_TRANSITION_MS, GRAPH_DRAW_MS } from "./presentationMotion";

const data = [
  { year: "2021", "Beonedge (16% CAGR)": 100, "Nifty 50 (~11.6% CAGR)": 100 },
  { year: "2022", "Beonedge (16% CAGR)": 116, "Nifty 50 (~11.6% CAGR)": 111.6 },
  { year: "2023", "Beonedge (16% CAGR)": 134.56, "Nifty 50 (~11.6% CAGR)": 124.54 },
  { year: "2024", "Beonedge (16% CAGR)": 156.09, "Nifty 50 (~11.6% CAGR)": 139.0 },
  { year: "2025", "Beonedge (16% CAGR)": 181.06, "Nifty 50 (~11.6% CAGR)": 155.12 },
  { year: "2026", "Beonedge (16% CAGR)": 210, "Nifty 50 (~11.6% CAGR)": 176 },
];

const chart = {
  width: 760,
  height: 360,
  paddingTop: 20,
  paddingRight: 28,
  paddingBottom: 40,
  paddingLeft: 80,
  minY: 80,
  maxY: 220,
};

const chartWidth = chart.width - chart.paddingLeft - chart.paddingRight;
const chartHeight = chart.height - chart.paddingTop - chart.paddingBottom;
const baselineY = chart.paddingTop + chartHeight;
const yTicks = [80, 100, 120, 140, 160, 180, 200, 220];

const beonedgePoints = data.map((point, index) => {
  const x =
    chart.paddingLeft + (chartWidth * index) / Math.max(data.length - 1, 1);
  const beonedgeY =
    chart.paddingTop +
    ((chart.maxY - point["Beonedge (16% CAGR)"]) / (chart.maxY - chart.minY)) *
      chartHeight;
  const niftyY =
    chart.paddingTop +
    ((chart.maxY - point["Nifty 50 (~11.6% CAGR)"]) /
      (chart.maxY - chart.minY)) *
      chartHeight;

  return { x, beonedgeY, niftyY, year: point.year };
});

const buildLinePath = (valueKey: "beonedgeY" | "niftyY") =>
  beonedgePoints
    .map((point, index) => {
      const prefix = index === 0 ? "M" : "L";
      return `${prefix} ${point.x.toFixed(2)} ${point[valueKey].toFixed(2)}`;
    })
    .join(" ");

const buildAreaPath = (valueKey: "beonedgeY" | "niftyY") => {
  const line = buildLinePath(valueKey);
  const last = beonedgePoints[beonedgePoints.length - 1];
  const first = beonedgePoints[0];

  return `${line} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;
};

const beonedgeLinePath = buildLinePath("beonedgeY");
const niftyLinePath = buildLinePath("niftyY");
const beonedgeAreaPath = buildAreaPath("beonedgeY");
const niftyAreaPath = buildAreaPath("niftyY");

/* Y-axis label center position */
const yLabelX = 18;
const yLabelY = chart.paddingTop + chartHeight / 2;

export default function GraphAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [animationState, setAnimationState] = useState<"idle" | "running" | "complete">("idle");

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

  const resolvedAnimationState = prefersReducedMotion ? "complete" : animationState;
  const shouldAnimate = resolvedAnimationState !== "idle";

  return (
    <div
      data-testid="graph-container"
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
          BeOnEdge vs Nifty 50 Performance Comparison (5 Years)
        </h3>
        <motion.div
          data-testid="graph-legend"
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
            <span>BeOnEdge (16% CAGR)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#c084fc]" />
            <span>Nifty 50 (~11.6% CAGR)</span>
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
          data-testid="graph-svg"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Performance comparison graph"
        >
          <defs>
            <linearGradient id="beonedgeAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="niftyAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Y-axis label — vertical along the axis */}
          <motion.text
            data-testid="graph-axis-label"
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
            Growth of Rs. 100 Investment
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
          {beonedgePoints.map((point, index) => (
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

          {/* Area fills */}
          <motion.path
            d={niftyAreaPath}
            fill="url(#niftyAreaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.24 }}
          />
          <motion.path
            d={beonedgeAreaPath}
            fill="url(#beonedgeAreaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.18 }}
          />

          {/* Line paths */}
          <motion.path
            d={niftyLinePath}
            fill="none"
            stroke="#c084fc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.5 }}
            animate={{ pathLength: shouldAnimate ? 1 : 0, opacity: shouldAnimate ? 1 : 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : GRAPH_DRAW_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1] as const,
              delay: prefersReducedMotion ? 0 : 0.14,
            }}
          />
          <motion.path
            d={beonedgeLinePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.6 }}
            animate={{ pathLength: shouldAnimate ? 1 : 0, opacity: shouldAnimate ? 1 : 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : GRAPH_DRAW_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1] as const,
              delay: prefersReducedMotion ? 0 : 0.05,
            }}
          />

          {/* Data points */}
          {beonedgePoints.map((point, index) => (
            <motion.circle
              key={`beonedge-${point.year}`}
              cx={point.x}
              cy={point.beonedgeY}
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
          ))}

          {beonedgePoints.map((point, index) => (
            <motion.circle
              key={`nifty-${point.year}`}
              cx={point.x}
              cy={point.niftyY}
              r="3.5"
              fill="#c084fc"
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
                delay: prefersReducedMotion ? 0 : 0.42 + index * 0.08,
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
