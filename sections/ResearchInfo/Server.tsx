import Image from "next/image";
import ResearchImage from "@/public/research.jpeg";
import SectionTitle from "@/components/Server/SectionTitle";
import StyledLink from "@/components/Server/StyledLink";
import MaskText from "@/components/Server/MaskText";
import ResponsiveImage from "@/components/Client/ResponsiveImage";
export default function ResearchInfoServer() {
  return (
    <div className="flex flex-col text-[#D1CCBF] md:grid md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl">
        <ResponsiveImage parallaxAmount={20}>
          <Image
            src={ResearchImage}
            alt="wellness-sanctuary-image"
            className="h-auto w-full"
          />
        </ResponsiveImage>
      </div>
      <div className="flex flex-col justify-center py-20 md:py-0 md:pr-15">
        <div className="mx-3-75 flex flex-col gap-12 rounded-2xl border border-white/20 bg-[#1f2824]/55 p-6 text-[#EEF2E8] shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:ml-20 md:mr-0 md:w-fit md:gap-16 md:p-10">
          <p className="text-24 [line-height:1.2] text-justify [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] md:text-40 md:[line-height:1.2]">
            Our work combines physical models, mathematics, and deep learning
            to analyze complex scenes.
          </p>
          <MaskText
            lines={[
              <>
                Our research advances machine perception through computer
                vision, computational imaging, and artificial intelligence.
                We study how visual information is captured, represented, and
                interpreted by intelligent systems.
              </>,
    
            ]}
            className="text-base [line-height:1.4] font-normal md:text-lg"
          />
          <StyledLink href="https://cvail.co/wellness">
            Discover our RESEARCH
          </StyledLink>
        </div>
      </div>
    </div>
  );
}
