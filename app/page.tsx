import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import Appbar from "@/components/Appbar";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  return session;
}

export default async function Home() {
  const session = await getUser();
  return <div>
    {/* <Appbar/> */}
    {JSON.stringify(session)}
    </div>;
}
