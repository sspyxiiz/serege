import React, { useState } from "react";

const FavoriteCombos = ({ combos, onAdd, onDelete }) => {
  const [comboInput, setComboInput] = useState("");

  const handleSubmit = () => {
    const trimmed = comboInput.trim();
    if (trimmed) {
      onAdd(trimmed);
      setComboInput("");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow col-span-1">
      <h2 className="text-xl font-bold mb-3">Улюблені комбінації</h2>

      {/* Форма додавання */}
      <div className="flex mb-3 gap-2">
        <input
          type="text"
          placeholder="Введіть комбінацію продуктів"
          value={comboInput}
          onChange={(e) => setComboInput(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ❤️
        </button>
      </div>

      {/* Список комбінацій */}
      {combos.length > 0 ? (
        <ul className="text-sm space-y-2 max-h-64 overflow-y-auto">
          {combos.map((combo) => (
            <li key={combo.id} className="border rounded p-2 flex justify-between">
              <span>{combo.combination}</span>
              <button
                onClick={() => onDelete(combo.id)}
                className="text-red-500 text-xs"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Порожньо</p>
      )}
    </div>
  );
};

export default FavoriteCombos;
