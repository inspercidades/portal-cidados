export interface Collaborator {
  id: string;
  name: string;
  function: string;
  email: string;
  image: string;
}

export const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "Tomas Alvin",
    function: "Coordenador",
    email: "tomasammpa@insper.edu.br",
    image: "/collaborators/tomas-alvin.png",
  },
  {
    id: "2",
    name: "Adriano Borges",
    function: "Coordenador",
    email: "adrianobfc@insper.edu.br",
    image: "/collaborators/adriano-borges.png",
  },
  {
    id: "3",
    name: "Mauricio Bouskela",
    function: "Coordenador",
    email: "mauriciosb4@insper.edu.br",
    image: "/collaborators/mauricio.png",
  },
  {
    id: "4",
    name: "Rinaldo Gama",
    function: "Coordenador",
    email: "rinaldog@insper.edu.br",
    image: "/collaborators/rinaldo.png",
  },
  {
    id: "5",
    name: "Caio Jacintho",
    function: "Coordenador",
    email: "caioraj@insper.edu.br",
    image: "/collaborators/caio.png",
  },
  {
    id: "6",
    name: "Vinícios Oike",
    function: "Cientista de dados",
    email: "viniciusor@insper.edu.br",
    image: "/collaborators/vinicios.png",
  },
  {
    id: "7",
    name: "Lucas Tavares",
    function: "Desenvolvedor",
    email: "lucas.tavares@insper.edu.br",
    image: "/collaborators/lucas-tavares.png",
  },
];

export function getCollaborators(): Collaborator[] {
  return collaborators;
}
