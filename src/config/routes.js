//Módulos express
import express from 'express';
const router = express.Router();

//Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json' assert {type: 'json'};

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('MyTasks - Backend');
});

export default router;
