# RuFlix Home Prototype

Standalone HTML/CSS/JavaScript prototype for testing the RuFlix experience outside Jellyfin.

## How to run

Open `index.html` directly in a browser, or serve the folder with any local static server.

Example:

```bash
cd prototypes/ruflix-home
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Included interactions

- Launch fade-in
- Cinematic hero area
- Shelf card hover/focus lift
- Hero changes when hovering cards
- Movie Night navigation action
- Movie Night warm amber transition
- Temporary Tonight's Picks shelf
- Surprise Me card

## Notes

This prototype is intentionally fake-data-first. It is meant to define the feel before porting behavior into Jellyfin.
