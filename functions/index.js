const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

initializeApp();
const db = getFirestore();

// 🔥 Ejemplo de endpoint en JavaScript
exports.helloWorld = onRequest(async (req, res) => {
  logger.info("Hola colega, endpoint funcionando correctamente!");

  res.json({
    message: "Hola Jairo, tu backend está vivo y funcionando 🚀",
    timestamp: new Date().toISOString(),
  });
});

// 🔥 Crear usuario en Firestore después de registrarlo
const { onUserCreated } = require("firebase-functions/v2/auth");

exports.createUserProfile = onUserCreated(async (event) => {

    const user = event.data;
    const userRef = db.collection("users").doc(user.uid);

    await userRef.set({
  uid: user.uid,
  email: user.email || null,

  createdAt: FieldValue.serverTimestamp(),
  estado: "activo",
});

    logger.info("Perfil creado:", user.uid);
  });
