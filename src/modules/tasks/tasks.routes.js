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

//Deletar tarefa
router.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await TasksService.deleteTasks(taskId);

    res.status(200);
    res.json('Tarefa Apagada!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Editar tarefa
router.put('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.id;
  const task = req.body;

  try {
    await TasksService.updateTasks(taskId, task);

    res.status(200);
    res.json('Dados atualizados com sucesso!');
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});

//Mostrar tarefas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TasksService.fetchTasks();

    res.status(200);
    res.json(tasks);
  } catch (error) {
    const { data, code } = error.data;
    res.status(code);
    res.json(data);
  }
});
export default router;
