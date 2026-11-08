import { createStoryOverview } from "../../overview-route";

const route = createStoryOverview("faixa-azul");

export const generateMetadata = route.generateMetadata;
export default route.Page;
