//Modulos express
import express from 'express';

const router = express.Router();

//Service
import TasksService from '../tasks/tasks.service.js';

router.post('/tasks', async (req, res) => {
  const task = req.body;
  try {
    //Salva tarefa
    await TasksService.save(task);

    res.status(201);
    res.json('Tarefa salva com sucesso');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

router.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await UserService.deleteTasks(taskId);

    res.status(200);
    res.json('Tarefa Apagada!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

export default router;
