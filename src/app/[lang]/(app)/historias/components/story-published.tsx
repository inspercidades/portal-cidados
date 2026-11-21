type StoryPublishedProps = {
  label: string;
  date: string;
  color?: string;
  className?: string;
};

export function StoryPublished({
  label,
  date,
  color = "#23254E",
  className = "mb-8",
}: StoryPublishedProps) {
  return (
    <div
      className={`flex items-center gap-3 text-sm ${className}`}
      style={{ color }}
    >
      <span
        className="w-0.5 h-6 shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <p>
        {label} <strong>{date}</strong>.
      </p>
    </div>
  );
}
