# Experience Map

The RuFlix experience should feel like moving through a comfortable media room, not operating a dashboard.

## Primary Journey

```text
Launch RuFlix
  ↓
Home
  ↓
Choose a path
  ├─ Continue Watching → Playback
  ├─ Recently Added → Media Details → Playback
  ├─ Family Favorites → Media Details → Playback
  ├─ Movies / TV Shows → Library → Media Details → Playback
  └─ Search → Results → Media Details → Playback
```

## Playback Journey

```text
Start Playback
  ↓
Minimal player chrome
  ↓
Pause / seek / change audio / change subtitles
  ↓
Resume playback
  ↓
Finish media
  ↓
Return Home or show related next action
```

## Return Journey

After playback, RuFlix should avoid dead ends.

Useful return states:

- Resume Home with the last shelf position preserved
- Show the next episode for TV shows
- Offer Family Favorites or Recently Added after a movie finishes
- Return to Movie Night picks if launched from Movie Night

## Design Intent

Every transition should feel natural and predictable. Users should never feel lost, surprised by navigation changes, or forced through unnecessary steps.

## Experience Rules

- Preserve context when going back.
- Keep the selected item obvious.
- Avoid modal traps for core playback flows.
- Do not interrupt users with promotional or noisy UI.
- Keep playback controls hidden until needed.
- Make Resume faster than Browse.

## Alive, Not Busy

Ambient effects should support the journey:

- Launch fades in gently.
- Home background adapts to the hero artwork.
- Focused cards lift subtly.
- Details pages inherit artwork atmosphere.
- Playback removes visual noise.
