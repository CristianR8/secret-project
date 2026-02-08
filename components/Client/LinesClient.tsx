"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import StyledLinkClient from "@/components/Client/StyledLinkClient";
import Image1 from "@/public/Lines/thermal.png";
import Image2 from "@/public/Lines/dense.png";
import Image3 from "@/public/Lines/nlp.png";
import Image4 from "@/public/Lines/nlos.png";
import Image5 from "@/public/Lines/remote.png";
import { useImageReveal } from "@/hooks/useImageReveal";
interface LinkType {
  title: string;
  href: string;
  img: StaticImageData;
}
export default function LinesClient() {
  const { imgContainerRef, handleFocus } = useImageReveal();
  const links: LinkType[] = [
    {
      title: "Thermal Imaging",
      href: "",
      img: Image1,
    },
    {
      title: "Dense Prediction",
      href: "",
      img: Image2,
    },
    {
      title: "Natural Language Processing",
      href: "",
      img: Image3,
    },
    {
      title: "NLOS Imaging",
      href: "",
      img: Image4,
    },
    {
      title: "Remote sensing",
      href: "",
      img: Image5,
    },
  ];

  return (
    <>
      <div ref={imgContainerRef} className="relative overflow-hidden md:w-fit">
        <Image
          src={links[links.length - 1].img}
          alt="placeholder"
          aria-hidden={true}
          className="invisible w-full max-md:aspect-[0.82] md:h-full md:w-auto"
        />
        {links.map((eachLink, i) => (
          <motion.div
            key={`image-${i + 1}`}
            data-index={i}
            className="absolute inset-0"
            style={{ zIndex: -i }}
          >
            <Image
              src={eachLink.img}
              alt={eachLink.title}
              className="size-full object-cover md:w-auto"
            />
          </motion.div>
        ))}
      </div>
      <div className="-mx-8-25 grid grid-rows-5 divide-y divide-[#D1CCBF] border-y border-[#D1CCBF] md:col-span-2 md:col-start-2 md:row-start-2 md:mx-0">
        {links.map((eachLink, index) => (
          <StyledLinkClient
            handleFocus={handleFocus}
            sNo={index + 1}
            href={eachLink.href}
            key={`link-${index + 1}`}
          >
            {eachLink.title}
          </StyledLinkClient>
        ))}
      </div>
    </>
  );
}
