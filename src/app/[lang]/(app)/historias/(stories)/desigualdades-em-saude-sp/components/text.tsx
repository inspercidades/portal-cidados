"use client";

import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import textBackground from "../assets/text-background.png";

export default function Text() {
  const copy = useStoryCopy<SaudeCopy>();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-8 py-30"
      style={{
        backgroundImage: `url(${textBackground.src})`,
      }}
    >
      <div className="max-w-xl rounded-2xl">
        <h1 className="text-2xl font-semibold text-black mb-6 text-left">
          {copy.intro.title}
        </h1>

        <div className="space-y-6 text-black leading-relaxed">
          <p>
            {copy.intro.p1Before}{" "}
            <span className="font-semibold">{copy.intro.p1Emph}</span>
          </p>

          <p className="text-sm italic pb-4 text-black">{copy.intro.source}</p>
          <div className="w-full max-w-[80%] mx-auto">
            <hr className="border-black pb-4 items-center" />
          </div>

          <p>
            {copy.intro.p2Before}{" "}
            <span className="font-semibold">{copy.intro.p2World}</span>{" "}
            {copy.intro.p2Mid}{" "}
            <span className="font-semibold">{copy.intro.p2Global}</span>{" "}
            {copy.intro.p2BrazilBefore}{" "}
            <span className="font-semibold">{copy.intro.p2Brazil}</span>{" "}
            {copy.intro.p2After}
          </p>

          <p>
            {copy.intro.p3Before}{" "}
            <span className="font-semibold">{copy.intro.p3Emph}</span>
          </p>

          <p>
            {copy.intro.p4Before}{" "}
            <span className="font-semibold">{copy.intro.p4Emph1}</span>{" "}
            {copy.intro.p4Mid}{" "}
            <span className="font-semibold">{copy.intro.p4Emph2}</span>{" "}
            {copy.intro.p4After}
          </p>

          <p>
            <span className="font-semibold">{copy.intro.p5Emph}</span>{" "}
            {copy.intro.p5After}
          </p>

          <p>
            {copy.intro.p6Before}{" "}
            <span className="font-semibold">{copy.intro.p6Emph}</span>{" "}
            {copy.intro.p6After}
          </p>
        </div>
      </div>
    </div>
  );
}
