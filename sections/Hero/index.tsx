import HeroServer from "./Server";

export default function HeroWrapper() {
  return (
    <div className="relative h-screen overflow-hidden">
      <HeroServer />
    </div>
  );
}
