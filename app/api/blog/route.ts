import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET() {
  try {
    const blog = await prisma.blog.findMany({});
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error with getting blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH)
    console.log(session)
    const body = await req.json();
    const { title, content } = body;
    await prisma.blog.create({
      data: {
        title,
        content,
        authorId: session.user.id
      },
    });
    return NextResponse.json({ message: "Blog created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error with creating blog" },
      { status: 500 }
    );
  }
}
