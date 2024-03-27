import { Inter } from "next/font/google";
import { MouseEvent, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Todo {
  id: number;
  name: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>();
  const [todo, setTodo] = useState<string>();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/todos");
      const data = await res.json();
      // console.log(data);
      setTodos(data);
    }

    fetchData();
  }, []);

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  const deleteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
    });

    const data = await res.json();

    console.log(data);
  };

  const putHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify([
        { id: 2, name: "done" },
        { id: 3, name: "done" },
      ]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await res.json();

    setTodos(data);

    console.log(data);
  };

  const editHandler = async () => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    console.log(data);
    setTodos(data);
  };

  return (
    <>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <br />
      <button onClick={clickHandler}>Click handler</button>
      <br />
      <button onClick={deleteHandler}>Delete</button>
      <br />
      <button onClick={putHandler}>PUT</button>
      <h1>{todos && todos.map((todo) => <li key={todo.id}>{todo.name}</li>)}</h1>
      {/*---*/}
      <br />
      {/*---*/}
      <div>
        <input placeholder="id" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={editHandler}>cLICK pATCH</button>
      </div>
      {/*---*/}
    </>
  );
}
