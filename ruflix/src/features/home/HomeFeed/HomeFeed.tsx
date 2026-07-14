import { useEffect, useRef, useState } from "react";
import { AmbientBackdrop } from "../../../components/AmbientBackdrop/AmbientBackdrop";
import { DetailsOverlay } from "../../../components/DetailsOverlay/DetailsOverlay";
import { Hero } from "../../../components/Hero/Hero";
import { MediaShelf } from "../../../components/MediaShelf/MediaShelf";
import { createJellyfinService } from "../../../services/jellyfin";
import { VideoPlayer } from "../../player/VideoPlayer";
import type { HomeFeedData } from "../../../types/home";
import type { MediaItem } from "../../../types/media";
import type { MediaDetails } from "../../../types/MediaDetails";

type HomeFeedProps = {
  feed: HomeFeedData;
};

export function HomeFeed({ feed }: HomeFeedProps) {
  const [selected, setSelected] = useState(feed.featured);
  const [selectedMedia, setSelectedMedia] = useState<
    MediaItem | MediaDetails | null
  >(null);
  const [playingItem, setPlayingItem] = useState<
  MediaItem | MediaDetails | null
>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSelected(feed.featured);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [feed.featured]);

  function handleHighlight(item: MediaItem) {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = window.setTimeout(() => {
      setSelected(item);
    }, 200);
  }

  async function handleSelect(item: MediaItem) {
    setSelectedMedia(item);

    const jellyfin = createJellyfinService();

    if (!jellyfin) {
      return;
    }

    try {
      setDetailsLoading(true);

      const details = await jellyfin.getMediaDetails(item.id);

      setSelectedMedia(details);
    } catch (error) {
      console.error(error);
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <main className="content">
      <AmbientBackdrop imageUrl={selected.backdropUrl} />

      <Hero item={selected} />

      <div className="home-shelves">
  {feed.shelves.map((shelf) => (
    <MediaShelf
      key={shelf.id}
      title={shelf.title}
      items={shelf.items}
      onHighlight={handleHighlight}
      onSelect={handleSelect}
    />
  ))}
</div>

      {selectedMedia && (
        <DetailsOverlay
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onPlay={(item) => setPlayingItem(item)}
  />
)}

{playingItem && (
  <VideoPlayer
    src={
      createJellyfinService()?.getPlaybackUrl(playingItem.id) ?? ""
    }
    title={playingItem.title}
    onClose={() => setPlayingItem(null)}
  />
)}

      <div className="connection-status">
        {detailsLoading ? "Loading details..." : feed.status}
      </div>
    </main>
  );
}