import { DossierMedical } from "./dossierMedical";

     export class Questionnaire {
        id: number;
        numQuestionnaires: string;
        mutuelle: boolean;
        fume:boolean
        alcool:boolean
        cmu: boolean;
        referent: string;
        pathologies: string[];  
        interventionChirurgicale: boolean;
        interventionDetails: string;
        medicaments: boolean;
        medicamentsDetails: string;
        anticoagulants: boolean;
        biphosphonates: boolean;
        dossierMedical: DossierMedical;
        autresPathologies: string;
        allergieConnue: string;
        allergieDentaire: string;
        mutuelleAutre: string;
        profession: string;
        adressePar: string;
        medecinNom: string;
        lieu: string;
        enfants: number;
        tuberculose: boolean
        diabete: boolean
        cardiopathie: boolean
        autres: boolean
     }