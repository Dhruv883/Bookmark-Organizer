import React from "react";
import {
  HomePage,
  CustomPrompt,
  ViewBookmarks,
  Reorganize,
  SmartFolders,
} from "@/pages";
import { Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "@/contexts/BookmarkContext";

const App = () => {
  return (
    <BookmarkProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-prompt" element={<CustomPrompt />} />
          <Route path="/view-bookmarks" element={<ViewBookmarks />} />
          <Route path="/reorganize" element={<Reorganize />} />
          {/* <Route path="/smart-folders" element={<SmartFolders />} /> */}
        </Routes>
      </div>
    </BookmarkProvider>
  );
};

export default App;
