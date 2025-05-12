"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
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
  X,
  Image as ImageIcon,
} from "lucide-react";
import { FEED_POSTS } from "@/lib/dummy";
import PostFeedSkeleton from "../skeletons/PostFeedSkeleton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "./ShareModal";

export default function PostFeed() {
  const router = useRouter();
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [commentOpenId, setCommentOpenId] = useState<number | null>(null);
  const [fusedUp, setFusedUp] = useState<number[]>([]);
  const [fusedDown, setFusedDown] = useState<number[]>([]);
  const [showFuseModal, setShowFuseModal] = useState<{
    postId: number;
    type: "up" | "down";
  } | null>(null);
  const [shareOpenId, setShareOpenId] = useState<number | null>(null);
  const [commentImages, setCommentImages] = useState<
    Record<number, File | null>
  >({});

  // Toggle read-more and menu
  const toggleReadMore = (postId: number) =>
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  const handleMenuToggle = (postId: number) =>
    setOpenMenuId((prev) => (prev === postId ? null : postId));

  // Fuse toggle: only one at a time
  const handleFuseToggle = (postId: number, type: "up" | "down") => {
    if (type === "up") {
      setFusedDown((prev) => prev.filter((id) => id !== postId));
      setFusedUp((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    } else {
      setFusedUp((prev) => prev.filter((id) => id !== postId));
      setFusedDown((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    }
  };

  // Comment image handlers
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    postId: number
  ) => {
    const file = e.target.files?.[0];
    if (file) setCommentImages((prev) => ({ ...prev, [postId]: file }));
  };
  const handleRemoveImage = (postId: number) =>
    setCommentImages((prev) => ({ ...prev, [postId]: null }));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest(".post-action-menu"))
        setOpenMenuId(null);
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
        const isCommentOpen = commentOpenId === post.id;
        const isShareOpen = shareOpenId === post.id;
        const commentImage = commentImages[post.id];

        // Modal classes: mobile full-width, desktop max-w-xs
        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 640;
        const modalClasses = isMobile
          ? "bottom-0 left-0 right-0 rounded-t-xl w-full"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs";

        return (
          <div
            key={post.id}
            className="w-full shadow-sm cursor-pointer rounded-xl border border-border hover:bg-muted/20 transition"
            onClick={(e) => {
              const t = e.target as HTMLElement;
              if (
                ["button", "a", "input", "textarea"].some((sel) =>
                  t.closest(sel)
                ) ||
                t.closest(".post-action-menu")
              )
                return;
              router.push(`/blasts/${post.id}`);
            }}
          >
            <CardContent>
              {/* Author Row */}
              <div className="flex gap-2 justify-between px-3 py-2 relative">
                <div className="flex items-center gap-2">
                  <Link
                    href={post.author.profileUrl}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar>
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      href={post.author.profileUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold text-[0.9rem] hover:underline"
                    >
                      {post.author.name}
                    </Link>
                    <small className="text-muted-foreground">@username</small>
                    <small className="text-muted-foreground">{post.time}</small>
                  </div>
                </div>
                <div className="relative z-10 post-action-menu">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(post.id);
                    }}
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
                          <li className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-muted-foreground" />
                            <span>Follow</span>
                          </li>
                          <li className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
                            <Flag className="w-4 h-4 text-muted-foreground" />
                            <span>Report post</span>
                          </li>
                          <li className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadMore(post.id);
                    }}
                    className="text-blue-600 hover:underline text-sm mt-1 cursor-pointer"
                  >
                    Read more
                  </button>
                )}
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="px-3 flex flex-wrap items-center gap-2 mt-1">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <Link key={i} href={`/tags/${tag}`}>
                      <Badge variant="outline" className="cursor-pointer">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                  {post.tags.length > 3 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
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
                  <NextImage
                    src={post.image}
                    alt="Post Image"
                    fill
                    className="w-full absolute object-center object-cover"
                  />
                </div>
              )}

              {/* Stats */}
              <div className="border-b border-border pb-2 flex items-center justify-between text-muted-foreground px-5">
                <div className="flex items-center gap-4">
                  <small
                    className="cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFuseModal({ postId: post.id, type: "up" });
                    }}
                  >
                    {post.likes.toLocaleString()} up
                  </small>
                  <small
                    className="cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFuseModal({ postId: post.id, type: "down" });
                    }}
                  >
                    {post.likes.toLocaleString()} down
                  </small>
                </div>
                <small className="cursor-pointer hover:underline">
                  {post.comments} comments
                </small>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-evenly gap-2 pb-2">
                <Button
                  variant={fusedUp.includes(post.id) ? "default" : "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFuseToggle(post.id, "up");
                  }}
                >
                  {" "}
                  <ThumbsUp />
                  <span className="hidden lg:flex">Fuse up</span>{" "}
                </Button>
                <Button
                  variant={fusedDown.includes(post.id) ? "default" : "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFuseToggle(post.id, "down");
                  }}
                >
                  {" "}
                  <ThumbsDown />
                  <span className="hidden lg:flex">Fuse down</span>{" "}
                </Button>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommentOpenId((prev) =>
                      prev === post.id ? null : post.id
                    );
                  }}
                >
                  {" "}
                  <MessageCircle />
                  <span className="hidden lg:flex">Comment</span>{" "}
                </Button>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShareOpenId(post.id);
                  }}
                >
                  {" "}
                  <Share />
                  <span className="hidden lg:flex">Share</span>{" "}
                </Button>
              </div>

              {/* Share Modal */}
              <AnimatePresence>
                {isShareOpen && (
                  <ShareModal
                    open
                    onClose={() => setShareOpenId(null)}
                    link={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/blasts/${post.id}`
                        : `/blasts/${post.id}`
                    }
                    isMobile={isMobile}
                  />
                )}
              </AnimatePresence>

              {/* Fuse Modal */}
              <AnimatePresence>
                {showFuseModal?.postId === post.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className={`fixed z-50 bg-background border border-border shadow-xl rounded-xl p-5 ${modalClasses}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">
                        {showFuseModal.type === "up"
                          ? "Users who fused up"
                          : "Users who fused down"}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFuseModal(null)}
                      >
                        Close
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">User {i + 1}</p>
                            <p className="text-xs text-muted-foreground">
                              @user{i + 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Comment Section */}
              {isCommentOpen && (
                <div className="px-5 pb-4 space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Add a comment..."
                    className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex items-center justify-between">
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, post.id)}
                      />
                      <ImageIcon size={18} />
                    </label>
                    <Button size="sm" onClick={(e) => e.stopPropagation()}>
                      Post Comment
                    </Button>
                  </div>
                  {commentImage && (
                    <div
                      className="relative w-40 h-24 mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <NextImage
                        src={URL.createObjectURL(commentImage)}
                        alt="Comment Preview"
                        fill
                        className="object-cover rounded-md border"
                      />
                      <button
                        className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(post.id);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </div>
        );
      })}
    </section>
  );
}
