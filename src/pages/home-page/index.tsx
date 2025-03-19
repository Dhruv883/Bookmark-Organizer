import React from "react";
import { useState } from "react";
import {
  FolderTree,
  Brain,
  MessageSquare,
  RotateCcw,
  BookmarkIcon,
} from "lucide-react";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Modal } from "@/components/Modal";
import { NavigationCard } from "@/components/NavigationCard";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { toast } from "sonner";

const navigationItems = [
  {
    icon: BookmarkIcon,
    title: "View Bookmarks",
    description: "Browse your current bookmarks",
    to: "/view-bookmarks",
  },
  {
    icon: FolderTree,
    title: "Reorganize",
    description: "AI-powered bookmark organization",
    to: "/reorganize",
  },
  {
    icon: Brain,
    title: "Auto Categorization",
    description: "Auto-Categorize new  bookmarks",
    to: "/",
    isDisabled: true,
    comingSoon: true,
  },
  {
    icon: MessageSquare,
    title: "Guided Organization",
    description: "Provide specific instructions",
    to: "/custom-prompt",
  },
];

export default function Home() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { originalBookmarks } = useBookmarks();

  const handleReset = async () => {
    try {
      if (!originalBookmarks) return;

      await applyBookmarks(originalBookmarks);
      toast.success("Bookmarks reset successfully");
    } catch (error) {
      toast.error("Error while resetting bookmarks");
    }
    setIsResetModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-bgColor text-[var(--text)]">
      <div className="px-5 pt-6">
        <Breadcrumb items={[]} />
      </div>

      <div className="px-4 flex flex-col gap-4">
        {navigationItems.map((item) => (
          <NavigationCard key={item.title} {...item} />
        ))}

        <NavigationCard
          icon={RotateCcw}
          title="Reset Bookmarks"
          description="Restore original bookmark structure"
          onClick={() => setIsResetModalOpen(true)}
        />
      </div>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Bookmarks"
      >
        <p>
          Are you sure you want to reset your bookmarks to their original
          structure? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
