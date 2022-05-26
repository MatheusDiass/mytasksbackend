import Group from './group.model.js';

class GroupService {
  //Adiciona o grupo de tarefas
  async save(group) {
    const { name } = group;
    try {
      if (!name) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      await Group.create(group);
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new GroupService();
