import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { NEXT_AUTH } from "@/lib/auth";

export default async function GET(){
   try {
        const session  = await getServerSession(NEXT_AUTH)
        if(!session){
          return NextResponse.redirect("/login")
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        return NextResponse.json(user, { status: 200 });
   } catch (error) {
     console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    
   }
}