import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todos", getTodos);

router.post("/add-todos", addTodo);

router.put("/edit-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

export default router;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kayyali:<password>@cluster0.2925e.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
