import StoryFooter from "@/app/(app)/historias/components/StoryFooter";
import redesMare from "../assets/redes_mare.png";

export default function Footer() {
  return (
    <StoryFooter
      studyDetail={{
        description:
          "Diagnóstico sobre ilhas de calor e qualidade do ar nas 16 favelas da Maré",
        descriptionHref:
          "https://www.redesdamare.org.br/media/downloads/arquivos/RespiraMareRelatorio.pdf",
        organization: "Redes da Maré",
        documentType: "Relatório Técnico de Pesquisa",
        year: 2024,
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
      parceiros={[
        {
          src: redesMare.src,
          alt: "Redes da Maré",
          href: "https://www.redesdamare.org.br/",
          className: "h-14 lg:h-18 w-auto brightness-0 invert",
        },
      ]}
      teams={[
        {
          title: "Equipe do estudo",
          members: [
            {
              role: "Coordenação geral",
              names:
                "Carolina Dias, Luna Arouca, Rian de Queiroz e Shyrlei Rosendo",
            },
            {
              role: "Pesquisador e coordenador de campo",
              names: "Rian de Queiroz",
            },
            {
              role: "Pesquisadores consultores",
              names:
                "Otavio Ranzani, Carolina Hartmann Galeazzi e Fernando Bozza",
            },
            {
              role: "Sistematização do conteúdo e produção dos mapas",
              names: "Rian de Queiroz",
            },
            { role: "Analista de dados", names: "Soraida Aguilar" },
            {
              role: "Agentes ambientais",
              names:
                "Bianca de Lima Teixeira, Luis Carlos Soares da Costa, Marcela Santos de Melo, Maria Eduarda Souza Neves",
            },
            {
              role: "Assistente de campo",
              names: "Diana de Souza Beserra",
            },
            {
              role: "Identidade visual",
              names: "Robert dos Santos da Silva",
            },
          ],
        },
        {
          title: "Equipe do dataviz",
          members: [
            // { role: "Design", names: "Pictomonster" },
            {
              role: "Coordenador executivo",
              names: "Maurício Bouskela e Adriano Borges Costa",
            },
            { role: "Roteirista", names: "Caio Jacintho" },
            { role: "Tratamento de dados", names: "Vinicius Oike" },
            { role: "Designer", names: "Pedro Meneghel" },
            { role: "Desenvolvimento", names: "Lucas Tavares" },
          ],
        },
      ]}
      databases={[
        {
          title: "Qualidade do Ar - Favela da Maré [2023]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/OICDGN",
        },
        {
          title: "Ilhas de Calor - Favela da Maré [2023]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/NQA7LY",
        },
      ]}
    />
  );
}
