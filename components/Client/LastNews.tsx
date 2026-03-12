"use client";
import { motion, MotionValue } from "motion/react";
import Image from "next/image";
import { CSSProperties } from "react";
import AnimatedMaskText from "@/components/Client/MaskTextClient";
import NewsImageContainer from "@/components/Client/NewsImageContainer";
import SectionTitle from "../Server/SectionTitle";
import cn from "@/utils/cn";
import type { NewsArticle } from "@/app/news/news-data";

interface LastNewsProps {
  scrollYProgress: MotionValue<number>;
  items: NewsArticle[];
  currentIndex: number;
  onOpen?: (item: NewsArticle) => void;
  className?: string;
  style?: CSSProperties;
}

export default function LastNews({
  scrollYProgress,
  items,
  currentIndex,
  onOpen,
  className,
  style,
}: LastNewsProps) {
  const currentState = currentIndex + 1;
  const currentItem = items[currentIndex];

  const prependZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      viewport={{ amount: 0.5, once: true }}
      style={{ ...style }}
      className={cn(
        "relative z-10 flex h-full flex-col items-center justify-between px-3-75 py-[8vh] text-white md:flex-row md:px-16 md:py-[15vh]",
        className,
      )}
    >
      <SectionTitle className="">Last News!</SectionTitle>
      <motion.div
        variants={{
          initial: { y: "50%" },
          inView: { y: "0%" },
        }}
        transition={{
          ease: [0.24, 0.43, 0.15, 0.97],
          duration: 0.8,
        }}
        role="link"
        tabIndex={0}
        onClick={() => onOpen?.(currentItem)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen?.(currentItem);
          }
        }}
        className="relative z-20 my-[5vh] flex w-[94%] max-w-[980px] cursor-pointer flex-col items-center gap-6 rounded-2xl border border-white/20 bg-[#1f2824]/55 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:my-0 md:aspect-square md:w-[82vh] md:max-h-[900px] md:max-w-[900px] md:gap-8 md:p-7"
      >
        <div className="flex items-center gap-1 text-2xs text-white/80 md:text-sm">
          <AnimatedMaskText
            state={currentState}
            lines={[<>{prependZero(currentState)}</>]}
            className="[line-height:1]"
          />
          <span className="opacity-60">-</span>
          <span className="opacity-60">{prependZero(items.length)}</span>
        </div>
        <AnimatedMaskText
          state={currentState}
          lines={currentItem.titleLines.map((line, index) => (
            <span key={`title-${index}`}>{line}</span>
          ))}
          className="-space-y-1 text-center text-xl [line-height:1] font-light md:text-40"
        />

        <div className="relative h-[34vh] w-full overflow-hidden rounded-xl ring-1 ring-white/20 md:h-[52vh]">
          {items.map((item, index: number) => (
            <NewsImageContainer
              key={"news-image-container-" + (index + 1)}
              index={index}
              totalItems={items.length}
              isLast={index === items.length - 1}
              scrollYProgress={scrollYProgress}
            >
              <Image
                src={item.image}
                alt={"news-image-" + (index + 1)}
                className="size-full object-cover"
              />
            </NewsImageContainer>
          ))}
        </div>
        <AnimatedMaskText
          state={currentState}
          lines={currentItem.descriptionLines.map((line, index) => (
            <span key={`description-${index}`}>{line}</span>
          ))}
          className="text-center text-sm text-white/90 [line-height:1.25] md:text-lg"
        />
      </motion.div>
      <span className="text-base [line-height:1] md:text-xl">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white md:h-7 md:w-7"
          aria-hidden="true"
        >
          <path
            d="M12 4v14m0 0l-6-6m6 6l6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.div>
  );
}
