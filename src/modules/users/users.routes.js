//Modulos express
import express from 'express';
const router = express.Router();

//Service
import UserService from './users.service.js';

//Routes
//Realiza o cadastro do usuário
router.post('/register', async (req, res) => {
  const user = req.body;

  try {
    const userData = await UserService.register(user);

    res.status(201);
    res.json(userData);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Realiza o login do usuário
router.post('/login', async (req, res) => {
  const user = req.body;

  try {
    const userData = await UserService.login(user);

    res.status(200);
    res.json(userData);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Obtém todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await UserService.fetchUsers();

    res.status(200);
    res.json(users);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Atualiza as informações de um usuário
router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  try {
    await UserService.updateUser(id, user);

    res.status(200);
    res.json('Dados atualizados com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

router.get('/friends/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const friends = await UserService.fetchFriends(userId);

    res.status(200);
    res.json(friends);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

router.patch('/friends/:userId/:friendId', async (req, res) => {
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

router.delete('/friends/:userId/:friendId', async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  try {
    await UserService.deleteFriend(userId, friendId);

    res.status(200);
    res.json('Amigo deletado com sucesso!');
  } catch(error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
