export type JellyfinImageType =
  | "Primary"
  | "Backdrop"
  | "Logo"
  | "Thumb"
  | "Banner";

export class JellyfinImages {
  private readonly serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  image(
    itemId: string,
    type: JellyfinImageType,
    width = 1280,
    tag?: string,
  ) {
    const cacheTag = tag ? `&tag=${encodeURIComponent(tag)}` : "";

    return (
      `${this.serverUrl}/Items/${itemId}/Images/${type}` +
      `?fillWidth=${width}&quality=90${cacheTag}`
    );
  }

  poster(itemId: string, tag?: string) {
    return this.image(itemId, "Primary", 420, tag);
  }

  backdrop(itemId: string, tag?: string) {
    return this.image(itemId, "Backdrop", 1920, tag);
  }

  logo(itemId: string, tag?: string) {
    return this.image(itemId, "Logo", 800, tag);
  }

  thumb(itemId: string, tag?: string) {
    return this.image(itemId, "Thumb", 640, tag);
  }

  banner(itemId: string, tag?: string) {
    return this.image(itemId, "Banner", 1280, tag);
  }
}