import { createStoryOverview } from "../../overview-route";

const route = createStoryOverview("ilhas-de-calor");

export const generateMetadata = route.generateMetadata;
export default route.Page;
