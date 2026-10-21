export interface Collaborator {
  id: string;
  name: string;
  function: string;
  email: string;
  image: string;
  linkedin: string;
}

export const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "Tomas Alvin",
    function: "Coordenador",
    email: "tomasammpa@insper.edu.br",
    image: "/collaborators/tomas-alvin.png",
    linkedin: "https://www.linkedin.com/in/tomas-alvim-6b935a47/",
  },
  {
    id: "2",
    name: "Adriano Borges",
    function: "Coordenador",
    email: "adrianobfc@insper.edu.br",
    image: "/collaborators/adriano-borges.png",
    linkedin: "https://www.linkedin.com/in/adrianoborgescosta/",
  },
  {
    id: "3",
    name: "Mauricio Bouskela",
    function: "Coordenador",
    email: "mauriciosb4@insper.edu.br",
    image: "/collaborators/mauricio.png",
    linkedin: "https://www.linkedin.com/in/mauriciobouskela/",
  },
  {
    id: "4",
    name: "Rinaldo Gama",
    function: "Coordenador",
    email: "rinaldog@insper.edu.br",
    image: "/collaborators/rinaldo.png",
    linkedin: "https://www.linkedin.com/in/rinaldo-gama-36489870/",
  },
  {
    id: "5",
    name: "Caio Jacintho",
    function: "Coordenador",
    email: "caioraj@insper.edu.br",
    image: "/collaborators/caio.png",
    linkedin: "https://www.linkedin.com/in/caio-jacintho/",
  },
  {
    id: "6",
    name: "Vinícius Oike",
    function: "Cientista de dados",
    email: "viniciusor@insper.edu.br",
    image: "/collaborators/vinicios.png",
    linkedin: "https://www.linkedin.com/in/vinicius-oike-reginatto-993826a9/",
  },
  {
    id: "7",
    name: "Lucas Tavares",
    function: "Desenvolvedor",
    email: "lucas.tavares@insper.edu.br",
    image: "/collaborators/lucas-tavares.png",
    linkedin: "https://www.linkedin.com/in/lucastavarex/",
  },
  {
    id: "8",
    name: "Pedro Meneghel",
    function: "Designer",
    email: "pedro.machado.meneghel@gmail.com",
    image: "/collaborators/doca.png",
    linkedin: "https://www.linkedin.com/in/pedro-m-25a845b6/",
  },
];

export function getCollaborators(): Collaborator[] {
  return collaborators;
}
