const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to MONGO DB
const dbURI = "mongodb+srv://gamyburgos:test1234@cluster0.rs42w.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view view engine

app.set("view engine", "ejs");
// listen for requests
// we can take the app.listen since it is being used by mongoose
//app.listen(3000);

// this will let us use the static styles in the public
app.use(express.static("public"));

// this will dictate what is logged to the console and what format
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
