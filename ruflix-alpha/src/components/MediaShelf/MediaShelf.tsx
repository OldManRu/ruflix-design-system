import type { MediaItem } from "../../types/media";
import { MediaCard } from "../MediaCard/MediaCard";
import "./MediaShelf.css";

type MediaShelfProps = {
  title: string;
  items: MediaItem[];
  onHighlight?: (item: MediaItem) => void;
  onSelect?: (item: MediaItem) => void;
};

export function MediaShelf({
  title,
  items,
  onHighlight,
  onSelect,
}: MediaShelfProps) {
  if (items.length === 0) return null;

  return (
    <section className="media-shelf">
      <h2>{title}</h2>

      <div className="media-shelf__row">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onHover={() => onHighlight?.(item)}
            onClick={() => onSelect?.(item)}
/>
        ))}
      </div>
    </section>
  );
}