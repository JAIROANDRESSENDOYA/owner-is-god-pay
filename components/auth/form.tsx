"use client";

import { useState } from "react";
import { auth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "@/components/ui/button";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h2 className="text-center text-xl font-semibold">
        {isRegister ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Correo"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Procesando..." : isRegister ? "Registrarme" : "Ingresar"}
      </Button>

      {/* SWITCH LOGIN / REGISTER */}
      <p className="text-center text-sm text-gray-600">
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </form>
  );
}
