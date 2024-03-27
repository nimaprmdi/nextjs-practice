import { todos } from "@/data/todos";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const todoId = req.query.todoId;

    if (todoId) {
      const todo = todos.find((todo) => todo.id === +todoId);
      res.status(200).json({ message: "Success", data: todo });
    }
  } else if (req.method === "PATCH") {
    const { todoId } = req.query;
    const { title } = req.body;
    console.log(todoId);
    if (todoId) {
      const index = todos.findIndex((todo) => todo.id === +todoId);
      todos[index] = { id: +todoId, name: title };

      res.status(200).json({ message: "PATCH SECCESS", data: todos });
    }
  }
}
