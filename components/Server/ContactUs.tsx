import React, { CSSProperties } from "react";
import DashedLink from "./DashedLink";
import cn from "@/utils/cn";

export default function ContactUs({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn("flex flex-col [line-height:1]", className)}
    >
      <div>Contact Us</div>
      <div className="flex cursor-default md:flex-col">
        <DashedLink>handsoncvs@gmail.com</DashedLink>
      </div>
    </div>
  );
}
