import React from "react";

import { ChevronRight, Folder, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Breadcrumb } from "@/components/BreadCrumb";

type BookmarkNode = {
  id: string;
  type: "folder" | "bookmark";
  title: string;
  url?: string;
  children?: BookmarkNode[];
};

const dummyBookmarks: BookmarkNode[] = [
  {
    id: "1",
    type: "folder",
    title: "Development",
    children: [
      {
        id: "1-1",
        type: "folder",
        title: "Frontend",
        children: [
          {
            id: "1-1-1",
            type: "bookmark",
            title: "React Docs",
            url: "https://react.dev",
          },
          {
            id: "1-1-2",
            type: "bookmark",
            title: "Vue.js",
            url: "https://vuejs.org",
          },
          {
            id: "1-1-3",
            type: "bookmark",
            title: "Angular",
            url: "https://angular.io",
          },
          {
            id: "1-1-4",
            type: "bookmark",
            title: "Svelte",
            url: "https://svelte.dev",
          },
        ],
      },
      {
        id: "1-2",
        type: "folder",
        title: "Backend",
        children: [
          {
            id: "1-2-1",
            type: "bookmark",
            title: "Node.js",
            url: "https://nodejs.org",
          },
          {
            id: "1-2-2",
            type: "bookmark",
            title: "Django",
            url: "https://www.djangoproject.com",
          },
          {
            id: "1-2-3",
            type: "bookmark",
            title: "Flask",
            url: "https://flask.palletsprojects.com",
          },
          {
            id: "1-2",
            type: "folder",
            title: "Backend",
            children: [
              {
                id: "1-2-1",
                type: "bookmark",
                title: "Node.js",
                url: "https://nodejs.org",
              },
              {
                id: "1-2-2",
                type: "bookmark",
                title: "Django",
                url: "https://www.djangoproject.com",
              },
              {
                id: "1-2-3",
                type: "bookmark",
                title: "Flask",
                url: "https://flask.palletsprojects.com",
              },
            ],
          },
        ],
      },
      {
        id: "1-3",
        type: "folder",
        title: "DevOps",
        children: [
          {
            id: "1-3-1",
            type: "bookmark",
            title: "Docker",
            url: "https://www.docker.com",
          },
          {
            id: "1-3-2",
            type: "bookmark",
            title: "Kubernetes",
            url: "https://kubernetes.io",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    type: "folder",
    title: "Design",
    children: [
      {
        id: "2-1",
        type: "bookmark",
        title: "Figma",
        url: "https://www.figma.com",
      },
      {
        id: "2-2",
        type: "bookmark",
        title: "Adobe XD",
        url: "https://www.adobe.com/products/xd.html",
      },
      {
        id: "2-3",
        type: "bookmark",
        title: "Sketch",
        url: "https://www.sketch.com",
      },
    ],
  },
  {
    id: "3",
    type: "folder",
    title: "Productivity",
    children: [
      {
        id: "3-1",
        type: "bookmark",
        title: "Notion",
        url: "https://www.notion.so",
      },
      {
        id: "3-2",
        type: "bookmark",
        title: "Trello",
        url: "https://trello.com",
      },
      { id: "3-3", type: "bookmark", title: "Asana", url: "https://asana.com" },
    ],
  },
  {
    id: "4",
    type: "folder",
    title: "Learning",
    children: [
      {
        id: "4-1",
        type: "bookmark",
        title: "Coursera",
        url: "https://www.coursera.org",
      },
      { id: "4-2", type: "bookmark", title: "edX", url: "https://www.edx.org" },
      {
        id: "4-3",
        type: "bookmark",
        title: "Udemy",
        url: "https://www.udemy.com",
      },
      {
        id: "4-4",
        type: "bookmark",
        title: "freeCodeCamp",
        url: "https://www.freecodecamp.org",
      },
    ],
  },
  {
    id: "5",
    type: "folder",
    title: "Entertainment",
    children: [
      {
        id: "5-1",
        type: "bookmark",
        title: "Netflix",
        url: "https://www.netflix.com",
      },
      {
        id: "5-2",
        type: "bookmark",
        title: "YouTube",
        url: "https://www.youtube.com",
      },
      {
        id: "5-3",
        type: "bookmark",
        title: "Spotify",
        url: "https://www.spotify.com",
      },
    ],
  },
];

function BookmarkTree({
  node,
  level = 0,
}: {
  node: BookmarkNode;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const paddingLeft = `${level * 16}px`;

  if (node.type === "bookmark") {
    return (
      <div
        className="relative flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors rounded-md group"
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
          <Globe className="w-4 h-4 min-w-4 text-primary" />
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
            {node.children?.map((child) => (
              <BookmarkTree key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ViewBookmarks() {
  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="px-5 pt-6">
        <Breadcrumb
          items={[{ label: "View Bookmarks", href: "/view-bookmarks" }]}
        />{" "}
      </div>

      <main className="flex-1 overflow-y-auto px-4">
        <div className="space-y-1">
          {dummyBookmarks.map((node) => (
            <BookmarkTree key={node.id} node={node} />
          ))}
        </div>
      </main>
    </div>
  );
}
