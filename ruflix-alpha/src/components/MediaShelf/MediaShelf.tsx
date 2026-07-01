import type { MediaItem } from "../../types/media";
import { MediaCard } from "../MediaCard/MediaCard";

type MediaShelfProps = {
  title: string;
  items: MediaItem[];
};

export function MediaShelf({ title, items }: MediaShelfProps) {
  if (items.length === 0) return null;

  return (
    <section className="media-shelf">
      <h2>{title}</h2>

      <div className="media-shelf__row">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}