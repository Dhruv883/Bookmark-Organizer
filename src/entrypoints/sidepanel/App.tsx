import React, { useState, useEffect } from "react";
import { HomePage, CustomPrompt, ViewBookmarks, Reorganize } from "@/pages";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { Toaster } from "@/components/ui/sonner";
import ApiKeySetup from "@/pages/ApiKeySetup";

const App = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkApiKey = () => {
      chrome.storage.local.get("geminiApiKey", (result) => {
        setHasApiKey(!!result.geminiApiKey);
      });
    };

    checkApiKey();

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.geminiApiKey) {
        checkApiKey();
      }
    });

    // Using a custom event as a fallback
    window.addEventListener("apiKeyChanged", checkApiKey);

    return () => {
      window.removeEventListener("apiKeyChanged", checkApiKey);
    };
  }, [location]);

  return (
    <BookmarkProvider>
      <div className="h-screen">
        <Routes>
          <Route
            path="/api-key-setup"
            element={hasApiKey ? <Navigate to="/" /> : <ApiKeySetup />}
          />

          <Route
            path="/"
            element={
              hasApiKey ? <HomePage /> : <Navigate to="/api-key-setup" />
            }
          />
          <Route
            path="/custom-prompt"
            element={
              hasApiKey ? <CustomPrompt /> : <Navigate to="/api-key-setup" />
            }
          />
          <Route
            path="/view-bookmarks"
            element={
              hasApiKey ? <ViewBookmarks /> : <Navigate to="/api-key-setup" />
            }
          />
          <Route
            path="/reorganize"
            element={
              hasApiKey ? <Reorganize /> : <Navigate to="/api-key-setup" />
            }
          />
        </Routes>
      </div>
      <Toaster />
    </BookmarkProvider>
  );
};

export default App;
