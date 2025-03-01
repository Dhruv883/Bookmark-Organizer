import React, { createContext, useContext, useState, useEffect } from "react";
import { BookmarksTree, SimplifiedBookmark, FlatBookmark } from "@/types/";
import {
  fetchBookmarks,
  simplifyBookmarks,
  flattenBookmarks,
} from "@/utils/bookmarks";

interface BookmarkContextType {
  bookmarks: BookmarksTree;
  simplifiedBookmarks: SimplifiedBookmark[];
  flatBookmarks: FlatBookmark[];
  originalBookmarks?: BookmarksTree;
  refreshBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

const storeOriginalBookmarks = async (bookmarks: BookmarksTree) => {
  try {
    const { originalBookmarks } = await chrome.storage.local.get(
      "originalBookmarks"
    );

    if (!originalBookmarks) {
      await chrome.storage.local.set({
        originalBookmarks: bookmarks,
        storedAt: new Date().toISOString(),
      });
      console.log("Original bookmarks stored successfully");
    }
  } catch (err) {
    console.error("Failed to store original bookmarks:", err);
  }
};

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarksTree>([]);
  const [simplifiedBookmarks, setSimplifiedBookmarks] = useState<
    SimplifiedBookmark[]
  >([]);
  const [flatBookmarks, setFlatBookmarks] = useState<FlatBookmark[]>([]);
  const [originalBookmarks, setOriginalBookmarks] = useState<BookmarksTree>([]);

  const refreshBookmarks = async () => {
    try {
      const fetchedBookmarks = await fetchBookmarks();
      const { originalBookmarks } = await chrome.storage.local.get(
        "originalBookmarks"
      );

      setBookmarks(fetchedBookmarks);
      setOriginalBookmarks(originalBookmarks);

      if (fetchedBookmarks.length > 0) {
        await storeOriginalBookmarks(fetchedBookmarks);

        const simplified = simplifyBookmarks(fetchedBookmarks);
        const flattened = flattenBookmarks(fetchedBookmarks);
        setSimplifiedBookmarks(simplified);
        setFlatBookmarks(flattened);
      }
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
    }
  };

  useEffect(() => {
    refreshBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        originalBookmarks,
        bookmarks,
        simplifiedBookmarks,
        flatBookmarks,
        refreshBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
