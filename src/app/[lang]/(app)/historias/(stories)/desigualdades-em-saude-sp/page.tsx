import { createStoryOverview } from "../../overview-route";

const route = createStoryOverview("desigualdades-em-saude-sp");

export const generateMetadata = route.generateMetadata;
export default route.Page;
