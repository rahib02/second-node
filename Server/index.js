const express = require("express");
const cors = requir("cors");
const bodyParse = require("body-parse");

const app = express();
const PORT = 4004;

let idCounter = 5;
let users = [
  { id: 1, name: "Ali1", surname: "Ali1" },
  { id: 2, name: "Ali2", surname: "Ali2" },
  { id: 3, name: "Ali3", surname: "Ali3" },
  { id: 4, name: "Ali4", surname: "Ali4" },
  { id: 5, name: "Ali5", surname: "Ali5" },
];
app.use(cors());
app.use(bodyParse.json());

app.get("/", (req, res) => {
  res.send("<h1>Admin</h1>");
});
app.get("/users", (req, res) => {
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const selectUser = users.find((x) => x.id == id);
  if (selectUser) {
    res.send(selectUser);
    res.status(200).json({ message: "User var" });
  } else {
    res.status(404).json({ message: "User yoxdu" });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((x) => x.id != id);
  res.send(users);
  res.status(200).json({ message: "User delte" });
});
app.post("/users", (req, res) => {
  const userObj = {
    id: idCounter++,
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(userObj);
  res.send(users);
});
app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((x) => x.id != id);
  const updateUser = {
    id: id,
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(updateUser);
  users.sort((a, b) => a.id - b.id);
  res.send(users);
});

app.listen(PORT, () => {
  console.log("Server running");
});
