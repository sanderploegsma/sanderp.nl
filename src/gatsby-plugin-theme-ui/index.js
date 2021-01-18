import prism from "@theme-ui/prism/presets/theme-ui";

export default {
  colors: {
    background: "#eee",
    highlight: "#f9f7f7",
    text: "#112d4e",
    light: "#dbe2ef",
    primary: "#3f72af",
    modes: {
      dark: {
        background: "#111",
        highlight: "#222831",
        text: "#ececec",
        light: "#30475e",
        primary: "#f2a365",
      },
    },
  },
  breakpoints: ["40em", "52em", "64em"],
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
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      backgroundColor: "background",
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
      bg: "highlight",
      overflowX: "auto",
    },
    code: {
      ...prism,
    },
    inlineCode: {
      fontFamily: "monospace",
      color: "secondary",
      fontSize: "87.5%",
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
