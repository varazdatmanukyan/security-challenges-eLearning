import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AlertType, Alert } from '../../interfaces/alert.interface';


@Injectable()
export class AlertService {
  public alertSubject: Subject<Alert> =  new Subject<Alert>();

  public push(type: AlertType, message: string): void {
    this.alertSubject.next({ type, message });
  }
}
