"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import ShareModal from "../shared/ShareModal";

const DUMMY_BLAST = {
  id: 1,
  content:
    "Here's an insightful blast about why TypeScript improves DX without sacrificing JS flexibility.",
  images: [
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
  ],
  tags: [
    "typescript",
    "developer",
    "webdev",
    "testing",
    "We trying",
    "Nothing",
    "and",
    "everything",
  ],
  likes: 230,
  downs: 14,
  author: {
    name: "Sara Lin",
    username: "saralin",
    avatar: "https://github.com/shadcn.png",
  },
  time: "1h ago",
  comments: [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
        handle: "@johndoe",
      },
      comment:
        "I totally agree! TS is like a superpower once you get used to it.",
      replies: [
        {
          id: 3,
          user: {
            name: "Jane Dev",
            avatar: "https://github.com/shadcn.png",
            handle: "@janedev",
          },
          comment: "Same here, my productivity has skyrocketed!",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Alex Code",
        avatar: "https://github.com/shadcn.png",
        handle: "@alexcode",
      },
      comment: "Still prefer JS for quick prototypes tho.",
      replies: [],
    },
  ],
};

export default function BlastDetails() {
  const router = useRouter();
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".post-action-menu")) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCommentImage(file);
  };
  const removeImage = () => setCommentImage(null);

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
              <small className="text-xs text-muted-foreground">{time}</small>
            </div>
          </div>
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
                  onChange={handleImageChange}
                />
                <ImageIcon size={18} />
              </label>
              <Button
                size="sm"
                disabled={!commentText.trim()}
                onClick={() => {
                  console.log("Post comment", commentText, commentImage);
                  setCommentText("");
                  removeImage();
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
                  onClick={removeImage}
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

      {/* Comments */}
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
                <button
                  className="text-xs text-blue-600 mt-2 hover:underline"
                  onClick={() =>
                    setReplyingTo((r) => ({
                      ...r,
                      [c.id]: r[c.id] !== undefined ? "" : "",
                    }))
                  }
                >
                  Reply
                </button>
                {replyingTo[c.id] !== undefined && (
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      value={replyingTo[c.id]}
                      onChange={(e) =>
                        setReplyingTo((r) => ({ ...r, [c.id]: e.target.value }))
                      }
                      placeholder="Write a reply..."
                      className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
                    />
                    <div className="text-right mt-1">
                      <Button
                        size="sm"
                        disabled={!replyingTo[c.id]?.trim()}
                        onClick={() => {
                          console.log("Reply", c.id, replyingTo[c.id]);
                          setReplyingTo((r) => ({ ...r, [c.id]: "" }));
                        }}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {c.replies.length > 0 && (
              <div className="pl-6 mt-2 border-l border-border space-y-4 relative">
                {c.replies.map((r) => (
                  <div key={r.id} className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={r.user.avatar} />
                      <AvatarFallback>{r.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{r.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.user.handle}
                      </p>
                      <p className="text-sm mt-1">{r.comment}</p>
                    </div>
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
