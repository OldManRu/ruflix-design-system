import { useEffect } from "react";
import type { MediaItem } from "../../types/media";
import type { MediaDetails } from "../../types/MediaDetails";
import "./DetailsOverlay.css";

type DetailsOverlayProps = {
  item: MediaItem | MediaDetails;
  onClose: () => void;
};

function hasGenres(item: MediaItem | MediaDetails): item is MediaDetails {
  return "genres" in item && item.genres.length > 0;
}

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
            <img
              className="details-logo"
              src={item.logoUrl}
              alt={item.title}
            />
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
  {item.progressPercent ? (
    <>
      <button className="primary">
        Resume
      </button>

      <button className="secondary">
        Play From Beginning
      </button>
    </>
  ) : (
    <button className="primary">
      Play
    </button>
  )}

  <button className="secondary">
    Trailer
  </button>

  <button className="secondary">
    Cast
  </button>
</div>

          {hasGenres(item) ? (
            <div className="details-genres">
              {item.genres.join(" • ")}
            </div>
          ) : null}

          {hasGenres(item) && item.people.length > 0 ? (
            <div className="details-cast">
              <h3>Cast</h3>

              <div className="cast-row">
                {item.people.slice(0, 10).map((person) => (
                  <div
                    key={person.id}
                    className="cast-member"
                  >
                    {person.imageUrl ? (
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                      />
                    ) : (
                      <div className="cast-placeholder" />
                    )}

                    <span className="cast-name">
                      {person.name}
                    </span>

                    {person.role ? (
                      <span className="cast-role">
                        {person.role}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}