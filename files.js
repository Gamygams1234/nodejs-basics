// we start our reading the file by looking up the file system
const fs = require("fs");

// reading files
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});
// this will get ran first then the a sync function
//console.log("last line");

// writing files
// this will  update the file
fs.writeFile("./docs/blog1.txt", "hello, world", () => {
  console.log("file was written");
});

// creates a new file
fs.writeFile("./docs/blog2.txt", "hello, again", () => {
  console.log("file was written");
});

// directories
// this will make an assets folder for us
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  // this will remove the directory whern the folder exists and we run it
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
}
// deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
