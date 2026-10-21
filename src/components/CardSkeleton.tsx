export function CardSkeleton() {
  return (
    <div className="bg-background-2 p-6">
      {/* Title skeleton - matching text-lg height */}
      <div className="h-7 bg-foreground/10 w-full mb-3 animate-pulse"></div>

      {/* Description skeleton - matching text-sm with line-clamp-3 */}
      <div className="space-y-2 mb-4">
        <div className="h-5 bg-foreground/10 w-full animate-pulse"></div>
        <div className="h-5 bg-foreground/10 w-full animate-pulse"></div>
        <div className="h-5 bg-foreground/10 w-3/4 animate-pulse"></div>
      </div>

      {/* Tags skeleton - matching DataCard tags (2 badges on top, 1 on bottom) */}
      <div className="flex flex-col gap-2">
        {/* Tema e Região */}
        <div className="flex flex-wrap gap-2">
          <div className="h-7 bg-foreground/6 w-20 animate-pulse"></div>
          <div className="h-7 bg-foreground/6 w-24 animate-pulse"></div>
        </div>
        {/* Forma de Acesso - sempre na linha de baixo */}
        <div className="flex flex-wrap gap-2">
          <div className="h-7 bg-foreground/6 w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
