const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is mogosse creating a schema for us
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  //this will generate timestamps for us incase we update something
  { timestamps: true }
);

// it will look for blogs in the model, second one is what type of schema, which we just created
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
