import { Utilisateur } from "./utilisateur";

export interface Patient extends Utilisateur {
    assuranceMaladie: string;
    numeroSecuriteSociale: string;
    dateCreation: string;
    img: string;
  }