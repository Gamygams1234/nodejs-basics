const express = require("express");
const router = express.Router();

// we are using the blog models in this folder now
const Blog = require("../models/blog");
//blog routes
// /blogs is already scoped in app

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.get("/", (req, res) => {
  Blog.find()
    // this will sort our blogs in descending order
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// we are hadling a post now
router.post("/", (req, res) => {
  // create an instance first
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
// id should always be at the bottom
// this will be getting our blogs by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      // we are making a page called details
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  // this is where we find thid
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // sending data via json to the browser
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// this is where we export
module.exports = router;
