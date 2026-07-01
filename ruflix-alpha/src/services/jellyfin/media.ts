import type { MediaItem } from "../../types/media";
import { JellyfinImages } from "./images";

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

  ParentBackdropItemId?: string;
  ParentLogoItemId?: string;
  SeriesId?: string;
};

function formatRuntime(ticks?: number): string | undefined {
  if (!ticks) return undefined;

  const totalMinutes = Math.round(ticks / 10_000_000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;

  return `${hours}h ${minutes}m`;
}

function getBackdropOwnerId(item: JellyfinItem) {
  if (item.BackdropImageTags?.length) return item.Id;
  return item.ParentBackdropItemId ?? item.SeriesId ?? item.Id;
}

function getLogoOwnerId(item: JellyfinItem) {
  if (item.ImageTags?.Logo) return item.Id;
  return item.ParentLogoItemId ?? item.SeriesId;
}

export function mapJellyfinItem(
  item: JellyfinItem,
  images: JellyfinImages,
): MediaItem {
  const backdropOwnerId = getBackdropOwnerId(item);
  const logoOwnerId = getLogoOwnerId(item);

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

    backdropUrl: images.backdrop(backdropOwnerId),
    posterUrl: images.poster(item.Id, item.ImageTags?.Primary),
    logoUrl: logoOwnerId ? images.logo(logoOwnerId, item.ImageTags?.Logo) : undefined,
  };
}