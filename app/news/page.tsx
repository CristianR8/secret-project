import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/Client/NavBar";
import Footer from "@/sections/Footer/Server";
import LightEffect from "@/sections/Hero/LightEffect";
import { getNewsHref, newsArticles } from "./news-data";

export default function NewsPage() {
  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <LightEffect />
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
                Each article now has its own URL. Open any card to read the
                full story on a dedicated page.
              </p>
            </section>

            <section className="mt-10 columns-1 gap-5 md:mt-14 md:columns-2 lg:columns-3">
              {newsArticles.map((article) => (
                <Link
                  key={article.id}
                  href={getNewsHref(article.id)}
                  className="mb-5 inline-block w-full break-inside-avoid rounded-[1.75rem] border border-white/15 bg-[#12201a]/40 p-3 text-left shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#8DFFD6]/25 hover:shadow-[0_26px_70px_rgba(74,209,156,0.16)]"
                >
                  <div
                    className={`relative overflow-hidden rounded-[1.25rem] ${article.heightClass}`}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,8,0.05),rgba(6,9,8,0.22)_42%,rgba(6,9,8,0.74)_100%)]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      {article.category}
                    </div>
                    <div className="absolute inset-x-4 bottom-4">
                      <h2
                        className={`[line-height:1.02] text-white ${article.titleClass ?? "text-2xl"}`}
                      >
                        {article.title}
                      </h2>
                    </div>
                  </div>
                  <p className="px-2 pb-2 pt-4 text-sm [line-height:1.4] text-white/82 md:text-base">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </section>
          </div>
        </div>
      </section>
      <Footer />
      <NavBar />
    </main>
  );
}
