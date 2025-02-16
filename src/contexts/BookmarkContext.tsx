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
  refreshBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarksTree>([]);
  const [simplifiedBookmarks, setSimplifiedBookmarks] = useState<
    SimplifiedBookmark[]
  >([]);
  const [flatBookmarks, setFlatBookmarks] = useState<FlatBookmark[]>([]);

  const refreshBookmarks = async () => {
    try {
      const fetchedBookmarks = await fetchBookmarks();
      setBookmarks(fetchedBookmarks);

      if (fetchedBookmarks.length > 0) {
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
