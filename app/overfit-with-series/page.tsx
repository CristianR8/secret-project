import Footer from "@/sections/Footer/Server";
import NavBar from "@/components/Client/NavBar";
import OverfitBackground from "./OverfitBackground";
import MaskText from "@/components/Server/MaskText";

import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import Br from "@/components/Server/Br";
import EpochCounter from "./EpochCounter";

const sessionTimeline = [
  {
    epoch: 1,
    time: "0:00 – 0:05",
    stage: "Welcome",
    description:
      "Introduction to the guest, talk context, and ground rules.",
  },
  {
    epoch: 2,
    time: "0:05 – 0:35",
    stage: "Research Talk",
    description:
      "The guest presents their work, results, and open questions.",
  },
  {
    epoch: 3,
    time: "0:35 – 1:05",
    stage: "Personal Story",
    description:
      "The human side: career path, failures, decisions, and advice.",
  }
];

export default function OverfitWithSeriesPage() {
  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <OverfitBackground />
        </div>
        <div className="relative z-10 -mt-[100svh] text-[#D1CCBF]">
          {/* ───── Hero ───── */}
          <section className="relative flex h-[100svh] flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(196,149,106,0.10),transparent_70%)]" />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center md:px-16">
              <MaskText
                transition={{ delayChildren: 0.3 }}
                className="text-[3rem] font-light [line-height:0.92] md:text-[7.5rem]"
                lines={[
                  <span
                    key="title-1"
                    className="bg-gradient-to-r from-[#D4A574] via-[#C4956A] to-[#8B6914] bg-clip-text text-transparent"
                  >
                    OVERFIT
                  </span>,
                  <span key="title-2" className="mt-2 block italic text-white">
                    with X
                  </span>,
                ]}
              />
              <MaskText
                transition={{ delayChildren: 0.55 }}
                className="mt-8 text-lg text-white/85 md:mt-10 md:text-xl"
                lines={[<>Research Talks &amp; Coffee</>]}
              />

              <MaskText
                transition={{ delayChildren: 0.7 }}
                className="mt-10 flex flex-wrap justify-center gap-3 md:mt-12"
                lines={[
                  <div key="pills" className="flex flex-wrap justify-center gap-3">
                    {[
                      "Biweekly sessions",
                      "30 min Research + 30 min Personal Story",
                      "Hybrid format",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-[#C4956A]/35 px-4 py-1.5 text-xs tracking-wide text-[#D4A574] md:text-sm"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>,
                ]}
              />
            </div>

            <div className="w-full px-10 md:px-16">
              <div className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, #C4956A 20%, #D4A574 50%, #C4956A 80%, transparent 100%)" }}
              />
            </div>
            <div className="relative flex justify-center overflow-hidden py-5 font-light text-white md:mx-10 md:justify-between md:py-4 [&>*]:shrink-0">
              <MaskText
                transition={{ delayChildren: 0.2 }}
                className="flex-1 max-md:hidden"
                lines={[
                  <div
                    key="arrow"
                    style={{ height: `${12 * Math.sqrt(2)}px` }}
                  >
                    <NavigateSVG
                      style={{ transform: "rotate(135deg)", fill: "#C4956A" }}
                    />
                  </div>,
                ]}
              />
              <MaskText
                transition={{ delayChildren: 0.4 }}
                className="text-lg font-normal md:text-2xl md:[line-height:1.2]"
                lines={[
                  <>Computer Vision and Artificial Intelligence Lab</>,
                ]}
              />
              <MaskText
                transition={{ delayChildren: 0.6 }}
                lines={[<>Scroll to discover the series.</>]}
                className="text-md flex-1 text-end text-nowrap [filter:blur(0.25px)] max-md:hidden"
              />
              <Br />
            </div>
          </section>

          {/* ───── Content ───── */}
          <div className="px-3-75 pb-20 pt-16 md:px-16 md:pb-32 md:pt-24">
            <div className="mx-auto max-w-[1180px] space-y-10 md:space-y-14">
              {/* ── What is Overfit with X? ── */}
              <MaskText
                transition={{ delayChildren: 0.1 }}
                lines={[
                  <section
                    key="what-is"
                    className="rounded-2xl border border-white/20 border-l-[#C4956A]/40 bg-[#1f2824]/55 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(196,149,106,0.1)] md:p-10"
                  >
                    <p className="text-sm uppercase tracking-[0.16em] text-[#C4956A] md:text-base">
                      ☕ What is Overfit with X?
                    </p>
                    <p className="mx-auto mt-5 max-w-[820px] text-base [line-height:1.5] text-white/88 md:text-lg">
                      <strong className="text-[#D4A574]">
                        Overfit with X
                      </strong>{" "}
                      is a biweekly talk series hosted by the CVAIL research
                      group where we invite researchers, professors, and
                      engineers to share their work and personal story. Each
                      session is split into two parts: 30 minutes of research
                      presentation and 30 minutes of personal story, career
                      path, failures, decisions, and advice. All accompanied
                      by good coffee.
                    </p>
                  </section>,
                ]}
              />

              {/* ── Session Structure — Timeline ── */}
              <MaskText
                transition={{ delayChildren: 0.1 }}
                lines={[
                  <section
                    key="structure"
                    className="rounded-2xl border border-white/20 bg-[#1f2824]/55 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(196,149,106,0.1)] md:p-10"
                  >
                    <p className="mb-8 text-sm uppercase tracking-[0.16em] text-[#C4956A] md:text-base">
                      📋 Session Structure
                    </p>
                    <div className="relative space-y-6 pl-6 md:pl-8">
                      {/* Vertical line */}
                      <div className="absolute left-0 top-1 bottom-1 w-px md:left-1"
                        style={{ background: "linear-gradient(180deg, #C4956A 0%, rgba(196,149,106,0.2) 80%, transparent 100%)" }} />
                      {sessionTimeline.map((item, i) => (
                        <div key={i} className="relative">
                          {/* Dot */}
                          <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-[#C4956A] shadow-[0_0_8px_rgba(196,149,106,0.5)] ring-2 ring-[#C4956A]/20 md:-left-8" />
                          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#C4956A]/50 md:text-xs">
                            Epoch {item.epoch}
                          </span>
                          <span className="mr-3 inline-block rounded-full bg-[#C4956A]/15 px-3 py-1 text-xs tracking-wide text-[#D4A574] md:text-sm">
                            {item.time}
                          </span>
                          <p className="mt-2 text-base text-white md:text-lg">
                            {item.stage}
                          </p>
                          <p className="mt-1 text-sm text-white/70 md:text-base">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>,
                ]}
              />

              {/* ── Sessions — Coming Soon ── */}
              <div>
                <MaskText
                  transition={{ delayChildren: 0.1 }}
                  className="mb-8 text-2xl [line-height:1.1] text-white md:mb-10 md:text-40"
                  lines={[<>Sessions</>]}
                />

                <MaskText
                  transition={{ delayChildren: 0.1 }}
                  lines={[
                    <div
                      key="coming-soon"
                      className="relative overflow-hidden rounded-2xl border border-[#C4956A]/25 bg-[#1f2824]/55 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-[#C4956A]/40 hover:shadow-[0_28px_90px_rgba(196,149,106,0.12)] md:p-12"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(196,149,106,0.06),transparent_70%)]" />
                      <p className="relative text-3xl">☕</p>
                      <p className="relative mt-4 text-sm uppercase tracking-[0.16em] text-[#C4956A] md:text-base">
                        Coming Soon
                      </p>
                      <div className="relative mx-auto mt-5 max-w-[480px] rounded-lg border border-[#C4956A]/10 bg-[#12201a]/60 px-5 py-4 text-left font-mono text-xs text-[#D4A574]/70 md:text-sm [line-height:1.8]">
                        <p><span className="text-[#C4956A]/40">&gt;</span> model.fit(sessions, epochs=∞)</p>
                        <p><span className="text-[#C4956A]/40">Epoch 0/∞</span> — Awaiting first session...</p>
                        <p><span className="text-[#C4956A]/40">Loss:</span> undefined — No data yet</p>
                        <p><span className="text-[#C4956A]/40">Optimizer:</span> AdamW(lr=☕)</p>
                        <p><span className="text-[#C4956A]/40">Dropout:</span> 0.0 — everyone&apos;s invited</p>
                      </div>
                      <p className="relative mx-auto mt-4 max-w-[480px] text-base text-white/70 [line-height:1.5] md:text-lg">
                        Upcoming sessions will be announced soon. Stay tuned!
                      </p>
                    </div>,
                  ]}
                />
              </div>

              {/* ── Overfitting curve divider ── */}
              <div className="flex items-center justify-center py-10 md:py-14">
                <svg
                  viewBox="0 0 300 60"
                  className="h-8 w-full max-w-[300px] md:h-10 md:max-w-[400px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="gold-fade-left">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(196,149,106,0.5)" />
                    </linearGradient>
                    <linearGradient id="gold-fade-right">
                      <stop offset="0%" stopColor="rgba(196,149,106,0.5)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="60" y2="30" stroke="url(#gold-fade-left)" strokeWidth="1" />
                  <line x1="240" y1="30" x2="300" y2="30" stroke="url(#gold-fade-right)" strokeWidth="1" />
                  {/* Training loss: smooth descent */}
                  <path
                    d="M 70 48 C 100 45, 120 35, 150 25 S 200 12, 230 10"
                    stroke="rgba(196,149,106,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Validation loss: descent then upturn */}
                  <path
                    d="M 70 46 C 100 42, 120 33, 145 25 C 160 22, 180 28, 200 38 S 225 50, 230 52"
                    stroke="rgba(212,165,116,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="4 3"
                  />
                </svg>
              </div>

              {/* ── Early stopping ── */}
              <p className="text-center font-mono text-xs text-[#C4956A]/25 md:text-sm">
                Early stopping triggered — best weights saved.
              </p>

            </div>
          </div>
        </div>
      </section>
      <EpochCounter />
      <Footer />
      <NavBar />
    </main>
  );
}
