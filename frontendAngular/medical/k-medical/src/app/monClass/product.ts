import { CategoriesProduit } from "./CategoriesProduit";

export class Product {
    id: number;
    nomProduct: string;
    prixProduct: number;
    qteProdcut: number;
    img: string;
    minStock:number
    categoriesProduit: CategoriesProduit;
}