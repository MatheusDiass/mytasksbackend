//Modulos express
import express from 'express';
const router = express.Router();

//Service
import GroupService from './groups.service.js';

//Routes
//Adiciona um grupo de tarefas
router.post('/groups', async (req, res) => {
  const group = req.body;

  try {
    await GroupService.addGroup(group);

    res.status(201);
    res.json('Grupo adicionado com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Obtém todos os grupos de tarefas do usuário
router.get('/groups/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const groups = await GroupService.fetchGroupsByUser(userId);

    res.status(200);
    res.json(groups);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Obtém um grupo de tarefas
router.get('/groups/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const group = await GroupService.fetchGroup(id);

    res.status(200);
    res.json(group);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Atualiza as informações de um grupo de tarefas
router.put('/groups/:id', async (req, res) => {
  const id = req.params.id;
  const group = req.body;

  try {
    await GroupService.updateGroup(id, group);

    res.status(200);
    res.json('Dados atualizados com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Deleta um grupo de tarefas
router.delete('/groups/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await GroupService.deleteGroup(id);

    res.status(200);
    res.json('Grupo deletado com sucesso!');
  } catch(error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
