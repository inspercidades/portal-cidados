"use client";

import { Header } from "@/components/Header";
import { StoriesSection } from "@/components/StoriesSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState("4rem");
  const [isReady, setIsReady] = useState(false); // Adicionar este estado

  useEffect(() => {
    const adjustFontSize = () => {
      if (titleRef.current) {
        const container = titleRef.current;
        const containerWidth = container.offsetWidth;
        let min = 1;
        let max = 200;
        let best = min;

        while (min <= max) {
          const mid = Math.floor((min + max) / 2);
          container.style.fontSize = `${mid}px`;

          const textWidth = container.scrollWidth;

          if (textWidth <= containerWidth) {
            best = mid;
            min = mid + 1;
          } else {
            max = mid - 1;
          }
        }

        container.style.fontSize = `${best}px`;
        setFontSize(`${best}px`);
        setIsReady(true); // Marcar como pronto após calcular
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-left pt-4">
          <h1
            ref={titleRef}
            className="font-gt-ultra font-normal text-foreground mb-6 mt-6 leading-none whitespace-nowrap w-full transition-opacity duration-200"
            style={{
              fontSize,
              opacity: isReady ? 1 : 0, // Ocultar até estar pronto
            }}
          >
            CIDADES@DADOS
          </h1>

          <p className="text-md text-foreground font-gt-ultra-fine mb-4 max-w-4xl">
            Criado pelo Centro de Estudos das Cidades – Laboratório Arq.Futuro
            do Insper, o Portal Cidados apresenta nossos estudos e pesquisas por
            meio de narrativas baseadas em dados, aproximando a produção
            científica da sociedade e do debate público sobre as políticas
            urbanas. Nosso objetivo é tornar os dados sobre as cidades mais
            compreensíveis e acessíveis, contribuindo para a construção de
            políticas públicas baseadas em evidências.
          </p>

          <div className="flex flex-row gap-4">
            <Link href="/geoportal">
              <Button
                variant="default"
                size="lg"
                className="text-foreground bg-secondary hover:bg-secondary/80 justify-between group"
              >
                Mapas
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/catalogo-de-dados">
              <Button
                variant="default"
                size="lg"
                className="text-foreground bg-secondary hover:bg-secondary/80 justify-between group"
              >
                Catálogo de dados
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <StoriesSection />
    </div>
  );
}
