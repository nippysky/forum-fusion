"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LOGO } from "@/lib/images";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggler";
import { FiSearch } from "react-icons/fi";

import HeaderNavLinks from "./header-navlinks";
import HeaderDropdowns from "./header-dropdowns";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="flex items-center justify-between w-full py-3 lg:gap-20 gap-10 sticky top-0 bg-background"
      style={{ zIndex: 9 }}
    >
      {/* LOGO & NAV */}
      <section className="flex items-center lg:gap-10 gap-5">
        <Link href="/">
          <Image
            src={LOGO.desktop}
            alt="FF Logo"
            width={150}
            height={100}
            priority
            className="hidden xl:flex"
          />
          <Image
            src={LOGO.mobile}
            alt="FF Logo"
            width={30}
            height={30}
            priority
            className="xl:hidden flex"
          />
        </Link>

        <HeaderNavLinks pathname={pathname} />

        <Button variant="outline" className="2xl:hidden flex">
          <span className="sr-only">Search</span>
          <FiSearch />
        </Button>
      </section>

      {/* SEARCH INPUT */}
      <Input
        placeholder="Type here to search..."
        className="flex-1 hidden 2xl:flex text-center max-w-[650px]"
      />

      {/* TOGGLES & DROPDOWNS */}
      <section className="flex items-center lg:gap-10 gap-5 justify-end">
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        <HeaderDropdowns />
      </section>
    </header>
  );
}
