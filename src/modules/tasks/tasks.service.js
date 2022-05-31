import Task from './task.model.js';

class TasksService {
  async addGroup(task) {
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

  //Obtém todas as tarefas
  async fetchTasks(userId) {
    try {
      const tasks = await Task.find({ userId });

      return tasks;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Editar tarefa
  async updateTask(id, task) {
    try {
      if (!id) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await Task.updateOne({ _id: id }, task);

      if (!operationInfo.matchedCount) {
        throw { data: 'Tarefa não encontrada!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Deletar tarefa
  async deleteTask(id) {
    try {
      if (!id) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await Task.deleteOne({ _id: id });

      if (!operationInfo.deletedCount) {
        throw { data: 'tarefa não encontrada!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new TasksService();
