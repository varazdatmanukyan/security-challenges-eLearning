import { AlertService } from '../../services/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidation } from '../../vaildators';
import { AlertType } from '../../interfaces/alert.interface';
import { User } from '../../interfaces/user.interface';

const {
  match, unique
} = CustomValidation;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  authUser: User;

  constructor(private userService: UserService, private router: Router,
    private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.authUser = this.activatedRoute.snapshot.data.authUser;
    this.userService.userChange.subscribe((user: User) => {
      this.authUser = user;
    });


    this.myForm = new FormGroup({
      firstname: new FormControl('', [Validators.required,
          Validators.pattern('^[a-zA-Z]+')]),
      lastname: new FormControl('', [Validators.required,
          Validators.pattern('^[a-zA-Z]+')]),
      username: new FormControl('', [Validators.required,
          unique.bind(null, this, 'username')]),
      email: new FormControl('', [Validators.required,
          Validators.email, unique.bind(null, this, 'email')]),
      password: new FormControl('', [Validators.required,]),
      confirmPassword: new FormControl('', [Validators.required,
          match.bind(null, this, 'password', 'confirmPassword')]),
      role: new FormControl('S', Validators.required)
    });
  }

  onSubmit(): void {
    this.userService.signUp(this.myForm.value)
      .then(res => {
        this.router.navigate(['/']);
        this.alertService.push(AlertType.success, 'Successfully registered');
      }).catch(err => {
        this.alertService.push(AlertType.error, err.message);
      });
  }

}
