import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  saveUserStat,
  fetchUserStats,
  fetchFavorites,
  deleteFavorite,
  fetchFavoriteCombos,
  deleteFavoriteCombo,
  fetchRecipeArchive,
  deleteArchivedRecipe,
  supabase,
} from "../services/supabaseClient";

import Measurements from "../components/profile/Measurements";
import FavoriteRecipes from "../components/profile/FavoriteRecipes";
import FavoriteCombos from "../components/profile/FavoriteCombos";
import RecipeArchive from "../components/profile/RecipeArchive";
import RecipeAnalytics from "../components/profile/RecipeAnalytics";
import ProfileTabs from "../components/profile/ProfileTabs";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [history, setHistory] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [favoriteCombos, setFavoriteCombos] = useState([]);
  const [archive, setArchive] = useState([]);

  const [activeTab, setActiveTab] = useState("measurements");

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      if (!u) {
        navigate("/auth");
      } else {
        setUser(u);

        const [statsRes, favsRes, combosRes, archiveRes] = await Promise.all([
          fetchUserStats(u.id),
          fetchFavorites(u.id),
          fetchFavoriteCombos(u.id),
          fetchRecipeArchive(u.id),
        ]);

        setHistory(statsRes.data || []);
        setFavorites(favsRes.data || []);
        setFavoriteCombos(combosRes.data || []);
        setArchive(archiveRes.data || []);
      }
    });
  }, [navigate]);

  const handleSave = async () => {
    if (weight && height && user) {
      await saveUserStat(user.id, parseFloat(weight), parseFloat(height));
      const { data } = await fetchUserStats(user.id);
      setHistory(data || []);
      setWeight("");
      setHeight("");
    }
  };

  const handleDeleteFavorite = async (id) => {
    await deleteFavorite(id);
    const { data } = await fetchFavorites(user.id);
    setFavorites(data || []);
  };

  const handleAddCombo = async (combination) => {
    await supabase.from("favorite_combinations").insert([
      { user_id: user.id, combination },
    ]);
    const { data } = await fetchFavoriteCombos(user.id);
    setFavoriteCombos(data || []);
  };

  const handleDeleteCombo = async (id) => {
    await deleteFavoriteCombo(id);
    const { data } = await fetchFavoriteCombos(user.id);
    setFavoriteCombos(data || []);
  };

  const handleDeleteArchivedRecipe = async (id) => {
    await deleteArchivedRecipe(id);
    const { data } = await fetchRecipeArchive(user.id);
    setArchive(data || []);
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Особистий кабінет</h1>

      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "measurements" && (
        <Measurements
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          history={history}
          onSave={handleSave}
        />
      )}

      {activeTab === "favorites" && (
        <FavoriteRecipes
          favorites={favorites}
          onDelete={handleDeleteFavorite}
        />
      )}

      {activeTab === "combinations" && (
        <FavoriteCombos
          combos={favoriteCombos}
          onAdd={handleAddCombo}
          onDelete={handleDeleteCombo}
        />
      )}

      {activeTab === "archive" && (
        <RecipeArchive archive={archive} onDelete={handleDeleteArchivedRecipe} />
      )}

      {activeTab === "analytics" && (
        <RecipeAnalytics archive={archive} />
      )}
    </div>
  );
};

export default Profile;
