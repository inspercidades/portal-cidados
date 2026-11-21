"use client";

import StoryFooter, {
  toGeoreferencedEntries,
} from "@/app/[lang]/(app)/historias/components/StoryFooter";
import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import { useLocale } from "@/i18n/use-locale";
import umaneLogo from "../assets/logo-umane.svg";

const georeferencedLayers = [
  { city: "São Paulo", id: "geoses-spo" },
  { city: "São Paulo", id: "mortalidade_materna_fem" },
  { city: "São Paulo", id: "isquemicas_coracao_masc" },
  { city: "São Paulo", id: "isquemicas_coracao_fem" },
  { city: "São Paulo", id: "cerebrovasculares_masc" },
  { city: "São Paulo", id: "cerebrovasculares_fem" },
  { city: "São Paulo", id: "diabetes_masc" },
  { city: "São Paulo", id: "diabetes_fem" },
];

const scripts = [
  {
    title: "Lorem ipsum dolor sit amet",
    href: "https://github.com/lorem-ipsum/lorem-ipsum",
  },
];

export default function Footer() {
  const copy = useStoryCopy<SaudeCopy>();
  const locale = useLocale();

  return (
    <StoryFooter
      studyDetail={{
        description: copy.footer.description,
        descriptionHref:
          "https://repositorio.insper.edu.br/entities/publication/ea858305-5977-4b80-891a-814308784504",
        documentType: copy.footer.documentType,
        institution: copy.footer.institution,
        extraLines: [copy.footer.urbanHealth],
        year: 2024,
      }}
      databases={[
        {
          title: copy.footer.mortalityDb,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/CDXI9B",
        },
        {
          title: copy.footer.geosesDb,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/7IXFPX",
        },
      ]}
      georeferenced={toGeoreferencedEntries(locale, georeferencedLayers)}
      scripts={scripts}
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: copy.footer.centerAlt,
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          width: 1505,
          height: 588,
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: copy.footer.portalAlt,
          href: "/",
          width: 699,
          height: 224,
        },
      ]}
      parceiros={[
        {
          src: umaneLogo.src,
          alt: copy.footer.umaneAlt,
          href: "https://umane.org.br/",
          className: "h-5 lg:h-7 w-auto brightness-0 invert",
        },
      ]}
      teams={[
        {
          title: copy.footer.studyTeam,
          members: [
            {
              role: copy.footer.authorsRole,
              names: copy.footer.authors,
            },
          ],
        },
        {
          title: copy.footer.datavizTeam,
          members: [
            {
              role: copy.footer.executiveRole,
              names: copy.footer.executiveNames,
            },
            { role: copy.footer.writerRole, names: copy.footer.writerNames },
            { role: copy.footer.dataRole, names: copy.footer.dataNames },
            {
              role: copy.footer.designerRole,
              names: copy.footer.designerNames,
            },
            { role: copy.footer.devRole, names: copy.footer.devNames },
            {
              role: copy.footer.bonusRole,
              names: copy.footer.bonusNames,
            },
          ],
        },
      ]}
    />
  );
}
