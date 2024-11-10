"use strict";

import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import express from "express"; // Esta es la importación correcta de Express
import * as env from "./server/environment";
import { Config } from "./server/environment";
import path from 'path';

// Variables de entorno
const conf: Config = env.getConfig(process.env);

// Mejoramos el log de las promesas
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// Configurar Express
const app: express.Application = express();

// Servir archivos estáticos desde "dist/public"
app.use(express.static(path.join(__dirname, '../dist/public')));

// Redirigir la raíz al archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Si necesitas otras rutas adicionales para APIs o servicios
// app.get('/api/some-path', (req, res) => {
//   res.json({ message: 'Hello World' });
// });

// Se configura e inicia el servidor
app.listen(conf.port, () => {
  console.log(`Claim Server escuchando en puerto ${conf.port}`);
});

module.exports = app;
