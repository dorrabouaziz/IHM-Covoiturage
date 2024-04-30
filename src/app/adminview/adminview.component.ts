import { Component, OnInit } from '@angular/core';
import { AnnonceCovoiturage } from '../modele/annonce';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements OnInit {

  annonces: AnnonceCovoiturage[] = [];
  searchTerm1: string = '';
  searchTerm2: string = '';
  showTable: boolean = false;
  loading: boolean = false;
  searchKeyword: string = '';
  searchDate: string = '';
  date1!: Date;

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces(): void {
    this.loading = true;
    this.annonceService.recupererAnnonces().subscribe(
      (annonces: AnnonceCovoiturage[]) => {
        this.annonces = annonces;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des annonces : ', error);
        this.loading = false;
      }
    );
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
}
