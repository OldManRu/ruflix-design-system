# RuFlix Code Style

The goal of this project is readability first.

Code is read far more often than it is written.

---

## General Principles

- Prefer clear over clever.
- Prefer small components.
- Prefer composition over inheritance.
- Avoid duplication.
- Leave the codebase cleaner than you found it.

---

## React

Components should have a single responsibility.

Example:

Good

Hero
MediaCard
MediaShelf
NavigationRail

Avoid components that try to do everything.

---

## CSS

Every component owns its CSS.

Example

Hero.tsx

imports

Hero.css

Avoid large global stylesheets.

Global CSS should contain only:

- resets
- layout
- design tokens
- typography

---

## TypeScript

Always type component props.

Avoid using `any`.

Prefer explicit domain models over raw API responses.

---

## Services

UI components should never make HTTP requests directly.

Services own:

- API communication
- authentication
- mapping
- caching

---

## Naming

Prefer descriptive names.

Good

MediaShelf

HomeFeed

AmbientBackdrop

Avoid abbreviations unless universally understood.

---

## Commits

Commit frequently.

A commit should represent one logical improvement.

Examples:

feat: add continue watching shelf

refactor: separate component styles

fix: hero image masking

docs: add architecture guide