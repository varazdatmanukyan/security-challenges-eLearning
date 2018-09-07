import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { ClassService } from '../../services/class/class.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertType } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  myForm: FormGroup;
  constructor(private classService: ClassService, private alertService: AlertService, private router: Router) {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.classService.addClass(this.myForm.value)
      .then(res => {
        this.alertService.push(AlertType.success, 'Class added successfully');
        this.router.navigate(['/instructor/classes/']);
      });
  }

}
