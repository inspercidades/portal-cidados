"use client";

import type { DataCatalogItem } from "@/lib/data/catalog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface DataCardProps {
  item: DataCatalogItem;
}

export function DataCard({ item }: DataCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTags = (tags: string[]) => {
    return tags.map((tag) => {
      if (tag === "Disponível para download") return "Download";
      if (tag === "Sala segura do Insper") return "Sala segura";
      return tag;
    });
  };

  const formattedTags = formatTags(item.tags);

  // Separar tags de forma de acesso das outras tags
  const accessMethodTags = [
    "Disponível para download",
    "Sala segura do Insper",
  ];

  // Obter forma de acesso (prioriza accessMethod, senão busca nas tags)
  const accessMethod =
    item.accessMethod ||
    item.tags.find((tag) => accessMethodTags.includes(tag));
  const hasDatasets = item.dataset_info && item.dataset_info.length > 0;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleDatasetAccess = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const cardContent = (
    <>
      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
        {item.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {item.description}
      </p>

      <div className="flex flex-col gap-2">
        {/* Tema e Região */}
        <div className="flex flex-wrap gap-2">
          {formattedTags.slice(0, -1).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Forma de Acesso - sempre na linha de baixo */}
        {formattedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
              {formattedTags[formattedTags.length - 1]}
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="bg-background-2 p-6 transition-shadow cursor-pointer hover:shadow-sm w-full text-left"
        onClick={handleCardClick}
      >
        {cardContent}
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              {item.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {item.theme} • {item.region}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Descrição completa */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Descrição
              </h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Palavras-chave */}
            {item.keywords && item.keywords.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Palavras-chave
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tema */}
            {item.theme && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Tema
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
                    {item.theme}
                  </span>
                </div>
              </div>
            )}

            {/* Região */}
            {item.region && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Região
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
                    {item.region}
                  </span>
                </div>
              </div>
            )}

            {/* Forma de acesso */}
            {accessMethod && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Forma de acesso
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
                    {accessMethod}
                  </span>
                </div>
              </div>
            )}

            {/* Data de criação */}
            {item.createdAt && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Data de criação
                </h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Datasets */}
            {hasDatasets && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Conjuntos de dados disponíveis ({item.dataset_info.length})
                </h4>
                <div className="space-y-3">
                  {item.dataset_info.map((dataset) => (
                    <div
                      key={dataset.dataset_link}
                      className="border border-foreground/10 bg-background-2 p-4 rounded-sm"
                    >
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h5 className="text-sm font-semibold text-foreground flex-1 min-w-0">
                          {dataset.dataset_title}
                        </h5>
                        <Button
                          onClick={() =>
                            handleDatasetAccess(dataset.dataset_link)
                          }
                          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shrink-0"
                          size="sm"
                        >
                          Acessar
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-[13px] text-muted-foreground whitespace-pre-line">
                        {dataset.dataset_description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
