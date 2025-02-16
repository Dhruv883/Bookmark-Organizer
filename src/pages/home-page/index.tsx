import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  FolderTree,
  Brain,
  MessageSquare,
  RotateCcw,
  BookmarkIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Breadcrumb } from "@/components/BreadCrumb";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleReset = () => {
    console.log("Resetting bookmarks...");
    setIsResetModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)] text-[var(--text)]">
      <div className="px-4 py-3 border-b border-gray-200">
        <Breadcrumb items={[]} />
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        <Link to="/view-bookmarks">
          <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text)]">
              <div className="w-5 h-5 flex items-center justify-center">
                <BookmarkIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">View Bookmarks</div>
                <div className="text-sm text-gray-500">
                  Browse your current bookmarks
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/reorganize">
          <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text)]">
              <div className="w-5 h-5 flex items-center justify-center">
                <FolderTree className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">Reorganize</div>
                <div className="text-sm text-gray-500">
                  AI-powered bookmark organization
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="bg-gray-50 rounded-xl p-4 opacity-75">
            <div className="flex items-center gap-3 text-[var(--text)]">
              <div className="w-5 h-5 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  Smart Folders
                  <Badge
                    variant="secondary"
                    className="bg-[var(--secondary)] text-[var(--text)] rounded-full text-xs"
                  >
                    Coming Soon
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Automated dynamic folder creation
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/custom-prompt">
          <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text)]">
              <div className="w-5 h-5 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">Custom Reorganization</div>
                <div className="text-sm text-gray-500">
                  Provide specific organization instructions
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div
          className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setIsResetModalOpen(true)}
        >
          <div className="flex items-center gap-3 text-[var(--text)]">
            <div className="w-5 h-5 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />{" "}
            </div>
            <div>
              <div className="font-medium">Reset Bookmarks</div>
              <div className="text-sm text-gray-500">
                Restore original bookmark structure
              </div>
            </div>
          </div>
        </div>
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
