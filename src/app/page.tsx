import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./Components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();
  // await prisma.todo.create({ data: { title: "test", complete: false } });

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Padaryk</h1>
        <Link className="bg-transparent hover:bg-slate-700 text-blue-100 font-semibold hover:text-white py-2 px-4 border border-blue-100 hover:border-transparent rounded" href="/new">
          Nauja užduotėlė
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
