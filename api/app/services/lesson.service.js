import models from '../../database/models';

export class LessonService {
  static async addLesson(data) {
    return models.Lesson.create(data);
  }

  static async getLessons(classId) {
    return models.Lesson.scope('public').findAll({
      where: { class_id: classId },
      order: [['number', 'ASC']] });
  }
}
