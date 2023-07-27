import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Nauja užduotėlė</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title" className=" focus:text-white-900 appearance-none block w-full bg-transparent text-white-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500" />
        <div className="flex gap-1 justify-end">
          <Link href=".." className="bg-transparent hover:bg-slate-700 text-blue-100 font-semibold hover:text-white py-2 px-4 border border-blue-100 hover:border-transparent rounded">
            Atšauk
          </Link>
          <button type="submit" className="bg-transparent hover:bg-slate-700 text-blue-100 font-semibold hover:text-white py-2 px-4 border border-blue-100 hover:border-transparent rounded">
            Sukurk
          </button>
        </div>
      </form>
    </>
  );
}
