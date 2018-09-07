import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Response } from '@angular/http/src/static_response';
import { Role } from '../../shared/enums';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  @Input()
  authUser: User;
  Role = Role;
  constructor(private userService: UserService, private router: Router) { }

  logout(): void {
    this.userService.logout()
      .then((res: Response) => {
        this.router.navigateByUrl(this.router.url as string);
      });
  }

}
