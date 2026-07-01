import "./App.css";

export default function App() {
  return (
    <div className="ruflix-app">
      <aside className="sidebar">
        <div className="logo">
          <span>Ru</span>Flix
        </div>

        <nav>
          <button className="active">Home</button>
          <button>Movies</button>
          <button>TV Shows</button>
          <button className="movie-night">Movie Night</button>
          <button>Search</button>
          <button>Settings</button>
        </nav>
      </aside>

      <main className="content">
        <div className="hero">
          <div className="eyebrow">
            Welcome to RuFlix Alpha
          </div>

          <h1>
            The best way to experience your personal media.
          </h1>

          <p>
            Connected locally. Next we'll replace this screen with your real
            Jellyfin library.
          </p>

          <div className="actions">
            <button className="primary">
              Connect Jellyfin
            </button>

            <button className="secondary">
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}