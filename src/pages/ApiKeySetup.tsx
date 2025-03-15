import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ApiKeySetup = () => {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    // Store API key in Chrome extension storage
    chrome.storage.local.set({ geminiApiKey: apiKey.trim() }, () => {
      // Dispatch a custom event to notify the App component
      window.dispatchEvent(new Event("apiKeyChanged"));

      toast.success("API key saved successfully");

      // Force navigation to home page
      navigate("/", { replace: true });
    });
  };

  // Check if the API key already exists in extension storage
  useEffect(() => {
    chrome.storage.local.get("geminiApiKey", (result) => {
      if (result.geminiApiKey) {
        setApiKey(result.geminiApiKey);
        toast.info("API key already exists. You can update it if needed.");
      }
    });
  }, []);

  const hasExistingKey = () => {
    // We can't directly access chrome.storage.local synchronously
    // So we'll use state to determine if we have a key
    return !!apiKey;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-bgColor text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">API Key Setup</h1>
          <p className="text-sm mt-2">
            You need a Gemini API key to use this application
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Gemini API Key
            </label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full text-sm"
              autoComplete="off"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-badgeColor text-badgeTextColor hover:bg-badgeColor/90"
          >
            {hasExistingKey() ? "Update Key" : "Submit"}
          </Button>
        </form>

        <div className="space-y-3 text-sm">
          <h2 className="font-semibold">How to get a Gemini API key:</h2>
          <ol className="list-decimal list-inside space-y-1 text-textColor">
            <li>
              Log in to{" "}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google AI Studio
              </a>
            </li>
            <li>Click on "Get API Key"</li>
            <li>Create a new project or select an existing one</li>
            <li>Choose "Create API key"</li>
            <li>Copy the API key and paste it in the input field above</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
