import { JellyfinClient, JELLYFIN_STORAGE_KEYS } from "./client";
import { mapJellyfinItem } from "./media";
import { JellyfinImages } from "./images";

function getStoredConnection() {
  const serverUrl = localStorage.getItem(JELLYFIN_STORAGE_KEYS.serverUrl);
  const token = localStorage.getItem(JELLYFIN_STORAGE_KEYS.token);
  const userId = localStorage.getItem(JELLYFIN_STORAGE_KEYS.userId);

  if (!serverUrl || !token || !userId) {
    return null;
  }

  return { serverUrl, token, userId };
}

export function createJellyfinService() {
  
    const connection = getStoredConnection();

  if (!connection) {
    return null;
  }

  const client = new JellyfinClient(
    connection.serverUrl,
    connection.token,
    connection.userId,
  );

  const images = new JellyfinImages(connection.serverUrl);

  return {
    async getContinueWatching(limit = 12) {
      const response = await client.resume(limit);

      const items = Array.isArray(response)
        ? response
        : (response as { Items?: unknown[] }).Items ?? [];

      return items.map((item) => mapJellyfinItem(item as never, images));
    },

    async getLatest(limit = 12) {
      const response = await client.latest(limit);

      const items = Array.isArray(response)
        ? response
        : (response as { Items?: unknown[] }).Items ?? [];

      return items.map((item) => mapJellyfinItem(item as never, images));
    },
  };
}