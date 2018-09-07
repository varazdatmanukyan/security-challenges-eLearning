import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson/lesson.service';
import { AlertType } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {
  myForm: FormGroup;
  constructor(private lessonService: LessonService, private alertService: AlertService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.min(1)]),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.lessonService.addLesson({...this.myForm.value, classId: this.activatedRoute.snapshot.params.id})
      .then(res => {
        this.alertService.push(AlertType.success, 'Lesson added successfully');
        this.router.navigate(['/instructor/classes']);
      });
  }

}
