"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Twitter, Instagram, Send } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  link: string;
  isMobile?: boolean;
}

export default function ShareModal({
  open,
  onClose,
  link,
  isMobile = false,
}: ShareModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? "100%" : -10,
              scale: isMobile ? 1 : 0.95,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: isMobile ? "100%" : -10,
              scale: isMobile ? 1 : 0.95,
            }}
            transition={{ duration: 0.25 }}
            className={`fixed z-50 ${
              isMobile
                ? "bottom-0 left-0 right-0 w-full rounded-t-xl"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm rounded-xl"
            } bg-background p-6 shadow-xl border border-border`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Share this post</h3>
              <Button size="sm" variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(link)}`,
                    "_blank"
                  )
                }
              >
                <Send size={16} className="mr-2" /> WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      link
                    )}`,
                    "_blank"
                  )
                }
              >
                <Twitter size={16} className="mr-2" /> Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(`https://www.instagram.com`, "_blank")
                }
              >
                <Instagram size={16} className="mr-2" /> Instagram
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy size={16} className="mr-2" /> Copy Link
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
