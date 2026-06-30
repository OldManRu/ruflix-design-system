# Navigation

RuFlix navigation should be contextual, calm, and based on the media that is actually available.

## Principle

Do not show empty destinations.

If a library does not contain music, photos, live TV, or another media type, the navigation should not display that option by default. The interface should feel tailored to the household's actual collection instead of presenting a generic app shell.

## Default Navigation Items

These items are considered core:

- Home
- Movies
- TV Shows
- Search
- Settings

## Conditional Navigation Items

These items should appear only when the relevant content or feature is enabled:

| Navigation Item | Show When |
| --- | --- |
| Live TV | A tuner, IPTV source, or live TV integration is configured |
| Photos | The library contains photos or photo albums |
| Music | The library contains music content |
| Collections | Collections exist or smart collections are enabled |
| Family Favorites | Favorites exist for the current profile or household |
| Home Videos | Personal videos are detected or manually categorized |

## Empty States

If a user intentionally enters an empty section through settings or setup, RuFlix should provide a helpful empty state. However, empty sections should not be promoted in primary navigation.

## Navigation Behavior

- Navigation should prioritize the most-used media types.
- Hidden sections should remain discoverable in Settings or Library Management.
- The system should avoid sudden navigation changes during active browsing.
- Library scans may update available navigation items after completion.
- Profiles may have different visible navigation depending on permissions and available content.

## Comfort Guidance

The left navigation should feel stable and predictable. Conditional items should improve clarity, not make the app feel unpredictable. When possible, preserve item order and only hide unavailable sections.
