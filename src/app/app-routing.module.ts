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
import { AnnoncesCovComponent } from './annonces-cov/annonces-cov.component';
import { AnnoncesResComponent } from './annonces-res/annonces-res.component';



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
    
  },
  {
    path: 'create',
    pathMatch: 'full',
    component:AnnonceFormComponent,
    
  },
  {
    path: 'liste-annonce',
    pathMatch: 'full',
    component:ListeAnnonceComponent,
    
  },
  {
    path: 'annonces-res',
    pathMatch: 'full',
    component:AnnoncesResComponent,
    
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
    
  },
  {
    path: 'annonces',
    pathMatch: 'full',
    component:AnnoncesComponent,
   
  },
  {
    path: 'annonces-cov',
    pathMatch: 'full',
    component:AnnoncesCovComponent,
   
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
