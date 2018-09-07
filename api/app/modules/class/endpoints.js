import { ClassController } from './class.controller';

const {
  getClass,
  addClass,
  getClasses,
  getLatestClasses,
  registerForClass,
  getStudentClasses,
  getInstructorClasses,
} = ClassController;

export default (router) => {
  router.get('/', getClasses);
  router.get('/latest', getLatestClasses);
  router.get('/student', getStudentClasses);
  router.get('/instructor', getInstructorClasses);
  router.post('/register', registerForClass);
  router.post('/new', addClass);
  router.get('/:id', getClass);
};
