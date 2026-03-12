import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/Client/NavBar";
import Footer from "@/sections/Footer/Server";
import LightEffect from "@/sections/Hero/LightEffect";
import { getNewsArticleById, getNewsHref, newsArticles } from "../news-data";

type NewsArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getNewsArticleById(id);

  if (!article) {
    return {
      title: "News | CVAIL",
      description: "CVAIL news article",
    };
  }

  return {
    title: `${article.title} | CVAIL`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { id } = await params;
  const article = getNewsArticleById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles.filter((item) => item.id !== article.id);

  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <LightEffect />
        </div>
        <div className="relative z-10 -mt-[100svh] px-3-75 pb-28 pt-36 text-[#D1CCBF] md:px-16 md:pb-44 md:pt-48">
          <div className="mx-auto max-w-[1180px]">
            <div className="rounded-[2rem] border border-white/15 bg-[#12201a]/50 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8">
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/65 md:text-sm">
                  <span>{article.category}</span>
                  <span className="h-1 w-1 rounded-full bg-white/35" />
                  <span>ID {article.id}</span>
                </div>

                <div className="max-w-[860px]">
                  <h1 className="text-4xl [line-height:0.94] text-white md:text-[5rem]">
                    {article.title}
                  </h1>
                  <p className="mt-5 max-w-[760px] text-base [line-height:1.45] text-white/85 md:text-xl">
                    {article.excerpt}
                  </p>
                </div>

                <div className="relative h-[20rem] overflow-hidden rounded-[1.6rem] md:h-[32rem]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 767px) 100vw, 1180px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,8,0.05),rgba(6,9,8,0.16)_42%,rgba(6,9,8,0.7)_100%)]" />
                </div>

                <div className="mx-auto max-w-[820px] space-y-5 px-1 text-base [line-height:1.65] text-white/82 md:text-lg">
                  {article.body.map((paragraph, index) => (
                    <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/news"
                    className="rounded-full border border-white/15 px-5 py-2 text-sm text-white transition-colors hover:border-[#8DFFD6]/35 hover:text-[#DFFFF1] md:text-base"
                  >
                    Back to all news
                  </Link>
                </div>
              </div>
            </div>

            <section className="mt-10 rounded-[2rem] border border-white/15 bg-[#12201a]/40 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl md:mt-14 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl text-white md:text-40">More Stories</h2>
                <Link
                  href="/news"
                  className="text-sm uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white md:text-base"
                >
                  View all
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedArticles.slice(0, 3).map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={getNewsHref(relatedArticle.id)}
                    className="rounded-[1.5rem] border border-white/15 bg-[#12201a]/55 p-3 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#8DFFD6]/25 hover:shadow-[0_24px_60px_rgba(74,209,156,0.12)]"
                  >
                    <div className="relative h-52 overflow-hidden rounded-[1.1rem]">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,8,0.05),rgba(6,9,8,0.18)_45%,rgba(6,9,8,0.72)_100%)]" />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/60">
                      {relatedArticle.category}
                    </p>
                    <h3 className="mt-2 text-xl [line-height:1.05] text-white">
                      {relatedArticle.title}
                    </h3>
                    <p className="mt-3 text-sm [line-height:1.45] text-white/78">
                      {relatedArticle.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      <Footer />
      <NavBar />
    </main>
  );
}
