"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LastNews from "./LastNews";
import CustomCursor from "./Cursor";
import { useCursor } from "@/hooks/useCursor";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { useIsMobile } from "@/app/providers";
import { useRouter } from "next/navigation";
import { getNewsHref, newsArticles } from "@/app/news/news-data";

function News() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { handlers, cursorProps } = useCursor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = newsArticles.slice(0, 3);
  const SCROLL_VH_PER_NEWS = 160;
  const totalScrollHeight = Math.max(360, items.length * SCROLL_VH_PER_NEWS);

  const { scrollYProgress: parentProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(parentProgress, "change", (latest) => {
    const segment = 1 / items.length;
    const nextIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(latest / segment)),
    );
    setCurrentIndex(nextIndex);
  });

  return (
    <div
      className="relative cursor-pointer overflow-clip"
      ref={ref}
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <motion.div
        {...handlers}
        className="sticky -top-[5vh] h-[110vh] md:-top-[15vh] md:h-[130vh]"
      >
        <LastNews
          scrollYProgress={parentProgress}
          items={items}
          currentIndex={currentIndex}
          onOpen={(item) => router.push(getNewsHref(item.id), { scroll: true })}
          className="relative z-10"
        />
      </motion.div>
      {!isMobile && (
        <CustomCursor
          {...cursorProps}
          className="flex -translate-x-1/2 translate-y-1/4 items-center justify-center gap-2 rounded-full px-5 py-2 text-dark"
        >
          Read More
          <NavigateSVG style={{ fill: "white" }} className="size-2.5" />
        </CustomCursor>
      )}
    </div>
  );
}

export default News;
