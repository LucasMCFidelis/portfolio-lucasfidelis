"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon } from "@/components/IconWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadResumeButtonProps {
  fileId: string;
}

export default function DownloadResumeButton({
  fileId,
}: DownloadResumeButtonProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (!isDownloading) return;

    // Simular um tempo de espera antes de resetar o estado
    const timeout = setTimeout(() => setIsDownloading(false), 3000);
    return () => clearTimeout(timeout);
  }, [isDownloading]);

  const handleDownload = () => setIsDownloading(true);

  return (
    <Link
      href={`https://drive.google.com/uc?export=download&id=${fileId}`}
      aria-disabled={isDownloading}
      onClick={handleDownload}
      download
      className={cn(buttonVariants(),"flex items-center gap-2")}
    >
      {isDownloading ? (
        <>
          BAIXANDO O ARQUIVO
          <span className="text-xl leading-none flex">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </span>
        </>
      ) : (
        <>
          DOWNLOAD RESUME
          <Icon name="Download" />
        </>
      )}
    </Link>
  );
}
