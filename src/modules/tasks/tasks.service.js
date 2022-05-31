import Task from './task.model.js';

class TasksService {
  async save(task) {
    const { title } = task;

    try {
      if (!title) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      await Task.create(task);
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Deletar tarefa
  async deleteTasks(taskId) {
    try {
      if (!taskId) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await Task.deleteOne({ _id: taskId });

      if (!operationInfo.deletedCount) {
        throw { data: 'tarefa não encontrada!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
  //Editar tarefa
  async updatetasks(taskId, task) {
  

    try {
      if (!taskId) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await task.updateOne({ _id: taskId }, task);

      if (!operationInfo.matchedCount) {
        throw { data: 'Tarefa não encontrada!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new TasksService();
