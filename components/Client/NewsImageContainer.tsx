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
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}

export default function NewsImageContainer({
  index,
  scrollYProgress,
  children,
}: NewsImageProps) {
  const bottom = useTransform(
    scrollYProgress,
    [index * 0.33, index * 0.33 + 0.33],
    ["0%", "100%"],
  );
  const scale = useTransform(
    scrollYProgress,
    [(index - 1) * 0.33, index * 0.33 + 0.33],
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
