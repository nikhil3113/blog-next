import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import SessionButton from "./SessionButton";
import Link from "next/link";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  return session;
}

export default async function Appbar() {
  const session = await getUser();

  return (
    <div className="flex justify-between p-5 shadow-md">
      <Link href={"/"} className="text-xl font-semibold ">Blog App</Link>
      <div className="flex justify-evenly items-center gap-5">
        <Link href={"/blogs"} className="font-semibold text-xl ">
          Blogs
        </Link>
        <SessionButton session={session} />
      </div>
    </div>
  );
}
