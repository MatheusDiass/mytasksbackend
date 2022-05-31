//Modulos express
import express from 'express';
const router = express.Router();

//Service
import TasksService from '../tasks/tasks.service.js';

//Routes
//Adiciona uma tarefa
router.post('/tasks', async (req, res) => {
  const task = req.body;
  try {
    await TasksService.addGroup(task);

    res.status(201);
    res.json('Tarefa adicionada com sucesso');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Obtém todas as tarefas
router.get('/tasks/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await TasksService.fetchTasks(userId);

    res.status(200);
    res.json(tasks);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Atualiza as informações de uma tarefa
router.put('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const task = req.body;

  try {
    await TasksService.updateTask(id, task);

    res.status(200);
    res.json('Dados atualizados com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Deleta uma tarefa
router.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    await TasksService.deleteTask(id);

    res.status(200);
    res.json('Tarefa deletada com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
