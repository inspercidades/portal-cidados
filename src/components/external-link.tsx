import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const ExternalLink = forwardRef<HTMLAnchorElement, ComponentProps<"a">>(
  function ExternalLink({ className, ...props }, ref) {
    return (
      <a
        {...props}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
      />
    );
  },
);
