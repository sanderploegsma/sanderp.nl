require("dotenv").config();

// https://docs.netlify.com/configure-builds/environment-variables/
const { REPOSITORY_URL, URL } = process.env;

module.exports = {
  siteMetadata: {
    title: "Sander Ploegsma",
    siteUrl: URL || "https://sanderp.nl",
    sourceUrl: REPOSITORY_URL || "https://github.com/sanderploegsma/sanderp.nl",
    social: {
      github: "https://github.com/sanderploegsma",
      linkedin: "https://linkedin.com/in/sanderploegsma",
    },
  },
  plugins: [
    `theme-ui-normalize`,
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
  ],
};
