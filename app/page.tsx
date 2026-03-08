import NavBar from "@/components/Client/NavBar";
import Lines from "@/components/Client/Lines";
import ResearchInfo from "@/sections/ResearchInfo";
import Footer from "@/sections/Footer/Server";
import News from "@/components/Client/News";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import LightEffect from "@/sections/Hero/LightEffect";

export default function Home() {
  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <LightEffect />
        </div>
        <div className="relative z-10 -mt-[100svh]">
          <Hero />
          <Introduction />
          <ResearchInfo />
          <News />
          <Lines />
        </div>
      </section>
      <Footer />
      <NavBar />
    </main>
  );
}
