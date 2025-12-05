// Inicializa Firebase solo para el panel ADMIN

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_tG9s8cjYnpOy_o1H2QY2CK-POwDvE7U",
  authDomain: "studio-8375865056-a14bc.firebaseapp.com",
  projectId: "studio-8375865056-a14bc",
  storageBucket: "studio-8375865056-a14bc.appspot.com",
  messagingSenderId: "903148891715",
  appId: "1:903148891715:web:9eedb7ee35e07f5c9aaef6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
