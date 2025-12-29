import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from './header/header';
import { Application } from './services/application';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // <-- needed for *ngIf
    FormsModule,
    RouterOutlet,
    Header,  
    RouterOutlet, 
    ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private fb: NonNullableFormBuilder, 
    private router: Router,
    private applicationService: Application) {
    
  }
  ngOnInit(){
    if(
      Object.keys(this.applicationService.getUserDetails()).length>0
    ){
      //this.router.navigate(['dashboard']);
    } else {
      //this.router.navigate(['login']);
    }
  }

  
  protected readonly title = signal('user-management-with-angular');
}
