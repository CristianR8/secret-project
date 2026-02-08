import Image from "next/image";
import WellnessSanctuaryImage from "@/public/WellnessSanctuaryImage.png";
import ResearchImage from "@/public/research.png";
import SectionTitle from "@/components/Server/SectionTitle";
import StyledLink from "@/components/Server/StyledLink";
import MaskText from "@/components/Server/MaskText";
import ResponsiveImage from "@/components/Client/ResponsiveImage";
export default function ResearchInfoServer() {
  return (
    <div className="flex flex-col bg-[#30493D] text-[#D1CCBF] md:grid md:grid-cols-2">
      <ResponsiveImage parallaxAmount={20}>
        <Image
          src={ResearchImage}
          alt="wellness-sanctuary-image"
          className="h-auto w-full"
        />
      </ResponsiveImage>
      <div className="flex flex-col justify-center pr-15 py-40 md:py-0">
        <div className="flex flex-col gap-12 md:ml-36 md:w-fit md:gap-16">
          <SectionTitle>Our Research</SectionTitle>
          <p className="text-24 [line-height:1.2] text-justify md:text-40 md:[line-height:1.2]">
            Our work combines physical models, mathematics, and deep learning to analyze complex scenes.
          </p>
          <MaskText
            lines={[
              <>
                Our research advances machine perception through computer
                vision, computational imaging, and artificial intelligence.
              </>,
              <>
                We study how visual information is captured, represented, and
                interpreted by intelligent systems.
              </>,
            ]}
            className="text-base [line-height:1.4] font-normal md:text-lg"
          />
          <StyledLink href="https://elementis.co/wellness">
            Discover our RESEARCH
          </StyledLink>
        </div>
      </div>
    </div>
  );
}
