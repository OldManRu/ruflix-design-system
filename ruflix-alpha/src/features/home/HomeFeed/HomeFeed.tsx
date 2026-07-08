import { AmbientBackdrop } from "../../../components/AmbientBackdrop/AmbientBackdrop";
import { Hero } from "../../../components/Hero/Hero";
import { MediaShelf } from "../../../components/MediaShelf/MediaShelf";
import type { HomeFeedData } from "../../../types/home";

type HomeFeedProps = {
  feed: HomeFeedData;
};

export function HomeFeed({ feed }: HomeFeedProps) {
  return (
    <main className="content">
      <AmbientBackdrop imageUrl={feed.featured.backdropUrl} />

      <Hero item={feed.featured} />

      {feed.shelves.map((shelf) => (
        <MediaShelf key={shelf.id} title={shelf.title} items={shelf.items} />
      ))}

      <div className="connection-status">{feed.status}</div>
    </main>
  );
}