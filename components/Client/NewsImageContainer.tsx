"use client";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { ReactNode } from "react";

interface NewsImageProps {
  index: number;
  totalItems: number;
  isLast: boolean;
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}

export default function NewsImageContainer({
  index,
  totalItems,
  isLast,
  scrollYProgress,
  children,
}: NewsImageProps) {
  const segment = 1 / totalItems;
  const bottom = useTransform(scrollYProgress, (value) => {
    if (isLast) return "0%";
    const start = index * segment;
    const end = start + segment;
    if (value <= start) return "0%";
    if (value >= end) return "100%";
    const progress = ((value - start) / (end - start)) * 100;
    return `${progress}%`;
  });
  const scale = useTransform(
    scrollYProgress,
    [(index - 1) * segment, index * segment + segment],
    [1, 1.05],
  );
  const clipPath = useMotionTemplate`inset(0px 0px ${bottom} 0px)`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath, zIndex: -index, scale }}
    >
      {children}
    </motion.div>
  );
}
