export type MediaKind = 'movie' | 'series' | 'episode' | 'live' | 'unknown';

export interface MediaItem {
  id: string;
  title: string;
  subtitle?: string;
  kind: MediaKind;
  overview?: string;
  year?: number;
  rating?: string;
  runtime?: string;
  communityRating?: number;
  progressPercent?: number;
  primaryImageUrl?: string;
  backdropUrl?: string;
  logoUrl?: string;
}
