import React, { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../services/supabaseClient";

const Home = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [weights, setWeights] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const dictionary = {
    рис: { name: "rice", calories: 205.4, protein: 4.25, fat: 0.44, carbs: 44.51 },
    курка: { name: "chicken", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    огірок: { name: "cucumber", calories: 16, protein: 0.65, fat: 0.11, carbs: 3.63 },
    яблуко: { name: "apple", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    яйце: { name: "egg", calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  };

  const searchProduct = () => {
    const keys = query
      .toLowerCase()
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const matched = keys
      .map((key) => dictionary[key])
      .filter((val) => val !== undefined);

    setProducts(matched);

    if (matched.length === 0) {
      alert(`Не знайдено інформації по запиту «${query}»`);
    }
  };

  const handleAddProduct = (product, grams) => {
    const existingIndex = selectedProducts.findIndex((p) => p.name === product.name);

    if (existingIndex !== -1) {
      const updated = [...selectedProducts];
      updated[existingIndex].grams += Number(grams);
      setSelectedProducts(updated);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, grams: Number(grams) },
      ]);
    }
  };

  const getTotal = () => {
    return selectedProducts.reduce(
      (acc, p) => {
        const factor = p.grams / 100;
        acc.calories += p.calories * factor;
        acc.protein += p.protein * factor;
        acc.fat += p.fat * factor;
        acc.carbs += p.carbs * factor;
        acc.grams += p.grams;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, grams: 0 }
    );
  };

  const handleSaveCombo = async () => {
    if (!user || selectedProducts.length === 0) return;

    const comboString = selectedProducts
      .map((p) => `${p.name} ${p.grams}г`)
      .join(", ");

    await supabase.from("favorite_combinations").insert([
      { user_id: user.id, combination: comboString },
    ]);

    alert("Комбінацію збережено ✅");
  };

  const total = getTotal();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">КБЖУ Продуктів</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Введіть продукти через кому (наприклад: рис, курка)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button onClick={searchProduct} className="bg-blue-600 text-white px-4 rounded">
          Пошук
        </button>
      </div>

      {products.map((p, index) => (
        <div key={index} className="mb-4 border rounded p-2">
          <p><strong>Назва:</strong> {p.name}</p>
          <div className="flex gap-2 items-center mt-1">
            <input
              type="number"
              placeholder="Вага (г)"
              value={weights[p.name] || ""}
              onChange={(e) =>
                setWeights({ ...weights, [p.name]: e.target.value })
              }
              className="border px-2 w-24 rounded"
            />
            <button
              onClick={() => {
                handleAddProduct(p, weights[p.name]);
                setWeights({ ...weights, [p.name]: "" });
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              ➕ Додати
            </button>
          </div>
        </div>
      ))}

      {selectedProducts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Підібрані продукти</h2>
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th>Назва</th>
                <th>Вага (г)</th>
                <th>Калорії</th>
                <th>Білки</th>
                <th>Жири</th>
                <th>Вуглеводи</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((p, i) => {
                const factor = p.grams / 100;
                return (
                  <tr key={i} className="border-b">
                    <td>{p.name}</td>
                    <td>{p.grams}</td>
                    <td>{(p.calories * factor).toFixed(2)}</td>
                    <td>{(p.protein * factor).toFixed(2)}</td>
                    <td>{(p.fat * factor).toFixed(2)}</td>
                    <td>{(p.carbs * factor).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="font-bold">
                <td>Разом:</td>
                <td>{total.grams}</td>
                <td>{total.calories.toFixed(2)}</td>
                <td>{total.protein.toFixed(2)}</td>
                <td>{total.fat.toFixed(2)}</td>
                <td>{total.carbs.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleSaveCombo}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Зберегти комбінацію
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
