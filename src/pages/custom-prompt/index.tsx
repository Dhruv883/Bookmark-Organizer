import React from "react";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function CustomPrompt() {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      console.log("Submitting prompt:", input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b">
        <Breadcrumb
          items={[{ label: "Custom Reorganization", href: "/custom-prompt" }]}
        />
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Customize Your Organization
            </h2>
            <p className="text-muted-foreground">
              Tell AI how you want your bookmarks organized. Be as specific as
              you'd like.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., 'Group by topics and sort alphabetically within each group'"
              className="w-full min-h-[200px] p-4 rounded-lg bg-secondary/50 border-0 resize-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Instructions
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
