import { ClassService } from '../../services';
import {
  BadRequest,
  Unauthorized,
  Forbidden,
} from '../../errors';

import {
  REGESTERED_FOR_CLASS,
  ROLE,
  CLASS_ADDED,
  VALIDATION_ERROR,
  NOT_EXISTS,
  REQUIRED,
} from '../../../configs/messages';
import {
  CREATED_CODE,
  SUCCESS_CODE,
} from '../../../configs/status-codes';
import { UserService } from '../../services/user.service';


export class ClassController {
  /**
   * This function is used to add a class
   * @param {*} ctx
   */
  static async addClass(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const { authId } = ctx.session;
    const user = await UserService.getUserById(authId);
    if (!user || user.role !== ROLE.instructor) {
      ctx.throw(new Forbidden());
    }
    if (!ctx.request.body || !ctx.request.body.title || !ctx.request.body.description) {
      ctx.throw(new BadRequest(VALIDATION_ERROR));
    }
    const { title, description } = ctx.request.body;
    await ClassService.addClass({ title, description, instructor_id: authId });
    ctx.status = CREATED_CODE;
    ctx.response.body = { message: CLASS_ADDED };
  }

  /**
   * This function is used to get all classes
   * @param {*} ctx
   */

  static async getClasses(ctx) {
    const result = await ClassService.getAllClasses();
    ctx.status = SUCCESS_CODE;
    ctx.response.body = result;
  }

  /**
   * This function is used to get latest classes (creation date not earlier than 3 days ago)
   * @param {*} ctx
   */

  static async getLatestClasses(ctx) {
    const result = await ClassService.getLatestClasses();
    ctx.status = SUCCESS_CODE;
    ctx.response.body = result;
  }

  /**
   * This function is used to get all classes
   * @param {*} ctx
   */

  static async getInstructorClasses(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const user = await UserService.getUserById(ctx.session.authId);
    if (!user || user.role !== ROLE.instructor) {
      ctx.throw(new Forbidden());
    }
    const classes = await ClassService.getInstructorClasses(user);
    ctx.status = SUCCESS_CODE;
    ctx.response.body = classes;
  }


  static async getStudentClasses(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const user = await UserService.getUserById(ctx.session.authId);
    if (!user || user.role !== ROLE.student) {
      ctx.throw(new Forbidden());
    }
    const classes = await ClassService.getStudentClasses(user);
    ctx.status = SUCCESS_CODE;
    ctx.response.body = classes;
  }

  /**
   * This function is used to get a single class by its id
   * @param {*} ctx
   */
  static async getClass(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.throw(new BadRequest(REQUIRED('Class id')));
    }
    const clazz = await ClassService.getClassById(id);
    if (!clazz) {
      ctx.throw(new BadRequest(NOT_EXISTS('class')));
    }
    const { authId } = ctx.session;
    let isRegistered = false;

    if (authId) {
      const user = await UserService.getUserById(authId);
      isRegistered = await ClassService.isUserRegisteredForClass(user, clazz);
    }
    ctx.status = SUCCESS_CODE;
    ctx.response.body = Object.assign({}, clazz.toJSON(), { isRegistered });
  }
  /**
   * This function is used to register the student for the class
   * @param {*} ctx
   */

  static async registerForClass(ctx) {
    if (!ctx.session.authId) {
      ctx.throw(new Unauthorized());
    }
    const user = await UserService.getUserById(ctx.session.authId);
    if (user.role !== ROLE.student) {
      ctx.throw(new Forbidden());
    }
    if (!ctx.request.body || !ctx.request.body.classId) {
      ctx.throw(new BadRequest(REQUIRED('classId')));
    }
    const clazz = await ClassService.getClassById(ctx.request.body.classId);
    if (!clazz) {
      ctx.throw(new BadRequest(NOT_EXISTS('Class')));
    }
    await UserService.addRegisterClass(user, clazz);
    ctx.status = SUCCESS_CODE;
    ctx.response.body = { message: REGESTERED_FOR_CLASS };
  }
}
