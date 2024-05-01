import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {forkJoin} from 'rxjs';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonces-cov',
  templateUrl: './annonces-cov.component.html',
  styleUrl: './annonces-cov.component.scss',
  providers: [MessageService, ConfirmationService] 
})
export class AnnoncesCovComponent {
  cities= ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Gabès', 'Bizerte', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous', 'Nabeul', 'Mahdia', 'Kasserine', 'Medenine', 'Jendouba', 'Sidi Bouzid', 'Manouba', 'Tataouine', 'Kef', 'Siliana', 'Zaghouan', 'Kebili', 'Beja', 'Tozeur'
      ];
  annonces: AnnonceCovoiturage[] = [];
  searchTerm1: string = '';
  searchTerm2: string = '';
  showTable: boolean = false;
  loading: boolean = false;
  searchKeyword: string = '';
  searchDate: string = '';
  date1 :any;
  placesDisponibles:any;
  annonceDetails!: AnnonceCovoiturage;
  annonceDialog: boolean = false;
  
  
  

  constructor(private annonceService: AnnonceService, private messageService: MessageService, private confirmationService: ConfirmationService , private router:Router) { }
  
  onSearch(): void {
    if (this.searchTerm1 && this.searchTerm2  ) {
      const searchTerm1Lower = this.searchTerm1.toUpperCase();
      const searchTerm2Lower = this.searchTerm2.toUpperCase();
      
  
      this.annonceService.filtrerAnnonces(searchTerm1Lower, searchTerm2Lower)
        .subscribe(annoncesFiltrees => {
          
          // Filter announcements with nbPlace > 0
          const annoncesWithPlaces = annoncesFiltrees.filter(annonce => annonce.placesDisponibles > 0);
          this.annonces = annoncesWithPlaces;
          this.showTable = this.annonces.length > 0;
        });
    }
  }
  
  
  reserver(annonce: AnnonceCovoiturage): void {
    /*let passager: Passager = {
      nom: 'John Doe',
      telephone: '123-456-7890',
      sexe: 'Male'
    };*/

    if (annonce.placesDisponibles > 0) {
      annonce.placesDisponibles--; // Decrement available places

      // Add the passenger to the annonce
      if (!annonce.passagers) {
        annonce.passagers = [];
      }
      //annonce.passagers.push(passager);

      // Call an API endpoint or service to update the annonce on the server
      this.annonceService.mettreAJourAnnonce(Number(annonce.id), annonce)
        .subscribe(response => {
          // Handle successful update (optional: show confirmation message)
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Réservation effectuée avec succès'});
        }, error => {  
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la réservation'});
        });
    } else {
      
    }
  }
  

  showAnnonceDetails(annonce: AnnonceCovoiturage) {
    this.loadAnnonceDetails(annonce.id);
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