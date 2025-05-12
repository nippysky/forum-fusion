"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm font-medium hover:underline w-fit text-muted-foreground"
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
}
