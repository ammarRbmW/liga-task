import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../../core/services';
import {User} from '../../../../core/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  isSubmitting = false;
  currentUser: User;

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
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.form.patchValue(this.currentUser);

      }
    );
  }


  submit() {
    this.isSubmitting = true;
    const data = this.form.value;
    console.log(data);
    const res = this.userService.update(data);
    if (res) {
      this.snackBar.open(
        'Profile Updated Successfully.', 'success',
        {
          duration: 2000,
        });
    } else {
      this.snackBar.open(
        'Something was wrong', 'Error',
        {
          duration: 2000,
        });
    }
  }

}
