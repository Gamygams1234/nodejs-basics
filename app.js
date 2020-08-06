const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// here we requrire all of our models as well

const blogRoutes = require("./routes/blogRoutes");

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
// make sure to put extended true
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//put the blog routes here
app.use("/blogs", blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
