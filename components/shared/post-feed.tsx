"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Ellipsis,
  MessageCircle,
  Share,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Bitcoin has tumbled from its record high of $58,000...",
    tags: ["finance", "bitcoin", "crypto"],
    image: "https://github.com/shadcn.png",
    author: {
      name: "Pavel Gvay",
      avatar: "https://github.com/shadcn.png",
      profileUrl: "/profile/pavel-gvay",
    },
    likes: 36545,
    comments: 56,
    time: "3 weeks ago",
  },
];

export default function PostFeed() {
  return (
    <section className="flex flex-col gap-5">
      {posts.map((post) => (
        <Card key={post.id} className="w-full shadow-sm">
          <CardContent>
            <section className="flex flex-col gap-4">
              {/* Aurthor Logo and Post Details */}
              <div className="flex gap-2 justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <Link href={post.author.profileUrl}>
                    <Avatar>
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold tracking-wide text-[0.9rem]">
                        {post.author.name}
                      </p>
                      <small className="text-muted-foreground">@username</small>
                    </div>
                    <small className="text-muted-foreground">{post.time}</small>
                  </div>
                </div>

                <Button variant={"ghost"}>
                  <Ellipsis size={20} />
                </Button>
              </div>

              {/* Post (exceprt woth read more) */}
              <div className="px-3">
                <p className="text-[0.85rem] font-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it
                </p>
              </div>

              {/* Image If any */}
              <div className="w-full mt-1 relative h-96">
                <Image
                  src={"https://github.com/shadcn.png"}
                  alt={"Post Logo"}
                  fill
                  priority
                  className="absolute object-center object-cover"
                />
              </div>

              {/* Post Engagement Summary */}
              <div className=" border-b border-b-border pb-2 flex items-center justify-between text-muted-foreground px-5">
                <div className="flex items-center gap-2">
                  <small>1.2K up</small>
                  <small>120 down</small>
                </div>
                <small>120 comments</small>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-evenly gap-2 pb-2">
                <Button variant={"ghost"}>
                  <ThumbsUp />
                  <span className="hidden lg:flex">Fuse up</span>
                </Button>
                <Button variant={"ghost"}>
                  <ThumbsDown />
                  <span className="hidden lg:flex">Fuse down</span>
                </Button>
                <Button variant={"ghost"}>
                  <MessageCircle />
                  <span className="hidden lg:flex">Comment</span>
                </Button>
                <Button variant={"ghost"}>
                  <Share />
                  <span className="hidden lg:flex">Share</span>
                </Button>
              </div>
            </section>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
