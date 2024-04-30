import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {forkJoin} from 'rxjs';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
  providers: [MessageService, ConfirmationService] 
})
export class AnnoncesComponent implements OnInit {
  annonceDialog: boolean = false;
  annonces!: AnnonceCovoiturage[];
  annonce!: AnnonceCovoiturage;
  selectedAnnonce!: AnnonceCovoiturage[] | null;
  annonceDetails!: AnnonceCovoiturage;

  searchKeyword: string = '';


  constructor(
    private annonceService: AnnonceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }


  ngOnInit(): void {
    this.annonceService.recupererAnnonces().subscribe((data: AnnonceCovoiturage[]) => {
      this.annonces = data;
    });


  }


  deleteSelectedAnnonce() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les actifs sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedAnnonce) {
          const deletionObservables = this.selectedAnnonce.map(annonce => this.annonceService.supprimerAnnonce(Number(annonce.id)));
          
          if (deletionObservables.length > 0) {
            forkJoin(deletionObservables).subscribe(() => {
              // All deletions successful
              this.ngOnInit(); // Refresh actives after deletion
              this.selectedAnnonce = [];
              this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Annonces Supprimés avec succès'});
            }, (error) => {
              // Handle any errors during deletion
              this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression des annonces'});
            });
          } else {
            // Handle case where no deletion observables are generated
            this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Aucune annonce sélectionnée à supprimer'});
          }
        } else {
          // Handle case where this.selectedAnnonce is undefined
          this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Aucune annonce sélectionnée à supprimer'});
        }
      }
    });
    
  }
  
  


  editAnnonce(annonce: AnnonceCovoiturage) {
    this.annonce = {...annonce};
    this.annonceDialog = true;
  }

  deleteAnnonce(annonce: AnnonceCovoiturage) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette annonce?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         // Convert the id from string to number

        // Call the service method for persistent deletion
            this.annonceService.supprimerAnnonce(parseInt(annonce.id)).subscribe(
              () => {
                // Successful deletion
                this.annonces = this.annonces.filter((val) => Number(val.id )!== parseInt(annonce.id));

                this.messageService.add({severity: 'success', summary: 'Succès', detail: 'annonce supprimé', life: 3000});
              },
              (error) => {
                // Handle deletion error
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression d\'une annonce', life: 3000});
              }
            );
          }
        });
   
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
