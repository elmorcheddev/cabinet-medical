import { Docteur } from "./Docteur";
import { Utilisateur } from "./utilisateur";

export interface Secretaire extends Utilisateur {
    dateCreation: string;
    img: string;
    docteur: Docteur;
  }