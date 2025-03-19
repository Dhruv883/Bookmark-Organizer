import { GoogleGenerativeAI } from "@google/generative-ai";
import { FlatBookmark } from "@/types/";
import { getApiKey } from "@/utils/apiUtils";

const MODEL = "gemini-2.0-flash";

async function createGeminiClient() {
  const apiKey = await getApiKey();

  if (!apiKey) {
    console.error("No Gemini API key found in extension storage");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODEL });
}

async function processGeminiResponse(result: any) {
  try {
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json|```/g, "");
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error(`Error processing Gemini response:`, error);
    return null;
  }
}

const getJsonTemplate = () => `
[
  {
    "name": "Category Name",
    "bookmarks": [
      {
        "title": "Original Title",
        "url": "Original URL"
      }
    ],
    // optional
    "subcategories": [
      {
        "name": "Subcategory Name",
        "bookmarks": [
          {
            "title": "Original Title",
            "url": "Original URL"
          }
        ]
      }
    ]
  }
]`;

export async function reorganizeBookmarks(
  bookmarks: FlatBookmark[]
): Promise<any> {
  const model = await createGeminiClient();
  if (!model) return null;

  const prompt = `Organize these bookmarks into logical categories. Return ONLY a JSON array of objects with this EXACT structure, no other text or explanation:

  ${getJsonTemplate()}

Rules:
- ONLY return the JSON array, nothing else.  The entire output must be valid JSON.
- Every bookmark must be included exactly once.
- Don't modify any URLs but you can modify titles.
- Group similar items together logically.
- Categories should ideally be single words, or at max two words.
- Nested categories/objects are allowed and ENCOURAGED for further organization (e.g., a "Blogs" category could have subcategories like "Coding", "JavaScript", etc.).
- TRY TO HAVE AS MASNY SUB-CATEGORIES AS YOU CAN, BUT THEY SHOULD BE MEANINGFUL
- If a category only has 1 or 2 bookmarks, add them into "Other" categories.
- Each category mush have only 5-8 bookmarks ideally

Bookmarks to organize:
${JSON.stringify(bookmarks)};
`;

  try {
    const result = await model.generateContent(prompt);
    return await processGeminiResponse(result);
  } catch (error: any) {
    console.error(`Error with model ${MODEL}:`, error);

    if (error.message?.includes("Resource has been exhausted")) {
      console.error("API rate limit exceeded");
    }

    return null;
  }
}

export async function reorganizeBookmarksWithCustomPrompt(
  bookmarks: FlatBookmark[],
  customInstructions: string
): Promise<any> {
  const model = await createGeminiClient();
  if (!model) return null;

  const prompt = `Organize these bookmarks into categories according to the following custom instructions:

"${customInstructions}"

Return ONLY a JSON array of objects with this EXACT structure, no other text or explanation:

${getJsonTemplate()}

Rules:
- ONLY return the JSON array, nothing else. The entire output must be valid JSON.
- Every bookmark must be included exactly once.
- Don't modify any URLs but you can modify titles if needed for clarity.
- Organize bookmarks based on the custom instructions provided above.
- If the instructions don't specify certain aspects, use your best judgment.
- Nested categories/objects are allowed for further organization as needed.

Bookmarks to organize:
${JSON.stringify(bookmarks)};
`;

  try {
    const result = await model.generateContent(prompt);
    return await processGeminiResponse(result);
  } catch (error: any) {
    console.error(`Error with model ${MODEL}:`, error);

    if (error.message?.includes("Resource has been exhausted")) {
      console.error("API rate limit exceeded");
    }

    return null;
  }
}
