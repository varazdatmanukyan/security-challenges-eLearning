import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson/lesson.service';
import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../interfaces/lesson.interface';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  public lessons: Array<Lesson> = [];
  constructor(private lessonService: LessonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lessonService.getLessonsofClass(this.activatedRoute.snapshot.params.id)
      .then(res => {
        this.lessons = res;
      });
  }

}
