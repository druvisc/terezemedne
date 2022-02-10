const defaultTheme = require("tailwindcss/defaultTheme");

// Possibly Tailwind TS typings are available.
// https://tailwindcss.com/docs/theme#referencing-the-default-theme
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "x2l";
export const BREAKPOINTS: Record<Breakpoint, string> = defaultTheme.screens;

// const MAX_WIDTHS = defaultTheme.maxWidth({
//   theme: () => defaultTheme,
//   breakpoints: () => defaultTheme.screens,
// });

export const MAX_WIDTH = "7xl";
// export const MAX_WIDTH_PX = MAX_WIDTHS[MAX_WIDTH];
