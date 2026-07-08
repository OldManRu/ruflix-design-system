import type { MediaItem } from "./media";

export type MediaShelfData = {
  id: string;
  title: string;
  items: MediaItem[];
};

export type HomeFeedData = {
  featured: MediaItem;
  shelves: MediaShelfData[];
  status: string;
};