const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

let port = 8080;

const { v4: uuidv4 } = require("uuid");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta",
  password: "Rathu@123321",
});

// let q = "INSERT INTO user VALUES ?";
// // let users = [
// //   [
// //     faker.string.uuid(),
// //     faker.internet.username(),
// //     faker.internet.email(),
// //     faker.internet.password(),
// //   ],
// //   [
// //     faker.string.uuid(),
// //     faker.internet.username(),
// //     faker.internet.email(),
// //     faker.internet.password(),
// //   ],
// // ];

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(createRandomUser());
// }

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// connection.end();

// function createRandomUser() {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// }

// HOME ROUTE
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// SHOW USERS ROUTE
app.get("/users", (req, res) => {
  let q = `SELECT id, username, email FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      res.render("showUsers.ejs", { data: result });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// EDIT ROUTE
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// UPDATE ROUTE
app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  let { password: formPass, username: newUsername } = req.body;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      if (user.password != formPass) {
        res.send("WRONG PASSWORD!");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect("/users");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// CREATE ROUTE
app.get("/users/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/users", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  let user = [id, username, email, password];
  let q = `INSERT INTO user VALUES (?,?,?,?)`;

  try {
    connection.query(q, user, (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("/users");
    });
  } catch (err) {
    console.log(err);
    res.send("some db error");
  }
});

// DELETE ROUTE
app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    req.send("some db error");
  }
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let { email: formEmail, password: formPass } = req.body;

  let q = `SELECT email, password FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formEmail != user.email || formPass != user.password) {
        res.send("INCORRECT EMAIL or PASSWORD");
      }

      let q2 = `DELETE FROM user WHERE id = '${id}'`;
      connection.query(q2, (err, result) => {
        if (err) {
          res.render(err);
          console.log(err);
        }
        res.redirect("/users");
      });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
