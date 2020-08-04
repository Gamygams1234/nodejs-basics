// starting the HTTP module
const http = require("http");

// the server is stored
const server = http.createServer((req, res) => {
  // this will show the path, and the method
  console.log(req.url, req.method);
});

// localhost is the default value for 2nd argument
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
