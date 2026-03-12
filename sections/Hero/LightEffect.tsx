// Light effect from threejs-components tubes1 cursor (CC BY-NC-SA 4.0).
"use client";

import { useEffect, useRef } from "react";

type TubesApi = {
  setColors?: (colors: string[]) => void;
  setLightsColors?: (colors: string[]) => void;
  setDensity?: (density: number) => void;
  setTubeCount?: (count: number) => void;
};

type TubesApp = {
  tubes?: TubesApi;
  dispose?: () => void;
  destroy?: () => void;
};

type TubesCursorFactory = (
  canvas: HTMLCanvasElement,
  options: {
    tubes: {
      colors: string[];
      lights: { intensity: number; colors: string[] };
      density: number;
      thickness: number;
    };
  },
) => TubesApp;

type TubesWindow = Window & {
  TubesCursor?: TubesCursorFactory;
  tubesCursor?: TubesCursorFactory;
  tubes1?: TubesCursorFactory;
};

const PALETTES = [
  ["#ff3cac", "#784ba0", "#2b86c5"],
  ["#00f5a0", "#00d9f5", "#6b5bff"],
  ["#ff9a3d", "#ff3d6e", "#7c4dff"],
  ["#00ff95", "#00c9ff", "#92fe9d"],
  ["#ff006a", "#f9d423", "#00c6ff"],
];

const LIGHT_PALETTES = [
  ["#00e5ff", "#ff00ea", "#ffe600", "#00ff8a"],
  ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1"],
  ["#ff8c42", "#ff3f8e", "#7d5fff", "#1e90ff"],
  ["#9b5de5", "#f15bb5", "#fee440", "#00f5d4"],
  ["#7f00ff", "#e100ff", "#ff0080", "#00c3ff"],
];

export default function LightEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let app: TubesApp | null = null;

    let mounted = true;
    let colorInterval: number | null = null;

    const loadGlobalTubesCursor = async () => {
      const tubeWindow = window as TubesWindow;
      const existing =
        tubeWindow.TubesCursor || tubeWindow.tubesCursor || tubeWindow.tubes1;
      if (existing) return existing;

      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load tubes script"));
        document.head.appendChild(script);
      });

      return (
        tubeWindow.TubesCursor ||
        tubeWindow.tubesCursor ||
        tubeWindow.tubes1 ||
        null
      );
    };

    const init = async () => {
      if (!canvasRef.current) return;

      try {
        const prefersReducedMotion =
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
          false;
        const isTouchDevice =
          window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
        const hardwareThreads = navigator.hardwareConcurrency ?? 8;
        const memoryInGb =
          (navigator as Navigator & { deviceMemory?: number }).deviceMemory ??
          8;
        const useLiteMode =
          prefersReducedMotion ||
          isTouchDevice ||
          hardwareThreads <= 4 ||
          memoryInGb <= 4;

        if (useLiteMode) return;

        let TubesCursor: TubesCursorFactory | null = null;

        try {
          const mod = await import(
            /* webpackIgnore: true */
            "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
          );
          const candidate =
            (mod as { default?: unknown }).default ?? (mod as unknown);
          if (typeof candidate === "function") {
            TubesCursor = candidate as TubesCursorFactory;
          }
        } catch {
          TubesCursor = await loadGlobalTubesCursor();
        }

        if (!mounted || !canvasRef.current || !TubesCursor) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#ff3cac", "#784ba0", "#2b86c5"],
            lights: {
              intensity: 180,
              colors: ["#00e5ff", "#ff00ea", "#ffe600", "#00ff8a"],
            },
            density: 1.0,
            thickness: 0.9,
          },
        });

        const setPalette = () => {
          const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
          const lights =
            LIGHT_PALETTES[Math.floor(Math.random() * LIGHT_PALETTES.length)];
          app?.tubes?.setColors?.(palette);
          app?.tubes?.setLightsColors?.(lights);
        };

        const maybeSetDensity = app?.tubes;
        maybeSetDensity?.setDensity?.(1.0);
        maybeSetDensity?.setTubeCount?.(36);

        setPalette();
        colorInterval = window.setInterval(setPalette, 9000);
      } catch {
        // Ignore failed dynamic load to avoid crashing the hero.
      }
    };

    init();

    return () => {
      mounted = false;
      if (colorInterval) {
        window.clearInterval(colorInterval);
      }
      app?.dispose?.();
      app?.destroy?.();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        className="h-full w-full opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(255, 0, 150, 0.35), transparent 60%), radial-gradient(70% 70% at 80% 30%, rgba(0, 200, 255, 0.35), transparent 65%), radial-gradient(80% 80% at 50% 80%, rgba(140, 255, 120, 0.25), transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(12px) saturate(1.15)",
        }}
      />
      <div className="noise-layer absolute inset-0 opacity-[0.12]" />
      <style jsx>{`
        .noise-layer {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          animation: noise-shift 2.4s steps(2) infinite;
        }
        @keyframes noise-shift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(-2%, 1%, 0);
          }
          50% {
            transform: translate3d(1%, -2%, 0);
          }
          75% {
            transform: translate3d(2%, 2%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .noise-layer {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
