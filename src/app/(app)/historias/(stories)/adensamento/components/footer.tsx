import StoryFooter from "@/app/(app)/historias/components/StoryFooter";

export default function Footer() {
  return (
    <StoryFooter
      studyDetail={{
        description:
          "Para o bem ou para o mal: Análise da capacidade que o governo tem de controlar a densidade habitacional",
        descriptionHref:
          "https://repositorio.insper.edu.br/entities/publication/66419ce4-82d4-4625-9391-20adbddd1709",
        // organization: "Gustavo Theil",
        documentType: "Relatório de Iniciação Científica",
        institution: "Insper Instituto de Ensino e Pesquisa",
        extraLines: ["Ciências Econômicas"],
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
      teams={[
        {
          title: "Equipe do estudo",
          members: [
            { role: "Autor", names: "Gustavo Theil" },
            { role: "Orientador", names: "Adriano Borges Costa" },
          ],
        },
        {
          title: "Equipe do dataviz",
          members: [
            { role: "Coordenador Executivo", names: "Maurício Bouskela" },
            { role: "Roteirista", names: "Caio Jacintho" },
            { role: "Cientista de dados", names: "Vinicius Oike" },
            { role: "Designer", names: "Pedro Meneghel" },
            {
              role: "Desenvolvimento",
              names: "Renan Rodrigues, Lucas Tavares",
            },
          ],
        },
      ]}
      databases={[
        {
          title: "IPTU e verticalização, São Paulo [2024]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TOXCRF",
        },
        {
          title:
            "Densidade populacional e verticalização de imóveis em São Paulo [2022, 2024]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/90SSHM",
        },
        {
          title:
            "Grade de densidade populacional e habitacional, São Paulo [2022, 2024]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/4QNTOT",
        },
        {
          title:
            "População, domicílios e densidade populacional por setor censitário [2022]",
          href: "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/GTO7DD",
        },
      ]}
    />
  );
}
