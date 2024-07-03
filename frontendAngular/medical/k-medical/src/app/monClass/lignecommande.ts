 import { Commande } from "./commande";
import { Product } from "./product";

export class Lignecommande {
	 id_ordDetails:number;
		
	  quantity:number;
		 totalPrice:number
		// unitPrice :number;
		   commande:Commande
		   product:Product;
}
