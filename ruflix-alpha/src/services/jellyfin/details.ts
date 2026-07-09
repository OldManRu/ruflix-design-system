import type { MediaDetails } from "../../types/mediaDetails";
import { JellyfinImages } from "./images";

type JellyfinPerson = {
  Id: string;
  Name: string;
  Role?: string;
  PrimaryImageTag?: string;
};

type JellyfinItemDetails = {
  Id: string;
  Name: string;
  Overview?: string;
  ProductionYear?: number;
  OfficialRating?: string;
  CommunityRating?: number;
  RunTimeTicks?: number;
  Genres?: string[];
  Studios?: { Name: string }[];
  People?: JellyfinPerson[];
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

  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
}

function getBackdropOwnerId(item: JellyfinItemDetails) {
  if (item.BackdropImageTags?.length) return item.Id;
  return item.ParentBackdropItemId ?? item.SeriesId ?? item.Id;
}

function getLogoOwnerId(item: JellyfinItemDetails) {
  if (item.ImageTags?.Logo) return item.Id;
  return item.ParentLogoItemId ?? item.SeriesId;
}

export function mapJellyfinDetails(
  item: JellyfinItemDetails,
  images: JellyfinImages,
): MediaDetails {
  const backdropOwnerId = getBackdropOwnerId(item);
  const logoOwnerId = getLogoOwnerId(item);

  return {
    id: item.Id,
    title: item.Name,
    overview: item.Overview ?? "",

    posterUrl: item.ImageTags?.Primary
      ? images.poster(item.Id, item.ImageTags.Primary)
      : undefined,

    backdropUrl: backdropOwnerId
      ? images.backdrop(backdropOwnerId)
      : undefined,

    logoUrl: logoOwnerId
      ? images.logo(logoOwnerId, item.ImageTags?.Logo)
      : undefined,

    year: item.ProductionYear,
    rating: item.OfficialRating,
    runtime: formatRuntime(item.RunTimeTicks),
    communityRating: item.CommunityRating,

    genres: item.Genres ?? [],
    studios: item.Studios?.map((studio) => studio.Name) ?? [],

    people:
      item.People?.map((person) => ({
        id: person.Id,
        name: person.Name,
        role: person.Role,
        imageUrl: person.PrimaryImageTag
          ? images.image(person.Id, "Primary", 240, person.PrimaryImageTag)
          : undefined,
      })) ?? [],
  };
}