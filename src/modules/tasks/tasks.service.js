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
}

export default new TasksService();
