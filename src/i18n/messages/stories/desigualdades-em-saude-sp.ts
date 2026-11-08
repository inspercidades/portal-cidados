import "server-only";

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };

const pt = {
  cover: {
    shareTitle: "Retrato das Desigualdades em Saúde no Município de São Paulo",
    shareText:
      "Confira o estudo sobre riscos de mortalidade e determinantes socioeconômicos no Município de São Paulo.",
    copied: "Link copiado para a área de transferência!",
    shareError: "Erro ao compartilhar:",
    title:
      "Retrato das Desigualdades em Saúde: Riscos de Mortalidade e Determinantes Socioeconômicos no Município de São Paulo",
    byline:
      "Estudo desenvolvido por Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Cátia Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de André.",
    share: "Compartilhar",
  },
  hint: {
    continue: "Continue descendo",
    close: "Fechar",
  },
  intro: {
    title: "Diabetes mellitus (DM)",
    p1Before:
      "É uma doença causada pela produção insuficiente ou má absorção de insulina, hormônio que regula a glicose no sangue e garante energia para o organismo. O diabetes pode causar o aumento da glicemia e as altas taxas podem levar a complicações no coração, nas artérias, nos olhos, nos rins e nos nervos.",
    p1Emph: "Em casos mais graves, o diabetes pode levar à morte.",
    source: "Ministério da Saúde – Gov.BR",
    p2Before: "O diabetes mellitus é uma condição que afeta",
    p2World: "537 milhões de pessoas em todo o mundo,",
    p2Mid: "representando cerca de",
    p2Global: "6,8% da população global.",
    p2BrazilBefore:
      "No Brasil, o impacto é igualmente significativo, com aproximadamente",
    p2Brazil: "16,8 milhões de pessoas – 7,9% da população",
    p2After:
      "– convivendo com a doença, segundo a Federação Internacional de Diabetes.",
    p3Before:
      "Apesar dos avanços no tratamento e no acesso a medicamentos, a gestão do diabetes ainda enfrenta",
    p3Emph:
      "desafios consideráveis, profundamente influenciados pelas desigualdades sociais.",
    p4Before: "A qualidade da",
    p4Emph1:
      "saúde da população é influenciada por determinantes sociais e econômicos",
    p4Mid:
      "variados, como condições de habitação (e sua localização geográfica), educação, renda, pobreza, riqueza, mobilidade e saneamento básico. Assim, os desafios de saúde atingem a população de forma desigual e",
    p4Emph2:
      "intervenções direcionadas a regiões de maior risco têm o potencial de reduzir o risco de morte",
    p4After: "na maioria das faixas etárias.",
    p5Emph: "Mas o que são áreas de risco mais elevado?",
    p5After:
      "Como podemos identificá-las? O estudo que mostramos a seguir responde a essas questões com uma análise detalhada de dados espaço-temporais dos últimos 10 anos (2013-2023) abrangendo os 96 distritos do município de São Paulo.",
    p6Before:
      "Para contribuir com a melhoria da saúde em São Paulo, este estudo busca",
    p6Emph:
      "identificar áreas de maior risco epidemiológico para as principais causas de mortalidade materna, doenças cardiovasculares e cerebrovasculares e diabetes mellitus,",
    p6After:
      "além de investigar as regiões prioritárias para intervenções. Essas análises visam subsidiar políticas direcionadas para a saúde pública no Brasil, devido à sua alta prevalência, mortalidade e impactos na qualidade de vida e saúde.",
  },
  diseasesIntro: {
    p1Before:
      "A história da personagem fictícia que apresentamos reflete a realidade de muitos brasileiros: acordar cedo, enfrentar ônibus lotados, perder horas no deslocamento até o trabalho, não praticar exercícios e ter pouco ou nenhum tempo para o lazer.",
    p1Emph:
      "Uma rotina exaustiva e repetitiva que impacta diretamente a saúde e a qualidade de vida das pessoas.",
    p2: "O cenário atual exige novas abordagens no campo da saúde. Não se trata apenas de melhorar a saúde das populações urbanas em si, mas de expandir sua definição para abranger um conjunto integrado de processos e iniciativas que promovam a funcionalidade e a sustentabilidade do complexo ecossistema urbano como um todo.",
    p3Before:
      "Ao reconhecer o ser humano como parte integrante de um ecossistema complexo,",
    p3Emph1:
      "torna-se evidente que o equilíbrio sustentável do ambiente urbano é essencial para promover a saúde de seus habitantes.",
    p3Mid: "Nessa perspectiva, consolida-se a ideia de que",
    p3Emph2:
      "a saúde humana está intrinsecamente ligada à qualidade do meio em que se vive,",
    p3After:
      "considerando fatores como o acesso a áreas verdes, disponibilidade de infraestrutura básica e a localização estratégica em relação a serviços essenciais.",
    p4: "A história da personagem apresentada até aqui exemplifica a relação entre o ambiente urbano e a saúde dos moradores da periferia de São Paulo, uma realidade que se repete em diversas metrópoles brasileiras.",
    p5: "Como mencionado anteriormente, este estudo não se limitou à identificação das áreas de risco relacionadas ao diabetes mellitus. A seguir, serão apresentadas as informações mais relevantes sobre as demais doenças analisadas: mortalidade materna (incluindo mortalidade fetal), mortalidade prematura cardiovascular (subdividida em doenças cerebrovasculares e isquêmicas do coração) e mortalidade prematura por diabetes mellitus.",
    p6: "No entanto, os desafios de saúde atingem a população de forma desigual. Portanto, a intervenção direcionada às populações em áreas de maior risco tem o potencial de reduzir o risco de morte na maioria das faixas etárias.",
  },
  scrolly: {
    legendTitle: "Índice GeoSES",
    legendNote:
      "Pondera dados censitários de renda, educação, qualidade de vida e similares.",
    source: "Fonte: Barrozo, L. V. et al. (2020).",
    avPaulista: "Av. Paulista",
    surroundings: "Entorno",
    jardimHelena: "Jardim Helena",
    neighborhood: "Bairro",
    card0Lead: "A desigualdade existente do município de São Paulo",
    card0Mid:
      "pode ser visualizada de forma clara por meio do Índice GeoSES, que resume as",
    card0Conditions:
      "condições socioeconômicas vividas nas diferentes regiões da cidade.",
    card0Rest:
      "Este mapa, com dados de 2010, revela como fatores como renda, educação e infraestrutura urbana estão distribuídos de maneira desigual na cidade. As áreas em azul indicam regiões com melhores condições socioeconômicas, enquanto as áreas em vermelho representam regiões com maior vulnerabilidade.",
    card1Before: "Notamos a",
    card1Neighborhoods: "desigualdade entre os bairros",
    card1Mid1: "à medida que nos afastamos progressivamente das",
    card1Center: "regiões centrais da cidade,",
    card1Mid2: "como a",
    card1Paulista: "Avenida Paulista,",
    card1Mid3: "e nos aproximamos da",
    card1Periphery: "periferia,",
    card1Mid4: "como o bairro do",
    card1Helena: "Jardim Helena,",
    card1After: "na Zona Leste de São Paulo.",
    card2Before: "A seguir, contaremos a",
    card2Maria: "história de Maria,",
    card2Mid: "que",
    card2Lives: "mora no Jardim Helena.",
    card2After:
      "Este é um caso hipotético, mas muito comum na realidade paulistana.",
  },
  house: {
    alt: "House illustration",
    card0Before:
      "O dia começa cedo: às 4h da manhã, Maria já está de pé para preparar o café das crianças e tomar um banho rápido antes de sair.",
    card0Meal:
      "Como o tempo é curto, a primeira refeição do dia não é feita como deveria.",
    card0Food:
      "Os alimentos ultraprocessados, como achocolatados e biscoitos recheados, tomam o lugar das frutas, dos ovos e do suco caseiro.",
    card0DiabetesBefore: "Maria tem",
    card0Diabetes: "diabetes mellitus",
    card0DiabetesAfter:
      "e precisa medir sua glicose diariamente, mas sua rotina é tão corrida que nem sempre ela consegue fazer isso como deveria.",
    card1Before:
      "Às 5h30, Maria já está no ponto de ônibus. Duas conduções e quase duas horas depois, ela chega ao trabalho no centro da cidade.",
    card1Emph:
      "O trajeto diário de Maria ilustra a realidade de milhões de brasileiros que vivem nas periferias das grandes cidades.",
    card3Before: "Às 5h30,",
    card3Bus: "Maria pega o ônibus em direção ao trabalho.",
    card3Mid: "São",
    card3Hours: "duas horas de viagem",
    card3After:
      "até o Jardim Paulista, um bairro de classe média alta próximo à Avenida Paulista.",
  },
  market: {
    altMarket: "Supermercado illustration",
    altMarketTwo: "Supermercado Two illustration",
    altHospital: "Hospital Reception illustration",
    notSignificant: "Não significativo",
    drawerTitle:
      "Mortalidade por doenças cerebrovasculares entre as mulheres, de 2010 a 2019: probabilidades de excedência de que o risco em 2019 fosse superior a 1",
    legendTitle: "Probabilidade de excedência (2019)",
    legendNote: "Probabilidade de o risco em 2019 ser superior a 1.",
    c0a: "Lá,",
    c0b: "Maria trabalha como caixa de supermercado.",
    c0c: "Todo dia, pontualmente às 8h da manhã, ela atende a Alice, que vai comprar pão e frutas para seu café da manhã.",
    c0d: "Alice mora no mesmo prédio onde fica a loja em que Maria trabalha.",
    c0e: "",
    c1a: "Recentemente,",
    c1b: "Alice sofreu um AVC",
    c1c: "(acidente vascular cerebral ou derrame), mas felizmente",
    c1d: "recebeu atendimento rápido",
    c1e: "em um hospital de excelência, localizado a poucos minutos de sua casa. Graças a isso, ela",
    c1f: "se recuperou sem maiores complicações.",
    c1g: "",
    c2a: "Se Alice morasse no Jardim Helena, a história poderia ser diferente.",
    c2b: "Este estudo mostra que, em bairros periféricos como o de Maria, a chance de um AVC ser fatal é significativamente maior devido à dificuldade de acesso a cuidados médicos de qualidade.",
    c3a: "Para a",
    c3b: "mortalidade prematura por doenças cerebrovasculares em mulheres,",
    c3c: "o estudo aponta um",
    c3d: "risco relativo significativamente elevado nos distritos do extremo leste e sul",
    c3e: "da cidade, assim como em Brasilândia e Cachoeirinha, conforme mostra este mapa.",
    c4a: "Enquanto Maria passa o dia trabalhando no mercado,",
    c4b: "Alice consegue ainda, antes de ir trabalhar, fazer uma caminhada em um parque",
    c4c: "próximo de sua casa.",
    c4d: "Uma pesquisa realizada nas cidades australianas de Sydney, Wollongong e Newcastle demonstrou que",
    c4e: "indivíduos com maior exposição a áreas verdes apresentaram menores prevalências de diabetes e hipertensão arterial.",
    c4f: "",
    c4g: "No Jardim Helena,",
    c4h: "Maria não tem esse privilégio, pois o bairro carece de espaços verdes",
    c4i: "adequados, o que também impacta sua saúde.",
    c5a: "O dia de trabalho de Maria termina e ela volta para sua casa com",
    c5b: "mais uma jornada de duas horas no transporte público.",
    c5c: "",
    c6a: "Depois de um dia intenso, Maria algumas vezes ainda precisa",
    c6b: "buscar os medicamentos para o diabetes",
    c6c: "na Farmácia Popular. Mas muitas vezes, devido ao trânsito e à longa distância, quando ela consegue chegar,",
    c6d: "a farmácia mais próxima de sua casa já se encontra fechada.",
    c6e: "",
    c7a: "Aos sábados, o dia é de descanso. Mas não para Maria.",
    c7b: "Ela tem que ir à unidade básica de saúde (UBS) mais próxima para realizar",
    c7c: "exames com um endocrinologista.",
    c7d: "Depois de uma",
    c7e: "longa espera,",
    c7f: "ela consegue ser atendida e volta para sua casa.",
  },
  conclusion: {
    title: "Conclusão",
    p1Before:
      "A história fictícia da Maria reflete a realidade de muitos brasileiros: acordar cedo, enfrentar ônibus lotados, perder horas no deslocamento até o trabalho, não praticar exercícios e ter pouco ou nenhum tempo para o lazer. Uma",
    p1Emph:
      "rotina exaustiva e repetitiva que impacta diretamente a saúde e a qualidade de vida",
    p1After: "das pessoas.",
    p2Before: "Neste contexto, são necessárias",
    p2Emph: "novas abordagens no campo da saúde.",
    p2After:
      "Não se trata apenas de tratar problemas de saúde das pessoas que vivem nas cidades, mas de expandir o olhar para as condições urbanas de vida dessas populações; bem como reconhecer que o planejamento urbano pode promover uma vida mais saudável para os moradores.",
    p3Before: "Nessa perspectiva, consolida-se a ideia de que",
    p3Emph:
      "a saúde humana está intrinsecamente ligada à qualidade do meio urbano em que se vive,",
    p3After:
      "considerando fatores como o acesso a áreas verdes, disponibilidade de infraestrutura básica e a localização estratégica em relação a serviços essenciais.",
    p4Before:
      "Este estudo explorou a distribuição regional em São Paulo e identificou as áreas de risco relacionadas a",
    p4Maternal: "mortalidade materna",
    p4Mid1: "(incluindo mortalidade fetal),",
    p4Cardio: "mortalidade prematura cardiovascular",
    p4Mid2:
      "(subdividida em doenças cerebrovasculares e isquêmicas do coração) e",
    p4Diabetes: "mortalidade prematura por diabetes mellitus.",
    p4After:
      "Com base nos dados levantados, por meio de novos estudos, é possível:",
    bullet1:
      "Identificar as áreas onde as ações do sistema de saúde devem ser priorizadas.",
    bullet2:
      "Entender como os fatores sociais e o ambiente urbano afetam o curso das doenças, seja de forma positiva ou negativa.",
    bullet3:
      "Mapear políticas locais que trouxeram melhorias na saúde e qualidade de vida, mesmo em cenários adversos.",
    bullet4:
      "Reconhecer e adaptar medidas eficazes de melhoria no sistema de saúde que podem ser aplicadas em outras regiões da cidade.",
    p5Before:
      "Além de abrir novas possibilidades para estudar e entender questões de saúde no contexto urbano, o estudo apresenta",
    p5Emph:
      "propostas práticas para enfrentar as desigualdades no acesso aos cuidados médicos.",
    p5After: "",
    proposals: "Propostas",
    ubsTitle: "UBS no sistema de transporte",
    ubsBody:
      "Instalação de Unidades Básicas de Saúde (UBS) em pontos estratégicos do sistema de transporte público de alta capacidade, funcionando no mesmo horário dessas redes. Essa ideia busca facilitar o acesso aos serviços de saúde para populações que vivem em áreas periféricas ou que enfrentam longos trajetos diários. Ao integrar planejamento urbano e saúde, a proposta cria uma rede de serviços mais eficiente e acessível, reforçando a importância de aproximar os cuidados médicos das pessoas que mais precisam.",
    foodTitle: "Reeducação alimentar na infância",
    foodBody:
      "Ela desempenha um papel essencial na prevenção do diabetes mellitus na vida adulta, promovendo hábitos saudáveis desde cedo, controlando o consumo de açúcares e ultraprocessados e incentivando uma alimentação equilibrada. Estudos mostram que escolhas nutricionais adequadas na infância reduzem significativamente o risco de resistência à insulina, obesidade e outras condições.",
    observatoryTitle: "Criação do Observatório de Saúde Urbana",
    observatoryBody:
      "Criação de um centro capaz de produzir inovação em tecnologias em saúde, baseadas na transversalidade, complexidade e interdependência dos determinantes da saúde humana. O Observatório de Saúde Urbana está pensado levando em conta a parceria com agentes públicos de diferentes áreas do município de São Paulo, como, por exemplo, a Secretaria da Saúde (SMS), o Tribunal de Contas do Município (TCM), além das demais Secretarias potencialmente envolvidas (Segurança, Assistência Social, Educação etc.).",
    bonus: "Bônus",
    bonusBefore:
      "Ouça a canção composta por um dos colaboradores do Insper Cidades que",
    bonusData: "transformou os dados",
    bonusMid: "e achados deste estudo",
    bonusVerse: "em versos e rimas.",
    captions: "Português",
    pauseAudio: "Pausar áudio",
    playAudio: "Reproduzir áudio",
    pause: "Pausar",
    play: "Play",
    pauseTitle: "Pausar",
    playTitle: "Reproduzir",
    metroAlt: "Metro",
  },
  footer: {
    description: "Síntese de evidências sobre saúde no município de São Paulo",
    documentType: "Relatório Técnico de Pesquisa",
    institution: "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
    urbanHealth: "Iniciativa de Saúde Urbana",
    mortalityDb: "Indicadores de mortalidade por distrito [2010-2019]",
    geosesDb: "Índice GeoSES [2010]",
    centerAlt: "Centro de Estudos das Cidades",
    portalAlt: "Portal Cidados",
    umaneAlt: "Umane",
    studyTeam: "Equipe do estudo",
    authorsRole: "Autores",
    authors:
      "Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Cátia Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de André",
    datavizTeam: "Equipe do dataviz",
    executiveRole: "Coordenador Executivo",
    executiveNames: "Maurício Bouskela e Adriano Borges Costa",
    writerRole: "Roteirista",
    writerNames: "Caio Jacintho",
    dataRole: "Cientista de dados",
    dataNames: "Vinicius Oike",
    designerRole: "Designer",
    designerNames: "Pedro Meneghel",
    devRole: "Desenvolvimento",
    devNames: "Lucas Tavares",
    bonusRole: "Voz/Composição da faixa Bônus",
    bonusNames: "Rafael Gomes da Silva",
  },
  charts: {
    figure: "Figura 4:",
    caption:
      "Tendência temporal do risco relativo de mortalidade prematura por diabetes mellitus, de 2010 a 2019, município de São Paulo: a) mulheres, b) homens. A área em cinza indica o intervalo de credibilidade",
    woman: "Ícone mulher",
    man: "Ícone homem",
    youth: "Ícone jovens",
    older: "Ícone idosos",
    socioeconomic: "Ícone socioeconômico",
    district: "Ícone distrito",
    chartWomen: "Gráfico temporal - Mulheres",
    chartMen: "Gráfico temporal - Homens",
    mapWomen: "Mapa - Mulheres",
    mapMen: "Mapa - Homens",
  },
  diabetes: {
    title: "Diabetes mellitus",
    gender: "Tendências por gênero",
    women:
      "Redução no risco relativo entre mulheres ao longo do período estudado.",
    men: "Para homens, houve estabilização com leve aumento no final do período.",
    age: "Faixas etárias",
    young: "Aumento do risco entre 20 e 39 anos, mais acentuado em mulheres.",
    older:
      "Estabilidade entre 40 e 49 anos; redução para mulheres acima de 50 anos.",
    socio: "Influência socioeconômica",
    socioBody:
      "Condições socioeconômicas explicam 38% da variabilidade entre mulheres e 25% entre homens.",
    district:
      "Risco relativo mais elevado em distritos como Jardim Helena, e menor em Moema.",
  },
  cerebrovascular: {
    title1: "Doenças",
    title2: "Cerebrovasculares",
    gender: "Tendências por gênero",
    both: "Redução estatisticamente significativa no risco de mortalidade prematura para ambos os sexos.",
    inequality:
      "Desigualdade entre os distritos, mais estável entre homens e mais variável entre mulheres",
    age: "Faixas etárias",
    age1: "Estabilidade entre 30 e 39 anos; tendência de redução para mulheres acima de 40 anos.",
    age2: "Entre 60 e 69 anos, o risco aumentou para mulheres e manteve-se estável para homens.",
    regional: "Destaques regionais:",
    regionalBody:
      "Parelheiros apresentou maior risco relativo entre mulheres, e Moema o menor entre homens.",
  },
  ischemic: {
    title1: "Doenças Isquêmicas",
    title2: "do Coração",
    gender: "Tendências por gênero",
    women:
      "Mulheres apresentaram baixo risco estável, com leve redução a partir de 2012.",
    men: "Homens iniciaram o período com alto risco, reduzido para baixo risco a partir de 2015.",
    age: "Faixas etárias",
    age1: "Aumento significativo entre mulheres e homens na faixa de 60 a 69 anos.",
    age2: "Maior desigualdade observada entre distritos nas faixas etárias de 30 a 39 anos e 60 a 69 anos.",
    regional: "Destaques regionais:",
    regionalBody:
      "Brasilândia registrou o maior risco para mulheres; São Miguel, para homens.",
  },
  maternal: {
    title1: "Mortalidade",
    title2: "Materna",
    population: "Distribuição populacional",
    populationBody:
      "Maior percentual de mulheres em idade fértil nas regiões sul, leste e norte.",
    reduction: "Redução de mortalidade materna",
    reductionBody:
      "Redução entre 2010 e 2012, mas aumento expressivo após 2013, atingindo 61,8 em 2019.",
    ageBody: "Concentrada em faixas etárias de 20 a 39 anos.",
    socio: "Influência socioeconômica",
    direct:
      "Diretas: complicações obstétricas durante gravidez, parto ou puerpério.",
    indirect: "Indiretas: doenças pré-existentes agravadas pela gestação.",
  },
} as const;

const en = {
  cover: {
    shareTitle:
      "A Portrait of Health Inequalities in the Municipality of São Paulo",
    shareText:
      "Read the study on mortality risks and socioeconomic determinants in the municipality of São Paulo.",
    copied: "Link copied to the clipboard!",
    shareError: "Error while sharing:",
    title:
      "A Portrait of Health Inequalities: Mortality Risks and Socioeconomic Determinants in the Municipality of São Paulo",
    byline:
      "Study by Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Cátia Martinez Minto, Sara Lopes de Moraes, and Paulo Afonso de André.",
    share: "Share",
  },
  hint: {
    continue: "Keep scrolling",
    close: "Close",
  },
  intro: {
    title: "Diabetes mellitus (DM)",
    p1Before:
      "It is a disease caused by insufficient production or poor absorption of insulin, the hormone that regulates blood glucose and supplies the body with energy. Diabetes can raise blood glucose, and high levels can lead to complications in the heart, arteries, eyes, kidneys, and nerves.",
    p1Emph: "In the most severe cases, diabetes can lead to death.",
    source: "Ministério da Saúde – Gov.BR",
    p2Before: "Diabetes mellitus affects",
    p2World: "537 million people worldwide,",
    p2Mid: "about",
    p2Global: "6.8% of the global population.",
    p2BrazilBefore:
      "In Brazil, the impact is just as significant, with approximately",
    p2Brazil: "16.8 million people — 7.9% of the population",
    p2After:
      "— living with the disease, according to the International Diabetes Federation.",
    p3Before:
      "Despite advances in treatment and access to medication, managing diabetes still faces",
    p3Emph: "considerable challenges, deeply shaped by social inequalities.",
    p4Before: "The quality of a",
    p4Emph1:
      "population’s health is shaped by social and economic determinants",
    p4Mid:
      "of many kinds, including housing conditions (and where that housing is), education, income, poverty, wealth, mobility, and basic sanitation. Health challenges therefore reach people unequally, and",
    p4Emph2:
      "interventions aimed at higher-risk areas can reduce the risk of death",
    p4After: "in most age groups.",
    p5Emph: "But what are higher-risk areas?",
    p5After:
      "How can we identify them? The study we present next answers these questions with a detailed analysis of spatiotemporal data from the last 10 years (2013–2023), covering the 96 districts of the municipality of São Paulo.",
    p6Before: "To help improve health in São Paulo, this study seeks to",
    p6Emph:
      "identify areas of higher epidemiological risk for the leading causes of maternal mortality, cardiovascular and cerebrovascular diseases, and diabetes mellitus,",
    p6After:
      "and to investigate the regions that should be prioritized for intervention. These analyses are meant to inform targeted public-health policies in Brazil, given their high prevalence, mortality, and effects on quality of life and health.",
  },
  diseasesIntro: {
    p1Before:
      "The story of the fictional character we introduce reflects the reality of many Brazilians: waking up early, facing crowded buses, losing hours commuting to work, not exercising, and having little or no time for leisure.",
    p1Emph:
      "An exhausting, repetitive routine that directly affects people’s health and quality of life.",
    p2: "The current situation calls for new approaches in the health field. It is not only about improving the health of urban populations themselves, but about expanding that definition to cover an integrated set of processes and initiatives that support the functioning and sustainability of the complex urban ecosystem as a whole.",
    p3Before:
      "Once we recognize that human beings are part of a complex ecosystem,",
    p3Emph1:
      "it becomes clear that a sustainable balance in the urban environment is essential to the health of the people who live there.",
    p3Mid: "From this perspective, the idea takes hold that",
    p3Emph2:
      "human health is intrinsically tied to the quality of the surroundings in which people live,",
    p3After:
      "taking into account factors such as access to green areas, the availability of basic infrastructure, and a strategic location relative to essential services.",
    p4: "The character’s story so far illustrates the relationship between the urban environment and the health of residents on the periphery of São Paulo, a reality repeated in many Brazilian metropolises.",
    p5: "As noted earlier, this study did not stop at identifying risk areas related to diabetes mellitus. Next we present the most relevant findings on the other conditions analyzed: maternal mortality (including fetal mortality), premature cardiovascular mortality (split into cerebrovascular diseases and ischemic heart disease), and premature mortality from diabetes mellitus.",
    p6: "Health challenges, however, reach the population unequally. Interventions aimed at people in higher-risk areas can therefore reduce the risk of death in most age groups.",
  },
  scrolly: {
    legendTitle: "GeoSES Index",
    legendNote:
      "It weights census data on income, education, quality of life, and similar factors.",
    source: "Source: Barrozo, L. V. et al. (2020).",
    avPaulista: "Av. Paulista",
    surroundings: "Surroundings",
    jardimHelena: "Jardim Helena",
    neighborhood: "Neighborhood",
    card0Lead: "Inequality in the municipality of São Paulo",
    card0Mid:
      "can be seen clearly through the GeoSES Index, which summarizes the",
    card0Conditions:
      "socioeconomic conditions across the city’s different areas.",
    card0Rest:
      "This map, using 2010 data, shows how factors such as income, education, and urban infrastructure are unevenly distributed across the city. Blue areas indicate better socioeconomic conditions, while red areas represent greater vulnerability.",
    card1Before: "The",
    card1Neighborhoods: "inequality between neighborhoods",
    card1Mid1: "becomes clear as we move away from the",
    card1Center: "central areas of the city,",
    card1Mid2: "such as",
    card1Paulista: "Avenida Paulista,",
    card1Mid3: "and toward the",
    card1Periphery: "periphery,",
    card1Mid4: "such as the neighborhood of",
    card1Helena: "Jardim Helena,",
    card1After: "in the East Zone of São Paulo.",
    card2Before: "Next, we tell",
    card2Maria: "Maria’s story.",
    card2Mid: "She",
    card2Lives: "lives in Jardim Helena.",
    card2After:
      "This is a hypothetical case, but a very common one in São Paulo.",
  },
  house: {
    alt: "House illustration",
    card0Before:
      "The day starts early: at 4 a.m., Maria is already up to make the children’s breakfast and take a quick shower before leaving.",
    card0Meal:
      "With so little time, the day’s first meal is not what it should be.",
    card0Food:
      "Ultra-processed foods, such as chocolate drinks and filled cookies, take the place of fruit, eggs, and homemade juice.",
    card0DiabetesBefore: "Maria has",
    card0Diabetes: "diabetes mellitus",
    card0DiabetesAfter:
      "and needs to check her glucose every day, but her routine is so rushed that she cannot always do it as she should.",
    card1Before:
      "By 5:30 a.m., Maria is already at the bus stop. Two buses and nearly two hours later, she arrives at work in the city center.",
    card1Emph:
      "Maria’s daily commute illustrates the reality of millions of Brazilians who live on the outskirts of large cities.",
    card3Before: "At 5:30 a.m.,",
    card3Bus: "Maria catches the bus to work.",
    card3Mid: "It is",
    card3Hours: "a two-hour trip",
    card3After:
      "to Jardim Paulista, an upper-middle-class neighborhood near Avenida Paulista.",
  },
  market: {
    altMarket: "Supermarket illustration",
    altMarketTwo: "Second supermarket illustration",
    altHospital: "Hospital reception illustration",
    notSignificant: "Not significant",
    drawerTitle:
      "Mortality from cerebrovascular diseases among women, 2010 to 2019: exceedance probabilities that the risk in 2019 was greater than 1",
    legendTitle: "Exceedance probability (2019)",
    legendNote: "Probability that the risk in 2019 was greater than 1.",
    c0a: "There,",
    c0b: "Maria works as a supermarket cashier.",
    c0c: "Every day, at 8 a.m. sharp, she serves Alice, who comes in to buy bread and fruit for breakfast.",
    c0d: "Alice lives in the same building as the store where Maria works.",
    c0e: "",
    c1a: "Recently,",
    c1b: "Alice had a stroke",
    c1c: "(a cerebrovascular accident), but fortunately she",
    c1d: "received prompt care",
    c1e: "at a high-quality hospital a few minutes from her home. Because of that, she",
    c1f: "recovered without major complications.",
    c1g: "",
    c2a: "If Alice lived in Jardim Helena, the story could be different.",
    c2b: "This study shows that in peripheral neighborhoods like Maria’s, a stroke is significantly more likely to be fatal because quality medical care is hard to reach.",
    c3a: "For",
    c3b: "premature mortality from cerebrovascular diseases among women,",
    c3c: "the study finds a",
    c3d: "significantly higher relative risk in the districts of the far east and south",
    c3e: "of the city, as well as in Brasilândia and Cachoeirinha, as this map shows.",
    c4a: "While Maria spends the day working at the market,",
    c4b: "Alice can still take a walk in a park before going to work",
    c4c: "near her home.",
    c4d: "A study in the Australian cities of Sydney, Wollongong, and Newcastle found that",
    c4e: "people with greater exposure to green areas had lower rates of diabetes and high blood pressure.",
    c4f: "",
    c4g: "In Jardim Helena,",
    c4h: "Maria does not have that advantage, because the neighborhood lacks green spaces",
    c4i: "of adequate quality, which also affects her health.",
    c5a: "Maria’s workday ends, and she heads home with",
    c5b: "another two-hour journey on public transit.",
    c5c: "",
    c6a: "After an intense day, Maria sometimes still needs to",
    c6b: "pick up her diabetes medication",
    c6c: "at Farmácia Popular. Often, because of traffic and the long distance, by the time she arrives",
    c6d: "the pharmacy closest to her home is already closed.",
    c6e: "",
    c7a: "Saturday is a day of rest. But not for Maria.",
    c7b: "She has to go to the nearest basic health unit (UBS) for",
    c7c: "tests with an endocrinologist.",
    c7d: "After a",
    c7e: "long wait,",
    c7f: "she is seen and heads back home.",
  },
  conclusion: {
    title: "Conclusion",
    p1Before:
      "Maria’s fictional story reflects the reality of many Brazilians: waking up early, facing crowded buses, losing hours commuting to work, not exercising, and having little or no time for leisure. An",
    p1Emph:
      "exhausting, repetitive routine that directly affects health and quality of life",
    p1After: "of the people who live it.",
    p2Before: "In this context,",
    p2Emph: "new approaches in the health field",
    p2After:
      "are needed. It is not only about treating the health problems of people who live in cities, but about looking more broadly at the urban conditions in which those populations live, and about recognizing that urban planning can support a healthier life for residents.",
    p3Before: "From this perspective, the idea takes hold that",
    p3Emph:
      "human health is intrinsically tied to the quality of the urban environment in which people live,",
    p3After:
      "taking into account factors such as access to green areas, the availability of basic infrastructure, and a strategic location relative to essential services.",
    p4Before:
      "This study explored the regional distribution in São Paulo and identified risk areas related to",
    p4Maternal: "maternal mortality",
    p4Mid1: "(including fetal mortality),",
    p4Cardio: "premature cardiovascular mortality",
    p4Mid2:
      "(split into cerebrovascular diseases and ischemic heart disease), and",
    p4Diabetes: "premature mortality from diabetes mellitus.",
    p4After: "Based on the data gathered, further studies can:",
    bullet1:
      "Identify the areas where health-system action should be prioritized.",
    bullet2:
      "Understand how social factors and the urban environment affect the course of disease, for better or worse.",
    bullet3:
      "Map local policies that improved health and quality of life, even in adverse settings.",
    bullet4:
      "Recognize and adapt effective improvements to the health system that can be applied in other parts of the city.",
    p5Before:
      "Beyond opening new ways to study and understand health questions in the urban context, the study presents",
    p5Emph:
      "practical proposals for addressing inequalities in access to medical care.",
    p5After: "",
    proposals: "Proposals",
    ubsTitle: "Basic health units in the transit system",
    ubsBody:
      "Placing basic health units (UBS) at strategic points in the high-capacity public transit system, open during the same hours as those networks. The idea is to make health services easier to reach for people who live in peripheral areas or face long daily commutes. By joining urban planning and health, the proposal creates a more efficient and accessible network of services, and it underscores the importance of bringing medical care closer to the people who need it most.",
    foodTitle: "Nutrition education in childhood",
    foodBody:
      "It plays an essential role in preventing diabetes mellitus in adulthood by building healthy habits early, limiting sugar and ultra-processed foods, and encouraging a balanced diet. Studies show that sound nutritional choices in childhood significantly reduce the risk of insulin resistance, obesity, and other conditions.",
    observatoryTitle: "Creating an Urban Health Observatory",
    observatoryBody:
      "Creating a center able to produce innovation in health technologies, grounded in the cross-cutting nature, complexity, and interdependence of the determinants of human health. The Urban Health Observatory is conceived with partnerships in mind among public agencies from different areas of the municipality of São Paulo — for example, the Municipal Health Department (SMS) and the Municipal Court of Accounts (TCM), as well as other departments that may be involved (Public Security, Social Assistance, Education, and others).",
    bonus: "Bonus",
    bonusBefore:
      "Listen to the song composed by a contributor to Insper Cidades who",
    bonusData: "turned the data",
    bonusMid: "and findings of this study",
    bonusVerse: "into verse and rhyme.",
    captions: "Portuguese",
    pauseAudio: "Pause audio",
    playAudio: "Play audio",
    pause: "Pause",
    play: "Play",
    pauseTitle: "Pause",
    playTitle: "Play",
    metroAlt: "Subway",
  },
  footer: {
    description:
      "Evidence synthesis on health in the municipality of São Paulo",
    documentType: "Technical research report",
    institution: "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
    urbanHealth: "Urban Health Initiative",
    mortalityDb: "Mortality indicators by district [2010-2019]",
    geosesDb: "GeoSES Index [2010]",
    centerAlt: "Centro de Estudos das Cidades",
    portalAlt: "Portal Cidados",
    umaneAlt: "Umane",
    studyTeam: "Study team",
    authorsRole: "Authors",
    authors:
      "Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Cátia Martinez Minto, Sara Lopes de Moraes, and Paulo Afonso de André",
    datavizTeam: "Data visualization team",
    executiveRole: "Executive coordinator",
    executiveNames: "Maurício Bouskela and Adriano Borges Costa",
    writerRole: "Scriptwriter",
    writerNames: "Caio Jacintho",
    dataRole: "Data scientist",
    dataNames: "Vinicius Oike",
    designerRole: "Designer",
    designerNames: "Pedro Meneghel",
    devRole: "Development",
    devNames: "Lucas Tavares",
    bonusRole: "Voice and composition of the bonus track",
    bonusNames: "Rafael Gomes da Silva",
  },
  charts: {
    figure: "Figure 4:",
    caption:
      "Time trend in the relative risk of premature mortality from diabetes mellitus, from 2010 to 2019, municipality of São Paulo: a) women, b) men. The gray area indicates the credible interval",
    woman: "Woman icon",
    man: "Man icon",
    youth: "Young people icon",
    older: "Older adults icon",
    socioeconomic: "Socioeconomic icon",
    district: "District icon",
    chartWomen: "Time-series chart — women",
    chartMen: "Time-series chart — men",
    mapWomen: "Map — women",
    mapMen: "Map — men",
  },
  diabetes: {
    title: "Diabetes mellitus",
    gender: "Trends by gender",
    women: "A decline in relative risk among women over the study period.",
    men: "For men, the risk stabilized, with a slight increase at the end of the period.",
    age: "Age groups",
    young: "An increase in risk between ages 20 and 39, sharper among women.",
    older: "Stability between ages 40 and 49; a decline for women over 50.",
    socio: "Socioeconomic influence",
    socioBody:
      "Socioeconomic conditions explain 38% of the variability among women and 25% among men.",
    district:
      "Relative risk is higher in districts such as Jardim Helena and lower in Moema.",
  },
  cerebrovascular: {
    title1: "Cerebrovascular",
    title2: "diseases",
    gender: "Trends by gender",
    both: "A statistically significant decline in the risk of premature mortality for both sexes.",
    inequality:
      "Inequality across districts, more stable among men and more variable among women",
    age: "Age groups",
    age1: "Stability between ages 30 and 39; a downward trend for women over 40.",
    age2: "Between ages 60 and 69, risk rose for women and stayed stable for men.",
    regional: "Regional highlights:",
    regionalBody:
      "Parelheiros had the highest relative risk among women, and Moema the lowest among men.",
  },
  ischemic: {
    title1: "Ischemic",
    title2: "heart disease",
    gender: "Trends by gender",
    women:
      "Women showed a stable low risk, with a slight decline from 2012 on.",
    men: "Men began the period at high risk, which fell to low risk from 2015 on.",
    age: "Age groups",
    age1: "A significant increase among women and men aged 60 to 69.",
    age2: "The greatest inequality across districts was in the 30–39 and 60–69 age groups.",
    regional: "Regional highlights:",
    regionalBody:
      "Brasilândia recorded the highest risk for women; São Miguel, for men.",
  },
  maternal: {
    title1: "Maternal",
    title2: "mortality",
    population: "Population distribution",
    populationBody:
      "A higher share of women of childbearing age in the south, east, and north.",
    reduction: "Reduction in maternal mortality",
    reductionBody:
      "A decline between 2010 and 2012, then a sharp rise after 2013, reaching 61.8 in 2019.",
    ageBody: "Concentrated in the 20-to-39 age groups.",
    socio: "Socioeconomic influence",
    direct:
      "Direct: obstetric complications during pregnancy, childbirth, or the postpartum period.",
    indirect: "Indirect: preexisting conditions worsened by pregnancy.",
  },
} satisfies Widen<typeof pt>;

export const saudeCopy = { pt, en };
export type SaudeCopy = Widen<typeof pt>;
