import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const COLORS = ["#1e40af", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];

const RecipeAnalytics = ({ archive }) => {
  if (!archive || archive.length === 0) {
    return <p className="text-gray-500 text-sm">Недостатньо даних для аналітики.</p>;
  }

  // 🔹 Групування за кухнями
  const kitchenCounts = archive.reduce((acc, rec) => {
    const kitchen = rec.kitchen || "Невідомо";
    acc[kitchen] = (acc[kitchen] || 0) + 1;
    return acc;
  }, {});
  const kitchenData = Object.entries(kitchenCounts).map(([k, v]) => ({ name: k, value: v }));

  // 🔹 Калорійність по стравам (для графіка змін)
  const calorieData = archive
    .filter((r) => r.calories)
    .map((r) => ({
      name: r.title.length > 12 ? r.title.slice(0, 12) + "…" : r.title,
      calories: r.calories,
    }));

  // 🔹 Підсумки
  const total = archive.length;
  const avgCalories =
    archive.filter((r) => r.calories).reduce((sum, r) => sum + r.calories, 0) /
    Math.max(1, archive.filter((r) => r.calories).length);

  return (
    <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold mb-4">📊 Аналітика рецептів</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Частка кухонь */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Типи кухонь</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={kitchenData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {kitchenData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Калорійність */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Калорійність страв</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={calorieData}>
              <XAxis dataKey="name" />
              <YAxis unit=" ккал" />
              <Tooltip />
              <Bar dataKey="calories" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Статистика */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>Збережено рецептів: <strong>{total}</strong></p>
        <p>Середня калорійність: <strong>{avgCalories.toFixed(0)} ккал</strong></p>
        <p>Кухонь у вибірці: <strong>{Object.keys(kitchenCounts).length}</strong></p>
      </div>
    </div>
  );
};

export default RecipeAnalytics;
