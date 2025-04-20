import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostFeedSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="w-full shadow-sm">
          <CardContent className="flex flex-col gap-4 py-6">
            {/* Top author section */}
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-24 h-3 rounded" />
                  <Skeleton className="w-16 h-3 rounded" />
                </div>
              </div>
              <Skeleton className="w-6 h-6 rounded" />
            </div>

            {/* Post content */}
            <div className="px-3 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Image */}
            <Skeleton className="w-full h-60 rounded-md" />

            {/* Reactions and actions */}
            <div className="px-5 pt-4 flex justify-between items-center text-muted-foreground">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-14 h-4 rounded" />
            </div>

            <div className="flex items-center justify-evenly gap-2 pt-2 px-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-20 h-8 rounded-md" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
