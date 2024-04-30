import { Component,OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  annonces!: AnnonceCovoiturage[]; // Declare 'annonces' property
  annonce!:AnnonceCovoiturage;

  constructor(private annonceService: AnnonceService) { }
  ngOnInit(): void {
    this.annonceService.recupererAnnonces()
      .pipe(
        map((annonces: AnnonceCovoiturage[]) =>
          annonces.filter((annonce) => annonce.placesDisponibles> 0)
        )
      )
      .subscribe((filteredAnnonces: AnnonceCovoiturage[]) => {
        this.annonces = filteredAnnonces;
      });
  }

  
}