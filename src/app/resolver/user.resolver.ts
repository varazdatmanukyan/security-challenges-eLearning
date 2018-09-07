import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user/user.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService) { }

  resolve(): Observable<any> {
    return this.userService.getUser().catch(() => {
      return Observable.of(null);
    });
  }

}
