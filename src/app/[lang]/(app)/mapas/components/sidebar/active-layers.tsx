"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { type Chrome, chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import { moveInDisplayOrder, toDisplayOrder } from "../../lib/layer-order";

type MapsCopy = Chrome["maps"];

interface ActiveLayersProps {
  /** Ordem de desenho: a primeira camada fica embaixo. */
  order: string[];
  names: Record<string, string>;
  onReorder: (order: string[]) => void;
  onRemove: (id: string) => void;
}

function SortableLayer({
  id,
  name,
  copy,
  onRemove,
}: {
  id: string;
  name: string;
  copy: MapsCopy;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "relative flex items-center gap-2 rounded-[8px] border bg-background px-2 py-2 text-sm",
        isDragging ? "z-10 border-foreground shadow-md" : "border-border",
      )}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label={`${copy.dragLayer}: ${name}`}
        title={copy.dragLayer}
        className="flex h-6 w-5 shrink-0 cursor-grab touch-none items-center justify-center rounded-[4px] text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden />
      </button>
      <span className="min-w-0 flex-1 truncate">{name}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${copy.removeLayer}: ${name}`}
        title={copy.removeLayer}
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </li>
  );
}

/**
 * Camadas ligadas, a do topo do mapa primeiro. Arrastar (mouse, toque ou
 * teclado) muda a ordem de empilhamento.
 */
export function ActiveLayers({
  order,
  names,
  onReorder,
  onRemove,
}: ActiveLayersProps) {
  const copy = chrome[useLocale()].maps;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const display = toDisplayOrder(order);
  const nameOf = (id: unknown) => names[String(id)] ?? String(id);
  const say = (template: string, id: unknown) =>
    template.replace("{name}", nameOf(id));

  if (display.length === 0) {
    return (
      <p className="mx-4 mb-4 flex h-10 items-center justify-center rounded-[8px] border border-dashed border-border text-xs text-muted-foreground">
        {copy.noActiveLayers}
      </p>
    );
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    onReorder(moveInDisplayOrder(order, String(active.id), String(over.id)));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      accessibility={{
        screenReaderInstructions: { draggable: copy.dndInstructions },
        announcements: {
          onDragStart: ({ active }) => say(copy.dndStart, active.id),
          onDragOver: ({ active }) => say(copy.dndOver, active.id),
          onDragEnd: ({ active }) => say(copy.dndEnd, active.id),
          onDragCancel: ({ active }) => say(copy.dndCancel, active.id),
        },
      }}
    >
      <SortableContext items={display} strategy={verticalListSortingStrategy}>
        <ul aria-label={copy.activeLayers} className="space-y-2 px-4 pb-4">
          {display.map((id) => (
            <SortableLayer
              key={id}
              id={id}
              name={nameOf(id)}
              copy={copy}
              onRemove={() => onRemove(id)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
