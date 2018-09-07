import { AlertService } from '../../services/alert/alert.service';
import { Component } from '@angular/core';
import { AlertType, Alert } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.alertSubject.subscribe((alert: Alert) => {
      this.alerts.push(alert);
      setTimeout(() => {
        this.removeAlert(alert);
      }, 3000);
    });
  }

  removeAlert(alert: Alert): void {
    this.alerts = this.alerts.filter(item => {
      return item !== alert;
    });
  }
  changeClass(alert: Alert): string {
    switch (alert.type) {
      case AlertType.success:
        return 'alert alert-success';
      case AlertType.error:
        return 'alert alert-danger';
    }
  }
}
