import { useEffect, useState } from "react";
import { createJellyfinService } from "../../services/jellyfin";
import type { HomeFeedData } from "../../types/home";
import { HomeFeed } from "./HomeFeed/HomeFeed";
import { featuredMedia } from "./mockMedia";
import { dedupeRecentlyAdded } from "../../utils/media/dedupeRecentlyAdded";

const initialFeed: HomeFeedData = {
  featured: featuredMedia,
  shelves: [],
  status: "Using mock media",
};

export function HomeScreen() {
  const [feed, setFeed] = useState<HomeFeedData>(initialFeed);

  useEffect(() => {
    const jellyfin = createJellyfinService();

    if (!jellyfin) {
      return;
    }

    Promise.all([
      jellyfin.getContinueWatching(12),
      jellyfin.getLatest(12),
    ])
      .then(([continueWatching, recentlyAdded]) => {
        const dedupedRecentlyAdded = dedupeRecentlyAdded(recentlyAdded);

        setFeed({
          featured:
            continueWatching[0] ??
            dedupedRecentlyAdded[0] ??
            featuredMedia,
          shelves: [
            {
              id: "continue-watching",
              title: "Continue Watching",
              items: continueWatching,
            },
            {
              id: "recently-added",
              title: "Recently Added",
              items: dedupedRecentlyAdded,
            },
          ],
          status: "Connected to Jellyfin",
        });
      })
      .catch((error) => {
        console.error(error);

        setFeed((currentFeed) => ({
          ...currentFeed,
          status: "Jellyfin connection failed",
        }));
      });
  }, []);

  return <HomeFeed feed={feed} />;
}