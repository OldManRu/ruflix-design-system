# Focus and Input

RuFlix must feel good across remote, keyboard, mouse, and touch input.

## Principle

The selected item should always be obvious.

A user should never wonder where focus is, especially from couch distance.

## Input Types

### Remote

Remote navigation is directional and intentional. Layouts should support predictable movement.

- Left / Right: move across shelves and controls
- Up / Down: move between shelves or control rows
- OK / Select: activate focused item
- Back: step backward or hide overlays first

### Keyboard

Keyboard behavior should mirror remote behavior where possible.

- Tab should move through meaningful controls
- Arrow keys should support spatial navigation
- Enter activates focused item
- Escape closes overlays or backs out

### Mouse

Mouse users should get hover affordances, but hover should not be required.

### Touch

Touch targets should be comfortable and forgiving.

## Focus Visuals

Focus should use a combination of:

- slight scale
- soft elevation
- visible ring or glow
- increased surface contrast

Avoid relying on only one subtle cue.

## Focus Ring

The focus ring must be visible over:

- dark surfaces
- bright artwork
- video playback
- transparent overlays

## Spatial Navigation Rules

- Movement should match visual layout.
- Returning from details or playback should preserve previous focus position.
- Hidden elements should not receive focus.
- Disabled controls should be skipped or clearly explained.
- Conditional navigation changes should not happen mid-interaction.

## Couch Distance

Focus states should be readable from approximately 10 feet away on a TV screen.

## Accessibility

- Every interactive element needs a visible focus state.
- Every icon-only control needs an accessible label.
- Do not trap focus in overlays.
- Respect reduced motion while preserving focus clarity.
