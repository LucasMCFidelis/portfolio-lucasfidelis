/** Link de download direto de um arquivo do Google Drive. */
export function getResumeDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}
