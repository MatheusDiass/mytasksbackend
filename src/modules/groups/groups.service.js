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

  //Atualiza as informações de um grupo de tarefas
  async updateGroups(id, group) {
    const { name } = group;

    try {
      if (!id || !name) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await Group.updateOne({ _id: id }, group);

      if (!operationInfo.matchedCount) {
        throw { data: 'Grupo não encontrado!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new GroupService();
