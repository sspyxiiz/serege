// src/pages/Recipes.jsx
import React, { useState } from "react";
import { generateRecipe } from "../services/aiRecipesApi";

const Recipes = () => {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Українська");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    const result = await generateRecipe(
      ingredients.split(",").map((i) => i.trim()),
      cuisine
    );
    setRecipe(result);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1>Генерація рецептів</h1>
      <textarea
        placeholder="Введіть продукти через кому (наприклад: курка, картопля, морква)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full border p-2 mt-2 mb-2"
        rows={3}
      />

      <div className="mb-4">
        <label className="mr-2">Оберіть кухню:</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="border p-2"
        >
          <option>Українська</option>
          <option>Італійська</option>
          <option>Японська</option>
          <option>Мексиканська</option>
          <option>Індійська</option>
          <option>Французька</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-green-600 text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? "Генеруємо..." : "Згенерувати рецепт"}
      </button>

      {recipe && (
        <div className="mt-6 whitespace-pre-wrap border-t pt-4">
          <h2 className="font-bold mb-2">Результат:</h2>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;
