import { BadRequest, Unauthorized, Forbidden } from '../../errors';
import { ClassService } from '../../services/class.service';
import { LessonService } from '../../services/lesson.service';
import {
  LESSON_ADDED,
  REQUIRED,
  VALIDATION_ERROR,
  NOT_EXISTS,
  ROLE,
} from '../../../configs/messages';
import { UserService } from '../../services/user.service';
import { CREATED_CODE, SUCCESS_CODE } from '../../../configs/status-codes';

export class LessonController {
  /**
   * This function is used to get a single class by its id
   * @param {*} ctx
   */
  static async addLesson(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const user = await UserService.getUserById(ctx.session.authId);
    if (!user || user.role !== ROLE.instructor) {
      ctx.throw(new Forbidden());
    }
    if (!ctx.request.body || !ctx.request.body.classId) {
      ctx.throw(new BadRequest(REQUIRED('Class id')));
    }
    if (!ctx.request.body.number || !ctx.request.body.title || !ctx.request.body.body) {
      ctx.throw(new BadRequest(VALIDATION_ERROR));
    }
    const { classId, number, title, body } = ctx.request.body;
    const clazz = await ClassService.getClassById(classId);
    if (!clazz) {
      ctx.throw(new BadRequest(NOT_EXISTS('Class')));
    }
    await LessonService.addLesson({ class_id: classId, number, title, body });
    ctx.status = CREATED_CODE;
    ctx.response.body = { message: LESSON_ADDED };
  }

  /**
   * This function is used to get lessons by class id
   * @param {*} ctx
   */
  static async getLessons(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const { authId } = ctx.session;
    if (!ctx.request.query.classId) {
      ctx.throw(new BadRequest(REQUIRED('Class id')));
    }
    const { classId } = ctx.request.query;
    const user = await UserService.getUserById(authId);
    const clazz = await ClassService.getClassById(classId);
    if (!clazz) {
      ctx.throw(new BadRequest(NOT_EXISTS('Class')));
    }
    const isRegistered = await ClassService.isUserRegisteredForClass(user, clazz);
    if (!isRegistered && clazz.instructor_id !== authId) {
      ctx.throw(new Forbidden());
    }
    const lessons = await LessonService.getLessons(classId);
    ctx.status = SUCCESS_CODE;
    ctx.response.body = lessons;
  }
}
