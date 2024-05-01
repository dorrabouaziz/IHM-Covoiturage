import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss']
})
export class AnnonceFormComponent implements OnInit {
  annonceId!: string;
  formAnnonce: FormGroup;

  constructor(
    private annonceService: AnnonceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formAnnonce = this.formBuilder.group({
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      dateDepart: ['', Validators.required],
      heureDepart: ['', Validators.required],
      placesDisponibles: ['', Validators.required],
      nomConducteur: ['', Validators.required],
      telephoneConducteur: ['', Validators.required],
      vehiculeConducteur: ['', Validators.required],
      prix: [''],
      bagage: [''],
      fumeur: [false],
      climatisation: [false],
      sexe: ['Peu importe'],
      
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.annonceId = String(params['id']);
        this.loadAnnonce();
      } else {
        this.initForm();
      }
    });
  }

  loadAnnonce(): void {
    this.annonceService.recupererAnnonceParId(Number(this.annonceId!)).subscribe(
      (annonce: AnnonceCovoiturage) => {
        this.initForm(annonce);
      },
      (erreur) => {
        console.error('Erreur lors du chargement de l\'annonce :', erreur);
      }
    );
  }

  initForm(annonce?: AnnonceCovoiturage): void {
    this.formAnnonce.patchValue({
      depart: annonce?.depart || '',
      destination: annonce?.destination || '',
      dateDepart: annonce?.date || '',
      heureDepart: annonce?.heureDepart || '',
      placesDisponibles: annonce?.placesDisponibles || '',
      nomConducteur: annonce?.conducteur.nom || '',
      telephoneConducteur: annonce?.conducteur.telephone || '',
      vehiculeConducteur: annonce?.conducteur.vehicule || '',
      prix: annonce?.conducteur.prix || '',
      climatisation: annonce?.conducteur.climatisation || false,
      bagage: annonce?.conducteur.bagage || '',
      fumeur: annonce?.conducteur.fumeur || false,
      sexe: annonce?.conducteur.sexe || 'Peu importe'
    });
  }

  saveAnnonce(): void {
    if (this.formAnnonce.valid) {
      const nouvelId = uuidv4();

      const annonceData: AnnonceCovoiturage = {
        
        id: String(nouvelId),
        depart: this.formAnnonce.value.depart,
        destination: this.formAnnonce.value.destination,
        date: this.formAnnonce.value.dateDepart,
        heureDepart: this.formAnnonce.value.heureDepart,
        placesDisponibles: this.formAnnonce.value.placesDisponibles,
        conducteur: {
          nom: this.formAnnonce.value.nomConducteur,
          telephone: this.formAnnonce.value.telephoneConducteur,
          vehicule: this.formAnnonce.value.vehiculeConducteur,
          prix: this.formAnnonce.value.prix,
          climatisation: this.formAnnonce.value.climatisation,
          bagage: this.formAnnonce.value.bagage,
          fumeur: this.formAnnonce.value.fumeur,
          sexe: this.formAnnonce.value.sexe
        },
        passagers: [],
        sexe: this.formAnnonce.value.sexe,
        fumeur: this.formAnnonce.value.fumeur,
        bagage: this.formAnnonce.value.bagage,
        climatisation: this.formAnnonce.value.climatisation,
        prix: this.formAnnonce.value.prix
      };

      const saveOrUpdate = this.annonceId ?
        this.annonceService.mettreAJourAnnonce(Number(this.annonceId), annonceData) :
        this.annonceService.sauvegarderAnnonce(annonceData);

      saveOrUpdate.subscribe(
        (annonce: AnnonceCovoiturage) => {
          console.log(this.annonceId ? 'Annonce mise à jour avec succès :' : 'Annonce créée avec succès :', annonce);
          this.router.navigate(['/annonces']);  // Navigate to /create page
                if (!this.annonceId) {
            this.initForm();
          }
        },
        (erreur) => {
          console.error(this.annonceId ? 'Erreur lors de la mise à jour de l\'annonce :' : 'Erreur lors de la création de l\'annonce :', erreur);
        }
      );
    }
  }
}
