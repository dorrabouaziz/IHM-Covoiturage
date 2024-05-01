import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Accueil', icon: 'pi pi-fw pi-home' },
            { label: 'Recherche', icon: 'pi pi-fw pi-search' },
            { label: 'Annonce', icon: 'pi pi-fw pi-table' },
            { label: 'Connexion', icon: 'pi pi-fw pi-users' },
            { label: 'Inscription', icon: 'pi pi-fw pi-user-plus' }
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
        if (event.label === 'Recherche') { 
          this.router.navigate(['/liste-annonce']);
        }
        if (event.label === 'Accueil') { 
          this.router.navigate(['/home']);
        }
        if (event.label === 'Annonce') { 
          this.router.navigate(['/adminview']);
        }
        if (event.label === 'Connexion') { 
          this.router.navigate(['/login']);
        }
        if (event.label === 'Inscription') { 
          this.router.navigate(['/register']);
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
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}


    