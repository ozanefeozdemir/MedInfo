import React, { useState } from "react";

const Login: React.FC<{
  onLogin: (token: string, username: string) => void;
}> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        onLogin(data.token, data.user.username);
    } else {
      setError(data.error || "Giriş başarısız.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="drug-registration-form"
      style={{ maxWidth: 350 }}
    >
      <h2>Giriş Yap</h2>
      <input
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Giriş</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
