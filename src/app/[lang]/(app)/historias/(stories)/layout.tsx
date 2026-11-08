export default function HistoriasStoryPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="force-light-theme bg-background text-foreground min-h-screen">
      {children}
    </div>
  );
}
