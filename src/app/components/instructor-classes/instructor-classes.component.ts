import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class/class.service';
import {Component, OnInit} from '@angular/core';
import { Clazz } from '../../interfaces/class.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-instructor-classes',
  templateUrl: './instructor-classes.component.html',
  styleUrls: ['./instructor-classes.component.css']
})
export class InstructorClassesComponent implements OnInit {

  public classes: Clazz;
  public authUser: User;
  constructor(private classService: ClassService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
    this.classService.getInstructorClasses()
      .then(result => {
        this.classes = result;
        setTimeout(() => {
            for (let i = 0, len =  document.querySelectorAll('.titles').length; i < len; i++) {
              document.querySelectorAll('.titles')[i].innerHTML = this.classes[i].title;
            }
        });
      });
  }
}
