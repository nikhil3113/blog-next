import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import Appbar from "@/components/Appbar";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  return session;
}

export default async function Home() {
  const session = await getUser();
  return (
    <div className="px-10">
      <div className="text-center">
        <h1 className="text-5xl text-violet-700 font-semibold mt-10">Blogext</h1>
        <p className="font-medium text-xl mt-3">Create Your own blog </p>
      </div>
    </div>
  );
}
