import { Docteur } from "./Docteur";
import { Utilisateur } from "./utilisateur";

export class Assistant extends Utilisateur {
    dateCreation: string;
    img: string;
    docteur: Docteur;
  }