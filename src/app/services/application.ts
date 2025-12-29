import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Application {
  private data: object={};

  public saveUserDetails = (data:object={}) =>{
    this.data = data;
  }

  public getUserDetails: any|object=()=>{
    return this.data || {};
  }
  
}
