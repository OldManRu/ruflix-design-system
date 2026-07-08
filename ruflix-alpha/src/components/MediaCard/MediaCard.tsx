import type { MediaItem } from "../../types/media";
import "./MediaCard.css";

type MediaCardProps = {
  item: MediaItem;
  onHover?: () => void;
};

export function MediaCard({ item, onHover }: MediaCardProps) {
  return (
    <article
      className="media-card"
      onMouseEnter={onHover}
    >
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