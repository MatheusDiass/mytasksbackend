//Módulos express
import express from 'express';
const router = express.Router();

//Rotas
import userRoutes from '../modules/users/users.routes.js';
import taskRoutes from '../modules/tasks/tasks.routes.js';
import groupRoutes from '../modules/groups/groups.routes.js';

//Configuração das rotas
router.use('/', userRoutes);
router.use('/', groupRoutes);
router.use('/', taskRoutes);

//Swagger
import swaggerUI from 'swagger-ui-express';
import { readFileSync } from "fs";
const swaggerDocument = JSON.parse(readFileSync('./swagger.json'));

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('MyTasks - Backend');
});

export default router;
