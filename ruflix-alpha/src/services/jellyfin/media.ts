import type { MediaItem } from "../../types/media";

type JellyfinItem = {
  Id: string;
  Name: string;
  Type?: string;

  Overview?: string;

  ProductionYear?: number;

  OfficialRating?: string;

  CommunityRating?: number;

  RunTimeTicks?: number;

  UserData?: {
    PlayedPercentage?: number;
    IsFavorite?: boolean;
  };

  ImageTags?: Record<string, string>;

  BackdropImageTags?: string[];

  ParentLogoItemId?: string;
};

function formatRuntime(ticks?: number): string | undefined {
  if (!ticks) return undefined;

  // Jellyfin stores runtime in 100-nanosecond ticks
  const totalMinutes = Math.round(ticks / 10_000_000 / 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
}

export function mapJellyfinItem(item: JellyfinItem): MediaItem {
  return {
    id: item.Id,

    kind:
      item.Type === "Series"
        ? "series"
        : item.Type === "Episode"
        ? "episode"
        : "movie",

    title: item.Name,

    overview: item.Overview ?? "",

    year: item.ProductionYear,

    rating: item.OfficialRating,

    runtime: formatRuntime(item.RunTimeTicks),

    communityRating: item.CommunityRating,

    progressPercent: item.UserData?.PlayedPercentage,

    backdropUrl: undefined,

    posterUrl: undefined,

    logoUrl: undefined,
  };
}