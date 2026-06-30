# Media Details UI Direction

This document turns the Media Details experience spec into material UI direction.

## Experience Goal

The Media Details screen should help the user confidently answer: "Do I want to watch this?"

It should feel cinematic and premium, but never dense. The screen should prioritize artwork, title, key context, and the Play or Resume action.

## Layout Anatomy

```text
┌──────────────────────────────────────────────────────────────┐
│ Backdrop artwork + ambient background                        │
│                                                              │
│  Title / logo treatment                                      │
│  Metadata pills                                              │
│  Short description                                           │
│                                                              │
│  [Resume / Play] [Trailer] [Favorite] [More]                 │
│                                                              │
│  Continue Watching / progress state when relevant            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Cast                                                         │
│ Extras                                                       │
│ Related / More Like This                                     │
│ Technical Details                                            │
└──────────────────────────────────────────────────────────────┘
```

## Visual Hierarchy

1. Backdrop / poster atmosphere
2. Title or logo treatment
3. Resume / Play
4. Essential metadata
5. Short description
6. Cast and extras
7. Technical details

## Above the Fold

The first viewport should include:

- Artwork atmosphere
- Title
- Year, rating, runtime, genre
- Short description
- Primary action

Users should never need to scroll before they can press Play.

## Artwork Treatment

- Use the selected media backdrop as the dominant visual element.
- Apply a dark gradient/scrim to preserve readability.
- Add subtle ambient color derived from the artwork.
- Avoid hard edges where artwork meets surface.
- Poster art may appear as a supporting element, but the backdrop should set the mood.

## Metadata Pills

Use small readable pills for metadata instead of long inline strings.

Example:

```text
2024   PG-13   2h 46m   Sci-Fi
```

Guidance:

- Pills should be quiet, not badge-like.
- Use soft contrast.
- Avoid bright borders.
- Keep text readable at couch distance.

## Primary Actions

### Resume / Play

The primary action should be visually confident.

- Red brand fill
- Rounded shape
- Large enough for remote/touch use
- Strong focus state
- Label changes based on watch state

States:

- `Play`
- `Resume`
- `Play from Beginning`

### Secondary Actions

Secondary actions should be calm and supportive.

- Trailer
- Favorite
- More
- Mark Watched
- Add to Collection

Secondary actions should use surface styling, not compete with Play.

## Continue Watching State

If progress exists, show:

- progress bar
- remaining time
- resume position

This should sit near the primary action, not buried lower on the page.

## Cast Section

Cast should be visual and horizontal.

Each cast card should include:

- Actor image when available
- Actor name
- Character name

Cast should not dominate the decision area.

## Extras Section

Only show Extras when content exists.

Examples:

- Trailer
- Behind the scenes
- Deleted scenes
- Interviews
- Featurettes

Do not show empty sections.

## Related Media

Related media should be useful but not pushy.

Prefer:

- same collection/franchise
- same show/season
- family favorites
- similar genre if local metadata supports it

Avoid commercial-streaming style engagement traps.

## Focus Behavior

Remote and keyboard focus must be obvious.

- Focused buttons lift slightly.
- Focused cards scale subtly.
- Focus rings must be visible over artwork.
- Preserve focus position when returning from playback.

## Empty / Missing Metadata

If metadata is missing, the layout should gracefully collapse.

Do not show placeholder labels like:

- Unknown Runtime
- No Cast Available
- Missing Description

If data is not useful, omit it.

## Comfort Rules

- Keep the top half focused on the decision to watch.
- Avoid database-style metadata tables near the top.
- Do not crowd the Play action.
- Prefer atmosphere over decoration.
- Make artwork feel premium without compromising readability.
