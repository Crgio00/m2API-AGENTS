// Importar variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importar módulos necesarios
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Inicializar la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json()); // Usar express.json() en lugar de bodyParser.json()
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_HOST || "");

// Configurar el motor de vistas 
app.set("views", path.join(__dirname, "pages/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

import { verifyJWT } from "./api/controllers/auth.controller";

app.get("/home", verifyJWT, (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

import apiRoutes from "./api/routes/api.routes";
app.use("/api", apiRoutes);

import pagesRoutes from "./pages/routes/pages.routes";
app.use("/", pagesRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
