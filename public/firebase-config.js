// Configuración real de tu proyecto Owner Is God Pay
const firebaseConfig = {
  apiKey: "AIzaSyC8Ttt1kD-_ahf1vAATeJRmFqZm6c2F7Lc",
  authDomain: "studio-8375865056-a14bc.firebaseapp.com",
  databaseURL: "https://studio-8375865056-a14bc-default-rtdb.firebaseio.com",
  projectId: "studio-8375865056-a14bc",
  storageBucket: "studio-8375865056-a14bc.firebasestorage.app",
  messagingSenderId: "903148891715",
  appId: "1:903148891715:web:9eedb7ee35e07f5c9aaef6",
  measurementId: "G-P1ECB4E2NK"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
