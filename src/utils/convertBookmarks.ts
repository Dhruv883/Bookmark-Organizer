import { BookmarkCategory, SimplifiedBookmark } from "@/types";

export function convertToBookmarkTree(
  categories: BookmarkCategory[]
): SimplifiedBookmark[] {
  let currentId = 2;

  function processCategory(
    category: any,
    parentId: number
  ): SimplifiedBookmark {
    const categoryNode: SimplifiedBookmark = {
      id: String(currentId++),
      parentId: String(parentId),
      title: category.name,
      children: [],
    };

    // Process subcategories if they exist
    if (category.subcategories && category.subcategories.length > 0) {
      const subcategoryNodes = category.subcategories.map((subCategory: any) =>
        processCategory(subCategory, Number(categoryNode.id))
      );
      categoryNode.children = categoryNode.children?.concat(subcategoryNodes);
    }

    // Process bookmarks
    if (category.bookmarks && category.bookmarks.length > 0) {
      const bookmarkNodes = category.bookmarks.map((bookmark: any) => ({
        id: String(currentId++),
        parentId: categoryNode.id,
        title: bookmark.title,
        url: bookmark.url,
      }));

      categoryNode.children = categoryNode.children?.concat(bookmarkNodes);
    }

    return categoryNode;
  }

  const rootNodes = categories.map((category) => processCategory(category, 1));

  return rootNodes;
}
