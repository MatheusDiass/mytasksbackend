import Group from './group.model.js';

class GroupService {
  //Adiciona um grupo de tarefas
  async addGroup(group) {
    const { name, userId } = group;

    try {
      if (!userId || !name) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      await Group.create(group);
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Obtém todos os grupos de tarefas
  async fetchGroups(userId) {
    try {
      const groups = await Group.find({ userId });

      return groups;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Atualiza as informações de um grupo de tarefas
  async updateGroup(id, group) {
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

    //Deleta um grupo de tarefas
    async deleteGroup(id) {
      try {
        if (!id) {
          throw { data: 'Parâmetros passados incorretamente!', code: 400 };
        }
  
        const operationInfo = await Group.deleteOne({ _id: id });
  
        if (!operationInfo.deletedCount) {
          throw { data: 'Grupo não encontrado!', code: 400 };
        }
      } catch (error) {
        throw { data: error, code: 500 };
      }
    }
}

export default new GroupService();
