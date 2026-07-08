import { useEffect, useRef, useState } from "react";
import { AmbientBackdrop } from "../../../components/AmbientBackdrop/AmbientBackdrop";
import { Hero } from "../../../components/Hero/Hero";
import { MediaShelf } from "../../../components/MediaShelf/MediaShelf";
import type { HomeFeedData } from "../../../types/home";

type HomeFeedProps = {
  feed: HomeFeedData;
};

export function HomeFeed({ feed }: HomeFeedProps) {
  const [selected, setSelected] = useState(feed.featured);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    setSelected(feed.featured);
  }, [feed.featured]);

  function handleHighlight(item: typeof selected) {
  if (hoverTimeout.current) {
    window.clearTimeout(hoverTimeout.current);
  }

  hoverTimeout.current = window.setTimeout(() => {
    setSelected(item);
  }, 200);
}
  return (
    <main className="content">
      <AmbientBackdrop imageUrl={selected.backdropUrl} />

      <Hero item={selected} />

      {feed.shelves.map((shelf) => (
  <MediaShelf
    key={shelf.id}
    title={shelf.title}
    items={shelf.items}
    onHighlight={handleHighlight}
  />
))}

      <div className="connection-status">{feed.status}</div>
    </main>
  );
}