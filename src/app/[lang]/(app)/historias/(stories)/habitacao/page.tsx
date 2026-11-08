import { createStoryOverview } from "../../overview-route";

const route = createStoryOverview("habitacao");

export const generateMetadata = route.generateMetadata;
export default route.Page;
