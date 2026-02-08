"use client";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, ReactNode, useState } from "react";
import AnimatedMaskText from "@/components/Client/MaskTextClient";
import NewsImageContainer from "@/components/Client/NewsImageContainer";
import SectionTitle from "../Server/SectionTitle";
import cn from "@/utils/cn";

interface NewsCardProps {
  scrollYProgress: MotionValue<number>;
  images: StaticImageData[];
  className?: string;
  style?: CSSProperties;
}

interface DataItem {
  title: ReactNode[];
  description: {
    mobile: ReactNode[];
    desktop: ReactNode[];
  };
}

export default function NewsCard({
  scrollYProgress,
  images,
  className,
  style,
}: NewsCardProps) {
  const [currentState, setCurrentState] = useState(1);
  const data: DataItem[] = [
    {
      title: [<>ICCV</>, <>2025</>],
      description: {
        mobile: [
          <>Our student Fabian proudly participated</>,
          <>in the International Conference ICCV 2025,</>,
          <>showcasing cutting-edge research in</>,
          <>spectral unmixing</>,
        ],
        desktop: [
          <>Our student Fabian proudly participated</>,
          <>in the International Conference ICCV 2025,</>,
          <>showcasing cutting-edge research in</>,
          <>spectral unmixing</>,
        ],
      },
    },
    {
      title: [<>ColCACI</>, <>2025</>],
      description: {
        mobile: [
          <>Our team presented several projects at the IEEE</>,
          <>Colombian Conference on Applications of</>,
          <>Computational Intelligence, showcasing innovative</>,
          <>solutions in artificial intelligence and</>,
          <>machine learning applications.</>,
        ],
        desktop: [
          <>Our team presented several projects at the</>,
          <>Colombian Conference on Applications of</>,
          <>Computational Intelligence, showcasing innovative</>,
          <>solutions in artificial intelligence and</>,
          <>machine learning applications.</>,
        ],
      },
    },
    {
      title: [<>SoccerNet Challenge</>, <>First Place</>],
      description: {
        mobile: [
          <>We celebrate our victory in the SoccerNet Challenge 2025!</>,
          <>Our team took first place with an advanced</>,
          <>system for effectively predicting depth in soccer images,</>,
          <>achieving the best performance in the competition.</>,
        ],
        desktop: [
          <>We celebrate our victory in the SoccerNet Challenge 2025!</>,
          <>Our team took first place with an advanced</>,
          <>system for effectively predicting depth in soccer images,</>,
          <>achieving the best performance in the competition.</>,
        ],
      },
    },
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) {
      setCurrentState(1);
    } else if (latest <= 0.55) {
      setCurrentState(2);
    } else {
      setCurrentState(3);
    }
  });

  const prependZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      viewport={{ amount: 0.5, once: true }}
      style={{ ...style }}
      className={cn(
        "relative z-10 flex h-full flex-col items-center justify-between py-[8vh] text-[#d1ccbf] backdrop-brightness-[60%] md:flex-row md:px-16 md:py-[15vh]",
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
        className="relative z-20 my-[5vh] flex h-[70vh] min-h-fit w-[90%] flex-col items-center gap-8 bg-[#D1CCBF] p-5-75 text-[#2B3530] md:h-full md:max-h-172 md:w-full md:max-w-118 md:px-8 md:py-4"
      >
        <div className="flex items-center gap-1 text-2xs md:text-sm">
          <AnimatedMaskText
            state={currentState}
            lines={[<>{prependZero(currentState)}</>]}
            className="[line-height:1]"
          />
          <span className="opacity-60">-</span>
          <span className="opacity-60">{prependZero(images.length)}</span>
        </div>
        <AnimatedMaskText
          state={currentState}
          lines={data[currentState - 1].title}
          className="-space-y-1 text-center text-lg [line-height:1] font-light md:text-28"
        />

        <div className="relative aspect-[1.62] w-full overflow-hidden md:aspect-[1.85]">
          {images.map((eachImage: StaticImageData, index: number) => (
            <NewsImageContainer
              key={"news-image-container-" + (index + 1)}
              index={index}
              scrollYProgress={scrollYProgress}
            >
              <Image
                src={eachImage}
                alt={"news-image-" + (index + 1)}
                className="size-full object-cover"
              />
            </NewsImageContainer>
          ))}
        </div>
        <AnimatedMaskText
          state={currentState}
          lines={data[currentState - 1].description["desktop"]}
          className="text-center text-sm [line-height:1.25] md:text-base"
        />
      </motion.div>
      <span className="text-base [line-height:1] md:text-xl">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[#d1ccbf] md:h-7 md:w-7"
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
