import React, { useState } from "react";
import { Check, FolderTree, Loader2, X } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarks } from "@/utils/gemini";
import { Button } from "@/components/ui/button";
import { BookmarkTree } from "@/components/BookmarkTree";
import { BookmarksTree, SimplifiedBookmark } from "@/types/";
import { convertToBookmarkTree } from "@/utils/convertBookmarks";

export default function Reorganize() {
  const { bookmarks, flatBookmarks, refreshBookmarks } = useBookmarks();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >(null);

  const handleApplyChanges = async () => {
    if (!suggestedBookmarks) return;

    setIsLoading(true);
    try {
      await applyBookmarks(suggestedBookmarks as BookmarksTree);
      await refreshBookmarks();
      setSuggestedBookmarks(null);
    } catch (error) {
      console.error("Error applying bookmarks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorganization = async () => {
    setIsProcessing(true);
    try {
      const suggestedCategories = await reorganizeBookmarks(flatBookmarks);
      if (suggestedCategories) {
        const validBookmarks = convertToBookmarkTree(suggestedCategories);
        setSuggestedBookmarks(validBookmarks);
      }
    } catch (error) {
      console.error("Error while reorganizing bookmarks: ", error);
    } finally {
      setIsProcessing(false);
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

      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 mt-16">
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6 max-w-md mx-auto p-6 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="space-y-2">
                <h3 className="text-xl font-medium">
                  Reorganizing your bookmarks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Using AI to create a better structure for your bookmarks...
                </p>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-warning">
                  Please don't close this window while we process your bookmarks
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isProcessing && !suggestedBookmarks && (
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

      {!isProcessing && suggestedBookmarks && (
        <main className="flex-1 overflow-y-auto px-4">
          <span className="flex p-2 text-lg font-medium">
            Suggested Bookmarks
          </span>
          <div className="space-y-1 pb-4">
            {suggestedBookmarks.map((bookmark) => (
              <BookmarkTree key={bookmark.id} node={bookmark} />
            ))}
          </div>

          <div className="flex gap-2 mt-4 mb-6">
            <Button
              variant="outline"
              className="w-44"
              onClick={() => setSuggestedBookmarks(null)}
            >
              <X className="w-4 h-4 mr-1" />
              Discard
            </Button>
            <Button
              className="w-44 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleApplyChanges}
            >
              <Check className="w-4 h-4 mr-1" />
              Apply
            </Button>
          </div>
        </main>
      )}
    </div>
  );
}
