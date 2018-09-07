import { ClassService } from '../../services/class/class.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Clazz } from '../../interfaces/class.interface';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit, OnDestroy {

  public classes: Clazz;
  public authUser: User;
  private subscription: Subscription;

  constructor(private classService: ClassService, private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.subscription = this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
    this.classService.getStudentClasses()
      .then(result => {
        this.classes = result;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
