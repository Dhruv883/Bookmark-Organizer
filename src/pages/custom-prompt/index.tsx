import React from "react";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare, Loader2, Check, X } from "lucide-react";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarksWithCustomPrompt } from "@/utils/gemini";
import { BookmarksTree, SimplifiedBookmark } from "@/types/";
import { convertToBookmarkTree } from "@/utils/convertBookmarks";
import { BookmarkTree } from "@/components/BookmarkTree";
import { toast } from "sonner";
import { applyBookmarks } from "@/utils/bookmarks";

export default function CustomPrompt() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >();
  const { flatBookmarks, refreshBookmarks } = useBookmarks();

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

  const handleSubmit = async () => {
    if (input.trim()) {
      setIsProcessing(true);
      try {
        const suggestedCategories = await reorganizeBookmarksWithCustomPrompt(
          flatBookmarks,
          input
        );
        if (suggestedCategories) {
          const validBookmarks = convertToBookmarkTree(suggestedCategories);
          setSuggestedBookmarks(validBookmarks);
        }
      } catch (error: any) {
        toast.error("Unable to reorganize bookmarks");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-bgColor text-textColor">
      <div className="px-5 pt-6">
        <Breadcrumb
          items={[
            {
              label: "Custom Reorganization",
              href: "/custom-prompt",
              icon: MessageSquare,
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
                  Using AI to create a structure based on your instructions...
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
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Customize Your Organization
              </h2>
              <p className="text-secondaryTextColor">
                Tell AI how you want your bookmarks organized. Be as specific as
                you'd like.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., 'Group by topics and sort alphabetically within each group'"
                className="w-full min-h-[200px] p-4 rounded-lg bg-cardColor outline-none resize-none placeholder:text-secondaryTextColor"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-badgeColor text-badgeTextColor hover:bg-badgeColor/80"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Instructions
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
