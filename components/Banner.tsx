"use client";

import React from "react";
import {
  ParallaxBanner as ReactParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import { Pen, Camera, Tablet, Share2 } from "lucide-react";

interface ParallaxBannerProps {
  className?: string;
}

export default function ParallaxBanner({
  className = "",
}: ParallaxBannerProps) {
  return (
    <ReactParallaxBanner className={`aspect-[2/1] min-h-[600px] ${className}`}>
      {/* Background Layer */}
      <ParallaxBannerLayer speed={-20}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      </ParallaxBannerLayer>

      {/* Floating Icons Layer */}
      <ParallaxBannerLayer speed={20}>
        <div className="absolute inset-0 overflow-hidden">
          <Pen className="absolute top-1/4 left-1/4 w-8 h-8 text-gray-500  animate-float-slow" />
          <Camera className="absolute top-1/3 right-1/4 w-12 h-12 text-gray-500  animate-float-medium" />
          <Tablet className="absolute bottom-1/4 left-1/3 w-10 h-10 text-gray-500  animate-float-fast" />
          <Share2 className="absolute bottom-1/3 right-1/3 w-8 h-8 text-gray-500  animate-float-medium" />
        </div>
      </ParallaxBannerLayer>

      {/* Content Layer */}
      <ParallaxBannerLayer speed={-5}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Welcome to Blogext!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unleash your creativity, share your thoughts, and connect with
            readers worldwide.
          </p>
          {/* <div className="space-x-4">
            <Button
              size="lg"
              className="px-8 py-6 rounded-full border-gray-300 transition-transform hover:scale-105"
            >
              Explore Blogs
            </Button>
          </div> */}
        </div>
      </ParallaxBannerLayer>

      {/* Foreground Layer */}
      <ParallaxBannerLayer speed={5}>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </ParallaxBannerLayer>
    </ReactParallaxBanner>
  );
}
