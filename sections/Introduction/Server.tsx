import SectionTitle from "@/components/Server/SectionTitle";
import IntroductionImage from "@/public/Team.jpeg";
import IntroductionSmallImage from "@/public/photo1.jpeg";
import IntroductionThirdImage from "@/public/photo2.jpeg";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function IntroductionServer() {
  return (
    <div className="grid gap-y-8 px-3-75 text-[#D1CCBF] md:grid-cols-[1fr_2fr] md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-10 md:px-15 md:pt-56-25 md:pb-50">
      <div className="flex flex-col gap-y-8 md:col-start-1 md:row-start-1 md:gap-y-10">
        <motion.div className="max-md:-mx-3-75">
          <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-[#D1CCBF]/20 max-md:aspect-[1.1] md:h-[260px]">
            <Image
              src={IntroductionSmallImage}
              alt="introduction-image-detail"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
        </motion.div>
        <motion.div className="max-md:-mx-3-75">
          <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-[#D1CCBF]/20 max-md:aspect-[1.4] md:h-[240px]">
            <Image
              src={IntroductionThirdImage}
              alt="introduction-image-secondary"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
        </motion.div>
      </div>

      <motion.div className="max-md:-mx-3-75 md:col-start-2 md:row-start-1">
        <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-[#D1CCBF]/20 max-md:aspect-[1.18] md:h-[540px]">
          <Image
            src={IntroductionImage}
            alt="introduction-image"
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 66vw"
          />
        </div>
      </motion.div>

      <div className="rounded-2xl border border-white/20 bg-[#1f2824]/55 p-5 text-[#EEF2E8] shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:col-span-2 md:row-start-2 md:grid md:grid-cols-[1fr_2fr] md:gap-x-10 md:p-10">
        <SectionTitle className="md:col-start-1 md:row-start-1">
          Who are we?
        </SectionTitle>

        <div className="mt-8 flex flex-col gap-12 md:col-start-2 md:row-start-1 md:mt-0 md:gap-20">
          <p className="text-24 [line-height:1.2] text-justify [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] md:text-40 md:[line-height:1.2]">
            <span className="">
              Computer Vision &amp; AI Lab (CVAIL)
            </span>{" "}
            is a research group investigating robust perception, scene
            understanding, and decision-making for intelligent systems in
            complex environments.
          </p>

          {/* <MaskText
            lines={[
              <Fragment key="l-1">At CVAIL, we use the Integrative</Fragment>,
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
    </div>
  );
}
