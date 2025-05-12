"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";

const DUMMY_BLAST = {
  id: 1,
  content:
    "Here's an insightful blast about why TypeScript improves DX without sacrificing JS flexibility.",
  image: "https://github.com/shadcn.png",
  tags: ["typescript", "developer", "webdev"],
  likes: 230,
  downs: 14,
  author: {
    name: "Sara Lin",
    handle: "@saralin",
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
  const { author, content, image, time, tags, likes, downs, comments } =
    DUMMY_BLAST;
  const [fuseUp, setFuseUp] = useState(false);
  const [fuseDown, setFuseDown] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ [key: number]: string }>({});

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col border border-border rounded-xl p-4 bg-background">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{author.name}</span>
            <span className="text-xs text-muted-foreground">
              {author.handle}
            </span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        </div>

        <p className="text-sm mt-4">{content}</p>

        {image && (
          <div className="w-full mt-4">
            <Image
              src={image}
              alt="Post image"
              width={800}
              height={450}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-xs mt-4 border-t pt-3">
          <div className="flex gap-4">
            <span>{likes} up</span>
            <span>{downs} down</span>
          </div>
          <span>{comments.length} comments</span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <Button
            variant={fuseUp ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFuseUp((prev) => !prev);
              if (fuseDown) setFuseDown(false);
            }}
          >
            <ThumbsUp size={16} />
            <span className="ml-1 text-sm hidden sm:inline">Fuse up</span>
          </Button>
          <Button
            variant={fuseDown ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFuseDown((prev) => !prev);
              if (fuseUp) setFuseUp(false);
            }}
          >
            <ThumbsDown size={16} />
            <span className="ml-1 text-sm hidden sm:inline">Fuse down</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentInput((prev) => !prev)}
          >
            <MessageCircle size={16} />
            <span className="ml-1 text-sm hidden sm:inline">Comment</span>
          </Button>
        </div>

        {showCommentInput && (
          <div className="mt-4 space-y-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              placeholder="Add a comment..."
              className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
            />
            <div className="text-right">
              <Button
                size="sm"
                onClick={() => {
                  console.log("Post comment:", commentText);
                  setCommentText("");
                  setShowCommentInput(false);
                }}
                disabled={!commentText.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
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
                  onClick={() =>
                    setReplyingTo((prev) => ({
                      ...prev,
                      [c.id]: prev[c.id] ? "" : "",
                    }))
                  }
                  className="text-xs text-blue-600 mt-2 hover:underline"
                >
                  Reply
                </button>
                {replyingTo[c.id] !== undefined && (
                  <div className="mt-2">
                    <textarea
                      value={replyingTo[c.id]}
                      onChange={(e) =>
                        setReplyingTo((prev) => ({
                          ...prev,
                          [c.id]: e.target.value,
                        }))
                      }
                      rows={3}
                      placeholder="Write a reply..."
                      className="w-full text-sm px-4 py-2 rounded-md border border-border bg-background focus:outline-none resize-none"
                    />
                    <div className="text-right mt-1">
                      <Button
                        size="sm"
                        onClick={() => {
                          console.log(
                            "Replying to comment",
                            c.id,
                            replyingTo[c.id]
                          );
                          setReplyingTo((prev) => ({ ...prev, [c.id]: "" }));
                        }}
                        disabled={!replyingTo[c.id]?.trim()}
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
