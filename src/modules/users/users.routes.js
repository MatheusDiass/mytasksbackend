//Modulos express
import express from 'express';
const router = express.Router();

//Service
import UserService from './users.service.js';

//Routes
router.post('/register', async (req, res) => {
  const user = req.body;

  try {
    await UserService.register(user);

    res.status(200);
    res.json('Cadastro realizado com sucesso!');
  } catch (error) {
    res.status(error.code);
    res.json(error.data);
  }
});

export default router;
