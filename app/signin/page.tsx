"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Signin(){
    return(
        <div>
            <Button onClick={async() => (
                await signIn("google")
            )}>
                Sign in with Google
            </Button>
        </div>
    )
}