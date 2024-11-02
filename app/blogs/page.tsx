import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import prisma from "@/db";
import { NEXT_AUTH } from "@/lib/auth";
import { CirclePlus } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  try {
    const blog = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error("Error getting blogs:", error);
  }
}

export default async function Blogs() {
  const blogs = await getBlogs();
  const session = await getServerSession(NEXT_AUTH);

  // console.log(blogs);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold p-10 text-violet-700">Blogs</h1>

        <Link href={session ? "/blogs/create" : "/signin"} className="px-10">
          <Button variant={"link"} className="shadow text-black">
            <CirclePlus size={20} /> Add Your Blog
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-5">
        {blogs?.map((blog) => (
          <Card
            key={blog.id}
            className="px-5 flex flex-col justify-evenly h-full"
          >
            <div className="flex items-center mt-5">
              <Image
                src={blog.author.image || "/google-icon.svg"}
                alt={blog.author.name || "anonymous Author"}
                className="w-8 h-8 rounded-full"
                width={20}
                height={20}
              />
              <p className="pl-3 text-[16px]">{blog.author.name}</p>
            </div>

            <CardTitle className="text-[18px] pt-5 pb-2 ">
              {blog.title}
            </CardTitle>
            <CardContent className=" font-medium text-[16px] text-muted-foreground">
              {blog.subtitle}
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <Link href={`/blogs/${blog.id}`}>
                <Button>Read More</Button>
              </Link>
              <p className="text-muted-foreground text-sm">
                {blog.createdAt.toDateString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
