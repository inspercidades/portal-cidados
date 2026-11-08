"use client";

import StoryFooter from "@/app/[lang]/(app)/historias/components/StoryFooter";
import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";

export default function Footer() {
  const copy = useStoryCopy<FaixaAzulCopy>();
  const study = copy.footer.teams.study;
  const dataviz = copy.footer.teams.dataviz;

  return (
    <StoryFooter
      studyDetail={{
        description: copy.footer.study.description,
        descriptionHref:
          "https://repositorio.insper.edu.br/entities/publication/36ec3e70-30bd-4c24-92bb-515e18f233be",
        organization: copy.footer.study.organization,
        documentType: copy.footer.study.documentType,
        year: 2025,
      }}
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: copy.footer.logos.center,
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: copy.footer.logos.portal,
          href: "/",
        },
      ]}
      // parceiros={[
      //   {
      //     src: redesMare.src,
      //     alt: "Redes da Maré",
      //     href: "https://www.redesdamare.org.br/",
      //     className: "h-14 lg:h-18 w-auto brightness-0 invert",
      //   },
      // ]}
      teams={[
        {
          title: study.title,
          members: [
            {
              role: study.authors,
              names:
                "Adriano Borges Costa, Adriano Dutra, Gustavo Theil, Júlio Mugnol",
            },
            {
              role: study.observatory,
              names: "Sérgio Avelleda, Helena Coelho",
            },
            {
              role: study.assistance,
              names: "Mariah Gomes",
            },
          ],
        },
        {
          title: dataviz.title,
          members: [
            { role: dataviz.coordinator, names: "Maurício Bouskela" },
            { role: dataviz.writer, names: "Caio Jacintho" },
            { role: dataviz.dataScientist, names: "Vinicius Oike" },
            { role: dataviz.designer, names: "Pedro Meneghel" },
            { role: dataviz.development, names: "Lucas Tavares" },
          ],
        },
      ]}
      databases={[
        {
          title: copy.footer.databases[0],
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/IRGJPX",
        },
        {
          title: copy.footer.databases[1],
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/XA5PFG",
        },
        {
          title: copy.footer.databases[2],
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/A4AC1I",
        },
      ]}
    />
  );
}
