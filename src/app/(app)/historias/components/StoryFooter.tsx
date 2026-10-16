import Image from "next/image";

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

export default function StoryFooter({
  studyDetail,
  realizacao,
  parceiros,
  teams,
  databases,
}: StoryFooterProps) {
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
                Detalhes do estudo
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
                      {studyDetail.partnership.prefix ?? "Parceria com o"}{" "}
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
                            Realização
                          </h2>
                          <IconGroup icons={realizacao} />
                        </div>
                      )}
                      {hasParceiros && parceiros && (
                        <div className="flex flex-col items-start">
                          <h2 className="text-md lg:text-lg font-semibold mb-6">
                            Parceiros
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

        {/* Database Section */}
        {databases && databases.length > 0 && (
          <section className="px-6 py-6 lg:px-10 lg:py-10 max-w-[600px] bg-white/6">
            <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
              Bases de Dados
            </h2>
            <div className="space-y-5 text-md lg:text-lg">
              {databases.map((db) => (
                <p key={db.href}>
                  <span className="font-semibold text-white">
                    {db.title}&nbsp;&nbsp;
                  </span>
                  <a
                    href={db.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-[#FFF]/40"
                  >
                    Acesse aqui
                  </a>
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </footer>
  );
}
