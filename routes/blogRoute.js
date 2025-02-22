const express = require("express");
const { register, login, createBlogs, updateBlogs, deleteBlog } = require("../controller/blogController");

const blogRouter = express.Router();

blogRouter.post("/register", register);
blogRouter.post("/login", login);
blogRouter.post("/:userId/blogs", createBlogs);
blogRouter.patch("/:userId/blogs/:blogId", updateBlogs);
blogRouter.delete("/:userId/blogs/:blogId", deleteBlog);

module.exports = blogRouter