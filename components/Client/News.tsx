"use client";
import React, { useRef, useState } from "react";
import Image1 from "@/public/News/iccv.png";
import Image2 from "@/public/News/colcaci.jpeg";
import Image3 from "@/public/News/soccernet.jpeg";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LastNews, { NewsItem } from "./LastNews";
import CustomCursor from "./Cursor";
import { useCursor } from "@/hooks/useCursor";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { useIsMobile } from "@/app/providers";
import { useRouter } from "next/navigation";

function News() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { handlers, cursorProps } = useCursor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const items: NewsItem[] = [
    {
      titleLines: ["ICCV", "2025"],
      descriptionLines: [
        "Our student Fabian proudly participated",
        "in the International Conference ICCV 2025,",
        "showcasing cutting-edge research in",
        "spectral unmixing",
      ],
      image: Image1,
      category: "Conference",
      body: [
        "This dummy article represents a longer writeup about our participation in ICCV 2025, including poster presentation details, technical discussion, and research context.",
        "Use this modal layout to place a full article summary, publication links, author list, event highlights, and any supporting media without forcing the user to leave the page.",
        "The panel scroll is independent from the background so the rest of the homepage stays visually present but inactive while the article is open.",
      ],
    },
    {
      titleLines: ["ColCACI", "2025"],
      descriptionLines: [
        "Our team presented several projects at the",
        "Colombian Conference on Applications of",
        "Computational Intelligence, showcasing innovative",
        "solutions in artificial intelligence and",
        "machine learning applications.",
      ],
      image: Image2,
      category: "Event",
      body: [
        "This dummy article can contain a conference recap, list of accepted works, photos from the event, and a concise explanation of the projects shown by the lab.",
        "It is structured for long-form reading inside a side panel so users can explore the content without losing context from the main page.",
        "You can later swap this placeholder content for CMS-driven news data or structured article entries.",
      ],
    },
    {
      titleLines: ["SoccerNet Challenge", "First Place"],
      descriptionLines: [
        "We celebrate our victory in the SoccerNet Challenge 2025!",
        "Our team took first place with an advanced",
        "system for effectively predicting depth in soccer images,",
        "achieving the best performance in the competition.",
      ],
      image: Image3,
      category: "Award",
      body: [
        "This dummy article is intended for a competition win announcement, including the benchmark setting, method summary, and why the result matters for the lab.",
        "The side modal can also include extra screenshots, metrics, and links to code or paper pages in a format that remains easy to scan.",
        "Because the modal scrolls internally, the article can be as long as needed without affecting the underlying homepage structure.",
      ],
    },
  ];
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
          onOpen={() => router.push("/news", { scroll: true })}
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
