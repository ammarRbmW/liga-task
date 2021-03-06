import {Component, OnInit} from '@angular/core';
import {UserService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'liga-task';

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.populate();
  }
}
