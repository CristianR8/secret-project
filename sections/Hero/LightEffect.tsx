// Light effect from threejs-components tubes1 cursor (CC BY-NC-SA 4.0).
"use client";

import { useEffect, useRef } from "react";

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

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
  } else if (h >= 120 && h < 180) {
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (value: number) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function shiftPalette(palette: string[], hueShift: number, satBoost = 0.1) {
  return palette.map((color) => {
    const hsl = hexToHsl(color);
    const nextH = (hsl.h + hueShift + 360) % 360;
    const nextS = Math.min(1, hsl.s + satBoost);
    return hslToHex(nextH, nextS, hsl.l);
  });
}

function randomColors(count: number) {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`,
    );
}

export default function LightEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: {
      tubes?: {
        setColors?: (colors: string[]) => void;
        setLightsColors?: (colors: string[]) => void;
      };
      dispose?: () => void;
      destroy?: () => void;
    } | null = null;

    let clickHandler: (() => void) | null = null;
    let mounted = true;
    let colorInterval: number | null = null;
    let rafId: number | null = null;

    const loadGlobalTubesCursor = async () => {
      const existing =
        (window as any).TubesCursor ||
        (window as any).tubesCursor ||
        (window as any).tubes1;
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
        (window as any).TubesCursor ||
        (window as any).tubesCursor ||
        (window as any).tubes1
      );
    };

    const init = async () => {
      if (!canvasRef.current) return;

      try {
        let TubesCursor: any = null;

        try {
          const mod = await import(
            /* webpackIgnore: true */
            "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
          );
          TubesCursor = typeof mod === "function" ? mod : mod?.default ?? mod;
        } catch {
          TubesCursor = await loadGlobalTubesCursor();
        }

        if (!mounted || !canvasRef.current || !TubesCursor) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#ff3cac", "#784ba0", "#2b86c5"],
            lights: {
              intensity: 260,
              colors: ["#00e5ff", "#ff00ea", "#ffe600", "#00ff8a"],
            },
            density: 1.6,
            thickness: 1.1,
          },
        });

        const setPalette = (variant?: "random" | "palette") => {
          const useRandom = variant === "random";
          const palette = useRandom
            ? randomColors(3)
            : PALETTES[Math.floor(Math.random() * PALETTES.length)];
          const lights = useRandom
            ? randomColors(4)
            : LIGHT_PALETTES[Math.floor(Math.random() * LIGHT_PALETTES.length)];
          app?.tubes?.setColors?.(palette);
          app?.tubes?.setLightsColors?.(lights);
        };

        clickHandler = () => setPalette("random");

        document.body.addEventListener("click", clickHandler);

        const maybeSetDensity = app?.tubes as any;
        maybeSetDensity?.setDensity?.(1.6);
        maybeSetDensity?.setTubeCount?.(64);

        const prefersReducedMotion =
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
          false;
        if (!prefersReducedMotion) {
          colorInterval = window.setInterval(() => {
            setPalette("palette");
          }, 5000);
        }
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
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (clickHandler) {
        document.body.removeEventListener("click", clickHandler);
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
        className="h-full w-full"
        aria-hidden="true"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(255, 0, 150, 0.35), transparent 60%), radial-gradient(70% 70% at 80% 30%, rgba(0, 200, 255, 0.35), transparent 65%), radial-gradient(80% 80% at 50% 80%, rgba(140, 255, 120, 0.25), transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(22px) saturate(1.4)",
        }}
      />
      <div className="noise-layer absolute inset-0 opacity-[0.2]" />
      <style jsx>{`
        .noise-layer {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          animation: noise-shift 1.1s steps(2) infinite;
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
      `}</style>
    </div>
  );
}
