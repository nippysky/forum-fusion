"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mic } from "lucide-react";

const meetups = [
  {
    date: "FEB 7",
    title: "UIUX - Crunchbase Company Profile",
    org: "UIUX - Sylhet, Bangladesh",
    tags: ["Remote", "Part time"],
  },
  {
    date: "FEB 3",
    title: "Design Meetups USA | Dribbble",
    org: "Dribbble - Austin, Texas, USA",
    tags: ["Remote", "Part time"],
  },
  {
    date: "FEB 5",
    title: "Meetup Brand Identity Design - Behance",
    org: "Behance - Sab Jose, California, USA",
    tags: ["Full Time", "Contact", "Worldwide"],
  },
];

const podcasts = [
  {
    title: "Selling a Business and Scaling Amidst Tragedy.",
    author: "Michele Hansen",
  },
  {
    title: "Mental health as a founder and the importance of community",
    author: "James McKinven",
  },
  {
    title: "Growing to $8.5k MRR in 1 year - Marie Martens, Tally.so",
    author: "Mahfuzul Nabil",
  },
  { title: "Mental Health and Bootstrapping in 2022", author: "Dr. Jubed" },
  {
    title: "Money, Happiness, and Productivity as a Solo Founder",
    author: "Jesse Hanley",
  },
];

export default function SidebarRight() {
  return (
    <aside className="flex flex-col gap-8 w-full">
      <div>
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
          <CalendarDays className="w-4 h-4" /> Meetups
        </div>
        <Card className="rounded-xl">
          <CardContent className="p-4 space-y-4">
            {meetups.map((meetup, index) => (
              <div key={index} className="text-sm">
                <div className="font-bold text-primary text-xs">
                  {meetup.date}
                </div>
                <p className="font-medium text-[13px] mt-1 leading-snug">
                  {meetup.title}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {meetup.org}
                </p>
                <div className="flex flex-wrap gap-2">
                  {meetup.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-muted px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
          <Mic className="w-4 h-4" /> Podcasts
        </div>
        <Card className="rounded-xl">
          <CardContent className="p-4 space-y-4">
            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2"
              >
                <div className="flex flex-col text-sm">
                  <p className="font-medium leading-tight text-[13px]">
                    {podcast.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    by {podcast.author}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-muted-foreground text-xs px-2"
                >
                  →
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
