"use client";

import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function EpochCounter() {
  const { scrollYProgress } = useScroll();
  const epoch = useTransform(scrollYProgress, [0, 1], [0, 99]);
  const [count, setCount] = useState(0);

  useMotionValueEvent(epoch, "change", (v) => setCount(Math.round(v)));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-[#C4956A]/15 bg-[#1f2824]/80 px-4 py-2 font-mono text-xs text-[#C4956A]/50 backdrop-blur-xl md:bottom-8 md:right-8">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C4956A]/40" />
      Epoch {count}/∞
    </div>
  );
}
