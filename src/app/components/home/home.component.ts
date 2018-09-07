import { UserService } from '../../services/user/user.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public authUser: User;
  private subscription: Subscription;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.subscription = this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
