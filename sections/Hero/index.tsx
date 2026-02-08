import HeroServer from "./Server";
import LightEffect from "./LightEffect";

export default function HeroWrapper() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#2b3530]">
      <LightEffect />
      <HeroServer />
    </div>
  );
}
