export type JellyfinConnection = {
  serverUrl: string;
  token: string;
  userId: string;
};

const CLIENT_NAME = "RuFlix Alpha";
const DEVICE_NAME = "RuFlix Browser Alpha";
const DEVICE_ID = "ruflix-alpha-browser";
const VERSION = "0.1.0";

export const JELLYFIN_STORAGE_KEYS = {
  serverUrl: "ruflix.jellyfin.serverUrl",
  token: "ruflix.jellyfin.token",
  userId: "ruflix.jellyfin.userId",
} as const;

const ITEM_FIELDS = [
  "PrimaryImageAspectRatio",
  "Overview",
  "Genres",
  "RunTimeTicks",
  "ProductionYear",
  "OfficialRating",
  "CommunityRating",
  "UserData",
  "ImageTags",
  "BackdropImageTags",
  "ParentBackdropImageTags",
  "ParentBackdropItemId",
  "ParentLogoItemId",
  "SeriesId",
  "SeriesName",
  "SeasonName",
  "IndexNumber",
  "ParentIndexNumber",
  "MediaSources",
].join(",");

function normalizeServerUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

function authHeader(token?: string) {
  const parts = [
    `MediaBrowser Client="${CLIENT_NAME}"`,
    `Device="${DEVICE_NAME}"`,
    `DeviceId="${DEVICE_ID}"`,
    `Version="${VERSION}"`,
  ];

  if (token) {
    parts.push(`Token="${token}"`);
  }

  return parts.join(", ");
}

export class JellyfinClient {
  serverUrl: string;
  token?: string;
  userId?: string;

  constructor(serverUrl: string, token?: string, userId?: string) {
    this.serverUrl = normalizeServerUrl(serverUrl);
    this.token = token;
    this.userId = userId;
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.serverUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(this.token),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `${response.status} ${response.statusText}${body ? ` - ${body}` : ""}`,
      );
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json() as Promise<T>;
  }

  publicInfo() {
    return this.request("/System/Info/Public");
  }

  async login(username: string, password: string) {
    const result = await this.request<{
      AccessToken: string;
      User: { Id: string; Name: string };
    }>("/Users/AuthenticateByName", {
      method: "POST",
      body: JSON.stringify({ Username: username, Pw: password }),
    });

    this.token = result.AccessToken;
    this.userId = result.User.Id;

    return result;
  }

  currentUser() {
    return this.request("/Users/Me");
  }

  libraries() {
    return this.request(`/Users/${this.userId}/Views`);
  }

  latest(limit = 12) {
    return this.request(
      `/Users/${this.userId}/Items/Latest?Limit=${limit}&Fields=${encodeURIComponent(
        ITEM_FIELDS,
      )}&EnableImageTypes=Primary,Backdrop,Logo`,
    );
  }

  resume(limit = 12) {
    return this.request(
      `/Users/${this.userId}/Items/Resume?Limit=${limit}&Recursive=true&Fields=${encodeURIComponent(
        ITEM_FIELDS,
      )}&EnableImageTypes=Primary,Backdrop,Logo`,
    );
  }

  imageUrl(itemId: string, type = "Primary", width = 360, tag?: string) {
    const cacheTag = tag ? `&tag=${encodeURIComponent(tag)}` : "";
    return `${this.serverUrl}/Items/${itemId}/Images/${type}?fillWidth=${width}&quality=90${cacheTag}`;
  }

  item(itemId: string) {
  return this.request(
    `/Users/${this.userId}/Items/${itemId}?Fields=${encodeURIComponent(
      ITEM_FIELDS,
    )},People,Studios,Genres`
  );
}
  playbackUrl(itemId: string) {
    return `${this.serverUrl}/Videos/${itemId}/stream?Static=true&mediaSourceId=${itemId}&api_key=${encodeURIComponent(
      this.token || "",
    )}`;
  }
}