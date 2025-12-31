import { Component, signal, effect } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Application } from '../services/application';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userData: any = null;
  isLoggedIn = false;
  public isUserLoggedIn = signal<boolean>(false);
  constructor(private applicationService: Application) {
    effect(() => {
      const useDetails = this.applicationService.getUserDetails();
      console.log('useDetails-->', useDetails)
      this.userData = useDetails;
      this.isUserLoggedIn.set(this.applicationService.isUserLoggedIn());
    })
  }
}
