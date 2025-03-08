import React from "react";
import { HomePage, CustomPrompt, ViewBookmarks, Reorganize } from "@/pages";
import { Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <BookmarkProvider>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-prompt" element={<CustomPrompt />} />
          <Route path="/view-bookmarks" element={<ViewBookmarks />} />
          <Route path="/reorganize" element={<Reorganize />} />
        </Routes>
      </div>
      <Toaster />
    </BookmarkProvider>
  );
};

export default App;
