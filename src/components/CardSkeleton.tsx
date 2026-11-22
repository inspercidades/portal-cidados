export function CardSkeleton() {
  return (
    <div className="flex h-full flex-col bg-foreground/3">
      <div className="flex items-start justify-between gap-3 px-7 pt-7 pb-4">
        <div className="h-7 w-4/5 animate-pulse bg-foreground/10" />
        <div className="h-6 w-16 shrink-0 animate-pulse bg-foreground/6" />
      </div>
      <div className="flex flex-wrap gap-2 px-7 pb-7">
        <div className="h-6 w-20 animate-pulse bg-foreground/6" />
        <div className="h-6 w-16 animate-pulse bg-foreground/6" />
        <div className="h-6 w-14 animate-pulse bg-foreground/6" />
      </div>
    </div>
  );
}
