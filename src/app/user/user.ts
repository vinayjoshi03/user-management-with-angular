import { Component } from '@angular/core';
import {Application} from '../services/application'
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  constructor(
    private router: Router,
    private applicationService: Application,){
    if(!applicationService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
