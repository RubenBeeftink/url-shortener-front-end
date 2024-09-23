import {Routes} from '@angular/router';
import {LoginPage} from "./pages/authentication/login/login.page";
import {RegisterPage} from "./pages/authentication/register/register.page";
import {ShortUrlIndexPage} from "./pages/short-url/index/short-url-index.page";
import {ShortUrlDetailPage} from "./pages/short-url/detail/short-url-detail.page";

export const routes: Routes = [
  {
    path: '',
    component: ShortUrlIndexPage,
  },
  {
    path: 'short-url/detail',
    component: ShortUrlDetailPage,
  },
  {
    path: 'short-url/detail/:id',
    component: ShortUrlDetailPage,
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
