"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PiHashBold } from "react-icons/pi";
import { MdGroup } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tags = [
  { label: "#javascript", count: 82645 },
  { label: "#bitcoin", count: 65533 },
  { label: "#design", count: 51354 },
  { label: "#blogging", count: 48209 },
  { label: "#tutorial", count: 51354 },
  { label: "#seo", count: 82645 },
];

const pinnedGroups = ["#javascript", "#bitcoin", "#design", "#blogging"];

const navItems = [
  { label: "Newest and Recent", description: "Find the latest update" },
  {
    label: "Popular of the day",
    description: "Shots featured today by curators",
  },
  {
    label: "Following",
    description: "Explore from your favorite person",
    count: 24,
  },
];

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-6 w-full">
      <Card className="rounded-xl">
        <CardContent className="p-4 space-y-3">
          {navItems.map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="w-full justify-between px-2 py-3 text-left rounded-lg hover:bg-muted"
            >
              <span>
                <p className="font-semibold text-sm leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </span>
              {item.count && (
                <Badge
                  className="rounded-full px-2 py-1 text-xs"
                  variant="secondary"
                >
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-3">Popular Tags</h4>
          <ScrollArea className="h-[180px] pr-2">
            <div className="flex flex-col gap-3">
              {tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start px-1 text-muted-foreground hover:bg-muted"
                >
                  <div className="flex items-center gap-3 w-full">
                    <PiHashBold className="text-xl text-primary" />
                    <span className="text-sm">{tag.label}</span>
                    <span className="ml-auto text-xs">
                      {tag.count.toLocaleString()} Posted
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <MdGroup className="text-lg" /> Pinned Group
          </h4>
          <div className="flex flex-col gap-2">
            {pinnedGroups.map((group, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start px-2 hover:bg-muted"
              >
                {group}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
