import type { Metadata } from "next";
import { StoryJsonLd } from "@/components/story-json-ld";
import { buildMetadata } from "@/lib/seo";
import DesigualdadesEmSaudeSp from "./story-client";

export const metadata: Metadata = buildMetadata({
  title: "Desigualdades em saúde no município de São Paulo",
  description:
    "Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes",
  path: "/historias/desigualdades-em-saude-sp",
  image: "/assets/viz2/viz2.1.png",
  type: "article",
  keywords: [
    "desigualdades em saúde",
    "mortalidade",
    "São Paulo",
    "determinantes socioeconômicos",
  ],
});

export default function Page() {
  return (
    <>
      <StoryJsonLd
        title="Desigualdades em saúde no município de São Paulo"
        description="Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes"
        path="/historias/desigualdades-em-saude-sp"
        image="/assets/viz2/viz2.1.png"
      />
      <DesigualdadesEmSaudeSp />
    </>
  );
}
