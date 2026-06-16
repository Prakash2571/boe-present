import type { Transition } from "framer-motion";

export const PREMIUM_EASE: [number, number, number, number] = [
  0.4,
  0,
  0.2,
  1,
];

export const CONTENT_EASE: [number, number, number, number] = [
  0.25,
  0.1,
  0.25,
  1,
];

export const SLIDE_TRANSITION_MS = 700;
export const CONTENT_TRANSITION_MS = 600;
export const GRAPH_DRAW_MS = 900;

export const SLIDE_SHELL_TRANSITION: Transition = {
  duration: SLIDE_TRANSITION_MS / 1000,
  ease: PREMIUM_EASE,
};

export const CONTENT_TRANSITION: Transition = {
  duration: CONTENT_TRANSITION_MS / 1000,
  ease: CONTENT_EASE,
};
