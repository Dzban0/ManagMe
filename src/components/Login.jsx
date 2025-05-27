import { useState } from "react";
import { login } from "../services/authService";

export const Login = ({ onLoginSuccess }) => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginInput, password);
      onLoginSuccess();
    } catch (err) {
      setError("Nieprawidłowe login lub hasło", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Logowanie</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-black">
          Zaloguj się
        </button>
      </form>
    </div>
  );
};
