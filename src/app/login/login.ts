import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../page-header/page-header';
import { ShowError } from '../show-error/show-error';
import { appConstants } from "../../appConstants";
import { apiRequest, setLocalStorageWithExpiry, unsetLocalStorage } from '../Utils/utilities';
import { LoginResponse } from '../models/login-response.model';

import { Router } from '@angular/router';
import { Application } from '../services/application';
import { variationPlacements } from '@popperjs/core';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    PageHeader,
    ReactiveFormsModule,
    ShowError
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  loginFormBuilder: any;
  constructor(
    //private message: string, 
    private router: Router,
    private applicationService: Application,
    private fb: FormBuilder
  ) {
    this.applicationService.saveUserDetails({});
    unsetLocalStorage(appConstants.LOCAL_STORAGE_KEY)
    this.invalidRequestError.set({ ...this.invalidRequestError(), error: false, success: false });
    this.loginFormBuilder = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  errorMessages: any = {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
  };
  invalidRequestError = signal({ error: false, success: false });
  submitted = false;
  async onSubmit() {
    this.invalidRequestError.set({ ...this.invalidRequestError(), error: false, success: false });
    this.submitted = true;
    if (this.loginFormBuilder.valid) {
      const response: LoginResponse = await apiRequest(appConstants.API.LOGIN, { ...this.loginFormBuilder.value }, "POST")
      if (response.statusCode !== 200) {
        console.log(this.loginFormBuilder.get('email').errors)
        this.loginFormBuilder.markAllAsTouched(); // 🔥 THIS FIXES IT
        this.invalidRequestError.set({ ...this.invalidRequestError(), error: true, success: false });
        return;
      } else {
        this.invalidRequestError.set({ ...this.invalidRequestError(), error: false, success: false });
        this.applicationService.saveUserDetails(response.data);
        //setLocalStorageWithExpiry(appConstants.LOCAL_STORAGE_KEY, "10", 2)
        this.router.navigate(['dashboard']);
      }
    } else {
      console.log(this.loginFormBuilder.get('email').errors)
      this.loginFormBuilder.markAllAsTouched(); // 🔥 THIS FIXES IT
      return;
    }
  }
  getErrorMessage(controlName: string): string | null {
    const control = this.loginFormBuilder.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;
    const messages = this.errorMessages[controlName];

    const firstKey = Object.keys(errors)[0];
    return messages[firstKey];
  }

}
