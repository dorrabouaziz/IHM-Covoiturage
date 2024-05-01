import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnonceCovoiturage } from '../modele/annonce';
import { AnnonceService } from '../services/annonce.service';
import { map } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-annonces-res',
  templateUrl: './annonces-res.component.html',
  styleUrl: './annonces-res.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AnnoncesResComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  annonces: AnnonceCovoiturage[] = [];
  searchTerm1: string = '';
  searchTerm2: string = '';
  showTable: boolean = false;
  loading: boolean = false;
  searchKeyword: string = '';
  searchDate: string = '';
  date1!: Date;
  searchKeyword1: string = '';
  imagePath: string[] = [ "../assets/ford.jfif", "../assets/bmw.jpg", "../assets/LandRover.jfif", "../assets/clio.jpg", "../assets/bmw.jpg" , "../assets/passat.jfif", "../assets/chevrolet-cruze.jpg", "../assets/205.jpg", "../assets/207.jpg", "../assets/308.jpg"]; 


  constructor(private annonceService: AnnonceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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

  supprimerAnnonce(id: string): void {
    this.loading = true; // Indiquer que la suppression est en cours
    this.annonceService.supprimerAnnonce(parseInt(id)).subscribe(
      () => {
        // Supprimer l'annonce de la liste des annonces
        this.annonces = this.annonces.filter(annonce => parseInt((annonce.id).toString()) !== parseInt(id));
        this.loading = false; // Indiquer que la suppression est terminée
        this.ngOnInit();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'annonce : ', error);
        this.loading = false;
      }
    );
  }

  annonceDetails!: AnnonceCovoiturage;
  annonceDialog: boolean = false;

 
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
  
}


