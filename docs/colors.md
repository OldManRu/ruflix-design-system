# Colors

RuFlix uses a dark-first color system designed for comfortable personal media browsing.

## Color Goals

- Keep media artwork visually dominant
- Reduce eye strain in low-light rooms
- Maintain clear contrast for text and controls
- Use accent colors sparingly for action and focus
- Support light mode later without changing component structure

## Core Palette

| Token | Purpose |
| --- | --- |
| `background` | App background and theater-like canvas |
| `surface` | Cards, panels, rails, and navigation surfaces |
| `surface-elevated` | Focused or layered UI surfaces |
| `text-primary` | Main readable text |
| `text-secondary` | Supporting metadata and descriptions |
| `text-muted` | Low-emphasis labels |
| `primary` | Main action color |
| `accent` | Highlights, progress, and selected states |
| `focus` | Keyboard and remote focus ring |
| `danger` | Destructive or error states |
| `success` | Completed or available states |

## Dark Theme Direction

The default RuFlix theme should use deep neutral backgrounds with warm red accents. Red should communicate brand identity and primary action, not decorate every element.

## Accessibility Notes

- Text must meet WCAG AA contrast at minimum.
- Focus indicators must be visible against dark surfaces.
- Do not rely on color alone to communicate state.
- Artwork overlays must include enough gradient or scrim to preserve text readability.
