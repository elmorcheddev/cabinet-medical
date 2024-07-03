import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Docteur } from 'src/app/monClass/Docteur';
import { Commande } from 'src/app/monClass/commande';
import { Lignecommande } from 'src/app/monClass/lignecommande';
import { Product } from 'src/app/monClass/product';
import { CommandeService } from 'src/app/monService/commande.service';
import { LignecommandeService } from 'src/app/monService/lignecommande.service';
import { ProductService } from 'src/app/monService/product.service';

@Component({
  selector: 'app-gestioncommande',
  templateUrl: './gestioncommande.component.html',
  styleUrls: ['./gestioncommande.component.css']
})
export class GestioncommandeComponent implements OnInit {
  lignecommande: Lignecommande = new Lignecommande();
  articleList: Product[] = [];
  ligneCmdList: Lignecommande[] = [];
  isFirstLoad: boolean = true;
  id: number;
  commande: Commande = {
    id: 0,
    orderDate: '',
    tva: 0,
    totalprix: 0,
    assistant: {
      dateCreation: '',
      img: '',
      docteur: new Docteur,
      id: 0,
      nom: '',
      prenom: '',
      adresse: '',
      tel: '',
      cin: '',
      email: '',
      password: '',
      etat: false,
      dateNaissance: '',
      confirmPasswrod: '',
      roleUtilisateurs: []
    },
    ligneCommandes: []
  };
  listLigneCommande: Lignecommande[];
  lgcmd: Lignecommande = {
    id_ordDetails: 0,
    quantity: 0,
    totalPrice: 0,
    commande: {
      id: 0,
      orderDate: '',
      tva: 0,
      totalprix: 0,
      assistant: {
        dateCreation: '',
        img: '',
        docteur: new Docteur,
        id: 0,
        nom: '',
        prenom: '',
        adresse: '',
        tel: '',
        cin: '',
        email: '',
        password: '',
        etat: false,
        dateNaissance: '',
        confirmPasswrod: '',
        roleUtilisateurs: []
      },
      ligneCommandes: []

    },
    product: new Product
  }
  totalprix: any;
  constructor(private route: ActivatedRoute, private productService: ProductService, private commandeService: CommandeService, private ligneCommandeService: LignecommandeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    this.commandeService.getCommande(this.id).subscribe(
      (data: Commande) => {
        console.log(data)
        this.commande = data;
 
        this.lgcmd.commande.id = this.id;
        this.ligneCommandeService.getAllligneCommande(this.commande.id).subscribe(
          (data: Lignecommande[]) => {
            console.log(data)
            this.listLigneCommande = data;
          }
        )
      }
    )



    this.allPageInfo()

    this.productService.getListProducts().subscribe(
      (data: Product[]) => {
        this.articleList = data;
      }
    )
  }
  allPageInfo() {

  }
  addLgCommande(form: NgForm) {
    console.log(form.value)
    this.ligneCommandeService.saveligneCommande(this.lgcmd).subscribe(
      (data: Lignecommande) => {
        console.log(data)
        this.lgcmd.totalPrice = this.lgcmd.product.prixProduct * this.lgcmd.quantity
         if (data.quantity != 0) {
          window.alert("ligne commande jouter avec success ")
          window.location.reload();
        } else {
          window.alert("les stock de cette article est vide")
          window.location.reload();
        }

      }
    )
  }

  findByID(id: number) {
    this.ligneCommandeService.getligneCommande(id).subscribe(
      (data: Lignecommande) => {
        console.log(data)
        this.lgcmd = data;
      }
    )
  }
}
