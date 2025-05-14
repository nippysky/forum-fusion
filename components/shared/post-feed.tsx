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
  Image as ImageIcon,
  X,
} from "lucide-react";
import { FEED_POSTS } from "@/lib/dummy";
import PostFeedSkeleton from "../skeletons/PostFeedSkeleton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "./share-modal";

export default function PostFeed() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showFuseModal, setShowFuseModal] = useState<{
    postId: number;
    type: "up" | "down";
  } | null>(null);
  const [shareOpenId, setShareOpenId] = useState<number | null>(null);
  const [fusedUp, setFusedUp] = useState<number[]>([]);
  const [fusedDown, setFusedDown] = useState<number[]>([]);
  const [commentOpenId, setCommentOpenId] = useState<number | null>(null);
  const [commentImages, setCommentImages] = useState<
    Record<number, File | null>
  >({});

  // simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".post-action-menu")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    postId: number
  ) => {
    const file = e.target.files?.[0];
    if (file) setCommentImages((p) => ({ ...p, [postId]: file }));
  };
  const handleRemoveImage = (postId: number) =>
    setCommentImages((p) => ({ ...p, [postId]: null }));

  if (loading) return <PostFeedSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      {FEED_POSTS.map((post) => {
        const isMenuOpen = openMenuId === post.id;
        const truncated = post.content.length > 150;
        const preview = truncated
          ? post.content.slice(0, 150) + "..."
          : post.content;
        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 640;
        const commentImage = commentImages[post.id];

        return (
          <div
            key={post.id}
            className="w-full shadow-sm rounded-xl border border-border bg-background"
          >
            <CardContent>
              {/* Header */}
              <div className="flex justify-between items-center px-3 py-2">
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
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      href={post.author.profileUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold text-sm hover:underline"
                    >
                      {post.author.name}
                    </Link>
                    <small className="text-xs text-muted-foreground">
                      @{post.author.name}
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push(`/blasts/${post.id}`)}
                  >
                    View
                  </Button>
                  <div className="relative post-action-menu">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId((p) => (p === post.id ? null : post.id));
                      }}
                    >
                      <Ellipsis size={20} />
                    </Button>
                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.ul
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-border p-2 text-sm space-y-1 z-50"
                        >
                          <li className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer">
                            <UserPlus size={16} /> Following
                          </li>
                          <li className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer">
                            <Flag size={16} /> Report
                          </li>
                          <li className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer">
                            <Bookmark size={16} /> Save
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="px-3">
                <p className="text-[0.85rem] font-normal">{preview}</p>
                {truncated && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 p-0 underline"
                    onClick={() => router.push(`/blasts/${post.id}`)}
                  >
                    Read more
                  </Button>
                )}
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="px-3 flex flex-wrap gap-2 mt-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <Badge variant="outline">#{tag}</Badge>
                    </Link>
                  ))}
                  {post.tags.length > 3 && (
                    <Link href={`/blasts/${post.id}`}>
                      <Badge variant="secondary">
                        +{post.tags.length - 3} more
                      </Badge>
                    </Link>
                  )}
                </div>
              )}

              {/* Image */}
              {post.image && (
                <div className="relative mt-4 w-full h-[300px] overflow-hidden">
                  <NextImage
                    src={post.image}
                    alt="Post image"
                    fill
                    className="object-cover object-center absolute"
                  />
                </div>
              )}

              {/* Stats (above separator) */}
              <div className="flex items-center gap-6 mt-5 px-3">
                <span className="text-[0.85rem]  text-muted-foreground">
                  {post.likes.toLocaleString()} up
                </span>
                <span className="text-[0.85rem]  text-muted-foreground">
                  {post.likes.toLocaleString()} down
                </span>
                <span
                  className="cursor-pointer hover:underline font-medium text-[0.85rem]"
                  onClick={() => router.push(`/blasts/${post.id}`)}
                >
                  {post.comments} comments
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-2" />

              {/* Action Buttons */}
              <div className="flex items-center justify-evenly py-2 px-5">
                <Button
                  variant={fusedUp.includes(post.id) ? "default" : "ghost"}
                  size="icon"
                  onClick={() => handleFuseToggle(post.id, "up")}
                >
                  <ThumbsUp />
                </Button>
                <Button
                  variant={fusedDown.includes(post.id) ? "default" : "ghost"}
                  size="icon"
                  onClick={() => handleFuseToggle(post.id, "down")}
                >
                  <ThumbsDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCommentOpenId((p) => (p === post.id ? null : post.id))
                  }
                >
                  <MessageCircle />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShareOpenId(post.id)}
                >
                  <Share />
                </Button>
              </div>

              {/* Comment Section */}
              {commentOpenId === post.id && (
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

              {/* Share Modal */}
              <AnimatePresence>
                {shareOpenId === post.id && (
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
                    className="fixed z-50 bg-background border border-border shadow-xl rounded-xl p-5 w-full max-w-xs"
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
            </CardContent>
          </div>
        );
      })}
    </section>
  );
}
