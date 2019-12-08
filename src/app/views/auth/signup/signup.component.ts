import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.scss']
})
export class SignupComponent implements OnInit {

  isSubmitting = false;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      username: [null, Validators.compose([Validators.email, Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
    });
  }


  submit() {
    this.isSubmitting = true;
    const data = this.form.value;
    const res = this.userService.signUp(data);
    if (res) {
      this.router.navigateByUrl('/auth/login');
      this.snackBar.open(
        'Your account created successfully', 'Success',
        {
          duration: 2000,
        });

    } else {
      this.snackBar.open(
        'username already exists', 'Error',
        {
          duration: 2000,
        });
    }
  }

}
