import { Docteur } from "./Docteur";
import { DossierMedical } from "./dossierMedical";

export class Consultations {
    id: number;
    dateVisit: string;
    docteur: Docteur;
    reason: string;
    dossierMedical: DossierMedical;
    notes:string[]
    treatment:string[]
    prixConsultation:number
}