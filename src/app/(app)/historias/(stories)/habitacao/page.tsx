import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryJsonLd } from "@/components/story-json-ld";
import { isHabitacaoStoryEnabled } from "@/lib/features";
import { buildMetadata } from "@/lib/seo";

const title =
  "Levar transporte até a periferia, ou deixar mais gente morar no centro?";
const description = "Em desenvolvimento";
const path = "/historias/habitacao";
const image = "/assets/viz5/habitacao.png";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
  image,
  type: "article",
  keywords: ["habitação", "transporte", "periferia", "São Paulo"],
});

export default function HabitacaoPage() {
  if (!isHabitacaoStoryEnabled()) notFound();

  return (
    <>
      <StoryJsonLd
        title={title}
        description={description}
        path={path}
        image={image}
      />
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
        <h1 className="font-inter text-3xl leading-tight font-medium md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-inter text-lg text-foreground/70">
          {description}
        </p>
        <Link
          href="/historias"
          className="mt-10 font-inter text-sm underline underline-offset-4"
        >
          Todas as histórias
        </Link>
      </main>
    </>
  );
}
