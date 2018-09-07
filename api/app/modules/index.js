import { AuthModule } from './auth';
import { ClassModule } from './class';
import { LessonModule } from './lesson';

export default (router) => {
  const auth = new AuthModule(router);
  const clazz = new ClassModule(router);
  const lesson = new LessonModule(router);

  const modules = [
    auth,
    clazz,
    lesson,
  ];

  modules.forEach(module => module.createEndpoints());
};
