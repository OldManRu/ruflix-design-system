import type { MediaItem } from '../types/media';

export type MediaCardProps = {
  item: MediaItem;
  onOpen: () => void;
};
