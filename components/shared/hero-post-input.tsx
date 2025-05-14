"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Flame,
  Newspaper,
  Image as ImageIcon,
  MessageCirclePlus,
  Tag,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

export default function HeroPostInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 200;
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setContent("");
    setImages([]);
    setTags([]);
    setShowTagInput(false);
    setIsModalOpen(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const MAX_SIZE_MB = 2;
    const selected = Array.from(files).slice(0, 5 - images.length);
    const validImages: File[] = [];

    for (const file of selected) {
      if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
        try {
          const compressed = await imageCompression(file, {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
          });
          if (compressed.size / 1024 / 1024 <= MAX_SIZE_MB) {
            validImages.push(compressed as File);
            toast.success(`Compressed and added ${file.name}`);
          } else {
            toast.error(`${file.name} still too large after compression.`);
          }
        } catch {
          toast.error(`Failed to compress ${file.name}`);
        }
      } else {
        validImages.push(file);
        toast.success(`Added ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...validImages]);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) {
        const fileList = new DataTransfer();
        Array.from(files).forEach((f) => fileList.items.add(f));
        const syntheticEvent = {
          target: { files: fileList.files },
        } as React.ChangeEvent<HTMLInputElement>;
        handleImageChange(syntheticEvent);
      }
    },
    [images.length]
  );

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
      setTagInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div
                onClick={() => setIsModalOpen(true)}
                className="flex-1 border border-border rounded-xl px-5 py-3 text-[0.85rem] flex items-center gap-2 cursor-pointer hover:bg-muted/40 transition"
              >
                <Flame size={20} /> Start a fuse blast
              </div>
            </div>

            <div className="flex items-center justify-evenly">
              <Button variant="ghost" className="flex items-center gap-2">
                <Newspaper size={16} />
                Article
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon size={16} />
                Image
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageCirclePlus size={16} />
                Topic
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, y: isMobile ? "100%" : "-10%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isMobile ? "100%" : "-10%" }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "fixed z-50 bg-background border border-border shadow-xl flex flex-col overscroll-contain rounded-xl w-full sm:w-[600px]",
                isMobile
                  ? "inset-0 h-screen rounded-none"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh]"
              )}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Chukwudubem Osegbe</p>
                      <small className="text-muted-foreground text-xs">
                        Post to Public
                      </small>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={closeModal}>
                    Close
                  </Button>
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value.slice(0, MAX_CHARS))
                  }
                  placeholder="What do you want to blast about?"
                  className="flex-1 w-full resize-none bg-transparent text-[0.95rem] focus:outline-none"
                />

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          className="w-28 h-28 object-cover rounded-md border"
                        />
                        <button
                          className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                          onClick={() =>
                            setImages((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tag input */}
                {showTagInput && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a tag and press Enter"
                        className="flex-1 px-3 py-2 rounded-md border bg-transparent text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddTag}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer toolbar */}
              <div className="flex items-center justify-between p-2 border-t border-border bg-background">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTagInput((prev) => !prev)}
                  >
                    <Tag />
                  </Button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    {content.length}/{MAX_CHARS}
                  </span>
                  <Button
                    size="sm"
                    disabled={!content.trim()}
                    onClick={() => {
                      console.log({ content, tags, images });
                      toast.success("Blast created!");
                      closeModal();
                    }}
                  >
                    Blast
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
