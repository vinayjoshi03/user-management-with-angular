import { Routes } from '@angular/router';
import { Login } from './login/login';
import { App } from './app';
import { Signup } from './signup/signup';
import { User } from './user/user';
import { Testdata } from './testmodule/testdata';

export const routes: Routes = [
    {
        path:'module-example',
        component: Testdata
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'signup',
        component: Signup
    },
    {
        path:'',
        redirectTo: 'login',
        //component: Login,
        pathMatch: 'full'
    },
    {
        path:'dashboard',
        //redirectTo: 'dashboard',
        component: User,
        pathMatch: 'full'
    },
    
];
