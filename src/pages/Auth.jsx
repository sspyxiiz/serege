// src/pages/Auth.jsx
import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");

    let result;

    if (isLogin) {
      result = await supabase.auth.signInWithPassword({
        email,
        password
      });
    } else {
      result = await supabase.auth.signUp({
        email,
        password
      });
    }

    const { error } = result;

    if (error) {
      setError(error.message);
    } else {
      navigate("/"); // після успішного входу / реєстрації
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Вхід" : "Реєстрація"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        onClick={handleAuth}
        className="w-full bg-blue-600 text-white py-2 mb-3 rounded"
      >
        {isLogin ? "Увійти" : "Зареєструватися"}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 underline text-sm"
      >
        {isLogin
          ? "Немає акаунту? Зареєструватися"
          : "Вже є акаунт? Увійти"}
      </button>
    </div>
  );
};

export default Auth;
