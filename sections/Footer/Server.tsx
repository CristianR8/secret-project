import CvailLogo from "@/components/SVGComponents/cvail.svg";
import Image from "next/image";
import DashedLink from "@/components/Server/DashedLink";
import StayConnected from "../../components/Server/StayConnected";
import Link from "next/link";
import ContactUs from "../../components/Server/ContactUs";

interface LinkItem {
  href: string;
  link: string;
}

export default function Footer() {
  const data: LinkItem[] = [
    { href: "/", link: "Home" },
    { href: "/research", link: "Research" },
    { href: "/news", link: "News" },
    { href: "/people", link: "People" },
    /* { href: "/about", link: "About us" }, */
  ];

  return (
    <div className="bg-[#2B3530] md:px-16">
      <div className="grid grid-rows-[repeat(4,auto)] border-b border-white/50 text-[#D1CCBF] md:grid-cols-[1fr_1.375fr] md:grid-rows-2 md:px-0 md:pt-20 md:pb-16 [&_.animated-underline]:bg-[#D1CCBF]">
        <div>
          <Image
            src={CvailLogo}
            alt="CVAIL Logo"
            className="h-auto w-1/4 brightness-[2] invert"
            priority
          />
          <ContactUs className="mt-17-5 hidden w-fit flex-col text-base max-md:mt-16 md:flex" />
        </div>
        <ol className="mt-12 grid grid-cols-2 grid-rows-3 overflow-hidden text-lg [line-height:1.1] font-light text-nowrap md:mt-0 md:gap-x-8 md:gap-y-3 md:text-24">
          {data.map((eachColData, i) =>
            i === 0 ? (
              <div
                key={"list-item-" + (i + 1)}
                className="underline decoration-[#D1CCBF] decoration-[1px] underline-offset-2"
              >
                {eachColData.link}
              </div>
            ) : (
              <Link href={eachColData.href} key={"list-item" + (i + 1)}>
                <DashedLink
                  key={"list-item-" + (i + 1)}
                  className="w-fit [line-height:1] [&_.animated-underline]:bg-[#D1CCBF]"
                >
                  {eachColData.link}
                </DashedLink>
              </Link>
            ),
          )}
        </ol>
        <ContactUs className="gap-y-8 text-base max-md:mt-16 md:hidden [&>div]:gap-x-5" />
        <StayConnected className="justify-end gap-y-6 text-base [line-height:1] max-md:mt-12 md:col-start-2 md:gap-y-12 [&_div]:gap-x-8 md:[&_div]:gap-x-10 [&_path]:[fill:#D1CCBF]" />
      </div>
      <div className="flex flex-col gap-y-4 bg-[#2B3530] px-3-75 py-7-5 text-xs text-[#D1CCBF] md:flex-row md:justify-between md:pb-10 md:text-base [&_.animated-underline]:h-px [&_.animated-underline]:bg-[#D1CCBF]">
        <div className="md:flex-1">© 2025 CVAIL. All Rights Reserved</div>
        <Link href="https://cvail.co/privacy-terms">
          <DashedLink className="w-fit cursor-pointer">
            Policies and Terms
          </DashedLink>
        </Link>
        <div className="flex flex-1 justify-end">
          <DashedLink className="w-fit cursor-default">
            Powered by CVAIL Research Group
          </DashedLink>
        </div>
      </div>
    </div>
  );
}
