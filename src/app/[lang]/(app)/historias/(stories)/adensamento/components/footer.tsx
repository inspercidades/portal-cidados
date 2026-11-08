"use client";

import StoryFooter from "@/app/[lang]/(app)/historias/components/StoryFooter";
import type { AdensamentoCopy } from "@/i18n/messages/stories/adensamento";
import { useStoryCopy } from "@/i18n/story-copy";

export default function Footer() {
  const copy = useStoryCopy<AdensamentoCopy>();
  const footer = copy.footer;

  return (
    <StoryFooter
      studyDetail={{
        description: footer.description,
        descriptionHref:
          "https://repositorio.insper.edu.br/entities/publication/66419ce4-82d4-4625-9391-20adbddd1709",
        // organization: "Gustavo Theil",
        documentType: footer.documentType,
        institution: footer.institution,
        extraLines: [footer.program],
        year: 2024,
      }}
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: footer.centerAlt,
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: footer.portalAlt,
          href: "/",
        },
      ]}
      teams={[
        {
          title: footer.studyTeam,
          members: [
            { role: footer.author, names: "Gustavo Theil" },
            { role: footer.advisor, names: "Adriano Borges Costa" },
          ],
        },
        {
          title: footer.vizTeam,
          members: [
            { role: footer.coordinator, names: "Maurício Bouskela" },
            { role: footer.writer, names: "Caio Jacintho" },
            { role: footer.dataScientist, names: "Vinicius Oike" },
            { role: footer.designer, names: "Pedro Meneghel" },
            {
              role: footer.development,
              names: "Renan Rodrigues, Lucas Tavares",
            },
          ],
        },
      ]}
      databases={[
        {
          title: footer.dbIptu,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TOXCRF",
        },
        {
          title: footer.dbPop,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/90SSHM",
        },
        {
          title: footer.dbGrid,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/4QNTOT",
        },
        {
          title: footer.dbCensus,
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/GTO7DD",
        },
      ]}
    />
  );
}
