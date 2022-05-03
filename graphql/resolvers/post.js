const Post = require("../../models/post");
const auth = require("../../util/auth");
const { UserInputError } = require("apollo-server");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (p, { postId }) => {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error(`No post with id: ${postId}`);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (p, { body }, context) => {
      try {
        const user = auth(context);

        if (body.trim() === "") {
          throw new UserInputError("Empty Post", {
            errors: "Post can not be empty",
          });
        }

        const post = await Post.create({
          body,
          username: user.username,
          user: user.id,
          createdAt: new Date().toISOString(),
        });

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    deletePost: async (p, { postId }, context) => {
      try {
        const user = auth(context);

        const post = await Post.findById(postId);

        if (post) {
          if (post.user.toString() === user.id) {
            await post.remove();

            return `Post with id: ${postId} deleted successfully`;
          }

          return `Not Authorized to Delete post`;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    createComment: async (p, { postId, body }, context) => {
      const user = auth(context);
      try {
        if (body.trim() === "") {
          throw new UserInputError("Empty Comment", {
            errors: "Comment can not be empty",
          });
        }
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString(),
          });

          await post.save();

          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteComment: async (p, { postId, commentId }, context) => {
      const user = auth(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          const comment = post.comments.find((c) => c.id === commentId);

          if (comment) {
            if (comment.username === user.username) {
              post.comments = post.comments.filter(
                (c) => c._id.toString() !== commentId
              );

              await post.save();
              return post;
            } else {
              throw new AuthenticationError("Action Not Allowed");
            }
          } else {
            throw new UserInputError("Comment not found");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    likePost: async (p, { postId }, context) => {
      const { username } = auth(context);
      try {
        const post = await Post.findById(postId);

        if (post) {
          const liked = post.likes.find((like) => like.username === username);
          if (liked) {
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            post.likes.unshift({
              username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
