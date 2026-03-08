import { Fragment } from "react";
import ResponsiveMaskTextVariant from "@/components/Client/ResponsiveMaskTextVariant";
import ResponsiveMarquee from "@/components/Client/ResponsiveMarquee";
import LinesClient from "@/components/Client/LinesClient";

export default function Lines() {
  return (
    <div className="py-36 text-[#D1CCBF] md:py-60">
      <ResponsiveMarquee
        animationConfig={{
          mobile: {
            max: "-887px",
            speed: 50,
          },
          desktop: {
            max: "-88.7%",
            speed: 5,
          },
        }}
      >
        {"Research Areas • Research Areas • Research Areas • "}
      </ResponsiveMarquee>

      <div className="mt-18 flex flex-col gap-y-14 px-8-25 md:mt-26 md:grid md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-24 md:px-16">
        <div className="flex flex-col gap-14 md:col-span-2 md:col-start-2 md:flex-row">
          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d-0">
                Our research explores how machines perceive,
              </Fragment>,
              <Fragment key="d-1">
                interpret, and reason about complex visual
              </Fragment>,
              <Fragment key="d-2">
                information using computer vision and artificial
              </Fragment>,
              <Fragment key="d-3">
                intelligence. We focus on developing methods
              </Fragment>,
              <Fragment key="d-4">
                that combine learning-based models with
              </Fragment>,
              <Fragment key="d-5">
                physical and geometric understanding to extract
              </Fragment>,
              <Fragment key="d-6">
                meaningful structure from data.
              </Fragment>,
            ]}
            mobile={[
              <Fragment key="m-0">
                Our research explores how machines
              </Fragment>,
              <Fragment key="m-1">
                perceive, interpret, and reason about
              </Fragment>,
              <Fragment key="m-2">
                complex visual information using computer
              </Fragment>,
              <Fragment key="m-3">
                vision and artificial intelligence. We focus
              </Fragment>,
              <Fragment key="m-4">
                on developing methods that combine
              </Fragment>,
              <Fragment key="m-5">
                learning-based models with physical and
              </Fragment>,
              <Fragment key="m-6">
                geometric understanding to extract
              </Fragment>,
              <Fragment key="m-7">
                meaningful structure from data.
              </Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg"
          />

          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d2-0">
                By bridging theory and data-driven approaches,
              </Fragment>,
              <Fragment key="d2-1">
                we study visual representation, scene
              </Fragment>,
              <Fragment key="d2-2">
                understanding, and multimodal perception. Our
              </Fragment>,
              <Fragment key="d2-3">
                goal is to advance intelligent systems that can
              </Fragment>,
              <Fragment key="d2-4">
                operate robustly in real-world and large-scale
              </Fragment>,
              <Fragment key="d2-5">environments.</Fragment>,
            ]}
            mobile={[
              <Fragment key="m2-0">
                By bridging theory and data-driven
              </Fragment>,
              <Fragment key="m2-1">
                approaches, we study visual representation,
              </Fragment>,
              <Fragment key="m2-2">
                scene understanding, and multimodal
              </Fragment>,
              <Fragment key="m2-3">
                perception. Our goal is to advance
              </Fragment>,
              <Fragment key="m2-4">
                intelligent systems that can operate
              </Fragment>,
              <Fragment key="m2-5">
                robustly in real-world and large-scale
              </Fragment>,
              <Fragment key="m2-6">environments.</Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg"
          />
        </div>
        <LinesClient />
      </div>
    </div>
  );
}
