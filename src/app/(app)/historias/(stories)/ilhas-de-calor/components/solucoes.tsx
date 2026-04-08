import mareMapaImage from '../assets/mare-mapa.png';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';
import s6 from '../assets/s6.png';
import s7 from '../assets/s7.png';
import s8 from '../assets/s8.png';
import s9 from '../assets/s9.png';
import s10 from '../assets/s10.png';
import s11 from '../assets/s11.png';
import s12 from '../assets/s12.png';
import { SectionCover } from './section-cover';
import { SolucoesScroll, type SolucaoItem } from './solucoes-scroll';

// TODO: Substitua estas imagens e textos pelos dados reais das 12 soluções
const solucoesItems: SolucaoItem[] = [
  {
    image: s1, // Substitua pela imagem da solução 1
    text: 'IMPLEMENTAÇÃO DE ESPAÇOS VERDES',
    description: 'Desenvolver e expandir áreas verdes, parques e/ou jardins: incentivar e promover a arborização urbana e criação de corredores ecológicos; recuperar áreas de mangue.',
    textPosition: 'top-left',
  },
  {
    image: s2, // Substitua pela imagem da solução 2
    text: 'IMPLEMENTAÇÃO DE ESPAÇOS VERDES',
    description: 'Desenvolver e expandir áreas verdes, parques e/ou jardins: incentivar e promover a arborização urbana e criação de corredores ecológicos; recuperar áreas de mangue.',
    textPosition: 'top-left',
  },
  {
    image: s3, // Substitua pela imagem da solução 3
    text: 'REMODELAGEM DO SOLO URBANO',
    description: ' Restringir o uso excessivo de asfalto e concreto e estimular práticas alternativas, principalmente, voltadas para a permeabilidade do solo.',
    textPosition: 'top-right',
  },
    {
      image: s4, // Substitua pela imagem da solução 4
      text: 'REMODELAGEM DO SOLO URBANO',
      description: ' Restringir o uso excessivo de asfalto e concreto e estimular práticas alternativas, principalmente, voltadas para a permeabilidade do solo.',  
      textPosition: 'top-right',
    },
    {
      image: s5, // Substitua pela imagem da solução 5
      text: 'AÇÕES DE ADAPTAÇÃO CLIMÁTICA',
      description: 'Projetar e desenvolver mecanismos que garantam o pleno acesso a melhores habitações: estratégias de combate ao calor extremo, utilizar o uso de materiais de construção sustentáveis, rever tecnologias como telhados verdes, fachadas permeáveis, entre outras.',
      textPosition: 'top-left',
    },
    {
      image: s6, // Substitua pela imagem da solução 6
      text: 'AÇÕES DE ADAPTAÇÃO CLIMÁTICA',
      description: 'Projetar e desenvolver mecanismos que garantam o pleno acesso a melhores habitações: estratégias de combate ao calor extremo, utilizar o uso de materiais de construção sustentáveis, rever tecnologias como telhados verdes, fachadas permeáveis, entre outras.',
      textPosition: 'top-left',
    },
    {
      image: s7, // Substitua pela imagem da solução 7
      text: 'GESTÃO APROPRIADA DOS RESÍDUOS',
      description:'Acréscimo de pessoas ao quadro de funcionários da Comlurb para atender a população da Maré; remoção dos pontos de acúmulo de lixo no interior da favela; estruturar locais adequados para a disposição do lixo.',
      textPosition: 'top-right',
    },
    {
      image: s8, // Substitua pela imagem da solução 8
      text: 'GESTÃO APROPRIADA DOS RESÍDUOS',
      description:'Acréscimo de pessoas ao quadro de funcionários da Comlurb para atender a população da Maré; remoção dos pontos de acúmulo de lixo no interior da favela; estruturar locais adequados para a disposição do lixo.',
      textPosition: 'top-right',
    },
    {
      image: s9, // Substitua pela imagem da solução 9
      text: 'MONITORAMENTO E PESQUISA CONTÍNUA',
      description:'Estabelecer uma rede complementar de monitoramento climático e de qualidade do ar, investir em pesquisa para avaliar constantemente os impactos de políticas climáticas implantadas, investimento em tecnologias modernas para análise em tempo real e divulgação transparente dos resultados;',
      textPosition: 'bottom-right',
    },
    {
      image: s10, // Substitua pela imagem da solução 10
      text: 'MONITORAMENTO E PESQUISA CONTÍNUA',
      description:'Estabelecer uma rede complementar de monitoramento climático e de qualidade do ar, investir em pesquisa para avaliar constantemente os impactos de políticas climáticas implantadas, investimento em tecnologias modernas para análise em tempo real e divulgação transparente dos resultados;',
      textPosition: 'bottom-right',
    },
    {
      image: s11, // Substitua pela imagem da solução 11
      text: 'PLANEJAMENTO URBANO INTEGRADO',
      description:'Desenvolver planos locais de mitigação das ilhas de calor e diminuição da poluição do ar, os articulando e inserindo nos projetos e programas governamentais já em desenvolvimento',
      textPosition: 'top-right',
    },
    {
      image: s12, // Substitua pela imagem da solução 12
      text: 'PLANEJAMENTO URBANO INTEGRADO',
      description:'Desenvolver planos locais de mitigação das ilhas de calor e diminuição da poluição do ar, os articulando e inserindo nos projetos e programas governamentais já em desenvolvimento',
      textPosition: 'top-right',
    },
];

export function Solucoes() {
  return (
    <div className="w-full bg-white">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <div className="mb-30">
      <SectionCover
        title={<><strong>Soluções</strong></>}
        image={mareMapaImage}
        imageAlt="Mapa da Maré"
        sticky={false}
        grayscaleOpacity={1}
      />
      </div>
      
      {/* Componente de scrollytelling com 12 imagens */}
      <SolucoesScroll items={solucoesItems} />
    </div>
  );
}
