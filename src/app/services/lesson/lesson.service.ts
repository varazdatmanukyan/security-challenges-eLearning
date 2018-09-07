import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonService {

  constructor(private http: HttpClient) { }

   addLesson(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.host}/api/lessons/add`, data)
      .subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
   }

   getLessonsofClass(classId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.host}/api/lessons?classId=${classId}`)
      .subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
   }

}
