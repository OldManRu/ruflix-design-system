export type MediaKind = "movie" | "series" | "episode";

export type MediaItem = {
  id: string;

  // Existing
  kind: MediaKind;
  title: string;
  overview: string;

  year?: number;
  rating?: string;
  runtime?: string;
  communityRating?: number;
  progressPercent?: number;

  backdropUrl?: string;
  posterUrl?: string;
  logoUrl?: string;

  // NEW - preserve Jellyfin hierarchy
  seriesId?: string;
  seriesTitle?: string;

  seasonNumber?: number;
  episodeNumber?: number;
};