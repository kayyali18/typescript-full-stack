import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

/**
 * Get Todo
 *  Gets todos from DB
 * @param req Request object
 * @param res Response Object
 */
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

/**
 * Add Todo
 *  Adds todos to DB
 * @param req Request object
 * @param res Response Object
 */
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get req body and match it as an Interface Todo with the following keys
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    // Create new Todo from model
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    // Save the new todo
    const newTodo: ITodo = await todo.save();
    // Load all todos from Todo model
    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

/**
 * Save Todo
 *  Updates todos in DB
 * @param req Request object
 * @param res Response Object
 */
const saveTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );

    const allTodos: ITodo[] = Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, saveTodo, addTodo, deleteTodo };
