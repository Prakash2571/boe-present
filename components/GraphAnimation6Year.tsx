"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTENT_TRANSITION, CONTENT_TRANSITION_MS, GRAPH_DRAW_MS } from "./presentationMotion";

const data = [
  { year: "2020", "Beonedge (16% CAGR)": 100, "Nifty 50 (~11.6% CAGR)": 100, "Bank FD (7% CAGR)": 100 },
  { year: "2021", "Beonedge (16% CAGR)": 116, "Nifty 50 (~11.6% CAGR)": 111.6, "Bank FD (7% CAGR)": 107 },
  { year: "2022", "Beonedge (16% CAGR)": 134.56, "Nifty 50 (~11.6% CAGR)": 124.54, "Bank FD (7% CAGR)": 114.49 },
  { year: "2023", "Beonedge (16% CAGR)": 156.09, "Nifty 50 (~11.6% CAGR)": 139.0, "Bank FD (7% CAGR)": 122.5 },
  { year: "2024", "Beonedge (16% CAGR)": 181.06, "Nifty 50 (~11.6% CAGR)": 155.12, "Bank FD (7% CAGR)": 131.08 },
  { year: "2025", "Beonedge (16% CAGR)": 210.03, "Nifty 50 (~11.6% CAGR)": 173.11, "Bank FD (7% CAGR)": 140.26 },
  { year: "2026", "Beonedge (16% CAGR)": 243.64, "Nifty 50 (~11.6% CAGR)": 193.19, "Bank FD (7% CAGR)": 150.07 },
];

const chart = {
  width: 880,
  height: 392,
  paddingTop: 22,
  // Extra right padding leaves room for the end-of-line value labels.
  paddingRight: 74,
  paddingBottom: 42,
  paddingLeft: 82,
  minY: 80,
  maxY: 260,
};

const chartWidth = chart.width - chart.paddingLeft - chart.paddingRight;
const chartHeight = chart.height - chart.paddingTop - chart.paddingBottom;
const baselineY = chart.paddingTop + chartHeight;
const yTicks = [80, 100, 120, 140, 160, 180, 200, 220, 240, 260];

const computedPoints = data.map((point, index) => {
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
  const bankY =
    chart.paddingTop +
    ((chart.maxY - point["Bank FD (7% CAGR)"]) /
      (chart.maxY - chart.minY)) *
      chartHeight;

  return { x, beonedgeY, niftyY, bankY, year: point.year };
});

const buildLinePath = (valueKey: "beonedgeY" | "niftyY" | "bankY") =>
  computedPoints
    .map((point, index) => {
      const prefix = index === 0 ? "M" : "L";
      return `${prefix} ${point.x.toFixed(2)} ${point[valueKey].toFixed(2)}`;
    })
    .join(" ");

const buildAreaPath = (valueKey: "beonedgeY" | "niftyY" | "bankY") => {
  const line = buildLinePath(valueKey);
  const last = computedPoints[computedPoints.length - 1];
  const first = computedPoints[0];

  return `${line} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;
};

const beonedgeLinePath = buildLinePath("beonedgeY");
const niftyLinePath = buildLinePath("niftyY");
const bankLinePath = buildLinePath("bankY");
const beonedgeAreaPath = buildAreaPath("beonedgeY");
const niftyAreaPath = buildAreaPath("niftyY");
const bankAreaPath = buildAreaPath("bankY");

/* Y-axis label center position */
const yLabelX = 18;
const yLabelY = chart.paddingTop + chartHeight / 2;

export default function GraphAnimation6Year() {
  const prefersReducedMotion = useReducedMotion();
  const [animationState, setAnimationState] = useState<"idle" | "running" | "complete">("idle");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = plotRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relX = ((event.clientX - rect.left) / rect.width) * chart.width;
    const t = (relX - chart.paddingLeft) / chartWidth;
    const idx = Math.round(t * (data.length - 1));
    setHoverIndex(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const handlePointerLeave = () => setHoverIndex(null);

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
      data-testid="graph-6year-container"
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
          BeOnEdge vs Nifty 50 Performance Comparison (6 Years)
        </h3>
        <motion.div
          data-testid="graph-6year-legend"
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
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span>Bank FD (7% CAGR)</span>
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
        ref={plotRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full px-[0.5vw] pb-[0.5vh]"
        // Aspect ratio drives the height on tall viewports; maxHeight caps it on
        // short ones so the slide always fits at 100% zoom. The SVG's
        // preserveAspectRatio="xMidYMid meet" keeps it proportional + centred.
        style={{
          aspectRatio: `${chart.width} / ${chart.height}`,
          maxHeight: "62vh",
        }}
      >
        <svg
          data-testid="graph-6year-svg"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Performance comparison graph (6 years)"
        >
          <defs>
            <linearGradient id="beonedgeAreaGradient6y" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="niftyAreaGradient6y" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="bankAreaGradient6y" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Y-axis label */}
          <motion.text
            data-testid="graph-6year-axis-label"
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
          {computedPoints.map((point, index) => (
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
            d={bankAreaPath}
            fill="url(#bankAreaGradient6y)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.3 }}
          />
          <motion.path
            d={niftyAreaPath}
            fill="url(#niftyAreaGradient6y)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.24 }}
          />
          <motion.path
            d={beonedgeAreaPath}
            fill="url(#beonedgeAreaGradient6y)"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.18 }}
          />

          {/* Line paths */}
          <motion.path
            d={bankLinePath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.5 }}
            animate={{ pathLength: shouldAnimate ? 1 : 0, opacity: shouldAnimate ? 1 : 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : GRAPH_DRAW_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1] as const,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
          />
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
          {computedPoints.map((point, index) => (
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

          {computedPoints.map((point, index) => (
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

          {computedPoints.map((point, index) => (
            <motion.circle
              key={`bank-${point.year}`}
              cx={point.x}
              cy={point.bankY}
              r="3.5"
              fill="#f59e0b"
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
                delay: prefersReducedMotion ? 0 : 0.5 + index * 0.08,
              }}
            />
          ))}

          {/* End-of-line value labels (mirrors the AUM chart) */}
          {(() => {
            const last = computedPoints[computedPoints.length - 1];
            const final = data[data.length - 1];
            const endLabels = [
              { y: last.beonedgeY, v: final["Beonedge (16% CAGR)"], color: "#6ee7b7" },
              { y: last.niftyY, v: final["Nifty 50 (~11.6% CAGR)"], color: "#d8b4fe" },
              { y: last.bankY, v: final["Bank FD (7% CAGR)"], color: "#fcd34d" },
            ];
            return endLabels.map((label, index) => (
              <motion.text
                key={`end-value-${index}`}
                data-testid={`graph-6year-end-value-${index}`}
                x={last.x + 11}
                y={label.y + 4}
                textAnchor="start"
                fill={label.color}
                fontSize="13"
                fontWeight="700"
                initial={{ opacity: 0 }}
                animate={{ opacity: shouldAnimate ? 1 : 0 }}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : 0.78 + index * 0.07,
                }}
              >
                {`₹${Math.round(label.v)}`}
              </motion.text>
            ));
          })()}

          {/* Hover guide line + highlighted markers */}
          {hoverIndex !== null && (() => {
            const hp = computedPoints[hoverIndex];
            return (
              <g pointerEvents="none">
                <line
                  x1={hp.x}
                  y1={chart.paddingTop}
                  x2={hp.x}
                  y2={baselineY}
                  className="stroke-white/30"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <circle cx={hp.x} cy={hp.bankY} r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                <circle cx={hp.x} cy={hp.niftyY} r="5.5" fill="#c084fc" stroke="#fff" strokeWidth="1.5" />
                <circle cx={hp.x} cy={hp.beonedgeY} r="6" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              </g>
            );
          })()}
        </svg>

        {/* HTML tooltip */}
        {hoverIndex !== null && (() => {
          const hp = computedPoints[hoverIndex];
          const row = data[hoverIndex];
          const leftPct = (hp.x / chart.width) * 100;
          const flip = hoverIndex >= data.length - 2;
          return (
            <div
              className="pointer-events-none absolute z-10 top-[8%]"
              style={{
                left: `${leftPct}%`,
                transform: flip ? "translateX(-108%)" : "translateX(8%)",
              }}
            >
              <div className="glass-elevated rounded-lg border border-white/10 px-3 py-2 shadow-xl min-w-[9rem]">
                <div className="text-xs font-bold text-white mb-1.5">{row.year}</div>
                <div className="flex flex-col gap-1 text-[0.7rem]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />BeOnEdge
                    </span>
                    <span className="font-semibold text-emerald-400">₹{row["Beonedge (16% CAGR)"].toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="h-2 w-2 rounded-full bg-[#c084fc]" />Nifty 50
                    </span>
                    <span className="font-semibold text-[#c084fc]">₹{row["Nifty 50 (~11.6% CAGR)"].toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />Bank FD
                    </span>
                    <span className="font-semibold text-[#f59e0b]">₹{row["Bank FD (7% CAGR)"].toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </motion.div>
    </div>
  );
}
