import type { MediaItem } from "../../types/media";

export function dedupeRecentlyAdded(items: MediaItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key =
      item.kind === "episode" && item.seriesId
        ? item.seriesId
        : item.id;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}