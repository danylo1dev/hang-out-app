const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Heyyyyyy</h1>");
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
