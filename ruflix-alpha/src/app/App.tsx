import { useState } from "react";
import { HomeScreen } from "../features/home/HomeScreen";
import { SetupScreen } from "../features/setup/SetupScreen";
import { NavigationRail } from "../layout/NavigationRail/NavigationRail";
import { JELLYFIN_STORAGE_KEYS } from "../services/jellyfin/client";
import "../App.css";

function hasJellyfinConnection() {
  return Boolean(
    localStorage.getItem(JELLYFIN_STORAGE_KEYS.serverUrl) &&
      localStorage.getItem(JELLYFIN_STORAGE_KEYS.token) &&
      localStorage.getItem(JELLYFIN_STORAGE_KEYS.userId),
  );
}

export default function App() {
  const [isConnected, setIsConnected] = useState(hasJellyfinConnection);

  return (
    <div className="ruflix-app">
      <NavigationRail />
      {isConnected ? (
        <HomeScreen />
      ) : (
        <SetupScreen onConnected={() => setIsConnected(true)} />
      )}
    </div>
  );
}