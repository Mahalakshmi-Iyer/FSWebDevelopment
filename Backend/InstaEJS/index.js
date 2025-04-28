const express = require("express");
const app = express();
const path = require("path");

const instaData = require("./data.json");

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Instagram Home Page");
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  let data = instaData[username];
  if (data) {
    res.render("profile_page.ejs", { data });
  } else {
    res.send(`Account doesn't exist for @${username}`);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
