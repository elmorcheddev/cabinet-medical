import { Utilisateur } from "./utilisateur";

export class Patient extends Utilisateur {
    assuranceMaladie: string;
    numeroSecuriteSociale: string;
    dateCreation: string;
    img: string;
  }