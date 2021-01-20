import prism from "@theme-ui/prism/presets/theme-ui";
import { alpha } from "@theme-ui/color";

export default {
  useColorSchemeMediaQuery: true,
  colors: {
    background: "#f6f8fa",
    muted: "#ffffff",
    text: "#24292e",
    textInverted: "#24292e",
    primary: "#f2851c",
    secondary: "#e21635",
    modes: {
      dark: {
        background: "#121212",
        muted: "#272727",
        text: "#ffffff",
        textInverted: "#121212",
        primary: "#ffe4a4",
        secondary: "#fdbf6e",
      },
    },
  },
  breakpoints: ["479px", "768px", "992px", "1280px", "1440px", "1920px"],
  space: [0, 4, 8, 16, 32, 64, 128],
  fonts: {
    body: "system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  text: {
    condensed: {
      marginBlockStart: 2,
      marginBlockEnd: 2,
    },
    emphasis: {
      low: {
        color: alpha("text", 0.6),
      },
      high: {
        color: alpha("text", 0.87),
      },
    },
    disabled: {
      color: alpha("text", 0.38),
    },
  },
  images: {
    avatar: {
      width: [150, 180],
      height: [150, 180],
      borderRadius: 9999,
    },
    avatarSmall: {
      width: [100, 120],
      height: [100, 120],
      borderRadius: 9999,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      bg: "background",
    },
    a: {
      color: "primary",
      "&:hover": {
        color: "secondary",
      },
    },
    h1: {
      fontSize: [5, 6],
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    h2: {
      fontSize: [4, 5],
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    h3: {
      fontSize: 3,
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    h4: {
      fontSize: 2,
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    h5: {
      fontSize: 1,
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    h6: {
      fontSize: 0,
      lineHeight: "heading",
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      my: 3,
      bg: "muted",
      overflowX: "auto",
    },
    code: {
      ...prism,
    },
    inlineCode: {
      fontFamily: "Menlo, monospace",
      color: "secondary",
      fontSize: "90%",
    },
    ul: {
      pl: 3,
    },
    table: {
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      verticalAlign: "bottom",
      paddingTop: "4px",
      paddingBottom: "4px",
      paddingRight: "4px",
      paddingLeft: 0,
      borderColor: "inherit",
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      verticalAlign: "top",
      paddingTop: "4px",
      paddingBottom: "4px",
      paddingRight: "4px",
      paddingLeft: 0,
      borderColor: "inherit",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "lightgray",
    },
  },
};
