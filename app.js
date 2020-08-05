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

// middleware and static
app.use(express.static("public"));
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

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
