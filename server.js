// starting the HTTP module
const http = require("http");

// the server is stored
const server = http.createServer((req, res) => {
  // this will show the path, and the method
  console.log(req.url);

  // set header content type

  // this will deliver the plain text

  // this will deliver in html form
  // res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello world</h1>");
  res.end();
});

// localhost is the default value for 2nd argument
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
