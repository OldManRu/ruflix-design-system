import type { MediaItem } from "../../types/media";

type MediaCardProps = {
  item: MediaItem;
};

export function MediaCard({ item }: MediaCardProps) {
  return (
    <article className="media-card">
      {item.posterUrl ? (
        <img
          className="media-card__poster"
          src={item.posterUrl}
          alt={item.title}
        />
      ) : (
        <div className="media-card__placeholder" />
      )}

      {item.progressPercent ? (
        <div className="media-card__progress">
          <div
            className="media-card__progress-fill"
            style={{ width: `${item.progressPercent}%` }}
          />
        </div>
      ) : null}
    </article>
  );
}