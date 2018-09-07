import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { AlertType } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;


  constructor(private userService: UserService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.userService.signIn(this.loginForm.value)
      .then((res: Response) => {
        this.router.navigateByUrl(this.router.url);
        this.alertService.push(AlertType.success, 'Successfully logged in');
      }).catch((err: Error) => {
        this.alertService.push(AlertType.error, err.message);
      });
  }

}
