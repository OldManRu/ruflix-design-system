# Playback

Playback is the quietest and most important screen in RuFlix.

## Purpose

Let the media take over.

## Design Intent

The player should disappear when not needed and return instantly when the user interacts. Playback controls should feel calm, readable, and predictable from couch distance.

## Default State

- No persistent chrome during playback
- No unnecessary overlays
- No promotional or recommendation UI while watching
- Cursor and controls hide quickly after inactivity

## Active Controls

When the user interacts, show:

- Timeline
- Play / pause
- Seek backward / forward
- Audio selection
- Subtitle selection
- Quality or stream information when needed
- More options
- Back action

## Resume Flow

Resume should be faster than browsing.

If media has progress:

- The primary action should be Resume
- Show remaining time where helpful
- Preserve the user's last position accurately

## Episodes

For TV shows:

- Support next episode flow
- Keep Skip Intro optional and unobtrusive
- Avoid aggressive auto-play by default unless user enables it

## Motion

- Controls fade in and out smoothly
- Timeline movement should feel precise
- Avoid distracting animation during playback
- Respect reduced motion preferences

## Accessibility

- Controls must be keyboard and remote navigable
- Focus state must be visible over video
- Captions and subtitles must be easy to access
- Audio tracks must be easy to identify
- Controls should remain readable over bright and dark scenes

## Rule

During playback, the interface should never compete with the media.
