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
      if (this.isLoggedIn) {
        if (event.label === 'Connexion') {
          this.router.navigate(['/login']);
        }
        if (event.label === 'Inscription') {
          this.router.navigate(['/register']);
        }
        if (event.label === 'Recherche') {
          this.router.navigate(['/liste-annonce']);
        }
        if (event.label === 'Accueil') {
          this.router.navigate(['/home']);
        }
        if (event.label === 'Annonce') {
          this.router.navigate(['/adminview']);
        }
        if (event.label === 'Logout') { // Add this condition
          this.logOut();
        }
      }
    }


    activateLast() {
        this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    }

  title = 'covoiturages';
  isLoggedIn = false;

  constructor(private router: Router, public authService: AuthService) {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.user = sessionStorage.getItem('email');
      this.updateMenuItems();
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  updateMenuItems() {
    this.items = [
      { label: 'Accueil', icon: 'pi pi-fw pi-home' },
      { label: 'Recherche', icon: 'pi pi-fw pi-search' },
      { label: 'Annonce', icon: 'pi pi-fw pi-table' },
      { label: 'Connexion', icon: 'pi pi-fw pi-users' },
      { label: 'Inscription', icon: 'pi pi-fw pi-user-plus' },
      { label: 'Logout', icon: 'pi pi-fw pi-power-off' },
      { label: `Bonjour, ${this.user}`, icon: 'pi pi-fw pi-user' } // Add this line
    ];
  }
}


