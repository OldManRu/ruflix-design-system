import { useState } from "react";
import { JellyfinClient, JELLYFIN_STORAGE_KEYS } from "../../services/jellyfin/client";
import "./SetupScreen.css";

type SetupScreenProps = {
  onConnected: () => void;
};

export function SetupScreen({ onConnected }: SetupScreenProps) {
  const [serverUrl, setServerUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleConnect(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Connecting...");

    try {
      const client = new JellyfinClient(serverUrl);
      const result = await client.login(username, password);

      localStorage.setItem(JELLYFIN_STORAGE_KEYS.serverUrl, client.serverUrl);
      localStorage.setItem(JELLYFIN_STORAGE_KEYS.token, result.AccessToken);
      localStorage.setItem(JELLYFIN_STORAGE_KEYS.userId, result.User.Id);

      setStatus("Connected");
      onConnected();
    } catch (error) {
      console.error(error);
      setStatus("Connection failed. Check your server, username, and password.");
    }
  }

  return (
    <main className="setup-screen">
      <section className="setup-card">
        <div className="eyebrow">Welcome to RuFlix</div>

        <h1>Connect your Jellyfin server.</h1>

        <p>
          Enter your server address and Jellyfin login. RuFlix will remember the
          connection on this device.
        </p>

        <form className="setup-form" onSubmit={handleConnect}>
          <label>
            Server address
            <input
              value={serverUrl}
              onChange={(event) => setServerUrl(event.target.value)}
              placeholder="https://jellyfin.example.com"
              required
            />
          </label>

          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button className="primary" type="submit">
            Connect
          </button>
        </form>

        {status ? <div className="setup-status">{status}</div> : null}
      </section>
    </main>
  );
}