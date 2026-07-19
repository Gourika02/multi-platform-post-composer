const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content, platforms } = req.body;

    const post = new Post({
      title,
      content,
      platforms,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};