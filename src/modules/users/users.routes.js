//Modulos express
import express from 'express';
const router = express.Router();

//Service
import UserService from './users.service.js';

//Routes
router.post('/register', async (req, res) => {
  const user = req.body;

  try {
    //Realiza o cadastro do usuário
    const userData = await UserService.register(user);

    res.status(201);
    res.json(userData);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

router.post('/login', async (req, res) => {
  const user = req.body;

  try {
    //Realiza o login do usuário
    const userData = await UserService.login(user);

    res.status(200);
    res.json(userData);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

router.patch('/addFriend/:userId/:friendId', async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  try {
    await UserService.addFriend(userId, friendId);

    res.status(200);

    res.json('Amigo adicionado com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
