export type ThemeName = "light" | "dark";
export type ColorKey =
  | "primary"
  | "secondary"
  | "third"
  | "background"
  | "text"
  | "border";
export type HeadingSize = "small" | "medium" | "large";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonScheme = "primary" | "normal" | "like";
export type LayoutWidth = "small" | "medium" | "large";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#ff5800",
    secondary: "#5F5F5F",
    third: "lightgreen",
    background: "lightgray",
    text: "black",
    border: "gray",
  },
  heading: {
    small: {
      fontSize: "0.75rem",
    },
    medium: {
      fontSize: "1.5rem",
    },
    large: {
      fontSize: "2rem",
    },
  },
  button: {
    small: {
      fontSize: "0.75rem",
      padding: "0.25em 0.5rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
  },
  buttonScheme: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
    like: {
      color: "white",
      backgroundColor: "coral",
    },
  },
  borderRadius: {
    default: "4px",
  },
  layout: {
    width: {
      small: "320px",
      medium: "760px",
      large: "1020px",
    },
  },
};

export const dark: Theme = {
  ...light,
  name: "dark",
  color: {
    primary: "coral",
    secondary: "darkblue",
    third: "dargreen",
    background: "midnightblue",
    text: "black",
    border: "gery",
  },
};
