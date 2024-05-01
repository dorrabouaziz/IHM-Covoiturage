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
  loading: boolean = false;
  annonceDetails!: AnnonceCovoiturage;
  annonceDialog: boolean = false;
  searchTerm: string = '';
  imagePath: string[] = [ "../assets/ford.jfif", "../assets/bmw.jpg", "../assets/LandRover.jfif", "../assets/clio.jpg"  ]; 
  

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
  
  loadAnnonceDetails(id: string) {
    const idNumber = parseInt(id); // Convert the id from string to number
    this.annonceService.recupererAnnonceParId(idNumber).subscribe(
      (data: AnnonceCovoiturage) => {
        this.annonceDetails = data;
        console.log('Annonce Details:', this.annonceDetails);
        this.annonceDialog = true;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails de l\'annonce :', error);
      }
    );
  }
  hideAnnonceDialog() {
    this.annonceDialog = false;
  }

  
}