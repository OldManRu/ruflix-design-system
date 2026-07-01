import type { MediaItem } from "../../types/media";

type HeroProps = {
  item: MediaItem;
};

export function Hero({ item }: HeroProps) {
  return (
    <section className="hero">
      {item.backdropUrl ? (
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${item.backdropUrl})` }}
        />
      ) : null}

      <div className="hero-content">
        <div className="eyebrow">Featured</div>

        <h1>{item.title}</h1>

        <div className="metadata">
          {item.communityRating ? <span>★ {item.communityRating.toFixed(1)}</span> : null}
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
    </section>
  );
}