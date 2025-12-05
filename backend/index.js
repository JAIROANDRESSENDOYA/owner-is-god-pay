import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend Owner Is God Pay activo 💙");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});