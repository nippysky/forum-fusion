"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { Heart, HeartIcon } from "lucide-react";

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
    views: 651324,
    likes: 36545,
    comments: 56,
    time: "3 weeks ago",
    value: "$20,788",
    growth: "+0.25%",
  },
  {
    id: 2,
    title: "The 4-step SEO framework that led to a 1000% increase...",
    tags: ["seo", "blogging", "traffic"],
    image: "https://github.com/shadcn.png",
    author: {
      name: "AR Jakir",
      avatar: "https://github.com/shadcn.png",
      profileUrl: "/profile/ar-jakir",
    },
    views: 244564,
    likes: 10920,
    comments: 184,
    time: "3 days ago",
  },
];

export default function PostFeed() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const isLiked = prev.includes(postId);
      const updated = isLiked
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];

      toast.success(isLiked ? "Like removed" : "You liked this post!", {
        duration: 2000,
      });

      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => {
        const isLiked = likedPosts.includes(post.id);

        return (
          <Card key={post.id} className="w-full border rounded-2xl shadow-sm">
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-start flex-wrap">
                {/* IMAGE */}
                <div className="w-full sm:w-[130px] min-w-[100px] h-auto rounded-xl flex flex-col items-center justify-center">
                  <Image
                    src={post.image}
                    alt="post chart"
                    width={100}
                    height={100}
                    className="rounded-md object-contain"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 w-full space-y-3 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h2 className="font-semibold text-base leading-snug break-words">
                      {post.title}
                    </h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleLike(post.id)}
                      className="shrink-0"
                    >
                      {isLiked ? (
                        <HeartIcon className="fill-red-500 text-red-500" />
                      ) : (
                        <Heart />
                      )}
                    </Button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground pt-2 gap-2 flex-wrap">
                    <Link
                      href={post.author.profileUrl}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author.avatar} alt="avatar" />
                        <AvatarFallback>
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs font-medium">{post.author.name}</p>
                      <span className="text-[10px]">· {post.time}</span>
                    </Link>
                    <div className="flex items-center gap-4 text-xs flex-wrap">
                      <span>{post.views.toLocaleString()} Views</span>
                      <span>{post.likes.toLocaleString()} Likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
