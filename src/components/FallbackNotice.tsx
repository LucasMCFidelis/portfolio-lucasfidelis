import { cn } from "@/lib/utils";

import { Icon } from "./IconWrapper";

interface FallbackNoticeProps {
  className?: string;
}

/** Avisa que o conteúdo ao lado é a versão padrão (banco inacessível). */
export function FallbackNotice({ className }: FallbackNoticeProps) {
  return (
    <p
      id="fallback-content-notice"
      className={cn(
        "flex items-start gap-2 rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground font-sans",
        className
      )}
    >
      <Icon name="Info" fontSize="inherit" />
      <span>
        Versão padrão: não foi possível carregar os dados atualizados agora,
        então este conteúdo pode não estar completamente atualizado.
      </span>
    </p>
  );
}
