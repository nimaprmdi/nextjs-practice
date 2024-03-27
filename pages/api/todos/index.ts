// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { todos } from "@/data/todos";

type Todo = {
  id: number;
  name: string;
};

type GetData = Todo[];

interface PostData {
  message: string;
  data: Todo[] | Todo;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<PostData | GetData>) {
  // res.status(200).json(todos);

  if (req.method === "GET") {
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { todo } = req.body;
    console.log(todo);

    const newTodo = {
      id: todos.length + 1,
      name: todo,
    };

    res.status(201).json({
      message: "POST Success",
      data: newTodo,
    });
  } else if (req.method === "DELETE") {
    // Delete All Todos
    res.status(200).json({ message: "Delete Success", data: todos });
  } else if (req.method === "PUT") {
    // Delete All Todos
    res.status(200).json({ message: "All Data Replaced", data: req.body });
  }
}
