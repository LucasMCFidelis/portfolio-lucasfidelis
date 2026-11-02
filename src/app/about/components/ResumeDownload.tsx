"use client";

import { Icon } from "@/components/IconWrapper";
import { Button } from "@/components/ui/button";
import { useResumeAvailability } from "@/data/resume/useResumeAvailability";

import DownloadResumeButton from "./DownloadResumeButton";

interface ResumeDownloadProps {
  fileId: string;
}

/**
 * Só oferece o download se o arquivo existir no Google Drive e for público;
 * caso contrário, mostra um aviso desabilitado no lugar do botão.
 */
export default function ResumeDownload({ fileId }: ResumeDownloadProps) {
  const status = useResumeAvailability();

  if (status === "available") return <DownloadResumeButton fileId={fileId} />;

  const label =
    status === "checking"
      ? "Verificando currículo..."
      : "Currículo indisponível no momento";

  return (
    <Button
      id={status === "checking" ? "resume-checking" : "resume-unavailable"}
      aria-label={label}
      disabled
      className="flex items-center gap-2"
    >
      {label}
      <Icon name={status === "checking" ? "Download" : "Info"} />
    </Button>
  );
}
