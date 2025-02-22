import React, { useState } from "react";
import { FolderTree } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarks } from "@/utils/gemini";
import { Button } from "@/components/ui/button";
import { BookmarkTree } from "@/components/BookmarkTree";
import { SimplifiedBookmark } from "@/types/";

export default function Reorganize() {
  const { bookmarks, flatBookmarks, refreshBookmarks } = useBookmarks();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >(null);

  const handleReorganization = async () => {
    const suggestedCategories = await reorganizeBookmarks(flatBookmarks);
    if (suggestedCategories) {
      const validBookmarks = convertToBookmarkTree(suggestedCategories);
      setSuggestedBookmarks(validBookmarks);
    }
  };

  console.log("Suggested Bookmarks: ", suggestedBookmarks);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="px-5 pt-6">
        <Breadcrumb
          items={[
            {
              label: "Reorganize Bookmarks",
              href: "/reorganize",
              icon: FolderTree,
            },
          ]}
        />
      </div>

      {!suggestedBookmarks && (
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FolderTree className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">
                    Reorganize Bookmarks
                  </h2>
                  <p className="text-muted-foreground">
                    Let AI organize your bookmarks intelligently
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleReorganization}
              >
                Start Reorganization
              </Button>
            </div>
          </div>
        </main>
      )}

      {suggestedBookmarks && (
        <main className="flex-1 overflow-y-auto px-4">
          <div className="space-y-1 pb-4">
            {suggestedBookmarks.map((bookmark) => (
              <BookmarkTree key={bookmark.id} node={bookmark} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
