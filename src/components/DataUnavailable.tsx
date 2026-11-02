"use client";

import { cn } from "@/lib/utils";

import { Icon } from "./IconWrapper";
import { Button } from "./ui/button";

interface DataUnavailableProps {
  /** Usado para compor ids estáveis (ex.: "projects" → "retry-projects"). */
  id: string;
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
  className?: string;
}

/** Estado de uma lista que não pôde ser carregada (ex.: banco fora do ar). */
export function DataUnavailable({
  id,
  message,
  onRetry,
  isRetrying,
  className,
}: DataUnavailableProps) {
  return (
    <div
      id={`unavailable-${id}`}
      role="status"
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-3 rounded-md border border-dashed p-4 text-sm text-muted-foreground",
        className
      )}
    >
      <p className="flex items-start gap-2 flex-1">
        <Icon name="Info" fontSize="small" />
        <span>{message}</span>
      </p>
      <Button
        id={`retry-${id}`}
        aria-label={`Tentar carregar novamente: ${message}`}
        variant="outline"
        size="sm"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {isRetrying ? "Tentando..." : "Tentar novamente"}
      </Button>
    </div>
  );
}
