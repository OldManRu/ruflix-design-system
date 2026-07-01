export const designTokens = {
  color: {
    bg: "#050609",
    surface: "#0b0e14",
    text: "#ffffff",
    textSoft: "#c9ced8",
    textMuted: "#8f96a3",
    brandRed: "#e50914",
    brandRedBright: "#ff303a",
    movieNight: "#ffb020",
  },

  radius: {
    sm: 12,
    md: 15,
    lg: 24,
    xl: 32,
    pill: 999,
  },

  motion: {
    fastMs: 180,
    calmMs: 320,
    cinematicMs: 900,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },

  layout: {
    sidebarWidth: 250,
  },
} as const;