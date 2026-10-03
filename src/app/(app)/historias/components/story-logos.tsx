"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import portalLogo from "../assets/portal_cidados_logo.png";

interface StoryLogosProps {
  inverted?: boolean;
  hoverable?: boolean;
  imageClassName?: string;
}

export function StoryLogos({
  inverted = false,
  hoverable = true,
  imageClassName,
}: StoryLogosProps) {
  const [hoveredLogo, setHoveredLogo] = useState<"insper" | "portal" | null>(
    null,
  );

  const invertClass = inverted ? "brightness-0 invert" : "";
  const filterClass = imageClassName ?? invertClass;

  const insperScale = hoverable
    ? hoveredLogo === "insper"
      ? "scale-110"
      : hoveredLogo === "portal"
        ? "scale-90"
        : "scale-100"
    : "";

  const portalScale = hoverable
    ? hoveredLogo === "portal"
      ? "scale-110"
      : hoveredLogo === "insper"
        ? "scale-90"
        : "scale-100"
    : "";

  return (
    <div className="flex flex-row gap-5 items-center">
      <Link
        href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer transition-all duration-300"
        {...(hoverable && {
          onMouseEnter: () => setHoveredLogo("insper"),
          onMouseLeave: () => setHoveredLogo(null),
        })}
      >
        <Image
          src="/arq_futuro_icon.png"
          alt="Insper Logo"
          width={384}
          height={128}
          className={`h-auto w-40 sm:w-48 max-w-none transition-transform duration-300 ${filterClass} ${insperScale}`}
          priority
        />
      </Link>
      <Link
        href="/"
        className="cursor-pointer transition-all duration-300"
        {...(hoverable && {
          onMouseEnter: () => setHoveredLogo("portal"),
          onMouseLeave: () => setHoveredLogo(null),
        })}
      >
        <Image
          src={portalLogo}
          alt="Portal Cidados Logo"
          width={272}
          height={90}
          className={`h-auto w-26 sm:w-34 max-w-none transition-transform duration-300 ${filterClass} ${portalScale}`}
          priority
        />
      </Link>
    </div>
  );
}
