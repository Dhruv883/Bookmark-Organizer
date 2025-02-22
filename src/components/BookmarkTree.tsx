import React from "react";
import { ChevronRight, Folder, ChevronDown, Link } from "lucide-react";
import { useState } from "react";
import { Bookmark, BookmarkFolder, SimplifiedBookmark } from "@/types/";

type BookmarkNodeType = Bookmark | SimplifiedBookmark;

function isBookmarkFolder(
  bookmark: BookmarkNodeType
): bookmark is BookmarkFolder | SimplifiedBookmark {
  return "children" in bookmark;
}

export function BookmarkTree({
  node,
  level = 0,
}: {
  node: BookmarkNodeType;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const paddingLeft = `${level * 16}px`;

  if (!isBookmarkFolder(node)) {
    // BOOKMARK ITEM
    return (
      <div
        className="relative flex items-center gap-2 py-1.5 px-2  text-sm hover:bg-accent hover:text-accent-foreground transition-colors rounded-md group font-normal"
        style={{
          marginLeft: paddingLeft,
          width: `calc(100% - ${paddingLeft})`,
        }}
      >
        {level > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 border-l-2 border-border group-hover:border-muted-foreground"
            style={{ marginLeft: `-${4}px` }}
          />
        )}

        <div>
          <Link className="w-4 h-4 min-w-4 text-primary" />
        </div>
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline truncate"
        >
          {node.title}
        </a>
      </div>
    );
  }

  // BOOKMARK FOLDER
  return (
    <div className="w-full">
      <div className="relative group">
        {level > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 border-l-2 border-border group-hover:border-muted-foreground"
            style={{ marginLeft: `${(level - 1) * 16 + 12}px` }}
          />
        )}
        <button
          className="w-full flex items-center gap-2 py-1.5 px-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
          style={{ marginLeft: paddingLeft }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 min-w-4 text-primary" />
          ) : (
            <ChevronRight className="w-4 h-4 min-w-4 text-primary" />
          )}
          <Folder className="w-4 h-4 min-w-4 text-primary" />
          <span className="text-sm font-medium truncate">{node.title}</span>
        </button>
      </div>
      {isOpen && (
        <div className="relative gap-2">
          {level > 0 && (
            <div
              className="absolute left-0 top-0 h-full border-l-2 border-border"
              style={{ marginLeft: `${(level - 1) * 16 + 12}px` }}
            />
          )}
          <div>
            {node.children &&
              node.children.map((child) => (
                <BookmarkTree key={child.id} node={child} level={level + 1} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
