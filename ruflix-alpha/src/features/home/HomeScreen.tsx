import { useEffect, useState } from "react";
import { AmbientBackdrop } from "../../components/AmbientBackdrop/AmbientBackdrop";
import { Hero } from "../../components/Hero/Hero";
import { createJellyfinService } from "../../services/jellyfin";
import type { MediaItem } from "../../types/media";
import { featuredMedia } from "./mockMedia";

export function HomeScreen() {
  const [featured, setFeatured] = useState<MediaItem>(featuredMedia);
  const [status, setStatus] = useState("Using mock media");

  useEffect(() => {
    const jellyfin = createJellyfinService();

    if (!jellyfin) {
      return;
    }

    jellyfin
      .getContinueWatching(12)
      .then((items) => {
        if (items[0]) {
          setFeatured(items[0]);
          setStatus("Connected to Jellyfin");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("Jellyfin connection failed");
      });
  }, []);

  return (
    <main className="content">
      <AmbientBackdrop imageUrl={featured.backdropUrl} />
      <Hero item={featured} />
      <div className="connection-status">{status}</div>
    </main>
  );
}