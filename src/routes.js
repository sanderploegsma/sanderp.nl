const { kebabCase } = require("lodash");

const tagToSlug = (tag) => {
  switch (tag) {
    case "F#":
      return "fsharp";
    case "C#":
      return "csharp";
    default:
      return kebabCase(tag);
  }
};

module.exports = {
  postRoute: (post) => `/${post.frontmatter.slug || post.slug}`,
  tagRoute: (tag) => `/tags/${tagToSlug(tag)}/`,
};
