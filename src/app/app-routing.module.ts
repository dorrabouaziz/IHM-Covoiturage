import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';
import { HomeComponent } from './home/home.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:AnnonceFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    pathMatch: 'full',
    component:AnnonceFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'liste-annonce',
    pathMatch: 'full',
    component:ListeAnnonceComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    pathMatch: 'full',
    component:HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path: 'adminview',
    pathMatch: 'full',
    component:AdminviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'annonces',
    pathMatch: 'full',
    component:AnnoncesComponent,
    canActivate: [authGuard]
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
