
import { LessonController } from './lesson.controller';

const {
  addLesson,
  getLessons,
} = LessonController;


export default (router) => {
  router.get('/', getLessons);
  router.post('/add', addLesson);
};
