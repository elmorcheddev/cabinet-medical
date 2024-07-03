import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Router } from "@angular/router"; 
import { Assistant } from "src/app/monClass/Assistant";
import { Docteur } from "src/app/monClass/Docteur";
import { Commande } from "src/app/monClass/commande";
import { AdminAuthService } from "src/app/monService/admin-auth.service";
import { AdminService } from "src/app/monService/admin.service";
import { CommandeService } from "src/app/monService/commande.service";

@Component({
  selector: 'app-list-comm',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
    commandeList: Commande[];
    commande: Commande={
        id: 0,
        orderDate: "",
        tva: 0,
        totalprix: 0,
        assistant: {
          dateCreation: "",
          img: "",
          docteur: new Docteur,
          id: 0,
          nom: "",
          prenom: "",
          adresse: "",
          tel: "",
          cin: "",
          email: "",
          password: "",
          etat: false,
          dateNaissance: "",
          confirmPasswrod: "",
          roleUtilisateurs: []
        },
        ligneCommandes: []
    };
  utilisateur: Assistant={
    dateCreation: "",
    img: "",
    docteur: new Docteur,
    id: 0,
    nom: "",
    prenom: "",
    adresse: "",
    tel: "",
    cin: "",
    email: "",
    password: "",
    etat: false,
    dateNaissance: "",
    confirmPasswrod: "",
    roleUtilisateurs: []
  };
  
  constructor(private commandeService:CommandeService,private authAdmin:AdminAuthService ,public adminService:AdminService  , private router:Router ) { }

  ngOnInit() {
    if(this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser()!=null){
      this.adminService.getUserInformation().subscribe((data:any)=>{
        console.log(data)
       this.utilisateur=data
       });}else{
        this.authAdmin.logout()
        this.router.navigate(['/login'])
      }
    
    if (this.adminService.rolesMatch(['SUPERADMIN']) || this.adminService.rolesMatch(['RESPONSABLESTOCK'])
      ) {
      this.AllCommandes();

    }else if( this.adminService.rolesMatch(['ASSISTANT'])){
      this.adminService.getUserInformation().subscribe((data:any)=>{
        console.log(data)
       this.utilisateur=data
      this.commandeService.getAllCommandeByAssitant(data.id).subscribe((data:Commande[])=>{
        console.log(data)
        this.commandeList=data
      })
    })
    }
    else{
      this.router.navigate(['/index'])

    }
  }
 public AllCommandes(){
	 this.commandeService.getAllCommande().subscribe(
		 (data:Commande[])=>{
			 console.log(data)
			 this.commandeList=data;
		 }
	  )
 }
 addCommandes(form:NgForm){
	 this.commandeService.saveCommande(this.commande , this.utilisateur.id).subscribe( 
		 (data:Commande)=>{
			 console.log(data)			  
		 		this.AllCommandes();
		 		const id=data.id
		 		if(data!==null){
				 this.goToLignCommande(id)
 
				 }
 		 
		 }
	 )
 }
 goToLignCommande(id:number){
	this.router.navigate(['/gestioncommande',{id}]) 
 }
  
 findById(id:number){
	 this.commandeService.getCommande(id).subscribe( 
		 (data:Commande)=>{
			 this.commande=data
			 console.log(data)
		 }
	 )
 }
 delete(id:number){
	 this.commandeService.deleteCommande(id).subscribe( 
		 (data)=>{
			 console.log(data)
		 }
	 )
 }
 getInfo(id:number){
	 this.router.navigate(['/gestioncommande',{id}])
 }
}

