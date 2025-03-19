import React from "react";
import { Loader2, Check, X } from "lucide-react";
import { BookmarksTree, SimplifiedBookmark } from "@/types/";
import { Button } from "@/components/ui/button";
import { BookmarkTree } from "@/components/BookmarkTree";
import { toast } from "sonner";
import { applyBookmarks } from "@/utils/bookmarks";
import { useBookmarks } from "@/contexts/BookmarkContext";

interface OrganizePreviewProps {
  isProcessing: boolean;
  suggestedBookmarks: SimplifiedBookmark[] | null | undefined;
  onBack: () => void;
}

export const OrganizePreview: React.FC<OrganizePreviewProps> = ({
  isProcessing,
  suggestedBookmarks,
  onBack,
}) => {
  const { refreshBookmarks } = useBookmarks();

  const handleApplyChanges = async () => {
    if (!suggestedBookmarks) return;

    try {
      await applyBookmarks(suggestedBookmarks as BookmarksTree);
      await refreshBookmarks();
      toast.success("Applied bookmarks successfully");
      onBack();
    } catch (error) {
      toast.error("Error applying bookmarks");
    }
  };

  if (isProcessing) {
    return (
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
    );
  }

  if (!suggestedBookmarks) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto px-4 text-white">
      <span className="flex p-2 text-lg font-medium">Suggested Bookmarks</span>
      <div className="space-y-1 pb-4">
        {suggestedBookmarks.map((bookmark) => (
          <BookmarkTree key={bookmark.id} node={bookmark} />
        ))}
      </div>

      <div className="flex gap-2 mt-4 mb-6">
        <Button
          className="w-44 bg-cardColor hover:bg-cardColor/80"
          onClick={onBack}
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
  );
};
