"use client";

import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";

export default function OsmText() {
  const copy = useStoryCopy<FaixaAzulCopy>();

  return (
    <section className="w-full py-20 bg-white!">
      <div className="mx-auto max-w-xl px-6 md:px-8 pt-6 pb-10 font-inter">
        <div className="space-y-6 text-sm leading-normal text-[#23254E]">
          <p>{copy.osm.question}</p>

          <p>
            {copy.osm.sourcesBefore} <strong>Infosiga-SP</strong>,{" "}
            {copy.osm.sourcesMiddle} <strong>OpenStreetMap</strong>,{" "}
            {copy.osm.sourcesAfter}
          </p>

          <p>
            <strong>{copy.osm.matchEmphasis}</strong> {copy.osm.matchRest}
          </p>

          <p>
            <strong>{copy.osm.segmentsEmphasis}</strong> {copy.osm.segmentsRest}
          </p>

          <p>
            {copy.osm.chartLead} <strong>{copy.osm.chartEmphasis}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
