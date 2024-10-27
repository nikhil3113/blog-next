// components/SessionButton.tsx (Client Component)
"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SessionButton({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-evenly gap-5 items-center">
      {session ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </div>
  );
}
