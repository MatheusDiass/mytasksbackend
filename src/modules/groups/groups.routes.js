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
    await GroupService.save(group);

    res.status(201);
    res.json('Grupo adicionado com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Obtém todos os grupos de tarefas
router.get('/groups', async (req, res) => {
  try {
    const groups = await GroupService.fetchGroups();

    res.status(200);
    res.json(groups);
  } catch(error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
