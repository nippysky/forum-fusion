"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHO_TO_FOLLOW, TOP_POSTS } from "@/lib/dummy";
import { ThemeToggle } from "../../theme-toggler";

export default function HomeRight() {
  return (
    <aside className="flex flex-col gap-6 w-full">
      {/* Who to Follow */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Who to follow</h3>

            <div className="flex flex-col gap-8 mt-5">
              {WHO_TO_FOLLOW.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
                    <div className="flex flex-col leading-tight min-w-0">
                      <Link
                        href={`/profile/${user.handle.replace("@", "")}`}
                        className="text-sm font-medium truncate max-w-[140px] hover:underline relative group"
                      >
                        <span>{user.name}</span>
                        <div className="absolute bottom-full mb-1 left-0 z-10 hidden group-hover:block bg-background border border-border text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">
                          {user.name}
                        </div>
                      </Link>

                      <Link
                        href={`/profile/${user.handle.replace("@", "")}`}
                        className="text-xs text-muted-foreground truncate max-w-[140px] hover:underline"
                      >
                        {user.handle}
                      </Link>
                    </div>

                    <Button size="sm" variant="secondary" className="shrink-0">
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Top 5 for your eyes</h3>

            <div className="flex flex-col gap-8 mt-5">
              {TOP_POSTS.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 text-sm font-medium"
                >
                  <div className="w-5 h-5 text-center text-sm font-semibold rounded-full bg-muted text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-sm font-medium leading-tight hover:underline truncate max-w-[200px]"
                    >
                      {post.title}
                    </Link>
                    <Link
                      href={`/profile/${post.author}`}
                      className="text-xs text-muted-foreground hover:underline"
                    >
                      {post.author}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center text-xs text-muted-foreground text-center gap-x-4 gap-y-2 px-6 pb-4">
        <Link href="#" className="hover:underline">
          About
        </Link>
        <Link href="#" className="hover:underline">
          Accessibility
        </Link>
        <Link href="#" className="hover:underline">
          Help Center
        </Link>
        <Link href="#" className="hover:underline">
          Privacy & Terms
        </Link>
        <Link href="#" className="hover:underline">
          Ad Choices
        </Link>
        <Link href="#" className="hover:underline">
          Advertising
        </Link>
        <Link href="#" className="hover:underline">
          Business Services
        </Link>
        <Link href="#" className="hover:underline">
          Get the App
        </Link>
        <Link href="#" className="hover:underline">
          More
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-center pb-4">
        <ThemeToggle />
      </div>

      {/* Footer Text */}
      <p className="text-center text-xs text-muted-foreground pb-6">
        <span className="font-semibold">ForumFusion</span> ©{" "}
        {new Date().getFullYear()}
      </p>
    </aside>
  );
}
