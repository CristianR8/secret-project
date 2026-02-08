"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Cursor from "@/components/Client/Cursor";
import PlaySVG from "@/components/SVGComponents/PlaySVG";
export default function HeroMobileClient({
  playIntro,
  setPlayIntro,
}: {
  setPlayIntro: Dispatch<SetStateAction<boolean>>;
  playIntro: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState("/Hero/eye.mp4");
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      onClick={() => setPlayIntro((prev) => !prev)}
    >
      <video
        ref={videoRef}
        className="size-full object-cover md:hidden"
        autoPlay
        muted
        playsInline
        poster="/Hero/elementis-cover-mjpg.png"
        onEnded={() => {
          const nextSrc =
            videoSrc === "/Hero/eye.mp4" ? "/Hero/bunny.mp4" : "/Hero/eye.mp4";
          setVideoSrc(nextSrc);
          if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => undefined);
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Cursor
        renderCursor={!playIntro}
        isMobile={true}
        className="absolute grid aspect-square w-11 place-items-center rounded-full"
      >
        <PlaySVG className="w-1/3" />
      </Cursor>
    </div>
  );
}
