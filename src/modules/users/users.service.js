import User from './user.model.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
class UserService {
  //Realiza o cadastro do usuário
  async register(user) {
    const { name, email, password } = user;

    try {
      if (!name || !email || !password) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      //Criação do hash da senha
      const hashPassword = md5(password);
      user.password = hashPassword;

      //Realiza o cadastro do usuário
      await User.create(user);

      //Criação do token
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '2000' }
      );

      const id = user._id.toString();

      const userData = {
        id,
        name: user.name,
        email: user.email,
        token,
      };

      return userData;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Realiza o login do usuário
  async login(user) {
    const { email, password } = user;

    try {
      //Busca as informações do usuário
      const user = await User.findOne({ email });

      //Caso o usuário não for encontrado é gerado um erro
      if (!user) {
        throw { data: 'Email não cadastrado!', code: 400 };
      }

      //Criação do hash da senha
      const hashPassword = md5(password);

      /*Caso a senha do usuário não for igual a do banco de dados
      é gerado um erro */
      if (user.password !== hashPassword) {
        throw { data: 'Senha incorreta!', code: 400 };
      }

      //Criação do token
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '2000' }
      );

      const id = user._id.toString();

      const userData = {
        id,
        name: user.name,
        email: user.email,
        token,
      };

      return userData;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Obtém todos os usuários
  async fetchUsers() {
    try {
      const users = await User.find().select('name email');

      return users;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Atualiza as informações de um usuário
  async updateUser(id, user) {
    const { name, email, password } = user;

    try {
      if (!id || !name || !email || !password) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await User.updateOne({ _id: id }, user);

      if (!operationInfo.matchedCount) {
        throw { data: 'Usuário não encontrado!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Busca todos os amigos
  async fetchFriends(userId) {
    try {
      if (!userId) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const { friends } = await User.findOne({ _id: userId }).select('friends');

      const friendsData = await User.find({ _id: { $in: friends } });

      return friendsData;
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Adiciona um amigo
  async addFriend(userId, friendId) {
    try {
      if (!userId || !friendId) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await User.updateOne(
        { _id: userId },
        {
          $push: { friends: friendId },
        }
      );

      if (!operationInfo.matchedCount) {
        throw { data: 'Usuario não encontrado!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }

  //Deleta um amigo
  async deleteFriend(userId, friendId) {
    try {
      if (!userId || !friendId) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      const operationInfo = await User.updateOne(
        { _id: userId },
        {
          $pull: { friends: friendId },
        }
      );

      if (!operationInfo.matchedCount) {
        throw { data: 'Usuario não encontrado!', code: 400 };
      }
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new UserService();
