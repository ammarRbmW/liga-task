import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.scss']
})
export class LoginComponent implements OnInit {
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
      username: [null, Validators.compose([Validators.email, Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
    });
  }


  submit() {
    this.isSubmitting = true;
    const data = this.form.value;
    const res = this.userService.login(data);
    if (res.status) {
      this.snackBar.open(
        res.message, 'success',
        {
          duration: 2000,
        });
      this.router.navigateByUrl('/articles');

    } else {
      this.snackBar.open(
        res.message, 'Error',
        {
          duration: 2000,
        });
    }
  }
}
