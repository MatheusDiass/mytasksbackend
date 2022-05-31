//Módulos express
import express from 'express';
const router = express.Router();

//Rotas
import userRoutes from '../modules/users/users.routes.js';
import taskRoutes from '../modules/tasks/tasks.routes.js';

//Configuração das rotas
router.use('/', userRoutes);
router.use('/', taskRoutes);

//Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json' assert { type: 'json' };

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('MyTasks - Backend');
});

export default router;
