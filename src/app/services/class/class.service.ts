import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Clazz } from '../../interfaces/class.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClassService {

  constructor(private http: HttpClient) { }
  addClass(data: Clazz): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/classes/new`, data)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }
  getLatestClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/classes/latest`)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }

  getStudentClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/classes/student`)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }

  getInstructorClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/classes/instructor`)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }

  getAllClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/classes`)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }

  getClassInfo(classId: string): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/classes/${classId}`)
        .subscribe(resp => {
          resolve(resp);
        }, err => {
          reject(err);
        });
    });
  }
  registerForClass(classId: string): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/classes/register`, { classId })
      .subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });
    });
  }
}
