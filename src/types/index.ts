interface BookmarkBase {
  id: string;
  title: string;
  dateAdded?: number;
  index?: number;
  parentId: string;
}

export interface BookmarkItem extends BookmarkBase {
  url: string;
  dateLastUsed?: number;
}

export interface BookmarkFolder extends BookmarkBase {
  children: Bookmark[];
  dateGroupModified?: number;
}

export type Bookmark = BookmarkItem | BookmarkFolder;

export type BookmarksTree = Bookmark[];

export interface SimplifiedBookmark {
  id: string;
  title: string;
  parentId: string;
  url?: string;
  children?: SimplifiedBookmark[];
}

export interface FlatBookmark {
  title: string;
  url: string;
}

export interface SuggestedBookmark {
  title: string;
  url: string;
}

export interface BookmarkCategory {
  name: string;
  bookmarks: SuggestedBookmark[];
}
