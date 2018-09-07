import { ClassService } from '../../../services/class/class.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-classes',
  templateUrl: './latest-classes.component.html',
  styleUrls: ['./latest-classes.component.css']
})
export class LatestClassesComponent implements OnInit {

  public classes;
  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getLatestClasses()
      .then(result => {
        this.classes = result;
      });
  }

}
