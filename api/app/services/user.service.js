import models from '../../database/models';

export class UserService {
  static async getUserByEmail(email) {
    return models.User.findOne({ where: { email } });
  }

  static async getUserByUsername(username) {
    return models.User.findOne({ where: { username } });
  }

  static async getUserById(id) {
    return models.User.scope('public').findOne({
      where: { id },
    });
  }

  static async addRegisterClass(user, clazz) {
    return user.addRegisteredClass(clazz);
  }

  static async addUser(data) {
    return models.User.scope('public').create(data);
  }
}
