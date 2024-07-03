import { Assistant } from "./Assistant";

 export interface Commande {
		 
        id:number;
    orderDate:string;  
  tva:number;
   totalprix:number;
   assistant:Assistant;
   ligneCommandes:[];

}
