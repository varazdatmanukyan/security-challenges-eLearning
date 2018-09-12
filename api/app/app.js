import Koa from 'koa';
import Router from 'koa-router';
import enableModules from './modules';
import koaMorgan from 'koa-morgan';
import cors from 'koa2-cors';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import session from 'koa-session';

const bodyParser = require('koa-bodyparser');

class Application {
  app;
  router;
  constructor(){
    this.app = new Koa();
    this.initApp();
  }

  initApp(){
    this.configApp();
    this.setRouter();
    this.setErrorHandler();
    this.enableModules();
  }

  configApp(){
    this.app.use(koaMorgan('combined', { stream: process.stdout } ));
    this.app.use(bodyParser());
    this.app.use(cors({
      origin: "http://localhost:4200",
      credentials: true,
      allowMethods: ['GET', 'POST']
    }));
    this.app.use(conditional());
    this.app.use(etag());
    this.app.keys = ['some secret hurr'];
    this.app.use(session({
      signed: true,
    },this.app));

  }
  setRouter(){
    this.router = new Router();
  }
  setErrorHandler(){
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
          message: err.message
        };
      }
    });
  }

  enableModules(){
    enableModules(this.router);
    this.app.use(this.router.routes())
      .use(this.router.allowedMethods());
  }
}

export const App = new Application().app;
