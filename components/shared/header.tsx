"use client";

import { LOGO } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HEADER_LINKS } from "@/lib/app-data";
import { ThemeToggle } from "./theme-toggler";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Header() {
  return (
    <header
      style={{ zIndex: 9 }}
      className="sticky top-0 py-1 bg-background flex justify-between items-center gap-5"
    >
      {/* Logo & Search Bar */}
      <section className="flex items-center gap-5 w-full">
        <Link href={"/"}>
          <Image
            src={LOGO.icon}
            alt="ForumFusion Logo Icon"
            width={30}
            height={30}
            priority
          />
        </Link>

        <Search size={20} className="flex lg:hidden cursor-pointer" />

        <Input
          placeholder="Search Fusion"
          className="max-w-[385px] hidden lg:block"
        />
      </section>

      {/* Nav Links | Profile | Setttings */}
      <section className="flex items-center gap-5 justify-end">
        <nav className="lg:flex hidden items-center gap-5">
          {HEADER_LINKS.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.href}
                className="transition-all duration-300 ease-in-out p-2 rounded-lg hover:bg-muted flex flex-col items-center justify-center gap-1.5"
              >
                {link.icon}
                <span className="text-xs">{link.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={"/"}
            className="transition-all duration-300 ease-in-out p-2 rounded-lg hover:bg-muted lg:flex flex-col items-center justify-center gap-1.5 hidden "
          >
            <Bell size={20} />
            <span className="text-xs hidden lg:flex">Notification</span>
          </Link>

          <Link
            href={"/"}
            className="transition-all duration-300 ease-in-out p-2 rounded-lg hover:bg-muted flex flex-col items-center justify-center gap-1.5"
          >
            <div className="relative w-[20px] h-[20px] rounded-full overflow-hidden">
              <Image
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                fill
                priority
                className="object-center object-cover"
              />
            </div>

            <span className="text-xs hidden lg:flex">Profile</span>
          </Link>

          {/* Mobile Menu */}
          <div className="inline-flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="hidden">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1 w-full h-full p-5"></ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>
    </header>
  );
}
