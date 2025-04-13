"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TbMessageFilled } from "react-icons/tb";
import { RiNotificationFill } from "react-icons/ri";
import { IoCaretDown } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dummyMessages = [
  {
    name: "Wade Warren",
    text: "Congrats on your work anniversary!",
    time: "20 minutes ago",
    count: 2,
  },
  {
    name: "Robert Fox",
    text: "Congrats on your work anniversary!",
    time: "3 days ago",
  },
  {
    name: "Marvin Mckinney",
    text: "Congrats on your work anniversary!",
    time: "9 hour ago",
    count: 1,
  },
];

const dummyNotifications = [
  {
    name: "Catalin Pit",
    text: "commented on your post",
    note: "Great ebook & giveaway!",
    time: "22Feb, 3:26pm",
  },
  {
    name: "Jubed Ahmed",
    text: "Published a Meetup",
    note: "Best Color Palette Generators For UI Designers And Developers",
    time: "17Feb, 10:48pm",
  },
];

export default function HeaderDropdowns() {
  return (
    <>
      {/* Message Dropdown */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex">
                <TbMessageFilled />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Messages</TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel>Messages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dummyMessages.map((msg, idx) => (
            <DropdownMenuItem
              key={idx}
              className="flex flex-col items-start gap-1"
            >
              <p className="font-semibold">{msg.name}</p>
              <p className="text-xs text-muted-foreground">{msg.text}</p>
              <p className="text-xs text-muted-foreground">{msg.time}</p>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-blue-600">
            See all in Messenger
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notification Dropdown */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex">
                <RiNotificationFill />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[350px]">
          <DropdownMenuLabel>3 Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dummyNotifications.map((n, i) => (
            <DropdownMenuItem
              key={i}
              className="flex flex-col items-start gap-1"
            >
              <p className="font-semibold">
                {n.name} <span className="font-normal">{n.text}</span>
              </p>
              <p className="text-sm text-muted-foreground italic">{n.note}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-blue-600">
            Mark all as read
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="hidden lg:flex">Username</p>
                <IoCaretDown className="hidden lg:flex" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Profile</TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Interface: Light/Dark</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
