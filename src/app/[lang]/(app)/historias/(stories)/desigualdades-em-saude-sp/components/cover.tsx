"use client";

import { Share2 } from "lucide-react";
import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import { StoryLogos } from "../../../components/story-logos";
import coverImage from "../assets/cover.png";

export default function Cover() {
  const copy = useStoryCopy<SaudeCopy>();

  const handleShare = async () => {
    const shareData = {
      title: copy.cover.shareTitle,
      text: copy.cover.shareText,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(copy.cover.copied);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(copy.cover.shareError, err);
      }
    }
  };

  return (
    <div
      className="h-screen bg-cover flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${coverImage.src})`,
        overflow: "hidden !important",
      }}
    >
      {/* Logos at the top */}
      <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center px-6 md:px-12 lg:px-24">
        <div className="mb-6">
          <StoryLogos inverted />
        </div>
      </div>

      {/* Main content centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-[900px]">
        <h2 className="text-white text-lg md:text-2xl lg:text-2xl font-bold max-w-4xl mb-6">
          {copy.cover.title}
        </h2>

        <p className="text-white text-md md:text-lg font-normal max-w-[620px] leading-relaxed">
          {copy.cover.byline}
        </p>

        <div className="flex gap-2 justify-center mt-6">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center hover:cursor-pointer justify-center w-10 h-10 bg-transparent border-[#3A3434] hover:bg-[#000000]/10 text-[#333333] rounded-full transition-all duration-300 shadow-lg border"
            aria-label={copy.cover.share}
          >
            <Share2 size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
