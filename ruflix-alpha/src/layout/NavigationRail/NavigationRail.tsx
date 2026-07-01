import "./NavigationRail.css";

export function NavigationRail() {
  return (
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
  );
}