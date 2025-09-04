import React, { useState } from "react";

const Register: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      onRegister();
    } else {
      setError(data.error || "Kayıt başarısız.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="drug-registration-form" style={{ maxWidth: 350 }}>
      <h2>Kayıt Ol</h2>
      <input placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Kayıt Ol</button>
      {success && <p style={{ color: "green" }}>Kayıt başarılı! Giriş yapabilirsiniz.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Register;