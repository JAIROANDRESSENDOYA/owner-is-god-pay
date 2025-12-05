// Importa Firebase solo aquí
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración REAL
const firebaseConfig = {
  apiKey: "AIzaSyC8Ttt1kD-_ahf1vAATeJRmFqZm6c2F7Lc",
  authDomain: "studio-8375865056-a14bc.firebaseapp.com",
  databaseURL: "https://studio-8375865056-a14bc-default-rtdb.firebaseio.com",
  projectId: "studio-8375865056-a14bc",
  storageBucket: "studio-8375865056-a14bc.firebasestorage.app",
  messagingSenderId: "903148891715",
  appId: "1:903148891715:web:b19eca5e9a33ccc19aaef6",
  measurementId: "G-T25Z0D1TDK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
