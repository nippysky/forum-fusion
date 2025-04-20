"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy Data
const WHO_TO_FOLLOW = [
  {
    name: "Product Hunt",
    handle: "@ProductHunt",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Product Hunt",
    handle: "@MZuckerberg_",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Ryan Hoover",
    handle: "@rrhoover",
    avatar: "https://github.com/shadcn.png",
  },
];

const TOP_POSTS = [
  {
    id: 1,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 2,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 3,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 4,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
  {
    id: 5,
    title: "Why is it that no one wants to...",
    author: "andy_ebuks",
    date: "Fri-Mar | 2025",
  },
];

export default function HomeRight() {
  return (
    <aside className="flex flex-col gap-6 w-full">
      {/* Who to Follow */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Who is to follow you</h3>

            <div className="flex flex-col gap-8 mt-5">
              {WHO_TO_FOLLOW.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col leading-tight">
                      <p className="text-sm font-medium">{user.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {user.handle}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">
                    Follow
                  </Button>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="text-sm text-blue-500 hover:underline mt-1 w-fit"
            >
              Show More
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h3 className=" font-semibold">Top 5 Posts Of The Day</h3>

            <div className="flex flex-col gap-8 mt-5">
              {TOP_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 text-sm font-medium"
                >
                  <div className="flex flex-col">
                    <p className=" text-sm font-medium leading-tight">
                      {post.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {post.author} | {post.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
