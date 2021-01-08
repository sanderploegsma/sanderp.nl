module.exports = {
  siteMetadata: {
    siteUrl: "https://sanderp.nl",
    sourceUrl: "https://github.com/sanderploegsma/sanderp.nl",
    social: {
      github: "https://github.com/sanderploegsma",
      linkedin: "https://linkedin.com/in/sanderploegsma",
    },
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                sh: `bash`,
              },
            },
          },
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
