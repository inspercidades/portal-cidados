import StoryFooter from "@/app/(app)/historias/components/StoryFooter";

export default function Footer() {
  return (
    <StoryFooter
      studyDetail={{
        description:
          "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
        descriptionHref:
          "https://repositorio-api.insper.edu.br/server/api/core/bitstreams/22b8cdce-8168-45ea-afba-14aaa1fd7b46/content",
        organization: "Relatório Técnico de Pesquisa",
        documentType: "Insper Instituto de Ensino e Pesquisa",
        year: 2025,
      }}
      realizacao={[
        {
          src: "/centro_estudos_cidades.png",
          alt: "Centro de Estudos das Cidades",
          href: "https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
        {
          src: "/portal_cidados_icon.png",
          alt: "Portal Cidados",
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
          title: "Equipe do estudo",
          members: [
            {
              role: "Autores",
              names:
                "Adriano Borges Costa, Adriano Dutra, Gustavo Theil, Júlio Mugnol",
            },
            {
              role: "Equipe do Observatório Nacional de Mobilidade Sustentável",
              names: "Sérgio Avelleda, Helena Coelho",
            },
            {
              role: "Assistência de Pesquisa",
              names: "Mariah Gomes",
            },
          ],
        },
        {
          title: "Equipe do dataviz",
          members: [
            { role: "Coordenador Executivo", names: "Maurício Bouskela" },
            { role: "Roteirista", names: "Caio Jacintho" },
            { role: "Designer", names: "Pedro Meneghel" },
            { role: "Desenvolvimento", names: "Lucas Tavares" },
          ],
        },
      ]}
      databases={[
        {
          title: "Sinistros de Trânsito [2022-2025]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/A4AC1I",
        },
        {
          title: "Sinistros de Trânsito Agregados por Via [2022-2025]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/XA5PFG",
        },
        {
          title:
            "Trechos com Faixas Dedicadas a Motociclistas (Faixa Azul) [2025]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/IRGJPX",
        },
      ]}
    />
  );
}
