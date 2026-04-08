"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import insperLogo from "../assets/insper-logo.png";
import portalLogo from "../assets/portal_cidados_logo.png";

interface StoryLogosProps {
  inverted?: boolean;
  hoverable?: boolean;
}

export function StoryLogos({
  inverted = false,
  hoverable = true,
}: StoryLogosProps) {
  const [hoveredLogo, setHoveredLogo] = useState<"insper" | "portal" | null>(
    null,
  );

  const invertClass = inverted ? "brightness-0 invert" : "";

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
          src={insperLogo}
          alt="Insper Logo"
          width={88}
          height={33}
          className={`h-auto w-20 sm:w-26 transition-transform duration-300 ${invertClass} ${insperScale}`}
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
          alt="Portal Cidadãos Logo"
          width={100}
          height={33}
          className={`h-auto w-22 sm:w-34 transition-transform duration-300 ${invertClass} ${portalScale}`}
          priority
        />
      </Link>
    </div>
  );
}
