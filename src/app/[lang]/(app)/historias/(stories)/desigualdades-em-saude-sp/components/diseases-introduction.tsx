"use client";

import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import textBackground from "../assets/text-background.png";

export default function DiseasesIntroduction() {
  const copy = useStoryCopy<SaudeCopy>();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-8 py-30"
      style={{
        backgroundImage: `url(${textBackground.src})`,
      }}
    >
      <div className="max-w-xl rounded-2xl">
        <div className="space-y-6 text-black leading-relaxed">
          <p>
            {copy.diseasesIntro.p1Before}{" "}
            <span className="font-semibold">{copy.diseasesIntro.p1Emph}</span>
          </p>

          <p>{copy.diseasesIntro.p2}</p>

          <p>
            {copy.diseasesIntro.p3Before}{" "}
            <span className="font-semibold">{copy.diseasesIntro.p3Emph1}</span>{" "}
            {copy.diseasesIntro.p3Mid}{" "}
            <span className="font-semibold">{copy.diseasesIntro.p3Emph2}</span>{" "}
            {copy.diseasesIntro.p3After}
          </p>

          <p>{copy.diseasesIntro.p4}</p>

          <p>{copy.diseasesIntro.p5}</p>

          <p>{copy.diseasesIntro.p6}</p>
        </div>
      </div>
    </div>
  );
}
