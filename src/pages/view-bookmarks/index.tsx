import React from "react";
import { BookmarkIcon } from "lucide-react";
import { BookmarkTree } from "@/components/BookmarkTree";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { PageLayout } from "@/components/PageLayout";

export default function ViewBookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <PageLayout
      breadcrumbItems={[
        {
          label: "View Bookmarks",
          href: "/view-bookmarks",
          icon: BookmarkIcon,
        },
      ]}
    >
      <main className="flex-1 overflow-y-auto px-4">
        <div className="space-y-1 pb-4">
          {bookmarks.map((bookmark) => (
            <BookmarkTree key={bookmark.id} node={bookmark} />
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
