"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HeroPostInput() {
  return (
    <Card className="w-full shadow-sm border rounded-2xl">
      <CardContent className="flex md:flex-row flex-col md:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Let's share what’s going on your mind..."
            className="flex-1 rounded-lg px-4"
          />
        </div>
        <Button>Create Post</Button>
      </CardContent>
    </Card>
  );
}
