import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './config/routes.js';
import mongodbConnect from './config/database.js';
const app = express();

//Configuração do express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Carrega o modulo dotenv e o arquivo env
dotenv.config({
  path: '.env.development',
});

//Conexão com o MongoDB
await mongodbConnect();

//Rotas
app.use('/', router);

export default app;
