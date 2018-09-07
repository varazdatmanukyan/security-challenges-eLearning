import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class/class.service';
import { Component, OnInit } from '@angular/core';
import { Clazz } from '../../interfaces/class.interface';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  public classes: Clazz;
  public authUser: User;
  constructor(private classService: ClassService, private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
    this.classService.getAllClasses()
      .then(result => {
        this.classes = result;
      });
  }

}
