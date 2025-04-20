"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
            <div className="flex-1 border border-border rounded-xl cursor-pointer px-5 py-3 text-[0.85rem]">
              Start a fuse
            </div>
          </div>

          {/* Other post options */}
          <div className="flex-1 items-center justify-evenly">
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="flex-1">
                <span className="text-[0.85rem]">Post</span>
              </Button>
              <Button variant="ghost" className="flex-1">
                <span className="text-[0.85rem]">Image</span>
              </Button>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
