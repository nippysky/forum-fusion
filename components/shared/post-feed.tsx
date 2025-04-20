"use client";

import { useEffect, useState } from "react";
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
import { FEED_POSTS } from "@/lib/dummy";
import PostFeedSkeleton from "../skeletons/PostFeedSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function PostFeed() {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleReadMore = (postId: number) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PostFeedSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      {FEED_POSTS.map((post) => {
        const isExpanded = expandedPostId === post.id;

        return (
          <Card key={post.id} className="w-full shadow-sm">
            <CardContent>
              <section className="flex flex-col gap-4">
                {/* Author Row */}
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

                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-[0.9rem]">
                          {post.author.name}
                        </p>
                        <small className="text-muted-foreground">
                          @username
                        </small>
                      </div>
                      <small className="text-muted-foreground">
                        {post.time}
                      </small>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <Ellipsis size={20} />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-3">
                  <p
                    className={`text-[0.85rem] font-normal ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {post.content}
                  </p>
                  {!isExpanded && (
                    <button
                      onClick={() => toggleReadMore(post.id)}
                      className="text-blue-600 hover:underline text-sm mt-1 cursor-pointer"
                    >
                      Read more
                    </button>
                  )}
                </div>

                {/* Post Tags */}
                {post.tags?.length > 0 && (
                  <div className="px-3 flex flex-wrap items-center gap-2 mt-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Link key={index} href={`/tags/${tag}`}>
                        <Badge variant="outline" className="cursor-pointer">
                          #{tag}
                        </Badge>
                      </Link>
                    ))}

                    {post.tags.length > 3 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer text-muted-foreground"
                          >
                            +{post.tags.length - 3} more
                          </Badge>
                        </DialogTrigger>
                        <DialogHeader className="hidden">
                          <DialogTitle>More Tags</DialogTitle>
                        </DialogHeader>
                        <DialogContent>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Link key={index} href={`/tags/${tag}`}>
                                <Badge
                                  variant="outline"
                                  className="cursor-pointer"
                                >
                                  #{tag}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}

                {/* Image Section (optional) */}
                {post.image && (
                  <div className="w-full relative mt-2 rounded-md overflow-hidden">
                    <Image
                      src={post.image}
                      alt="Post Image"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Engagement Summary */}
                <div className="border-b border-border pb-2 flex items-center justify-between text-muted-foreground px-5">
                  <div className="flex items-center gap-2">
                    <small>{post.likes.toLocaleString()} up</small>
                    <small>120 down</small>
                  </div>
                  <small>{post.comments} comments</small>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-evenly gap-2 pb-2">
                  <Button variant="ghost">
                    <ThumbsUp />
                    <span className="hidden lg:flex">Fuse up</span>
                  </Button>
                  <Button variant="ghost">
                    <ThumbsDown />
                    <span className="hidden lg:flex">Fuse down</span>
                  </Button>
                  <Button variant="ghost">
                    <MessageCircle />
                    <span className="hidden lg:flex">Comment</span>
                  </Button>
                  <Button variant="ghost">
                    <Share />
                    <span className="hidden lg:flex">Share</span>
                  </Button>
                </div>
              </section>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
