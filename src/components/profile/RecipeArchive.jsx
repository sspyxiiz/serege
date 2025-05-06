import React from "react";

const RecipeArchive = ({ archive, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow col-span-1">
      <h2 className="text-xl font-bold mb-3">Архів згенерованих рецептів</h2>

      {archive.length > 0 ? (
        <ul className="text-sm space-y-3 max-h-64 overflow-y-auto">
          {archive.map((rec) => (
            <li key={rec.id} className="border rounded p-2">
              <div className="flex justify-between items-start">
                <div>
                  <strong>{rec.title}</strong>
                  <p className="text-gray-700 whitespace-pre-wrap">{rec.content}</p>
                </div>
                <button
                  onClick={() => onDelete(rec.id)}
                  className="text-red-500 text-xs ml-2"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Порожньо</p>
      )}
    </div>
  );
};

export default RecipeArchive;
