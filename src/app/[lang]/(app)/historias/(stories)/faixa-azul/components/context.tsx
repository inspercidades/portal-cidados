"use client";

import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";
import { accidentVideo, brandColor, g1ArticleUrl } from "../constants";
import ZoomableVideo from "./zoomable-video";

export default function Context() {
  const copy = useStoryCopy<FaixaAzulCopy>();

  return (
    <section className="w-full bg-white!">
      <div className="mx-auto max-w-xl px-6 md:px-8 pt-6 pb-40 font-inter">
        <div
          className="flex items-center gap-3 mb-20 text-sm"
          style={{ color: brandColor }}
        >
          <span
            className="w-0.5 h-6 shrink-0 bg-[#23254E]"
            aria-hidden="true"
          />
          <p>
            {copy.context.published}{" "}
            <strong>{copy.context.publishedDate}</strong>.
          </p>
        </div>

        <div className="space-y-8 text-[#23254E]">
          <div className="space-y-4">
            <p className="font-bold text-sm">{copy.context.date}</p>

            <blockquote className="italic text-sm leading-normal">
              &ldquo;{copy.context.quote}&rdquo;
            </blockquote>

            <p className="text-sm">
              <strong>{copy.common.source}</strong> {copy.context.sourceMeta}{" "}
              <a
                href={g1ArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {copy.context.sourceLink}
              </a>{" "}
              {copy.context.sourceSuffix}
            </p>
          </div>

          <ZoomableVideo
            src={accidentVideo}
            className="w-full rounded-xl aspect-square object-cover"
          />

          <div className="space-y-6 text-sm leading-normal">
            <p>
              {copy.context.deathsLead}{" "}
              <strong>{copy.context.deathsEmphasis}</strong>
              {copy.context.deathsRest}
            </p>

            <p>{copy.context.scene}</p>

            <p>
              <strong>{copy.context.policyEmphasis}</strong>{" "}
              {copy.context.policyRest}
            </p>

            <p>
              {copy.context.studyLead}{" "}
              <strong>{copy.context.studyTitle}</strong>
              {copy.context.studyRest}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
