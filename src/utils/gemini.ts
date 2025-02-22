import { GoogleGenerativeAI } from "@google/generative-ai";
import { FlatBookmark } from "@/types/";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface CategoryResponse {
  name: string;
  bookmarks: Array<{
    title: string;
    url: string;
  }>;
}

export async function reorganizeBookmarks(
  bookmarks: FlatBookmark[]
): Promise<null> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Organize these bookmarks into logical categories. Return ONLY a JSON array of objects with this EXACT structure, no other text or explanation:

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
  ]

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
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "");

    const ans = JSON.parse(cleanedText);

    console.log("Ans: ", ans);
    return ans;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}
