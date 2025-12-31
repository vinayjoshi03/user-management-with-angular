import { Injectable, signal } from '@angular/core';
import { appConstants } from '../../appConstants';

@Injectable({
  providedIn: 'root',
})
export class Application {

  private _userDetails = signal<any>(null);

  userDetails = this._userDetails.asReadonly();

  saveUserDetails(data: object = {}) {
    this._userDetails.set(data);
    localStorage.setItem(
      appConstants.LOCAL_STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  loadUserFromStorage() {
    const stored = localStorage.getItem(appConstants.LOCAL_STORAGE_KEY);
    if (stored) {
      this._userDetails.set(JSON.parse(stored));
    }
  }

  isUserLoggedIn(): boolean {
    return Object.keys(this._userDetails()).length<=0 || this._userDetails() === null? false: true;
  }

  getUserDetails(): any {
    return this._userDetails();
  }

  logout() {
    this._userDetails.set(null);
    localStorage.removeItem(appConstants.LOCAL_STORAGE_KEY);
  }
}
