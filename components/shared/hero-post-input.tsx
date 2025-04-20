"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Flame, MessageCirclePlus, Newspaper } from "lucide-react";
import { Image } from "lucide-react";

export default function HeroPostInput() {
  return (
    <Card>
      <CardContent className="p-4">
        <section className="flex flex-col flex-1 gap-3">
          {/* Start a post container */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 border border-border rounded-xl cursor-pointer px-5 py-3 text-[0.85rem] flex items-center gap-2">
              <Flame size={20} /> Start a fuse blast
            </div>
          </div>

          {/* Other post options */}
          <div className="flex-1 items-center justify-evenly">
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="flex-1">
                <Newspaper />
                <span className="text-[0.85rem]">Article</span>
              </Button>
              <Button variant="ghost" className="flex-1">
                <Image />
                <span className="text-[0.85rem]">Image</span>
              </Button>
              <Button variant="ghost" className="flex-1">
                <MessageCirclePlus />
                <span className="text-[0.85rem]">Topic</span>
              </Button>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
