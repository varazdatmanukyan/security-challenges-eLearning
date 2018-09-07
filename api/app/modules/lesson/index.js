import Router from 'koa-router';
import endpoints from "./endpoints";


export class LessonModule {
  apiRouter;
  router;
  constructor(apiRouter) {
    this.apiRouter = apiRouter;
    this.router = new Router();
  }

  createEndpoints() {
    this.assignEndpoints();
    this.assignRouter();
  }

  assignEndpoints() {
    endpoints(this.router);
  }

  assignRouter() {
    this.apiRouter.use('/api/lessons', this.router.routes());
  }
}
