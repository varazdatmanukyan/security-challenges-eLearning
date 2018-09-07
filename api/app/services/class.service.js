import models from '../../database/models';

export class ClassService {
  static async addClass(data) {
    return models.Class.create(data);
  }

  static async getAllClasses() {
    return models.Class.scope('public').findAll({ include: [{ model: models.User, as: 'Instructor' }] });
  }

  static async getClassById(id) {
    return models.Class.scope('public').findById(
      id,
      {
        include: [
          { model: models.User, as: 'Instructor', attributes: ['firstname', 'lastname'] },
          { model: models.Lesson.scope('public') },
        ],
        order: [[models.Lesson, 'number', 'ASC']],
      },
    );
  }

  static async getLatestClasses() {
    return models.Class.scope('public').findAll({
      include: [{ model: models.User, as: 'Instructor' }],
      order: [['created_at', 'DESC']],
      limit: 3 });
  }

  static async isUserRegisteredForClass(user, clazz) {
    return user.hasRegisteredClass(clazz);
  }

  static async getStudentClasses(user) {
    return user.getRegisteredClasses({
      include: [{
        model: models.User, as: 'Instructor', attributes: ['firstname', 'lastname'] }],
      attributes: ['id', 'title', 'description'],
    });
  }

  static async getInstructorClasses(user) {
    return user.getClasses({
      attributes: ['id', 'title', 'description'],
    });
  }
}
