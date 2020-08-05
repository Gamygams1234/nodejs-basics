const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// here we requrire all of our models as well
const Blog = require("./models/blog");

// express app
const app = express();

// connect to MONGO DB
const dbURI = "mongodb+srv://gamyburgos:test1234@cluster0.rs42w.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view view engine

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req, res) => {
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
app.post("/blogs", (req, res) => {
  // create an instance first
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// this will be getting our blogs by id
app.get("/blogs/:id", (req, res) => {
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

app.delete("/blogs/:id", (req, res) => {
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

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
