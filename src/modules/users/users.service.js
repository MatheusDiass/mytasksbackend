import User from './user.model.js';
import md5 from 'md5';
class UserService {
  async register(user) {
    const { name, email, password } = user;

    try {
      if (!name || !email || !password) {
        throw { data: 'Parâmetros passados incorretamente!', code: 400 };
      }

      //Criação do hash da senha
      const hashPassword = md5(password);
      user.password = hashPassword;

      await User.create(user);
    } catch (error) {
      throw { data: error, code: 500 };
    }
  }
}

export default new UserService();
