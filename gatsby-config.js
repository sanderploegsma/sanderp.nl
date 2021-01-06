module.exports = {
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-35738635-2"],
      },
    },
  ],
};
