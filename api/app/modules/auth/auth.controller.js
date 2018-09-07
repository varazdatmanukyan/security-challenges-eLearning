import bcrypt from 'bcrypt';
import { UserService } from '../../services';
import {
  USER_NOT_EXIST,
  UNIQUE,
  USER_ADDED,
  SUCCESSFULLY_SIGNED_IN,
  VALIDATION_ERROR,
  REQUIRED,
} from '../../../configs/messages';
import {
  NO_CONTENT_CODE,
  SUCCESS_CODE,
} from '../../../configs/status-codes';
import {
  BadRequest,
} from '../../errors';


export class AuthController {
  /**
   * This function is used to fetch a user based on the user id
   * @param {*} ctx
   */
  static async getUser(ctx) {
    if (!ctx.session.authId) {
      ctx.response.body = { user: null };
    }

    const user = await UserService.getUserById(ctx.session.authId);
    ctx.status = SUCCESS_CODE;
    ctx.response.body = { user };
  }

  /**
   * This function is used to add a user
   * @param {*} ctx
   */
  static async signUp(ctx) {
    if (!ctx.request.body || !ctx.request.body.username || !ctx.request.body.password
        || !ctx.request.body.email || !ctx.request.body.firstname || !ctx.request.body.lastname
        || !ctx.request.body.role) {
      ctx.throw(new BadRequest(VALIDATION_ERROR));
    }

    const { username, password, email, firstname, lastname, role } = ctx.request.body;

    const userByEmail = await UserService.getUserByEmail(email);
    const userByUsername = await UserService.getUserByUsername(username);

    if (userByEmail || userByUsername) {
      ctx.throw(new BadRequest(UNIQUE('User')));
    }
    const user = await UserService.addUser({ username, password, firstname, lastname, email, role });
    ctx.session.authId = user.id;
    ctx.response.body = {
      message: USER_ADDED,
      user,
    };
  }

  /**
   * This function is used to log in the user
   * @param {*} ctx
   */

  static async signIn(ctx) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.throw(new BadRequest(VALIDATION_ERROR));
    }
    const user = await UserService.getUserByUsername(username);

    const hash = user ? user.password : '$2a$10$.iffxJuK2ndwUPle5YiZ9.qNnnkPMZQ6QF4zDcIMMv4e98nhQBGym';
    const passMatch = await bcrypt.compare(password, hash);
    if (user && passMatch) {
      ctx.session.authId = user.id;

      ctx.response.body = {
        message: SUCCESSFULLY_SIGNED_IN,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    } else {
      ctx.throw(new BadRequest(USER_NOT_EXIST));
    }
  }
  /**
   * This function is used to log out the user
   * @param {*} ctx
   */

  static async logout(ctx) {
    ctx.session = null;
    ctx.status = NO_CONTENT_CODE;
  }
  /**
   * This function is used to check if the email exists in the database
   * @param {*} ctx
   */

  static async checkEmail(ctx) {
    const { email } = ctx.request.body;
    if (!email) {
      ctx.throw(new BadRequest(REQUIRED('Email')));
    }
    const user = await UserService.getUserByEmail(email);
    if (user) {
      ctx.response.body = { verified: true };
    } else {
      ctx.response.body = { verified: false };
    }
  }
  /**
   * This function is used to check if the username exists in the database
   * @param {*} ctx
   */

  static async checkUsername(ctx) {
    const { username } = ctx.request.body;
    if (!username) {
      ctx.throw(new BadRequest(REQUIRED('Username')));
    }
    const user = await UserService.getUserByUsername(username);
    if (user) {
      ctx.response.body = { verified: true };
    } else {
      ctx.response.body = { verified: false };
    }
  }
}
