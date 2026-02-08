import ResponsiveMaskText from "@/components/Client/ResponsiveMaskTextVariant";
import MaskText from "@/components/Server/MaskText";
import SectionTitle from "@/components/Server/SectionTitle";
import IntroductionImage from "@/public/Team.jpeg";
import IntroductionSmallImage from "@/public/Introduction.png";
import IntroductionThirdImage from "@/public/research.png";
import * as motion from "motion/react-client";
import ResponsiveImage from "@/components/Client/ResponsiveImage";
import PixelImageEffect from "@/components/Client/PixelImageEffect";

export default function IntroductionServer() {
  return (
    <div className="grid gap-y-8 bg-[#2B3530] px-3-75 text-[#D1CCBF] md:grid-cols-[1fr_2fr] md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-10 md:px-15 md:pt-56-25 md:pb-50">
      <div className="flex flex-col gap-y-8 md:col-start-1 md:row-start-1 md:gap-y-10">
        <motion.div className="max-md:-mx-3-75">
          <ResponsiveImage parallaxAmount={6}>
            <PixelImageEffect
              image={IntroductionSmallImage}
              alt="introduction-image-detail"
              className="w-full max-md:aspect-[1.1] md:h-[260px] rounded-2xl ring-1 ring-[#D1CCBF]/20 overflow-hidden"
              color="#ffffff"
              gridSize={64}
            />
          </ResponsiveImage>
        </motion.div>
        <motion.div className="max-md:-mx-3-75">
          <ResponsiveImage parallaxAmount={6}>
            <PixelImageEffect
              image={IntroductionThirdImage}
              alt="introduction-image-secondary"
              className="w-full max-md:aspect-[1.4] md:h-[240px] rounded-2xl ring-1 ring-[#D1CCBF]/20 overflow-hidden"
              color="#ffffff"
              gridSize={64}
            />
          </ResponsiveImage>
        </motion.div>
      </div>

      <motion.div className="max-md:-mx-3-75 md:col-start-2 md:row-start-1">
        <ResponsiveImage parallaxAmount={8}>
          <PixelImageEffect
            image={IntroductionImage}
            alt="introduction-image"
            className="w-full max-md:aspect-[1.18] md:h-[540px] rounded-2xl ring-1 ring-[#D1CCBF]/20 overflow-hidden"
            color="#ffffff"
            gridSize={72}
          />
        </ResponsiveImage>
      </motion.div>

      <SectionTitle className="md:col-start-1 md:row-start-2">
        Who are we?
      </SectionTitle>

      <div className="flex flex-col gap-12 md:col-start-2 md:row-start-2 md:gap-20">
        <p className="text-24 [line-height:1.2] text-justify md:text-40 md:[line-height:1.2]">
          <span className="">
            Computer Vision &amp; AI Lab (CVAIL)
          </span>{" "}
          is a research group investigating robust perception, scene
          understanding, and decision-making for intelligent systems in complex
          environments.
        </p>

        {/* <MaskText
          lines={[
            <Fragment key="l-1">At ELEMENTIS, we use the Integrative</Fragment>,
            <Fragment key="l-2">Wellness approach that considers</Fragment>,
            <Fragment key="l-3">
              psychological, physical, and nutritional
            </Fragment>,
            <Fragment key="l-4">
              aspects of your life to improve overall
            </Fragment>,
            <Fragment key="l-5">well-being and balance.</Fragment>,
          ]}
          className="text-base [line-height:1.3] font-normal md:text-lg"
        /> */}
      </div>
    </div>
  );
}
