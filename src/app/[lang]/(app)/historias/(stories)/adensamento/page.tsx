import { createStoryOverview } from "../../overview-route";

const route = createStoryOverview("adensamento");

export const generateMetadata = route.generateMetadata;
export default route.Page;
