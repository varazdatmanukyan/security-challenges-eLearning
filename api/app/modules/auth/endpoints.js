import { AuthController } from './auth.controller';

export default (router) => {
  const {
    getUser,
    signUp,
    signIn,
    logout,
    checkEmail,
    checkUsername,
  } = AuthController;


  router.get('/me', getUser);
  router.post('/sign-up', signUp);
  router.post('/sign-in', signIn);
  router.get('/logout', logout);
  router.post('/check-email', checkEmail);
  router.post('/check-username', checkUsername);
};
