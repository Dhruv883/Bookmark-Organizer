import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarksWithCustomPrompt } from "@/utils/gemini";
import { SimplifiedBookmark } from "@/types/";
import { convertToBookmarkTree } from "@/utils/convertBookmarks";
import { toast } from "sonner";
import { PageLayout } from "@/components/PageLayout";
import { OrganizePreview } from "@/components/OrganizePreview";

export default function CustomPrompt() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >();
  const { flatBookmarks } = useBookmarks();

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
    <PageLayout
      breadcrumbItems={[
        {
          label: "Custom Reorganization",
          href: "/custom-prompt",
          icon: MessageSquare,
        },
      ]}
    >
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

      <OrganizePreview
        isProcessing={isProcessing}
        suggestedBookmarks={suggestedBookmarks}
        onBack={() => setSuggestedBookmarks(null)}
      />
    </PageLayout>
  );
}
