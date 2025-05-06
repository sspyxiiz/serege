import React from "react";

const FavoriteRecipes = ({ favorites, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow col-span-1">
      <h2 className="text-xl font-bold mb-3">Улюблені рецепти</h2>
      {favorites.length > 0 ? (
        <ul className="text-sm space-y-3 max-h-64 overflow-y-auto">
          {favorites.map((fav) => (
            <li key={fav.id} className="border rounded p-2">
              <div className="flex justify-between items-start">
                <div>
                  <strong>{fav.title}</strong>
                  <p className="text-gray-700 whitespace-pre-wrap">{fav.content}</p>
                </div>
                <button
                  onClick={() => onDelete(fav.id)}
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

export default FavoriteRecipes;
