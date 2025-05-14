"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
import { Badge } from "@/components/ui/badge";
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
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "../shared/share-modal";
import { DUMMY_BLAST } from "@/lib/dummy";

export default function BlastDetails() {
  const { author, content, images, tags, likes, downs, time, comments } =
    DUMMY_BLAST;

  const [openMenu, setOpenMenu] = useState(false);
  const [fuseUp, setFuseUp] = useState(false);
  const [fuseDown, setFuseDown] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState<File | null>(null);
  const [replyingTo, setReplyingTo] = useState<Record<number, string>>({});
  const [replyImages, setReplyImages] = useState<Record<number, File | null>>(
    {}
  );

  // close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".post-action-menu")) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleCommentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCommentImage(file);
  };
  const removeCommentImage = () => setCommentImage(null);

  const handleReplyImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = e.target.files?.[0];
    if (file) setReplyImages((prev) => ({ ...prev, [id]: file }));
  };
  const removeReplyImage = (id: number) =>
    setReplyImages((prev) => ({ ...prev, [id]: null }));

  const toggleReply = (id: number) => {
    setReplyingTo((prev) => {
      if (id in prev) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: "" };
    });
  };

  return (
    <div className="w-full shadow-sm rounded-xl border border-border bg-background">
      <CardContent>
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{author.name}</span>
              <small className="text-xs text-muted-foreground">
                @{author.username}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <small className="text-xs text-muted-foreground">{time}</small>
            <div className="relative post-action-menu">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((o) => !o);
                }}
              >
                <Ellipsis size={20} />
              </Button>
              <AnimatePresence>
                {openMenu && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-border p-2 text-sm space-y-1 z-50"
                  >
                    <li className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer">
                      <UserPlus size={16} /> Follow
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

        {/* Content */}
        <div className="px-3">
          <p className="text-[0.85rem] font-normal">{content}</p>
        </div>

        {/* Tags */}
        <div className="px-3 flex flex-wrap gap-2 mt-3">
          {tags.map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
        </div>

        {/* Images */}
        {images.length === 1 ? (
          <div className="relative mt-4 w-full h-60 overflow-hidden px-3">
            <NextImage
              src={images[0]}
              alt="blast image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 mt-4 px-3">
            {images.slice(0, 2).map((src, i) => (
              <div key={i} className="relative w-full h-48 overflow-hidden">
                <NextImage
                  src={src}
                  alt={`blast image ${i + 1}`}
                  fill
                  className="object-cover"
                />
                {i === 1 && images.length > 2 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                    +{images.length - 2}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 text-muted-foreground mt-4 px-3">
          <span className="text-[0.85rem]">{likes.toLocaleString()} up</span>
          <span className="text-[0.85rem]">{downs.toLocaleString()} down</span>
          <span className="text-[0.85rem]">{comments.length} comments</span>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-2" />

        {/* Actions */}
        <div className="flex items-center justify-evenly py-2 px-5">
          <Button
            variant={fuseUp ? "default" : "ghost"}
            size="icon"
            onClick={() => {
              setFuseUp((f) => !f);
              if (fuseDown) setFuseDown(false);
            }}
          >
            <ThumbsUp />
          </Button>
          <Button
            variant={fuseDown ? "default" : "ghost"}
            size="icon"
            onClick={() => {
              setFuseDown((d) => !d);
              if (fuseUp) setFuseUp(false);
            }}
          >
            <ThumbsDown />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCommentOpen((c) => !c)}
          >
            <MessageCircle />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShareOpen(true)}
          >
            <Share />
          </Button>
        </div>

        {/* Comment Input */}
        {commentOpen && (
          <div className="px-5 pb-4 space-y-2">
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
            />
            <div className="flex items-center justify-between">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCommentImageChange}
                />
                <ImageIcon size={18} />
              </label>
              <Button
                size="sm"
                disabled={!commentText.trim()}
                onClick={() => {
                  setCommentText("");
                  removeCommentImage();
                  setCommentOpen(false);
                }}
              >
                Post Comment
              </Button>
            </div>
            {commentImage && (
              <div className="relative w-40 h-24 mt-2">
                <NextImage
                  src={URL.createObjectURL(commentImage)}
                  alt="preview"
                  fill
                  className="object-cover rounded-md border"
                />
                <button
                  className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                  onClick={removeCommentImage}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Share Modal */}
        <AnimatePresence>
          {shareOpen && (
            <ShareModal
              open
              onClose={() => setShareOpen(false)}
              link={typeof window != "undefined" ? window.location.href : ""}
              isMobile={
                typeof window != "undefined" && window.innerWidth <= 640
              }
            />
          )}
        </AnimatePresence>
      </CardContent>

      {/* Comments Header */}
      <div className="px-5 pt-4 my-10">
        <h3 className="text-sm font-medium">{comments.length} Comments</h3>
      </div>

      {/* Comments Thread */}
      <div className="px-5 pb-6 space-y-6">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-2 pl-2 border-l-2 border-muted relative"
          >
            <span className="absolute top-3 left-[-1px] w-2 h-2 rounded-full bg-muted" />
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={c.user.avatar} />
                <AvatarFallback>{c.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <p className="text-sm font-medium">{c.user.name}</p>
                <p className="text-xs text-muted-foreground">{c.user.handle}</p>
                <p className="text-sm mt-1">{c.comment}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 mt-2"
                  onClick={() => toggleReply(c.id)}
                >
                  {c.replies.length > 0
                    ? `${c.replies.length} ${
                        c.replies.length === 1 ? "Reply" : "Replies"
                      }`
                    : "Reply"}
                </Button>
                {replyingTo[c.id] !== undefined && (
                  <div className="mt-2 space-y-2">
                    <textarea
                      rows={3}
                      value={replyingTo[c.id]}
                      onChange={(e) =>
                        setReplyingTo((r) => ({ ...r, [c.id]: e.target.value }))
                      }
                      placeholder="Write a reply..."
                      className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <label className="cursor-pointer flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleReplyImageChange(e, c.id)}
                        />
                        <ImageIcon size={18} />
                      </label>
                      <Button
                        size="sm"
                        disabled={!replyingTo[c.id]?.trim()}
                        onClick={() => {
                          console.log(
                            "Reply",
                            c.id,
                            replyingTo[c.id],
                            replyImages[c.id]
                          );
                          setReplyingTo((r) => ({ ...r, [c.id]: "" }));
                          removeReplyImage(c.id);
                        }}
                      >
                        Reply
                      </Button>
                    </div>
                    {replyImages[c.id] && (
                      <div className="relative w-40 h-24 mt-2">
                        <NextImage
                          src={URL.createObjectURL(replyImages[c.id]!)}
                          alt="reply-preview"
                          fill
                          className="object-cover rounded-md border"
                        />
                        <button
                          className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                          onClick={() => removeReplyImage(c.id)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Nested replies */}
            {c.replies.length > 0 && (
              <div className="pl-6 mt-2 border-l border-border space-y-4 relative">
                {c.replies.map((reply) => (
                  <div key={reply.id} className="flex flex-col gap-2">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={reply.user.avatar} />
                        <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <p className="text-sm font-medium">{reply.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {reply.user.handle}
                        </p>
                        <p className="text-sm mt-1">{reply.comment}</p>

                        {/* Reply button */}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 mt-2"
                          onClick={() => toggleReply(reply.id)}
                        >
                          {reply.replies?.length
                            ? `${reply.replies.length} ${
                                reply.replies.length === 1 ? "Reply" : "Replies"
                              }`
                            : "Reply"}
                        </Button>

                        {/* Reply textarea */}
                        {replyingTo[reply.id] !== undefined && (
                          <div className="mt-2 space-y-2">
                            <textarea
                              rows={3}
                              value={replyingTo[reply.id]}
                              onChange={(e) =>
                                setReplyingTo((prev) => ({
                                  ...prev,
                                  [reply.id]: e.target.value,
                                }))
                              }
                              placeholder="Write a reply..."
                              className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
                            />
                            <div className="flex items-center justify-between">
                              <label className="cursor-pointer flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleReplyImageChange(e, reply.id)
                                  }
                                />
                                <ImageIcon size={18} />
                              </label>
                              <Button
                                size="sm"
                                disabled={!replyingTo[reply.id]?.trim()}
                                onClick={() => {
                                  console.log(
                                    "Reply",
                                    reply.id,
                                    replyingTo[reply.id],
                                    replyImages[reply.id]
                                  );
                                  setReplyingTo((prev) => ({
                                    ...prev,
                                    [reply.id]: "",
                                  }));
                                  removeReplyImage(reply.id);
                                }}
                              >
                                Reply
                              </Button>
                            </div>
                            {replyImages[reply.id] && (
                              <div className="relative w-40 h-24 mt-2">
                                <NextImage
                                  src={URL.createObjectURL(
                                    replyImages[reply.id]!
                                  )}
                                  alt="reply-preview"
                                  fill
                                  className="object-cover rounded-md border"
                                />
                                <button
                                  className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                                  onClick={() => removeReplyImage(reply.id)}
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Replies of replies (guarded) */}
                    {reply.replies?.length > 0 && (
                      <div className="pl-6 mt-2 border-l border-border space-y-4 relative">
                        {reply.replies.map((nested) => (
                          <div
                            key={nested.id}
                            className="flex items-start gap-3"
                          >
                            <Avatar>
                              <AvatarImage src={nested.user.avatar} />
                              <AvatarFallback>
                                {nested.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="w-full">
                              <p className="text-sm font-medium">
                                {nested.user.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {nested.user.handle}
                              </p>
                              <p className="text-sm mt-1">{nested.comment}</p>

                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 mt-2"
                                onClick={() => toggleReply(nested.id)}
                              >
                                Reply
                              </Button>

                              {replyingTo[nested.id] !== undefined && (
                                <div className="mt-2 space-y-2">
                                  <textarea
                                    rows={3}
                                    value={replyingTo[nested.id]}
                                    onChange={(e) =>
                                      setReplyingTo((prev) => ({
                                        ...prev,
                                        [nested.id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Write a reply..."
                                    className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
                                  />
                                  <div className="flex items-center justify-between">
                                    <label className="cursor-pointer flex items-center gap-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleReplyImageChange(e, nested.id)
                                        }
                                      />
                                      <ImageIcon size={18} />
                                    </label>
                                    <Button
                                      size="sm"
                                      disabled={!replyingTo[nested.id]?.trim()}
                                      onClick={() => {
                                        console.log(
                                          "Nested reply",
                                          nested.id,
                                          replyingTo[nested.id],
                                          replyImages[nested.id]
                                        );
                                        setReplyingTo((prev) => ({
                                          ...prev,
                                          [nested.id]: "",
                                        }));
                                        removeReplyImage(nested.id);
                                      }}
                                    >
                                      Reply
                                    </Button>
                                  </div>
                                  {replyImages[nested.id] && (
                                    <div className="relative w-40 h-24 mt-2">
                                      <NextImage
                                        src={URL.createObjectURL(
                                          replyImages[nested.id]!
                                        )}
                                        alt="nested-reply-preview"
                                        fill
                                        className="object-cover rounded-md border"
                                      />
                                      <button
                                        className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                                        onClick={() =>
                                          removeReplyImage(nested.id)
                                        }
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
