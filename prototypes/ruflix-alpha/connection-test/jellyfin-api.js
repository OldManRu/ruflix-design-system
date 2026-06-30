const STORAGE_KEYS = {
  serverUrl: 'ruflix.jellyfin.serverUrl',
  token: 'ruflix.jellyfin.token',
  userId: 'ruflix.jellyfin.userId'
};

const CLIENT_NAME = 'RuFlix Alpha';
const DEVICE_NAME = 'RuFlix Browser Prototype';
const DEVICE_ID = 'ruflix-alpha-browser';
const VERSION = '0.1.0';

function normalizeServerUrl(url) {
  return url.trim().replace(/\/+$/, '');
}

function authHeader(token) {
  const parts = [
    `MediaBrowser Client="${CLIENT_NAME}"`,
    `Device="${DEVICE_NAME}"`,
    `DeviceId="${DEVICE_ID}"`,
    `Version="${VERSION}"`
  ];
  if (token) parts.push(`Token="${token}"`);
  return parts.join(', ');
}

class JellyfinApi {
  constructor(serverUrl, token = null, userId = null) {
    this.serverUrl = normalizeServerUrl(serverUrl);
    this.token = token;
    this.userId = userId;
  }

  async request(path, options = {}) {
    const response = await fetch(`${this.serverUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader(this.token),
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`);
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async publicInfo() {
    return this.request('/System/Info/Public');
  }

  async login(username, password) {
    const result = await this.request('/Users/AuthenticateByName', {
      method: 'POST',
      body: JSON.stringify({ Username: username, Pw: password })
    });
    this.token = result.AccessToken;
    this.userId = result.User.Id;
    return result;
  }

  async currentUser() {
    return this.request('/Users/Me');
  }

  async libraries() {
    return this.request(`/Users/${this.userId}/Views`);
  }

  async latest(limit = 12) {
    return this.request(`/Users/${this.userId}/Items/Latest?Limit=${limit}&Fields=PrimaryImageAspectRatio,Overview,Genres,RunTimeTicks,ProductionYear`);
  }

  async resume(limit = 12) {
    return this.request(`/Users/${this.userId}/Items/Resume?Limit=${limit}&Recursive=true&Fields=PrimaryImageAspectRatio,Overview,Genres,RunTimeTicks,ProductionYear,UserData`);
  }

  imageUrl(item, type = 'Primary', width = 360) {
    if (!item || !item.Id) return '';
    const tag = item.ImageTags && item.ImageTags[type] ? `&tag=${encodeURIComponent(item.ImageTags[type])}` : '';
    return `${this.serverUrl}/Items/${item.Id}/Images/${type}?fillWidth=${width}&quality=90${tag}`;
  }

  playbackUrl(item) {
    if (!item || !item.Id) return '';
    return `${this.serverUrl}/Videos/${item.Id}/stream?Static=true&mediaSourceId=${item.Id}&api_key=${encodeURIComponent(this.token || '')}`;
  }
}

window.JellyfinApi = JellyfinApi;
window.RuFlixStorageKeys = STORAGE_KEYS;
