import React from "react";
import { Link } from "react-router-dom";
import {
  FolderTree,
  Brain,
  MessageSquare,
  RotateCcw,
  BookmarkIcon,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <Link to="/reorganize" className="text-blue-500 hover:underline">
        View Bookmarks
      </Link>
    </div>
  );
};

export default HomePage;
