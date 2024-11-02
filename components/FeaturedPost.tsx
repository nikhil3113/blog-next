import prisma from "@/db";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

async function getBlogs() {
  try {
    const blog = await prisma.blog.findMany({
      take: 3,
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

function trimContent(html: string, wordLimit: number) {
  const text = html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes HTML tags
  const words = text.split(" ").slice(0, wordLimit).join(" ");
  return `${words}...`;
}

export default async function FeaturedPost() {
  const blogs = await getBlogs();
  return (
    <div className="my-10">
      <h1>Featured Post</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-8">
        {blogs?.map((blog) => (
          <Card key={blog.id} className="px-5 flex flex-col h-full">
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
              {trimContent(blog.subtitle, 15)}
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
