import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req, next) {
    return next.handle(req)
      .catch(error => {
        if (error.status === 401 || error.status === 403 || error.status === 400) {
            return this.router.navigate(['/']);
        }
        return Observable.throw(error);
      });
  }
}
