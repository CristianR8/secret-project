import StyledLink from "@/components/Server/StyledLink";
import * as motion from "motion/react-client";
import ContactUs from "../Server/ContactUs";
import StayConnected from "../Server/StayConnected";
import { AnimatePresence } from "motion/react";
import { sitePages } from "@/utils/sitePages";

export default function SideBarMobile() {
  return (
    <div className="fixed top-0 z-[30] h-screen w-full overflow-x-hidden">
      <AnimatePresence>
        <motion.div
          variants={{
            initial: { x: "100%" },
            exit: { x: "100%" },
            animate: { x: "0%" },
          }}
          initial="initial"
          animate="animate"
          transition={{
            ease: [0.24, 0.43, 0.15, 0.97],
            duration: 0.8,
          }}
          className="h-screen overflow-y-scroll bg-[#CED1BF] px-3-75 pt-12000svh"
        >
          <span className="text-sm text-[#2b353080]">Discover Pages</span>
          <div className="my-3200svh text-[#2b3530]">
            {sitePages.map(({ link, href }, i) => (
              <StyledLink
                className="mb-750svh text-lg font-light"
                key={link}
                href={href}
                underlineColor="#2b3530"
                arrowFill="#2B3530"
                active={i == 0}
              >
                {link}
              </StyledLink>
            ))}
          </div>
          <ContactUs className="gap-y-8 text-base text-[#2b3530] max-md:mt-16 md:hidden [&>:first-child]:text-sm [&>:first-child]:text-[#2b3530]/80 [&>div]:gap-x-5" />
          <StayConnected className="mt-4800svh gap-y-6 text-sm [line-height:1] text-[#2b3530]/80 [&_div]:gap-x-8 [&_svg]:h-2400svh [&_svg]:w-auto" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
