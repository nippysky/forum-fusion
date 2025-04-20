"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FORUM_CATEGORIES, SIDE_QUICK_LINKS } from "@/lib/app-data";
import Link from "next/link";

export default function HomeLeft() {
  return (
    <aside className="flex flex-col gap-6 w-full">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            {SIDE_QUICK_LINKS.map((item, index) => (
              <Link
                href={"/"}
                key={index}
                className="flex items-center gap-5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md p-2 transition-all duration-300 ease-in-out"
              >
                {item.icon}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-[0.9rem]">{item.title}</h2>
                  <small className="text-muted-foreground">
                    {item.description}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-1">
            {FORUM_CATEGORIES.map((item, index) => (
              <Link
                href={"/"}
                key={index}
                className="flex items-center gap-5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md p-2 transition-all duration-300 ease-in-out"
              >
                <div className="w-10 h-10">{item.icon}</div>

                <h2 className="font-semibold text-[0.9rem] flex-1">
                  {item.title}
                </h2>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
