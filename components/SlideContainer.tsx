"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  Children,
} from "react";
import { AnimatePresence } from "framer-motion";
import Slide from "./Slide";
import { useTheme } from "@/context/ThemeContext";

interface SlideContainerProps {
  children: ReactNode;
}

/** Path to the pre-rendered deck PDF served from /public. */
const PRESENTATION_PDF_URL = "/beonedge-presentation.pdf";

export default function SlideContainer({ children }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const slides = Children.toArray(children);
  const totalSlides = slides.length;
  const { theme, toggleTheme } = useTheme();



  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Allow Playwright to trigger this, removing defaultPrevented block
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.code === "Space" || event.code === "ArrowRight") {
        event.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  /**
   * Downloads the pre-rendered presentation PDF (served from /public).
   * This gives an instant, reliable download of the full 10-slide deck
   * without relying on slow, flaky in-browser html-to-image capture.
   */
  const downloadPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const response = await fetch(PRESENTATION_PDF_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF (${response.status})`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "beonedge-presentation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke on the next tick so the download has a chance to start.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("PDF download failed:", error);
      // Fallback: open the file directly so the user can still save it.
      window.open(PRESENTATION_PDF_URL, "_blank");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main
      ref={mainRef}
      tabIndex={-1}
      data-testid="presentation-root"
      data-current-slide={currentSlide}
      data-total-slides={totalSlides}
      className="presentation-shell relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden font-sans outline-none"
    >
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          isActive={true}
          slideIndex={currentSlide}
          totalSlides={totalSlides}
        >
          {slides[currentSlide]}
        </Slide>
      </AnimatePresence>

      <div className="absolute bottom-[2vh] left-0 right-0 z-50 flex w-full justify-center px-4">
        <div className="glass flex gap-1.5 rounded-full px-3 py-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]"
                  : index < currentSlide
                    ? "w-1.5 bg-white/30"
                    : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom-right controls: theme toggle + PDF export */}
      <div className="absolute bottom-[2vh] right-[2vw] z-50 flex items-center gap-2">
        {/* PDF Download button */}
        <button
          onClick={downloadPDF}
          disabled={isExporting}
          title="Download presentation PDF"
          className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Downloading…</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="glass flex items-center rounded-full p-2 text-white/70 hover:text-white transition-colors"
        >
          {theme === 'dark' ? (
            /* Sun icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            /* Moon icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </main>
  );
}
