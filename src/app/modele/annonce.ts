// Modèle pour une annonce de covoiturage
export interface AnnonceCovoiturage {
sexe: any;
fumeur: any;
bagage: any;
climatisation: any;
prix: any;
  id: string; 
  depart: string; 
  destination: string; 
  date: string; 
  heureDepart: string;
  placesDisponibles: number; 
  conducteur: Conducteur;
  passagers: Passager[]; 
}

// Modèle pour les informations sur le conducteur
export interface Conducteur {
  nom: string; 
  telephone: string; 
  vehicule: string;
  prix?: number; // Champ prix ajouté
  climatisation?: boolean; // Champ climatisation ajouté
  bagage?: string; // Champ bagage ajouté
  fumeur?: boolean; // Champ fumeur ajouté
  sexe?: string; // Champ sexe ajouté
}

// Modèle pour les informations sur un passager
export interface Passager {
  nom: string; 
  telephone: string; 
  sexe?: string; // Champ sexe ajouté
}
