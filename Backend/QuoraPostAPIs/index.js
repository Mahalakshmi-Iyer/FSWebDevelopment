const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "Mahalakshmi Iyer",
    content: "Hello connections, I just got my 1st internship offer!",
  },
  {
    id: uuidv4(),
    username: "riyaVerma7",
    content: "What is the best resource for DSA preperations?",
  },
  {
    id: uuidv4(),
    username: "BobAdams",
    content: "Can y'all suggest some good colleges for UG in Pune?",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.send(`Post with id : ${id} doesn't exist`);
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
});

app.get("/", (req, res) => {
  res.send("Server working properly!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
