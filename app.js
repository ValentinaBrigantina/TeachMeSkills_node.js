require('dotenv').config()
const http = require("http");
const router = require("./src/service/router");

const server = http.createServer((req, res) => {
  router.lookup(req, res);
});

server.listen(3000, (err) => {
  if (err) throw err;
});
