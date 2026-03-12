"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import CvailLogo from "@/components/SVGComponents/cvail.svg";
import Image from "next/image";
import DashedLink from "@/components/Server/DashedLink";
import AnimatedBurger from "../SVGComponents/AnimatedBurger";
import { useState } from "react";
import cn from "@/utils/cn";
import Link from "next/link";
import { useIsMobile } from "@/app/providers";
import ResponsiveSideBar from "./ResponsiveSideBar";
import CloseIcon from "../SVGComponents/CloseIcon";
import { sitePages } from "@/utils/sitePages";

export default function NavBar() {
  const isMobile = useIsMobile();
  const isMobileViewport = isMobile ?? false;
  const [openSideBar, setOpenSideBar] = useState(false);
  const [state, setState] = useState(false);
  const [y, setY] = useState("0%");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollValue = latest / window.innerHeight;
    setState(scrollValue > 0.5);

    if (scrollValue <= 0.65) {
      setY("0%");
      return;
    }

    if (scrollValue > 0.65) {
      if ((scrollY.getPrevious() as number) < latest) {
        setY("-100%");
      } else {
        setY("0%");
      }
    }
  });
  return (
    <>
      <motion.div
        className="fixed top-0 z-[50] flex w-full items-center justify-between px-5 md:px-16"
        initial="initial"
        animate={state ? "animate" : "initial"}
        transition={{
          default: {
            ease: [0.24, 0.43, 0.15, 0.97],
            duration: 0.6,
          },
          y: {
            ease: [0.24, 0.43, 0.15, 0.97],
            duration: 0.8,
          },
        }}
        variants={{
          initial: {
            paddingBlock: isMobileViewport
              ? "calc(10 * var(--multiplier))"
              : "calc(6 * var(--multiplier))",
            backgroundColor: "rgba(206, 209, 191,0)",
            y,
          },
          animate: {
            paddingBlock: isMobileViewport
              ? "calc(5 * var(--multiplier))"
              : "calc(2 * var(--multiplier))",
            backgroundColor: "rgba(206, 209, 191,1)",
            y,
          },
        }}
      >
        <Image
          src={CvailLogo}
          alt="CVAIL"
          className="h-auto w-full max-w-24 origin-left transition-[filter] duration-300 md:max-w-40"
          style={{ filter: state ? "none" : "brightness(0) invert(1)" }}
          priority
        />
        <nav aria-label="navigation" className="hidden gap-6 md:flex">
          {sitePages.map((eachItem) => (
            <Link href={eachItem.href} key={eachItem.link}>
              <DashedLink
                className={cn(
                  "text-base font-normal",
                  state
                    ? "[&>.animated-underline]:bg-[#2b3530]"
                    : "[&>.animated-underline]:bg-white",
                )}
                variants={{
                  animate: { color: "#2b3530" },
                  initial: { color: "#ffffff" },
                }}
              >
                {eachItem.link}
              </DashedLink>
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <motion.button
            initial="initial"
            whileHover="whileHover"
            onClick={() => {
              const isOpen = openSideBar;
              if (isMobileViewport) {
                if (!isOpen) {
                  setState(true);
                } else {
                  const scrollValue = scrollY.get() / window.innerHeight;
                  setState(scrollValue > 0.5);
                }
              }
              setOpenSideBar(!isOpen);
            }}
            className="cursor-pointer p-2"
            disabled={isMobile == null}
          >
            {isMobileViewport && openSideBar ? (
              <CloseIcon className="size-7 [&_path]:[stroke-width:1px]" />
            ) : (
              <AnimatedBurger
                className={cn(state ? "[stroke:#2b3530]" : "[stroke:white]")}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
      <ResponsiveSideBar
        isMobile={isMobile}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />
    </>
  );
}
