import React from "react";
import { BookmarkIcon } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BookmarkTree } from "@/components/BookmarkTree";
import { useBookmarks } from "@/contexts/BookmarkContext";

export default function ViewBookmarks() {
  const { bookmarks, flatBookmarks, simplifiedBookmarks } = useBookmarks();

  console.log("Bookmarks:", bookmarks);
  console.log("Flat Bookmarks:", flatBookmarks);
  console.log("Simplified Bookmarks:", simplifiedBookmarks);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="px-5 pt-6">
        <Breadcrumb
          items={[
            {
              label: "View Bookmarks",
              href: "/view-bookmarks",
              icon: BookmarkIcon,
            },
          ]}
        />
      </div>

      <main className="flex-1 overflow-y-auto px-4">
        <div className="space-y-1">
          {bookmarks.map((bookmark) => (
            <BookmarkTree key={bookmark.id} node={bookmark} />
          ))}
        </div>
      </main>
    </div>
  );
}
