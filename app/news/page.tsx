"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import NavBar from "@/components/Client/NavBar";
import Footer from "@/sections/Footer/Server";
import LightEffect from "@/sections/Hero/LightEffect";
import NewsImage1 from "@/public/News/iccv.png";
import NewsImage2 from "@/public/News/colcaci.jpeg";
import NewsImage3 from "@/public/News/soccernet.jpeg";
import CloseIcon from "@/components/SVGComponents/CloseIcon";

type NewsCard = {
  title: string;
  category: string;
  image: StaticImageData;
  heightClass: string;
  titleClass?: string;
  excerpt: string;
  body: string[];
};

const cards: NewsCard[] = [
  {
    title: "ICCV 2025 Highlights",
    category: "Conference",
    image: NewsImage1,
    heightClass: "h-[24rem]",
    titleClass: "text-xl md:text-[1.7rem]",
    excerpt:
      "Dummy article about poster sessions, lab participation, and current work in spectral and visual learning.",
    body: [
      "This dummy article represents a longer writeup about our participation in ICCV 2025, including poster presentation details, technical discussion, and research context.",
      "Use this panel to place a full article summary, publication links, author list, event highlights, and any supporting media without forcing the user to leave the page.",
      "The panel scroll is independent from the background so the rest of the news page remains visible but inactive while the article is open.",
    ],
  },
  {
    title: "ColCACI Research Showcase",
    category: "Event",
    image: NewsImage2,
    heightClass: "h-[20rem]",
    excerpt:
      "Placeholder summary for publications, demos, and conversations from the latest conference edition.",
    body: [
      "This dummy article can contain a conference recap, accepted works, photos from the event, and a concise explanation of the projects shown by the lab.",
      "It is structured for long-form reading inside a side panel so users can explore the content without losing context from the masonry grid.",
      "You can later swap this placeholder content for CMS-driven news data or structured article entries.",
    ],
  },
  {
    title: "SoccerNet Challenge",
    category: "Award",
    image: NewsImage3,
    heightClass: "h-[24rem]",
    excerpt:
      "Dummy card for benchmark results, challenge ranking, and technical lessons from competition settings.",
    body: [
      "This dummy article is intended for a competition win announcement, including the benchmark setting, method summary, and why the result matters for the lab.",
      "The side modal can also include extra screenshots, metrics, and links to code or paper pages in a format that remains easy to scan.",
      "Because the modal scrolls internally, the article can be as long as needed without affecting the underlying page structure.",
    ],
  },
  {
    title: "Lab Milestone Update",
    category: "Internal",
    image: NewsImage2,
    heightClass: "h-[18rem]",
    excerpt:
      "A placeholder update for grants, infrastructure, and team growth inside the research group.",
    body: [
      "This placeholder article can summarize internal milestones, new equipment, collaborations, and academic planning for the semester.",
      "Use this area to expand on timeline, impact, and related team achievements in a readable format.",
    ],
  },
  {
    title: "Field Capture Session",
    category: "Research",
    image: NewsImage3,
    heightClass: "h-[30rem]",
    excerpt:
      "Dummy content around data collection, outdoor testing, and new pipelines for robust perception.",
    body: [
      "This article can document the setup, collection process, and methodological goals behind a field session for new research data.",
      "It works well for combining narrative detail with images, protocol notes, and upcoming experiments.",
    ],
  },
  {
    title: "Paper Accepted",
    category: "Publication",
    image: NewsImage1,
    heightClass: "h-[22rem]",
    excerpt:
      "Placeholder announcement for a new accepted paper and a concise explanation of the contribution.",
    body: [
      "Use this article format for acceptance announcements, author details, contribution summaries, and next steps such as camera-ready updates or code release plans.",
      "The panel supports longer editorial content without changing the grid structure.",
    ],
  },
  {
    title: "Workshop Recap",
    category: "Community",
    image: NewsImage2,
    heightClass: "h-[26rem]",
    excerpt:
      "Dummy article on lectures, invited speakers, and collaborative sessions with students and researchers.",
    body: [
      "This placeholder can capture workshop highlights, invited speaker insights, attendance, and future collaboration opportunities.",
      "It is designed to read like an editorial recap rather than a small caption.",
    ],
  },
  {
    title: "Prototype Demo",
    category: "Demo",
    image: NewsImage3,
    heightClass: "h-[19rem]",
    excerpt:
      "Placeholder card describing an experimental demo with computer vision, AI, and real-world scenes.",
    body: [
      "This article can describe a demo system, technical stack, evaluation setting, and observations from live interaction.",
      "The left-side panel is a better fit than redirecting immediately to another page for this type of content.",
    ],
  },
  {
    title: "New Dataset Release",
    category: "Dataset",
    image: NewsImage1,
    heightClass: "h-[27rem]",
    excerpt:
      "Dummy release note for a curated dataset with metadata, benchmarks, and expected impact.",
    body: [
      "Use this kind of article to explain collection protocol, annotation scope, download information, and benchmark setup for a new dataset.",
      "It also works well for linking associated publication and code assets later.",
    ],
  },
];

export default function NewsPage() {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openCardIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [openCardIndex]);

  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <LightEffect staticMode />
        </div>
        <div className="relative z-10 -mt-[100svh] px-3-75 pb-32 pt-40 text-[#D1CCBF] md:px-16 md:pb-48 md:pt-52">
          <div className="mx-auto max-w-[1280px]">
            <section className="rounded-[2rem] border border-white/15 bg-[#12201a]/45 p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-10">
              <p className="text-sm uppercase tracking-[0.16em] text-white/65 md:text-base">
                News
              </p>
              <h1 className="mt-4 text-4xl [line-height:0.92] text-white md:text-[5rem]">
                Latest CVAIL Stories
              </h1>
              <p className="mx-auto mt-6 max-w-[760px] text-base [line-height:1.35] text-white/85 md:text-2xl">
                Dummy news page with a masonry distribution inspired by Pinterest.
                Replace these cards with real articles, covers, and destinations.
              </p>
            </section>

            <section className="mt-10 columns-1 gap-5 md:mt-14 md:columns-2 lg:columns-3">
              {cards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setOpenCardIndex(index)}
                  className="mb-5 inline-block w-full cursor-pointer break-inside-avoid rounded-[1.75rem] border border-white/15 bg-[#12201a]/40 p-3 text-left shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#8DFFD6]/25 hover:shadow-[0_26px_70px_rgba(74,209,156,0.16)]"
                >
                  <div
                    className={`relative overflow-hidden rounded-[1.25rem] ${card.heightClass}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,8,0.05),rgba(6,9,8,0.22)_42%,rgba(6,9,8,0.74)_100%)]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      {card.category}
                    </div>
                    <div className="absolute inset-x-4 bottom-4">
                      <h2
                        className={`[line-height:1.02] text-white ${card.titleClass ?? "text-2xl"}`}
                      >
                        {card.title}
                      </h2>
                    </div>
                  </div>
                  <p className="px-2 pb-2 pt-4 text-sm [line-height:1.4] text-white/82 md:text-base">
                    {card.excerpt}
                  </p>
                </button>
              ))}
            </section>
          </div>
        </div>
        <AnimatePresence>
          {openCardIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[140] bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCardIndex(null)}
            >
              <motion.aside
                initial={{ x: "-12%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-10%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.24, 0.43, 0.15, 0.97] }}
                className="absolute left-3 top-3 bottom-3 w-[92vw] overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#12201a]/92 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:left-8 md:top-8 md:bottom-8 md:w-[68vw] lg:w-[52vw]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                        {cards[openCardIndex].category}
                      </p>
                      <h3 className="mt-1 text-xl [line-height:1] md:text-3xl">
                        {cards[openCardIndex].title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-white/15 p-2 text-white/80 transition-colors hover:text-white"
                      onClick={() => setOpenCardIndex(null)}
                    >
                      <CloseIcon className="size-5 [&_path]:[stroke:#ffffff] [&_path]:[stroke-width:1px]" />
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="relative h-[18rem] w-full md:h-[22rem]">
                      <Image
                        src={cards[openCardIndex].image}
                        alt={cards[openCardIndex].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 92vw, 52vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,8,0.05),rgba(6,9,8,0.18)_45%,rgba(6,9,8,0.72)_100%)]" />
                    </div>
                    <div className="px-5 py-5 md:px-7 md:py-7">
                      <p className="text-base [line-height:1.4] text-white/88 md:text-lg">
                        {cards[openCardIndex].excerpt}
                      </p>
                      <div className="mt-6 space-y-4 text-sm [line-height:1.6] text-white/76 md:text-base">
                        {cards[openCardIndex].body.map((paragraph, index) => (
                          <p key={`body-${index}`}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
      <NavBar />
    </main>
  );
}
