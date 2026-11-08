"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ExternalLink } from "@/components/external-link";
import { chrome } from "@/i18n/messages/chrome";
import { localeHref } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import { getCollaborators } from "@/lib/data/collaborators";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export function CollaboratorsSection() {
  const lang = useLocale();
  const copy = chrome[lang].about;
  const collaborators = getCollaborators().map((person) => ({
    ...person,
    function:
      copy.roles[person.function as keyof typeof copy.roles] ?? person.function,
  }));
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updateCursorPosition = (clientX: number, clientY: number) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setCursorPos({ x: clientX, y: clientY });
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (sectionRef.current?.contains(e.target as Node)) {
        setIsDragging(true);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    // Usar tanto pointer quanto mouse events para máxima compatibilidade
    document.addEventListener("pointermove", handlePointerMove, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerUp, true);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove, true);
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerUp, true);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transition-opacity duration-200 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          willChange: "transform",
        }}
      >
        <div
          className={`bg-black text-white rounded-full w-16 h-16 flex items-center justify-center transition-transform duration-100 ${
            isDragging ? "scale-90" : "scale-100"
          }`}
        >
          <span className="text-xs font-medium select-none">{copy.drag}</span>
        </div>
      </div>

      <section className="py-0 pb-16 mx-auto bg-background">
        <div className="mx-auto">
          {/* Section Title */}
          <div className="flex items-center px-4 md:px-8 lg:px-12 justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              {copy.team}
            </h2>
          </div>

          {/* Collaborators Horizontal Scroll */}
          <section
            ref={sectionRef}
            className="pb-4 overflow-x-hidden px-4 md:px-8 lg:px-12 select-none"
            style={{
              cursor: "none",
              touchAction: "pan-x",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setIsDragging(false);
            }}
            onPointerEnter={() => setIsHovering(true)}
            onPointerLeave={() => {
              setIsHovering(false);
              setIsDragging(false);
            }}
            aria-label={copy.carousel}
          >
            <div style={{ cursor: "none" }}>
              <Swiper
                slidesPerView="auto"
                spaceBetween={8}
                freeMode={true}
                grabCursor={false}
                modules={[FreeMode]}
                className="!overflow-visible"
                style={{ cursor: "none" }}
              >
                {collaborators.map((collaborator) => (
                  <SwiperSlide
                    key={collaborator.id}
                    className="!w-[250px] group relative"
                    style={{ cursor: "none" }}
                  >
                    {/* Collaborator Card */}
                    <div
                      className="relative overflow-hidden h-[350px] w-[250px] mb-4 bg-border"
                      style={{ cursor: "none" }}
                    >
                      <Image
                        src={collaborator.image}
                        alt={collaborator.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{
                          cursor: "none",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                        draggable={false}
                      />
                    </div>

                    {/* Collaborator Info */}
                    <div className="text-left" style={{ cursor: "none" }}>
                      <h3 className="text-md font-bold text-foreground mb-1 leading-tight">
                        {collaborator.name}
                      </h3>
                      <p className="text-sm text-foreground/50">
                        {collaborator.function}
                      </p>
                      <ExternalLink
                        href={collaborator.linkedin}
                        aria-label={`${copy.linkedin} ${collaborator.name}`}
                        className="swiper-no-swiping mt-2 mb-5 inline-flex text-foreground/70 transition-colors hover:text-foreground"
                        style={{ cursor: "pointer" }}
                        onPointerDown={(event) => event.stopPropagation()}
                      >
                        <Linkedin
                          className="size-5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </ExternalLink>
                      <p className="text-sm text-foreground/50">
                        {collaborator.email}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* What We Do Section */}
          <section className="mt-24 font-gt-ultra-fine px-4 md:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  {copy.whatWeDo}
                </h2>
              </div>

              <div className="lg:w-1/2 space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    <Link
                      href={localeHref(lang, "/historias")}
                      className="hover:underline underline-offset-4"
                    >
                      {copy.storiesTitle}
                    </Link>
                  </h3>
                  <p className="text-foreground/50 leading-relaxed">
                    {copy.storiesBody}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    <Link
                      href={localeHref(lang, "/catalogo-de-dados")}
                      className="hover:underline underline-offset-4"
                    >
                      {copy.catalogTitle}
                    </Link>
                  </h3>
                  <p className="text-foreground/50 leading-relaxed">
                    {copy.catalogBody}
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    <Link
                      href={localeHref(lang, "/mapas")}
                      className="hover:underline underline-offset-4"
                    >
                      {copy.mapsTitle}
                    </Link>
                  </h3>
                  <p className="text-foreground/50 leading-relaxed">
                    {copy.mapsBody}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* Pesquisadores Section */}
      <section className="mt-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 px-4 md:px-8 lg:px-12">
          {/* Section Title */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-foreground font-gt-ultra-fine">
              {copy.featured}
            </h2>
            <p className="text-sm text-foreground/50 font-gt-ultra-fine mb-10">
              {" "}
              {copy.researchers}
            </p>
          </div>

          {/* Quem teve suas histórias contadas */}
          <div className="lg:w-1/2 space-y-8">
            {/* Research Project 1 */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-bold text-foreground font-gt-ultra-fine mb-3 flex items-center gap-2">
                <Link
                  href={localeHref(lang, "/historias/desigualdades-em-saude-sp")}
                  className="hover:underline underline-offset-4"
                >
                  {copy.studyHealth}
                </Link>
              </h3>
              <p className="text-foreground/50 font-gt-ultra-fine">
                Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Cátia Martinez
                Minto, Sara Lopes de Moraes, Paulo Afonso de André
              </p>
            </div>

            {/* Research Project 2 */}
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-bold text-foreground font-gt-ultra-fine mb-3">
                <Link
                  href={localeHref(lang, "/historias/adensamento")}
                  className="hover:underline underline-offset-4"
                >
                  {copy.studyDensity}
                </Link>
              </h3>
              <p className="text-foreground/50 font-gt-ultra-fine">
                Gustavo Theil
              </p>
            </div>

            {/* Research Project 3 */}
            <div className="pb-6">
              <h3 className="text-lg font-bold text-foreground font-gt-ultra-fine mb-3">
                <Link
                  href={localeHref(lang, "/historias/ilhas-de-calor")}
                  className="hover:underline underline-offset-4"
                >
                  {copy.studyHeat}
                </Link>
              </h3>
              <p className="text-foreground/50 font-gt-ultra-fine">
                Carolina Dias, Luna Arouca, Rian de Queiroz, Shyrlei Rosendo,
                Otavio Ranzani, Carolina Hartmann Galeazzi, Fernando Bozza,
                Soraida Aguilar, Bianca de Lima Teixeira, Luis Carlos Soares da
                Costa, Marcela Santos de Melo, Maria Eduarda Souza Neves, Ygor
                Fabregas da Silva, Diana de Souza Beserra, Robert dos Santos da
                Silva
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-lg font-bold text-foreground font-gt-ultra-fine mb-3">
                <Link
                  href={localeHref(lang, "/historias/faixa-azul")}
                  className="hover:underline underline-offset-4"
                >
                  {copy.studyLane}
                </Link>
              </h3>
              <p className="text-foreground/50 font-gt-ultra-fine">
                Adriano Borges Costa, Adriano Dutra, Gustavo Theil, Júlio Mugnol
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Quem nos apoia com logo/imagem a direita do texto quem nos apoia*/}
      <section className="mt-16 mb-20 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          {/* Section Title */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-foreground font-gt-ultra-fine">
              {copy.supporters}
            </h2>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/insper_logo_2.png"
              alt={copy.supportersAlt}
              width={160}
              height={160}
              className="dark:invert"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default CollaboratorsSection;
