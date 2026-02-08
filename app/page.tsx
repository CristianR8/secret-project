import NavBar from "@/components/Client/NavBar";
import Lines from "@/components/Client/Lines";
import ResearchInfo from "@/sections/ResearchInfo";
import Footer from "@/sections/Footer/Server";
import Form from "@/sections/Form";
import Innovation from "@/components/Client/Innovation";
import News from "@/components/Client/News"
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <ResearchInfo />
      {/* <Innovation /> */}
      <News/>
      <Lines />
      {/* <Form /> */}
      <Footer />
      <NavBar />
    </main>
  );
}
