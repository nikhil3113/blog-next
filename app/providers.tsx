"use client";

import { SessionProvider } from "next-auth/react";
import {  ParallaxProvider } from "react-scroll-parallax";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ParallaxProvider>
      <SessionProvider>{children}</SessionProvider>
    </ParallaxProvider>
  );
};
