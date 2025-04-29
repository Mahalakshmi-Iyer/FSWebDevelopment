const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register", (req, res) => {
  let { username, password } = req.query;
  res.send(`GET response. Welcome @${username}. Your password is ${password}`);
});

app.post("/register", (req, res) => {
  let { username, password } = req.body;
  res.send(`POST response. Welcome @${username}. Your password is ${password}`);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
