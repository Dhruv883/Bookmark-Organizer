import {
  BookmarksTree,
  Bookmark,
  BookmarkItem,
  BookmarkFolder,
  SimplifiedBookmark,
  FlatBookmark,
} from "@/types/";

function convertBookmarkNode(
  node: chrome.bookmarks.BookmarkTreeNode
): Bookmark {
  const base = {
    id: node.id,
    title: node.title,
    dateAdded: node.dateAdded || 0,
    index: node.index,
    parentId: node.parentId || "",
  };

  if (node.url) {
    return {
      ...base,
      url: node.url,
      dateLastUsed: 0,
    } as BookmarkItem;
  }

  return {
    ...base,
    children: (node.children || []).map(convertBookmarkNode),
    dateGroupModified: node.dateGroupModified || 0,
  } as BookmarkFolder;
}

export async function fetchBookmarks(): Promise<Bookmark[]> {
  const tree = await chrome.bookmarks.getTree();
  return tree[0].children && tree[0].children[0].children
    ? tree[0].children[0].children.map(convertBookmarkNode)
    : [];
}

export function simplifyBookmarks(
  bookmarks: BookmarksTree
): SimplifiedBookmark[] {
  return bookmarks.map((bookmark) => {
    const simplified: SimplifiedBookmark = {
      id: bookmark.id,
      title: bookmark.title,
      parentId: bookmark.parentId,
    };

    if ("url" in bookmark) {
      simplified.url = bookmark.url;
    }

    if ("children" in bookmark) {
      simplified.children = simplifyBookmarks(bookmark.children);
    }

    return simplified;
  });
}

export function flattenBookmarks(bookmarks: BookmarksTree): FlatBookmark[] {
  const flattened: FlatBookmark[] = [];

  function traverse(items: Bookmark[]) {
    items.forEach((item) => {
      if ("url" in item) {
        flattened.push({
          title: item.title,
          url: item.url,
        });
      }
      if ("children" in item) {
        traverse(item.children);
      }
    });
  }

  traverse(bookmarks);
  return flattened;
}
