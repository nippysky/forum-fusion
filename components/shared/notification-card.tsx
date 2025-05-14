"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Flag, Trash2, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export interface NotificationType {
  id: string;
  message: string;
  timestamp: string;
  unread: boolean;
  href: string;
}

export default function NotificationCard({
  message,
  timestamp,
  unread,
  href,
}: NotificationType) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="relative">
      <Link href={href} className="block">
        <Card className="hover:bg-muted/5 transition">
          <CardContent className="flex items-start space-x-3 p-4">
            {/* Unread red dot */}
            {unread && (
              <span className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
            )}

            {/* Message + timestamp */}
            <div className="flex-1">
              <p className="text-sm text-foreground">{message}</p>
              <time className="mt-1 block text-xs text-muted-foreground">
                {timestamp}
              </time>
            </div>

            {/* Always-visible horizontal ellipsis */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setMenuOpen((o) => !o);
              }}
              className="p-1 rounded hover:bg-muted"
            >
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </Link>

      {/* Custom Framer-Motion popup menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-4 w-40 bg-background dark:bg-background rounded-md shadow-lg border border-border z-50"
          >
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer">
              <Flag className="w-4 h-4" /> Report
            </li>
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer">
              <Trash2 className="w-4 h-4" /> Delete
            </li>
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer">
              <EyeOff className="w-4 h-4" /> Hide
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
