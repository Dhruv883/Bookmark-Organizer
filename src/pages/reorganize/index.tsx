import React from "react";

import { Button } from "@/components/ui/button";
import { FolderTree, Check, X } from "lucide-react";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

const dummyCategories = [
  {
    name: "Development",
    urls: [
      { title: "React Docs", url: "https://react.dev" },
      { title: "Node.js", url: "https://nodejs.org" },
      { title: "GitHub", url: "https://github.com" },
      { title: "Stack Overflow", url: "https://stackoverflow.com" },
    ],
  },
  {
    name: "Design",
    urls: [
      { title: "Figma", url: "https://www.figma.com" },
      { title: "Dribbble", url: "https://dribbble.com" },
      { title: "Behance", url: "https://www.behance.net" },
    ],
  },
  {
    name: "Productivity",
    urls: [
      { title: "Notion", url: "https://www.notion.so" },
      { title: "Trello", url: "https://trello.com" },
      { title: "Asana", url: "https://asana.com" },
    ],
  },
];

export default function Reorganize() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<typeof dummyCategories | null>(null);

  const handleReorganize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setResults(dummyCategories);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-5 pt-6">
        <Breadcrumb items={[{ label: "Reorganize", href: "/reorganize" }]} />
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {!isProcessing && !results && (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FolderTree className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">
                    Reorganize Bookmarks
                  </h2>
                  <p className="text-muted-foreground">
                    Let AI organize your bookmarks intelligently
                  </p>
                </div>
              </div>
              <Button
                onClick={handleReorganize}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Reorganization
              </Button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center justify-center h-full">
            <FolderTree className="w-12 h-12 animate-pulse text-primary" />
            <p className="mt-4 text-lg">Reorganizing your bookmarks...</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            {results.map((category) => (
              <div key={category.name} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <FolderTree className="w-4 h-4 text-primary" />
                  <h3 className="text-lg font-medium">{category.name}</h3>
                </div>
                <ul className="space-y-2 pl-6">
                  {category.urls.map((url) => (
                    <li
                      key={url.url}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-primary">{url.title}</span>
                      <span className="text-muted-foreground text-xs">
                        ({url.url})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex gap-2 mt-8">
              <Button variant="outline" className="w-full">
                <X className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Check className="w-4 h-4 mr-2" />
                Apply Changes
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
