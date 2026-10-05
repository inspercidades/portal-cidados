import StoryFooter from "@/app/(app)/historias/components/StoryFooter";
import umaneLogo from "../assets/logo-umane.svg";

export default function Footer() {
  return (
    <StoryFooter
      studyDetail={{
        description:
          "Síntese de evidências sobre saúde no município de São Paulo",
        descriptionHref:
          "https://repositorio.insper.edu.br/entities/publication/ea858305-5977-4b80-891a-814308784504",
        documentType: "Relatório Técnico de Pesquisa",
        institution: "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
        extraLines: ["Iniciativa de Saúde Urbana"],
        year: 2024,
      }}
      databases={[
        {
          title: "Mortalidade prematura por distrito de São Paulo [2019]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/JJ8JIN",
        },
        {
          title: "Gastos com UBS por distrito de São Paulo [2019]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/YZBSBF",
        },
      ]}
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
          src: umaneLogo.src,
          alt: "Umane",
          href: "https://umane.org.br/",
          className: "h-5 lg:h-7 w-auto brightness-0 invert",
        },
      ]}
      teams={[
        {
          title: "Equipe do estudo",
          members: [
            {
              role: "Autores",
              names:
                "Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Catia Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de André",
            },
          ],
        },
        {
          title: "Equipe do dataviz",
          members: [
            {
              role: "Coordenador Executivo",
              names: "Maurício Bouskela e Adriano Borges Costa",
            },
            { role: "Roteirista", names: "Caio Jacintho" },
            { role: "Designer", names: "Pedro Meneghel" },
            { role: "Desenvolvimento", names: "Lucas Tavares" },
            {
              role: "Voz/Composição da faixa Bônus",
              names: "Rafael Gomes da Silva",
            },
          ],
        },
      ]}
    />
  );
}
