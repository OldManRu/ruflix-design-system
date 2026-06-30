# Playback UI Direction

This document turns the Playback experience spec into material UI direction.

## Experience Goal

Playback should let the media take over.

The best playback interface is the one users rarely notice, but immediately trust when they need it.

## Default State

When media is playing and the user is inactive:

- Hide controls
- Hide cursor
- Hide navigation chrome
- Show no recommendations
- Show no unnecessary badges
- Let the video fill the experience

## Active Control State

When the user moves, taps, presses a key, or uses a remote:

```text
┌──────────────────────────────────────────────────────────────┐
│ Back / title context                                         │
│                                                              │
│                                                              │
│                         Video                                │
│                                                              │
│                                                              │
│                                                              │
│  ───────────────── Timeline ───────────────────────────────  │
│  [Play/Pause]  [Back 10] [Forward 10]   Time remaining       │
│  Subtitles   Audio   Quality   More                         │
└──────────────────────────────────────────────────────────────┘
```

## Control Philosophy

Playback controls should be:

- calm
- large enough for couch use
- predictable
- readable over any scene
- quick to disappear
- easy to bring back

## Player Chrome

Use soft overlays rather than hard panels.

Recommended treatment:

- bottom gradient scrim
- top gradient scrim only when controls are active
- translucent surfaces for menus
- no heavy borders
- strong focus indicators

## Timeline

The timeline is the most important active control.

It should show:

- current position
- buffered progress when available
- total duration
- preview thumbnail if technically available
- chapter or intro markers only when useful

Avoid overcrowding the timeline.

## Primary Controls

Primary controls:

- Play / Pause
- Seek backward
- Seek forward
- Timeline scrubber
- Back

Secondary controls:

- Subtitles
- Audio track
- Quality / stream info
- More

## Remote Behavior

Remote control interaction should feel natural:

- OK / Select toggles controls or activates focused control
- Left / Right seeks or moves focus depending on context
- Up / Down moves between control rows
- Back hides controls first, then exits playback
- Long press can seek faster if supported

## Keyboard Behavior

Suggested defaults:

- Space: play / pause
- Left / Right: seek
- Up / Down: volume if available, or focus movement
- Esc: hide controls or exit full screen
- C: captions
- M: mute if supported

## Subtitles and Audio

Subtitle and audio selection should be fast and readable.

Menus should:

- appear near the triggering control
- use large rows
- show selected state clearly
- avoid nested complexity where possible
- close cleanly after selection

## Skip Intro / Next Episode

These should be optional and unobtrusive.

### Skip Intro

- Show only when intro markers exist.
- Position near bottom right.
- Do not animate aggressively.
- Disappear after a short window.

### Next Episode

- Show near the end of an episode.
- Do not block credits immediately.
- Allow user to cancel or dismiss.
- Respect autoplay settings.

## Pause State

When paused:

- Show controls
- Show title context
- Optionally show a softly blurred background overlay
- Do not cover the entire screen with metadata

Pause should feel like a quiet interruption, not a separate page.

## Resume State

When returning to partially watched media:

- Resume should be the primary action outside playback.
- Playback should start at the saved position.
- If resume position is near the end, offer Play from Beginning as a secondary option.

## Error State

Playback errors should be plain and useful.

Include:

- what failed in human language
- retry action
- back action
- optional technical details behind disclosure

Do not show raw technical errors as the primary message.

## Accessibility

Playback must support:

- keyboard navigation
- remote focus visibility
- readable control contrast
- subtitle access
- audio track access
- reduced motion
- screen reader labels for controls

## Comfort Rules

- Do not compete with the video.
- Show controls only when useful.
- Avoid playback interruptions.
- Make every control easy to reach.
- Keep advanced options behind calm disclosure.
