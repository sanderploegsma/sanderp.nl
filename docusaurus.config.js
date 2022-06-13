// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sander Ploegsma",
  tagline: "My blog",
  url: process.env.URL || "https://www.sanderp.nl/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          routeBasePath: "/",
          blogSidebarCount: 0,
        },
        pages: {
          path: "pages",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-35738635-2",
        },
      }),
    ],
  ],

  plugins: [
    [
      "client-redirects",
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      {
        redirects: [
          {
            to: "/debugging-golang-concurrency-issues",
            from: "/debugging-golang-concurrency-issues-c979c588f9ea",
          },
          {
            to: "/running-redis-cluster-on-kubernetes",
            from: "/running-redis-cluster-on-kubernetes-e451bda76cad",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Sander Ploegsma",
        items: [{ to: "/about-me", label: "About Me", position: "left" }],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Social",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/sanderploegsma",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/sanderploegsma",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sander Ploegsma. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["fsharp", "java"],
      },
    }),
};

module.exports = config;
