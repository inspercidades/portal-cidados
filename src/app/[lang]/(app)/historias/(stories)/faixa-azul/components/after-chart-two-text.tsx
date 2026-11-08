"use client";

import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";

export default function AfterChartTwoText() {
  const copy = useStoryCopy<FaixaAzulCopy>();

  return (
    <section className="w-full py-20 bg-white!">
      <div className="mx-auto max-w-xl px-6 md:px-8 pt-6 pb-10 font-inter">
        <div className="space-y-6 text-sm leading-normal text-[#23254E]">
          <p>
            <strong>{copy.afterChart.methodEmphasis}</strong>{" "}
            {copy.afterChart.methodRest}
          </p>

          <p>
            <strong>{copy.afterChart.resultEmphasis}</strong>{" "}
            {copy.afterChart.resultRest}
          </p>

          <p>{copy.afterChart.meaning}</p>

          <p>{copy.afterChart.next}</p>
        </div>
      </div>
    </section>
  );
}
