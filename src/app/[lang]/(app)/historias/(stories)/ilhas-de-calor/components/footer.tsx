"use client";

import StoryFooter from "@/app/[lang]/(app)/historias/components/StoryFooter";
import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import redesMare from "../assets/redes_mare.png";

export default function Footer() {
  const copy = useStoryCopy<IlhasCopy>();
  const study = copy.footer.studyTeam;
  const viz = copy.footer.vizTeam;

  return (
    <StoryFooter
      studyDetail={{
        description: copy.footer.description,
        descriptionHref:
          "https://www.redesdamare.org.br/media/downloads/arquivos/RespiraMareRelatorio.pdf",
        organization: copy.footer.organization,
        documentType: copy.footer.documentType,
        year: 2024,
      }}
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: copy.footer.logos.centro,
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: copy.footer.logos.portal,
          href: "/",
        },
      ]}
      parceiros={[
        {
          src: redesMare.src,
          alt: copy.footer.logos.redes,
          href: "https://www.redesdamare.org.br/",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
      ]}
      teams={[
        {
          title: study.title,
          members: [
            {
              role: study.generalCoordination,
              names: study.coordinators,
            },
            {
              role: study.fieldResearcher,
              names: study.fieldResearcherName,
            },
            {
              role: study.consultingResearchers,
              names: study.consultants,
            },
            {
              role: study.maps,
              names: study.mapsName,
            },
            { role: study.dataAnalyst, names: study.dataAnalystName },
            {
              role: study.environmentalAgents,
              names: study.agents,
            },
            {
              role: study.fieldAssistant,
              names: study.fieldAssistantName,
            },
            {
              role: study.visualIdentity,
              names: study.visualIdentityName,
            },
          ],
        },
        {
          title: viz.title,
          members: [
            // { role: "Design", names: "Pictomonster" },
            {
              role: viz.executiveCoordinator,
              names: viz.executiveNames,
            },
            { role: viz.writer, names: viz.writerName },
            { role: viz.dataScientist, names: viz.dataScientistName },
            { role: viz.designer, names: viz.designerName },
            { role: viz.development, names: viz.developmentName },
          ],
        },
      ]}
      databases={[
        {
          title: copy.footer.database,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TONMVQ",
        },
      ]}
    />
  );
}
