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

export default function NavBar() {
  const isMobile = useIsMobile();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [state, setState] = useState(false);
  const [y, setY] = useState("0%");
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollValue = latest / window.innerHeight;
    setState(scrollValue > 0.5);
    if (scrollValue > 0.65) {
      if ((scrollY.getPrevious() as number) < latest) {
        setY("-100%");
      } else {
        setY("0%");
      }
    }
  });
  const navItems = [
    {
      href: "/",
      children: "Home",
    },
    {
      href: "",
      children: "Research",
    },
    {
      href: "/news",
      children: "News",
    },
    {
      href: "/people",
      children: "People",
    },
    /*  {
      href: "",
      children: "About us",
    }, */
    /*
    {
      href: "https://cvail.co/the-story",
      children: "The Story",
    }, */
  ];
  return (
    <>
      <motion.div
        className="fixed top-0 z-[50] flex w-full items-center justify-between px-5 py-10 md:px-16"
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
            paddingBlock: isMobile
              ? "calc(var(--multiplier))"
              : "calc(var(--multiplier))",
            backgroundColor: "rgba(206, 209, 191,0)",
            y,
          },
          animate: {
            paddingBlock: isMobile
              ? "calc(12 * var(--multiplier))"
              : "calc(6 * var(--multiplier))",
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
          {navItems.map((eachItem) => (
            <Link href={eachItem.href} key={eachItem.children}>
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
                {eachItem.children}
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
              if (isMobile) {
                if (!isOpen) {
                  //about to open
                  setState(true);
                } else {
                  //about to close -> the variant of the nav should be based on the scrollY
                  const scrollValue = scrollY.get() / window.innerHeight;
                  setState(scrollValue > 0.5);
                }
              }
              setOpenSideBar(!isOpen);
            }}
            className="cursor-pointer p-2"
            disabled={isMobile == null}
          >
            {isMobile && openSideBar ? (
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
