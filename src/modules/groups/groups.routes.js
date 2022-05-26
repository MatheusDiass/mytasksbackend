//Modulos express
import express from 'express';
const router = express.Router();

//Service
import GroupService from './groups.service.js';

//Routes
//Adiciona o grupo de tarefas
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

export default router;
