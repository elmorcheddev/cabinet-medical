import { Docteur } from "./Docteur";
import { Patient } from "./Patient";
 
export class RendezVous {
    id: number;
    jours: string;
    heurs: string;
    etat: boolean;
    enattent: boolean;
    patient: Patient;
    docteur: Docteur;
}