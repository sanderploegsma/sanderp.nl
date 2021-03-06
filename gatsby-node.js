const { postRoute, tagRoute } = require("./src/routes");

const trimPrefix = (str, prefix) => {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }

  return str;
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = require.resolve(`./src/templates/post.js`);
  const tagTemplate = require.resolve(`./src/templates/tag.js`);

  const result = await graphql(`
    {
      tags: allMdx {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
      posts: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            slug
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error running GraphQL query`);
    return;
  }

  const posts = result.data.posts.edges;
  posts.forEach(({ node }, i) => {
    const previousPost = posts[i - 1] && posts[i - 1].node.id;
    const nextPost = posts[i + 1] && posts[i + 1].node.id;

    createPage({
      path: trimPrefix(postRoute(node), "/"),
      component: postTemplate,
      context: {
        id: node.id,
        nextPostId: nextPost,
        previousPostId: previousPost,
      },
    });
  });

  result.data.tags.group.forEach(({ tag }) => {
    createPage({
      path: trimPrefix(tagRoute(tag), "/"),
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};
