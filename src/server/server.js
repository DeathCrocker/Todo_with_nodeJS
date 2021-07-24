var express = require("express");
var cors = require("cors");
var path = require("path");
var fs = require("fs");
const { json } = require("body-parser");

var app = express();
app.use(cors());
const jsonParser = express.json();

app.post("/todos", jsonParser, function (request, response) {
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf8");
  let users = JSON.parse(data);

  let newUser = request.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  fs.writeFileSync(fileName, JSON.stringify(users));
  response.send(users);
});

app.delete("/todos", jsonParser, function (request, response) {
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf8");
  let users = JSON.parse(data);

  let idtodo = request.body;
  console.log(idtodo.id);
  const id = idtodo.id - 1;
  users.splice(id, 1);

  fs.writeFileSync(fileName, JSON.stringify(users));
  response.send(users);
});

app.get("/users", function (request, response) {
  var filename = path.resolve(__dirname, "./data/users.json");
  response.sendFile(filename, {});
});

app.get("/todos", function (request, response) {
  var filename = path.resolve(__dirname, "./data/todos.json");
  response.sendFile(filename, {});
});

app.get("/todos/:userId", function (request, response) {
  let userId = request.params["userId"];
  let fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf8");
  let todos = JSON.parse(data);
  const todo = [];
  for (i = 0; i < todos.length; i++) {
    if (userId == todos[i].userId) {
      todo.push({
        userId: userId,
        title: todos[i].title,
        completed: todos[i].completed,
        id: todos[i].id,
      });
    }
  }
  response.send(todo);
});

app.listen(3001);
