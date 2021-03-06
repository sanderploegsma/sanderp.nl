require("dotenv").config();

// https://docs.netlify.com/configure-builds/environment-variables/
const { REPOSITORY_URL, URL } = process.env;

module.exports = {
  siteMetadata: {
    title: "Sander Ploegsma",
    description:
      "I like functional programming, code puzzles, cloud stuff and high-tech products.",
    siteUrl: URL || "https://sanderp.nl",
    sourceUrl: REPOSITORY_URL || "https://github.com/sanderploegsma/sanderp.nl",
    social: {
      github: "https://github.com/sanderploegsma",
      linkedin: "https://linkedin.com/in/sanderploegsma",
      playstation: "https://my.playstation.com/profile/sanderploegsma",
      reddit: "https://reddit.com/u/muchacho360",
      spotify: "https://open.spotify.com/user/sanderploegsma",
      stackoverflow: "https://stackoverflow.com/users/1595197/sander",
      twitter: "https://twitter.com/sanderploegsma",
    },
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              quality: 80,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-35738635-2`],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `sanderp-nl`,
      },
    },
  ],
};
