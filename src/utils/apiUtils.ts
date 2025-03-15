export const getApiKey = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("geminiApiKey", (result) => {
      if (result.geminiApiKey) {
        resolve(result.geminiApiKey);
      } else {
        reject(new Error("API key not found"));
      }
    });
  });
};
