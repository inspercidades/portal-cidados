import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Home from "./home-client";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title: "Dados urbanos para cidades mais justas",
});

export default function Page() {
  return <Home />;
}
