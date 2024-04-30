import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnonceCovoiturage } from '../modele/annonce';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  annonces: AnnonceCovoiturage[] = [];

  constructor(private httpClient: HttpClient) {}

  sauvegarderAnnonce(annonce: AnnonceCovoiturage): Observable<AnnonceCovoiturage> {
    return this.httpClient.post<AnnonceCovoiturage>('http://localhost:3000/annoncesCovoiturage', annonce);
  }

  recupererAnnonces(): Observable<AnnonceCovoiturage[]> {
    return this.httpClient.get<AnnonceCovoiturage[]>('http://localhost:3000/annoncesCovoiturage');
  }

  supprimerAnnonce(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/annoncesCovoiturage/${id}`);
  }

  mettreAJourAnnonce(id: number, nouvelleAnnonce: AnnonceCovoiturage): Observable<AnnonceCovoiturage> {
    return this.httpClient.put<AnnonceCovoiturage>(`http://localhost:3000/annoncesCovoiturage/${id}`, nouvelleAnnonce);
  }

  recupererAnnonceParId(id: number): Observable<AnnonceCovoiturage> {
    return this.httpClient.get<AnnonceCovoiturage>(`http://localhost:3000/annoncesCovoiturage/${id}`);
  
  }
  filtrerAnnonces(searchTerm1: string, searchTerm2: string): Observable<AnnonceCovoiturage[]> {
    const params = {
      depart: searchTerm1,
      destination: searchTerm2,
    };
    return this.httpClient.get<AnnonceCovoiturage[]>('http://localhost:3000/annoncesCovoiturage', { params });
  }
  

}