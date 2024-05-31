export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "secondary" | "third" | "background";

export type HeadingSize = "small" | "medium" | "large";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "brown",
    secondary: "blue",
    third: "lightgreen",
    background: "lightgray",
  },
};
export const dark: Theme = {
  name: "dark",
  color: {
    primary: "coral",
    secondary: "darkblue",
    third: "dargreen",
    background: "midnightblue",
  },
};
