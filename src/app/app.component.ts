import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import { MenuItem } from 'primeng/api/menuitem';
import {User} from "./interfaces/auth";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;
    user!: any;

  ngOnInit() {
    this.updateMenuItems();
    this.activeItem = this.items![0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    if (event.routerLink) {
      this.router.navigate([event.routerLink]);
    } else if (event.label === 'Logout') {
      this.logOut();
    }
  }


    activateLast() {
        this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    }

  title = 'covoiturages';
  isLoggedIn = false;

  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  constructor(private router: Router, public authService: AuthService) {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
      } else {
        this.user = null;
      }
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    if (!this.isLoggedIn) {
      // Si l'utilisateur n'est pas connecté, afficher les pages de connexion et d'inscription
      this.items = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: '/home' },
        { label: 'Recherche', icon: 'pi pi-fw pi-search', routerLink: '/liste-annonce' },
        { label: 'Annonce', icon: 'pi pi-fw pi-table', routerLink: '/adminview' },
        { label: 'Connexion', icon: 'pi pi-fw pi-users', routerLink: '/login' },
        { label: 'Inscription', icon: 'pi pi-fw pi-user-plus', routerLink: '/register' }
      ];
    } else {
      // Si l'utilisateur est connecté, afficher les pages pour l'utilisateur connecté
      this.items = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: '/home' },
        { label: 'Recherche', icon: 'pi pi-fw pi-search', routerLink: '/annonces-cov' },
        { label: 'Annonces', icon: 'pi pi-fw pi-table', routerLink: '/adminview' },
        { label: 'Ajouter annonce', icon: 'pi pi-fw pi-plus', routerLink: '/create' },
        { label: 'Mes annonces', icon: 'pi pi-fw pi-table', routerLink: '/annonces' },
        { label: `Bonjour, ${this.user.fullName}`, icon: 'pi pi-fw pi-user' },
        { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logOut() }
      ];
    }
  }
  
}


