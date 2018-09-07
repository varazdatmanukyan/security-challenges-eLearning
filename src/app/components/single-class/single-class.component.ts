import { AlertService } from '../../services/alert/alert.service';
import { AlertType } from '../../interfaces/alert.interface';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user.interface';
import { ClassService } from '../../services/class/class.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clazz } from '../../interfaces/class.interface';
import {Subscription} from 'rxjs/Rx';


@Component({
  selector: 'app-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.css']
})
export class SingleClassComponent implements OnInit, OnDestroy {

  public class: Clazz;
  public authUser: User;
  private subscription: Subscription;

  constructor(private classService: ClassService, private userService: UserService,
    private activatedRoute: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
    const classId: string = this.activatedRoute.snapshot.params.id;
    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.subscription = this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
    this.classService.getClassInfo(classId)
      .then(res => {
        this.class = res;
      });
  }

  registerForClass() {
    this.classService.registerForClass(this.class.id)
      .then(res => {
        this.class.isRegistered = true;
        this.alertService.push(AlertType.success, 'Registered Successfully');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
