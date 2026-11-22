"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Sheet({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-[7px]",
        "data-[state=open]:animate-[catalog-overlay-in_0.24s_cubic-bezier(0.16,1,0.3,1)_both]",
        "data-[state=closed]:animate-[catalog-overlay-out_0.16s_cubic-bezier(0.22,1,0.36,1)_both]",
        "motion-reduce:data-[state=open]:animate-[catalog-overlay-in_0.01s_linear_both]",
        "motion-reduce:data-[state=closed]:animate-[catalog-overlay-out_0.01s_linear_both]",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "right" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-lenis-prevent
        className={cn(
          "bg-background fixed z-50 flex flex-col border-border shadow-lg outline-none",
          side === "right" &&
            "inset-y-0 right-0 h-dvh w-full max-w-[480px] border-l",
          side === "left" &&
            "inset-y-0 left-0 h-dvh w-full max-w-[480px] border-r",
          side === "right" &&
            "data-[state=open]:animate-[catalog-sheet-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both] data-[state=closed]:animate-[catalog-sheet-out_0.16s_cubic-bezier(0.22,1,0.36,1)_both]",
          side === "left" &&
            "data-[state=open]:animate-[catalog-sheet-in-left_0.5s_cubic-bezier(0.22,1,0.36,1)_both] data-[state=closed]:animate-[catalog-sheet-out-left_0.16s_cubic-bezier(0.22,1,0.36,1)_both]",
          "motion-reduce:data-[state=open]:animate-[catalog-overlay-in_0.12s_linear_both] motion-reduce:data-[state=closed]:animate-[catalog-overlay-out_0.12s_linear_both]",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="sheet-close"
            className="absolute top-[1.375rem] right-6 grid size-8 place-items-center border border-border text-muted-foreground transition-colors hover:bg-foreground/6 hover:text-foreground focus:outline-hidden"
          >
            <XIcon className="size-4" strokeWidth={1.75} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-b border-border p-6 pr-14",
        className,
      )}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "catalog-sheet-body flex-1 overflow-y-auto p-6 text-sm",
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "catalog-sheet-rise font-gt-ultra-fine text-2xl font-bold leading-[1.2] tracking-tight text-foreground [animation-delay:60ms]",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "catalog-sheet-rise text-sm leading-relaxed text-muted-foreground whitespace-pre-line [animation-delay:120ms]",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
