import { Specialite } from "./Specialitet";
import { Utilisateur } from "./utilisateur";

export class Docteur extends Utilisateur {
      numeroOrdre: string;
    dateCreation: string;
    img: string;
    specialite: Specialite;
  }