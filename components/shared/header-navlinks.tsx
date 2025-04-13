"use client";

import React from "react";
import Link from "next/link";
import { HEADER_LINKS } from "@/lib/app-data";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface HeaderNavLinksProps {
  pathname: string;
}

export default function HeaderNavLinks({ pathname }: HeaderNavLinksProps) {
  return (
    <nav className="lg:flex items-center gap-10 hidden">
      {HEADER_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Tooltip key={link.title}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={`transition-all duration-300 ease-in-out p-2 rounded-lg ${
                  isActive ? "bg-muted text-primary" : "hover:bg-muted"
                }`}
              >
                {link.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{link.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}
