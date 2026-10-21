import type React from "react";

const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 md:w-4 md:h-4 text-black"
    aria-hidden="true"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

interface ScrollToTopButtonProps {
  borderColor?: string;
  backgroundColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function ScrollToTopButton({
  borderColor = "#EFEFEF",
  backgroundColor = "#FFFFFF",
  icon = <ArrowUpIcon />,
  onClick,
}: ScrollToTopButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ borderColor, backgroundColor }}
      className="w-8 h-8 md:w-10 md:h-10 border-2 flex items-center justify-center cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-110"
      aria-label="Voltar ao topo"
    >
      {icon}
    </button>
  );
}
