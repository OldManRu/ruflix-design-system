import { useEffect } from "react";
import type { MediaItem } from "../../types/media";
import type { MediaDetails } from "../../types/mediaDetails";
import "./DetailsOverlay.css";

type DetailsOverlayProps = {
  item: MediaItem | MediaDetails;
  onClose: () => void;
};

export function DetailsOverlay({ item, onClose }: DetailsOverlayProps) {
    useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = previousOverflow;
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onClose]);

  return (
    <div
        className="details-overlay"
        onClick={onClose}
    >
      <div
        className="details-hero"
        onClick={(event) => event.stopPropagation()}
        style={{
          backgroundImage: item.backdropUrl
            ? `url(${item.backdropUrl})`
            : undefined,
        }}
    >
        <div className="details-hero-overlay">
          
          {item.logoUrl ? (
            <img className="details-logo" src={item.logoUrl} alt={item.title} />
          ) : (
            <h1>{item.title}</h1>
          )}

          <div className="metadata">
            {item.communityRating ? (
              <span className="metadata-rating">
                ★ {item.communityRating.toFixed(1)}
              </span>
            ) : null}
            {item.rating ? <span>{item.rating}</span> : null}
            {item.year ? <span>{item.year}</span> : null}
            {item.runtime ? <span>{item.runtime}</span> : null}
          </div>

          <p>{item.overview}</p>

          <div className="actions">
            <button className="primary">
              {item.progressPercent ? "Resume" : "Play"}
            </button>

            <button className="secondary">More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
}