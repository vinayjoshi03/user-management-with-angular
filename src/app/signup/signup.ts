import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PageHeader } from '../page-header/page-header';
import { UserInterface } from '../user/user-interface';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-signup',
  imports: [PageHeader,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(fb: FormBuilder) { }
  signupForm = new FormGroup({
    email: new FormGroup('', [
      Validators.required, Validators.email]
    ),
    password: new FormGroup('', [
      Validators.required, Validators.minLength(8)
    ])
  })

  signup(){
    console.log(this.signupForm.value)
  }
}
