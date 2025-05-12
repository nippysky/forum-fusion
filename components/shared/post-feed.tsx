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
  UserPlus,
  Flag,
  Bookmark,
} from "lucide-react";
import { FEED_POSTS } from "@/lib/dummy";
import PostFeedSkeleton from "../skeletons/PostFeedSkeleton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function PostFeed() {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);

  const toggleReadMore = (postId: number) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  const handleMenuToggle = (postId: number) => {
    setOpenMenuId((prev) => (prev === postId ? null : postId));
  };

  const closeModal = () => setModalOpenId(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest(".post-action-menu")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (loading) return <PostFeedSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      {FEED_POSTS.map((post) => {
        const isExpanded = expandedPostId === post.id;
        const isMenuOpen = openMenuId === post.id;
        const isModalOpen = modalOpenId === post.id;

        return (
          <Card key={post.id} className="w-full shadow-sm">
            <CardContent>
              <section className="flex flex-col gap-4">
                {/* Author Row */}
                <div className="flex gap-2 justify-between px-3 py-2 relative">
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

                  {/* Custom Popup Menu */}
                  <div className="relative z-10 post-action-menu">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMenuToggle(post.id)}
                    >
                      <Ellipsis size={20} />
                    </Button>

                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-border"
                        >
                          <ul className="text-sm py-2">
                            <li
                              className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                              onClick={() =>
                                console.log("Follow user", post.author.name)
                              }
                            >
                              <UserPlus className="w-4 h-4 text-muted-foreground" />
                              <span>Follow</span>
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                              onClick={() => console.log("Report", post.id)}
                            >
                              <Flag className="w-4 h-4 text-muted-foreground" />
                              <span>Report post</span>
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                              onClick={() => console.log("Save", post.id)}
                            >
                              <Bookmark className="w-4 h-4 text-muted-foreground" />
                              <span>Save post</span>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                      <button
                        onClick={() => setModalOpenId(post.id)}
                        className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        +{post.tags.length - 3} more
                      </button>
                    )}
                  </div>
                )}

                {/* Image */}
                {post.image && (
                  <div className="w-full h-[450px] relative mt-2 rounded-md overflow-hidden">
                    <Image
                      src={post.image}
                      alt="Post Image"
                      fill
                      className="w-full absolute object-center object-cover"
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

                {/* Post Actions */}
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

              {/* Custom Modal for More Tags */}
              <AnimatePresence>
                {isModalOpen && (
                  <>
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black z-40"
                      onClick={closeModal}
                    />

                    {/* Modal Box */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-background border border-border rounded-xl p-6 shadow-xl"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">All Tags</h3>
                        <button
                          onClick={closeModal}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          Close
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                          <Link key={idx} href={`/tags/${tag}`}>
                            <Badge variant="outline" className="cursor-pointer">
                              #{tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
