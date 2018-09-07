import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public authUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userChange.subscribe((user: User) => {
        this.authUser = user;
    });
  }

}
