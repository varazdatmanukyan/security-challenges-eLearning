import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {


  userChange: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(`${environment.host}/api/auth/me`)
      .map(res => {
        this.userChange.next(res['user']);
        return res;
      });
  }



  signIn(data: { username: string, password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/auth/sign-in`, data)
        .subscribe(res => {
          this.userChange.next(res['user']);
          resolve(res);
        }, err => {
          reject(err.json());
        });
    });
  }

  signUp(data: User): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/auth/sign-up`, data)
        .subscribe(res => {
          this.userChange.next(res['user']);
          resolve(res);
        }, err => {
          reject(err.json());
        });
    });
  }

  logout(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/auth/logout`)
        .subscribe(res => {
        this.userChange.next(null);
          resolve(res);
        }, err => {
          reject(err.json());
        });
    });
  }

  checkUnique(field: string, value: string): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/auth/check-${field}`, { [field]: value })
      .subscribe(res => {
        if (res['verified']) {
          resolve({ uniqueErr: 'not unique' });
        } else {
          resolve(null);
        }
      });
    });
  }
}
