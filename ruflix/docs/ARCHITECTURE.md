# RuFlix Architecture

RuFlix is built as a premium, TV-first Jellyfin client with a layered architecture.

## Layers

### Presentation

React components render the experience.

Examples:

- Hero
- MediaShelf
- MediaCard
- NavigationRail
- AmbientBackdrop

Components should not know how Jellyfin works.

### Features

Feature folders organize complete user experiences.

Examples:

- home
- setup
- details
- playback

### Services

Services talk to external systems.

The Jellyfin service owns:

- API requests
- authentication
- image URL generation
- mapping Jellyfin data into RuFlix domain models

### Domain Models

RuFlix components consume internal models like:

- MediaItem
- HomeFeedData
- MediaShelfData

The UI should use RuFlix models, not raw Jellyfin JSON.

## Styling

Components own their own CSS.

Example:

- Hero.tsx imports Hero.css
- MediaCard.tsx imports MediaCard.css

Global styles should stay limited to base layout, tokens, and app-wide primitives.