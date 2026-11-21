"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizeCityLayers } from "@/i18n/layers";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale, useLocaleHref } from "@/i18n/use-locale";

export interface FooterIcon {
  src: string;
  alt: string;
  href: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface TeamMember {
  /** Label shown in bold. Leave empty to render names-only (no "Role:" prefix). */
  role: string;
  names: string;
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export interface DatabaseEntry {
  title: string;
  href: string;
}

export interface GeoreferencedLayer {
  city: string;
  id: string;
}

export function toGeoreferencedEntries(
  locale: Locale,
  layers: readonly GeoreferencedLayer[],
): DatabaseEntry[] {
  const named = localizeCityLayers(locale);
  return layers.map(({ city, id }) => ({
    title: named[city]?.find((layer) => layer.id === id)?.name ?? id,
    href: `/mapas?city=${encodeURIComponent(city)}&layers=${encodeURIComponent(id)}`,
  }));
}

export interface StudyDetail {
  description: string;
  /** When set, wraps description in an anchor tag. */
  descriptionHref?: string;
  organization?: string;
  documentType?: string;
  institution?: string;
  /** Extra dim lines rendered between institution and year. */
  extraLines?: string[];
  year?: string | number;
  partnership?: {
    prefix?: string;
    href: string;
    label: string;
  };
}

export interface StoryFooterProps {
  studyDetail?: StudyDetail;
  realizacao?: FooterIcon[];
  parceiros?: FooterIcon[];
  teams?: TeamSection[];
  databases?: DatabaseEntry[];
  georeferenced?: DatabaseEntry[];
  scripts?: DatabaseEntry[];
}

function IconGroup({ icons }: { icons: FooterIcon[] }) {
  return (
    <div className="flex items-center justify-start gap-4 lg:gap-6">
      {icons.map((icon) => (
        <a
          key={icon.src}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            className={
              icon.className ?? "h-10 lg:h-12 w-auto brightness-0 invert"
            }
            width={icon.width ?? 120}
            height={icon.height ?? 48}
          />
        </a>
      ))}
    </div>
  );
}

function ResourceCard({
  title,
  items,
  accessHere,
  hrefFor,
}: {
  title: string;
  items: DatabaseEntry[];
  accessHere: string;
  hrefFor: (href: string) => string;
}) {
  if (!items.length) return null;

  return (
    <section className="px-6 py-6 lg:px-10 lg:py-10 max-w-[600px] bg-white/6">
      <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
        {title}
      </h2>
      <div className="space-y-5 text-md lg:text-lg">
        {items.map((item) => {
          const className = "underline underline-offset-2 text-[#FFF]/40";
          const external = !item.href.startsWith("/");
          return (
            <p key={`${item.title}-${item.href}`}>
              <span className="font-semibold text-white">
                {item.title}&nbsp;&nbsp;
              </span>
              {external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {accessHere}
                </a>
              ) : (
                <Link href={hrefFor(item.href)} className={className}>
                  {accessHere}
                </Link>
              )}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default function StoryFooter({
  studyDetail,
  realizacao,
  parceiros,
  teams,
  databases,
  georeferenced,
  scripts,
}: StoryFooterProps) {
  const labels = chrome[useLocale()].storyFooter;
  const hrefFor = useLocaleHref();
  const hasRealiz = realizacao && realizacao.length > 0;
  const hasParceiros = parceiros && parceiros.length > 0;
  const hasLogos = hasRealiz || hasParceiros;

  const hasStudyMeta =
    studyDetail &&
    (studyDetail.documentType ||
      studyDetail.institution ||
      (studyDetail.extraLines && studyDetail.extraLines.length > 0) ||
      studyDetail.year ||
      studyDetail.partnership);

  return (
    <footer
      className="bg-[#0E171D] text-white py-24 px-6 lg:px-12"
      style={{ fontFamily: '"Libre Baskerville", serif' }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Detalhes do estudo — full width */}
        {studyDetail && (
          <div className="space-y-4">
            <section>
              <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
                {labels.studyDetails}
              </h2>
              <div className="space-y-2 text-md lg:text-lg font-bold">
                {studyDetail.descriptionHref ? (
                  <a
                    href={studyDetail.descriptionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white leading-relaxed underline block"
                  >
                    {studyDetail.description}
                  </a>
                ) : (
                  <p className="text-white leading-relaxed">
                    {studyDetail.description}
                  </p>
                )}
              </div>
            </section>
            {hasStudyMeta && (
              <div className="space-y-1 text-md lg:text-lg">
                {studyDetail.organization && (
                  <p className="text-white opacity-40">
                    {studyDetail.organization}
                  </p>
                )}
                {studyDetail.documentType && (
                  <p className="text-white opacity-40">
                    {studyDetail.documentType}
                  </p>
                )}
                {studyDetail.institution && (
                  <p className="text-white opacity-40">
                    {studyDetail.institution}
                  </p>
                )}
                {studyDetail.extraLines?.map((line) => (
                  <p key={line} className="text-white opacity-40">
                    {line}
                  </p>
                ))}
                {studyDetail.year && (
                  <p className="text-white opacity-40">{studyDetail.year}</p>
                )}
                {studyDetail.partnership && (
                  <p>
                    <span className="text-white opacity-40">
                      {studyDetail.partnership.prefix ??
                        labels.partnershipPrefix}{" "}
                    </span>
                    <a
                      href={studyDetail.partnership.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white! opacity-100! underline"
                    >
                      {studyDetail.partnership.label}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Team Sections — logos sit alongside the last team */}
        {teams && teams.length > 0 && (
          <div className="space-y-12">
            {teams.map((team, index) => {
              const isLast = index === teams.length - 1;
              const showLogos = isLast && hasLogos;

              return (
                <div
                  key={team.title}
                  className={
                    showLogos
                      ? "grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
                      : undefined
                  }
                >
                  <section className={showLogos ? "lg:col-span-2" : undefined}>
                    <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
                      {team.title}
                    </h2>
                    <div className="space-y-3 text-md lg:text-lg">
                      {team.members.map((member) =>
                        member.role ? (
                          <div key={member.role}>
                            <span className="font-semibold">
                              {member.role}:
                            </span>
                            <span className="text-[#FFFFFF] opacity-40 ml-2">
                              {member.names}
                            </span>
                          </div>
                        ) : (
                          <p
                            key={member.names}
                            className="text-[#FFFFFF] opacity-40"
                          >
                            {member.names}
                          </p>
                        ),
                      )}
                    </div>
                  </section>

                  {showLogos && (
                    <div className="flex flex-col gap-8">
                      {hasRealiz && realizacao && (
                        <div className="flex flex-col items-start">
                          <h2 className="text-md lg:text-lg font-semibold mb-6">
                            {labels.producedBy}
                          </h2>
                          <IconGroup icons={realizacao} />
                        </div>
                      )}
                      {hasParceiros && parceiros && (
                        <div className="flex flex-col items-start">
                          <h2 className="text-md lg:text-lg font-semibold mb-6">
                            {labels.partners}
                          </h2>
                          <IconGroup icons={parceiros} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-6">
          <ResourceCard
            title={labels.databases}
            items={databases ?? []}
            accessHere={labels.accessHere}
            hrefFor={hrefFor}
          />
          <ResourceCard
            title={labels.georeferenced}
            items={georeferenced ?? []}
            accessHere={labels.accessHere}
            hrefFor={hrefFor}
          />
          <ResourceCard
            title={labels.scripts}
            items={scripts ?? []}
            accessHere={labels.accessHere}
            hrefFor={hrefFor}
          />
          <Link
            href={hrefFor("/historias")}
            className="inline-flex mt-6 w-fit items-center justify-center rounded-full bg-white px-10 py-3.5 text-base font-medium text-[#0E171D] font-[family-name:var(--font-inter)] transition-colors hover:bg-neutral-200"
          >
            {labels.moreStories}
          </Link>
        </div>
      </div>
    </footer>
  );
}
