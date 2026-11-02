"use server";

import { getResumeDownloadUrl } from "@/utils/resumeDownloadUrl";

/** Ids do Google Drive só têm letras, números, `-` e `_`. */
const DRIVE_FILE_ID_PATTERN = /^[\w-]+$/;
const DRIVE_TIMEOUT_MS = 5000;

/**
 * Verifica se o currículo pode ser baixado: o arquivo precisa existir no Google
 * Drive e ser público. A consulta roda no servidor porque o Drive não libera
 * CORS para o browser.
 *
 * - id inexistente → 404;
 * - arquivo privado → redireciona para o login do Google (página HTML) ou 403;
 * - arquivo público → o próprio arquivo como anexo.
 *
 * Falhas de rede são propagadas (o React Query trata como erro e a UI mostra o
 * aviso de indisponibilidade).
 */
export async function getResumeAvailability(fileId: string): Promise<boolean> {
  if (!DRIVE_FILE_ID_PATTERN.test(fileId)) return false;

  const response = await fetch(getResumeDownloadUrl(fileId), {
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(DRIVE_TIMEOUT_MS),
  });

  // Só os cabeçalhos interessam: não baixa o arquivo inteiro.
  await response.body?.cancel().catch(() => {});

  if (!response.ok) return false;

  const redirectedToLogin = new URL(response.url).hostname === "accounts.google.com";
  const isHtmlPage = (response.headers.get("content-type") ?? "").includes("text/html");

  return !redirectedToLogin && !isHtmlPage;
}
