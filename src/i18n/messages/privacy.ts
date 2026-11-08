type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  home: string;
  title: string;
  updated: string;
  responsibleTitle: string;
  responsibleBody: string;
  questionsBefore: string;
  aboutLink: string;
  questionsAfter: string;
  cookiesTitle: string;
  cookiesBody: string;
  tableTitle: string;
  colCookie: string;
  colCategory: string;
  colPurpose: string;
  colDuration: string;
  necessary: string;
  analytic: string;
  consentPurpose: string;
  consentDuration: string;
  gaPurpose: string;
  gaDuration: string;
  clarityName: string;
  clarityPurpose: string;
  clarityDuration: string;
  tableNote: string;
  legalTitle: string;
  legalBody: string;
  legalAbroad: string;
  revokeTitle: string;
  revokeBody: string;
  rightsTitle: string;
  rightsBefore: string;
  rightsLink: string;
  rightsAfter: string;
};

const pt = {
  metaTitle: "Privacidade",
  metaDescription:
    "Como o Portal Cidados usa cookies e ferramentas de audiência, e como alterar essa escolha.",
  keywords: ["privacidade", "cookies", "LGPD"],
  home: "Início",
  title: "Privacidade e cookies",
  updated: "Atualizado em 3 de outubro de 2026.",
  responsibleTitle: "Quem é responsável",
  responsibleBody:
    "Este site é o Portal Cidados, plataforma do Centro de Estudos das Cidades — Laboratório Arq.Futuro do Insper. O Insper é o controlador dos dados pessoais tratados aqui.",
  questionsBefore:
    "Dúvidas sobre este aviso podem ser encaminhadas pelos canais indicados na página ",
  aboutLink: "Sobre",
  questionsAfter:
    ". Pedidos relacionados a dados pessoais seguem o caminho da seção Seus direitos.",
  cookiesTitle: "O que são cookies",
  cookiesBody:
    "Cookies são pequenos arquivos gravados no navegador. Este site também usa identificadores semelhantes, definidos pelas ferramentas de audiência descritas abaixo. Há cookies indispensáveis para o funcionamento e cookies opcionais, usados só se você autorizar.",
  tableTitle: "Cookies que usamos",
  colCookie: "Cookie",
  colCategory: "Categoria",
  colPurpose: "Finalidade",
  colDuration: "Duração",
  necessary: "Necessário",
  analytic: "Analítico",
  consentPurpose:
    "Guarda a sua escolha de aceitar ou recusar os cookies de audiência.",
  consentDuration: "12 meses",
  gaPurpose:
    "Google Analytics 4. Mede visitas, páginas e eventos de uso. Os dados são enviados ao Google.",
  gaDuration: "Até 2 anos",
  clarityName: "_clck, _clsk e identificadores do Clarity",
  clarityPurpose:
    "Microsoft Clarity. Gera mapas de calor e gravações de sessão (cliques, movimento e rolagem). Os dados são enviados à Microsoft.",
  clarityDuration: "Até 12 meses",
  tableNote:
    "O cookie necessário funciona sem o banner. Google Analytics e Microsoft Clarity só são carregados se você clicar em Aceitar. Não usamos cookies de publicidade.",
  legalTitle: "Base legal",
  legalBody:
    "O cookie necessário existe para lembrar a preferência de cookies. Os cookies analíticos e a gravação de sessão dependem do seu consentimento, que pode ser recusado ou retirado a qualquer momento.",
  legalAbroad:
    "Google e Microsoft podem tratar esses dados fora do Brasil, conforme as políticas de cada serviço. O endereço IP e identificadores do navegador podem ser dados pessoais.",
  revokeTitle: "Como alterar ou revogar",
  revokeBody:
    "Você pode mudar a escolha quando quiser. Recusar ou retirar o consentimento não impede o uso do site.",
  rightsTitle: "Seus direitos",
  rightsBefore:
    "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação do tratamento, acesso, correção, anonimização, eliminação ou informação sobre o compartilhamento dos seus dados, além de revogar o consentimento. Esses pedidos são feitos no ",
  rightsLink: "Portal da Privacidade do Insper",
  rightsAfter: ".",
} satisfies PrivacyCopy;

const en = {
  metaTitle: "Privacy",
  metaDescription:
    "How Portal Cidados uses cookies and audience tools, and how to change that choice.",
  keywords: ["privacy", "cookies", "LGPD"],
  home: "Home",
  title: "Privacy and cookies",
  updated: "Updated on October 3, 2026.",
  responsibleTitle: "Who is responsible",
  responsibleBody:
    "This site is Portal Cidados, the platform of the Center for Urban Studies — Laboratório Arq.Futuro at Insper. Insper is the controller of the personal data processed here.",
  questionsBefore:
    "Questions about this notice can be sent through the channels listed on the ",
  aboutLink: "About",
  questionsAfter:
    " page. Requests about personal data follow the path in Your rights.",
  cookiesTitle: "What cookies are",
  cookiesBody:
    "Cookies are small files stored in the browser. This site also uses similar identifiers set by the audience tools described below. Some cookies are required for the site to work; optional cookies are used only if you allow them.",
  tableTitle: "Cookies we use",
  colCookie: "Cookie",
  colCategory: "Category",
  colPurpose: "Purpose",
  colDuration: "Duration",
  necessary: "Necessary",
  analytic: "Analytics",
  consentPurpose:
    "Stores your choice to accept or refuse audience cookies.",
  consentDuration: "12 months",
  gaPurpose:
    "Google Analytics 4. Measures visits, pages, and usage events. Data is sent to Google.",
  gaDuration: "Up to 2 years",
  clarityName: "_clck, _clsk, and Clarity identifiers",
  clarityPurpose:
    "Microsoft Clarity. Builds heatmaps and session recordings (clicks, movement, and scrolling). Data is sent to Microsoft.",
  clarityDuration: "Up to 12 months",
  tableNote:
    "The necessary cookie works without the banner. Google Analytics and Microsoft Clarity load only if you click Accept. We do not use advertising cookies.",
  legalTitle: "Legal basis",
  legalBody:
    "The necessary cookie exists to remember the cookie preference. Analytics cookies and session recording depend on your consent, which you can refuse or withdraw at any time.",
  legalAbroad:
    "Google and Microsoft may process this data outside Brazil, under each service’s policy. IP addresses and browser identifiers can be personal data.",
  revokeTitle: "How to change or withdraw",
  revokeBody:
    "You can change the choice whenever you want. Refusing or withdrawing consent does not block use of the site.",
  rightsTitle: "Your rights",
  rightsBefore:
    "Under Brazil’s General Data Protection Law (Law No. 13,709/2018), you can request confirmation of processing, access, correction, anonymization, deletion, or information about sharing of your data, and you can withdraw consent. Those requests are made on the ",
  rightsLink: "Insper Privacy Portal",
  rightsAfter: ".",
} satisfies PrivacyCopy;

export const privacyCopy = { pt, en };
