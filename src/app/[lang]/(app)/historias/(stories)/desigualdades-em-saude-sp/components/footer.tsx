"use client";

import StoryFooter from "@/app/[lang]/(app)/historias/components/StoryFooter";
import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import umaneLogo from "../assets/logo-umane.svg";

export default function Footer() {
  const copy = useStoryCopy<SaudeCopy>();

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
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: copy.footer.centerAlt,
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: copy.footer.portalAlt,
          href: "/",
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
