import Link from "next/link";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import UserMenu from "@/components/UserMenu";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  return session;
}

export default async function Appbar() {
  const session = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-16">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Blogext</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blogs
            </Link>
          </nav>
        </div>
        <UserMenu session={session} />
      </div>
    </header>
  );
}
