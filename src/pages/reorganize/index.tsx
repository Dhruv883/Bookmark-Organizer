import React, { useState } from "react";
import { FolderTree } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { reorganizeBookmarks } from "@/utils/gemini";
import { Button } from "@/components/ui/button";
import { SimplifiedBookmark } from "@/types/";
import { convertToBookmarkTree } from "@/utils/convertBookmarks";
import { toast } from "sonner";
import { PageLayout } from "@/components/PageLayout";
import { OrganizePreview } from "@/components/OrganizePreview";

export default function Reorganize() {
  const { flatBookmarks } = useBookmarks();
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedBookmarks, setSuggestedBookmarks] = useState<
    SimplifiedBookmark[] | null
  >();

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
    <PageLayout
      breadcrumbItems={[
        {
          label: "Reorganize Bookmarks",
          href: "/reorganize",
          icon: FolderTree,
        },
      ]}
    >
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

      <OrganizePreview
        isProcessing={isProcessing}
        suggestedBookmarks={suggestedBookmarks}
        onBack={() => setSuggestedBookmarks(null)}
      />
    </PageLayout>
  );
}
