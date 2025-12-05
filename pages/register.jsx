import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/firebase.config';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Cuenta creada");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Registro</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
