import { Card, CardContent, CardTitle } from "@/components/ui/card";
import prisma from "@/db";

async function getBlogs() {
  try {
    const blog = await prisma.blog.findMany({});
    return blog;
  } catch (error) {
    console.error("Error getting blogs:", error);
  }
}

export default async function Blogs() {
  const blogs = await getBlogs();
  return (
    <div>
      <h1 className="text-4xl font-semibold p-10">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5">
        {blogs?.map((blog) => (
          <Card key={blog.id} className="p-3">
            <CardTitle className="text-xl">{blog.title}</CardTitle>
            <CardContent>{blog.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
