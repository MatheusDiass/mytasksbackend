import Group from './group.model.js';

class GroupService {
  //Adiciona um grupo de tarefas
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

  //Obtém todos os grupos de tarefas
  async fetchGroups() {
    try {
      const groups = await Group.find();

      return groups;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new GroupService();
