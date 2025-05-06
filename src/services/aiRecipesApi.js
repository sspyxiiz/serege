// src/services/aiRecipesApi.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateRecipe = async (ingredients, cuisine) => {
  const prompt = `
Склади детальний рецепт у стилі "${cuisine}" з продуктів: ${ingredients.join(", ")}.
Напиши назву страви, список інгредієнтів та інструкції з приготування.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateContent?key=" + API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Рецепт не знайдено."
    );
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return `Помилка: ${error.response?.data?.error?.message || error.message}`;
  }
};
