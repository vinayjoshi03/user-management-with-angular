import { Component, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Application } from '../services/application';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private applicationService: Application) { }
  public isUserLoggedIn = signal<boolean>(false);

  ngOnInit() {
    const useDetails = this.applicationService.getUserDetails();
    console.log('useDetails-->', useDetails)
    this.isUserLoggedIn.set(Object.keys(useDetails).length > 0)
  }

}
