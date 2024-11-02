import prisma from "@/db";
import Head from "next/head";

import { notFound } from "next/navigation";
const getBlogById = async (id: string) => {
  // const session = await getServerSession(NEXT_AUTH);
  // if (!session) {
  //   redirect("/");
  // }
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export default async function GetBlogById({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const blog = await getBlogById(id);
  if (!blog) {
    return notFound();
  }
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name={blog.subtitle} content={blog.content} />
      </Head>
      <div className="mt-10">
        <div className="my-10 flex flex-col justify-center items-center max-sm:px-5">
          <h1 className=" font-bold text-4xl text-black ">{blog.title}</h1>
          <h2 className=" font-medium text-xl">{blog.subtitle}</h2>
        </div>
        <div
          className="px-10 md:px-60 lg:px-72 my-10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </>
  );
}
