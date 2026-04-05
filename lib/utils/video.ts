/**
 * Extracts a YouTube video ID from common URL shapes:
 *   https://youtu.be/<id>?...
 *   https://www.youtube.com/watch?v=<id>&...
 *   https://www.youtube.com/embed/<id>
 */
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  );
  return match ? match[1] : null;
}
