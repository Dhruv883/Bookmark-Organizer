import React, { useState } from "react";
import { Check, FolderTree, Loader2, X } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarks } from "@/utils/gemini";
import { Button } from "@/components/ui/button";
import { BookmarkTree } from "@/components/BookmarkTree";
import { BookmarksTree, SimplifiedBookmark } from "@/types/";
import { convertToBookmarkTree } from "@/utils/convertBookmarks";
import { toast } from "sonner";
import { applyBookmarks } from "@/utils/bookmarks";

export default function Reorganize() {
  const { flatBookmarks, refreshBookmarks } = useBookmarks();
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >();

  const handleApplyChanges = async () => {
    if (!suggestedBookmarks) return;

    try {
      await applyBookmarks(suggestedBookmarks as BookmarksTree);
      await refreshBookmarks();
      setSuggestedBookmarks(null);
      toast.success("Applied bookmarks successfully");
    } catch (error) {
      toast.error("Error applying bookmarks");
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
    } catch (error: any) {
      toast.error("Unable to reorganize bookmarks");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bgColor text-foreground">
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
        <div className="fixed inset-0 bg-bgColor/80 backdrop-blur-sm z-50 mt-16">
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6 max-w-md mx-auto p-6 text-center text-textColor">
              <Loader2 className="h-12 w-12 animate-spin " />
              <div className="space-y-2">
                <h3 className="text-xl font-medium">
                  Reorganizing your bookmarks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Using AI to create a better structure for your bookmarks...
                </p>
              </div>
              <div className="mt-4 p-4 bg-cardColor/50 rounded-lg">
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
              <div className="flex items-center gap-3 text-textColor">
                <FolderTree className="w-5 h-5" />
                <div>
                  <h2 className="text-xl font-semibold">
                    Reorganize Bookmarks
                  </h2>
                  <p className="text-secondaryTextColor">
                    Let AI organize your bookmarks intelligently
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-badgeColor text-badgeTextColor hover:bg-badgeColor/90"
                onClick={handleReorganization}
              >
                Start Reorganization
              </Button>
            </div>
          </div>
        </main>
      )}

      {!isProcessing && suggestedBookmarks && (
        <main className="flex-1 overflow-y-auto px-4 text-white">
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
              className="w-44 bg-cardColor hover:bg-cardColor/80"
              onClick={() => setSuggestedBookmarks(null)}
            >
              <X className="w-4 h-4 mr-1" />
              Discard
            </Button>
            <Button
              className="w-44 bg-white text-black hover:bg-white/80"
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
