export function makeImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `/api/image?image=${url}`
}
