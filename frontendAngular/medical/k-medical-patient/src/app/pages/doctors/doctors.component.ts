import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Docteur } from "src/app/monClass/Docteur";
import { Patient } from "src/app/monClass/Patient";
import { Specialite } from "src/app/monClass/Specialitet";
import { RendezVous } from "src/app/monClass/rendezVous";
import { Utilisateur } from "src/app/monClass/utilisateur";
import { AdminAuthService } from "src/app/monService/admin-auth.service";
import { AdminService } from "src/app/monService/admin.service";
import { RendezVousService } from "src/app/monService/rendez_vous.service";
import { SpecialiteService } from "src/app/monService/specialite.service";
import { UtilisateurService } from "src/app/monService/utilisateur.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  selectedDate = new Date();
  calendarWeek: Date[] = [];
  listDocteur: Docteur[] = [];
  listSpec: Specialite[] = [];
  id: number;
  docteur: Docteur = {
    numeroOrdre: '',
    dateCreation: '',
    img: '',
    specialite: {
      id: 0,
      nomSpecialite: '',
      createBy: new Utilisateur(),
      img: '',
      description: ""
    },
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
    roleUtilisateurs: [],
    confirmPasswrod: ""
  };
  utilisateur: Patient = {
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
    roleUtilisateurs: [],
    assuranceMaladie: '',
    numeroSecuriteSociale: '',
    dateCreation: '',
    img: '',
    confirmPasswrod: ""
  };
  selectedSpec: Specialite | undefined;
  specialiteName: any;
  rendez: RendezVous = {
    id: 0,
    jours: '',
    heurs: '',
    etat: false,
    enattent: false,
    patient: {
      assuranceMaladie: '',
      numeroSecuriteSociale: '',
      dateCreation: '',
      img: '',
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
      roleUtilisateurs: [],
      confirmPasswrod: ""
    },
    docteur: {
      numeroOrdre: '',
      dateCreation: '',
      img: '',
      specialite: new Specialite,
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
      roleUtilisateurs: [],
      confirmPasswrod: ""
    }
  };
  calDate = new Date();
  isLogedIn: boolean;
  message: string;

  constructor(
    private datePipe: DatePipe,
    private rendezvouService: RendezVousService,
    private utilisateurService: UtilisateurService,
    private specService: SpecialiteService,
    private authAdmin: AdminAuthService,
    private adminService: AdminService,
    private activRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogedIn = this.authAdmin.isLoggedIn();
    this.generateWeek(this.selectedDate);

    this.activRoute.params.subscribe(params => {
      this.specialiteName = params['specialiteName'];

      this.specService.getAllSpec().subscribe((specialites: Specialite[]) => {
        this.listSpec = specialites;
        this.selectedSpec = specialites.find(spec => spec.nomSpecialite === this.specialiteName);
        if (this.selectedSpec) {
          this.utilisateurService.listDocteurBySecialite(this.selectedSpec.id).subscribe((data: Docteur[]) => {
            this.listDocteur = data;
            console.log(data);
          });
        } else {
          this.utilisateurService.listDocteur().subscribe((data: Docteur[]) => {
            this.listDocteur = data;
            console.log(data);
          });
        }
      });
    });

    if (this.authAdmin.isLoggedIn()) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        console.log(data);
        this.utilisateurService.getPatient(data.id).subscribe((data: Patient) => {
          this.utilisateur = data;
        });
      });
    }
  }
  filterBySpecialite(specialiteName: string): void {
    if (specialiteName) {
      this.router.navigate(['/doctors',{specialiteName}])

      const selectedSpec = this.listSpec.find(spec => spec.nomSpecialite === specialiteName);
      if (selectedSpec) {
        this.utilisateurService.listDocteurBySecialite(selectedSpec.id).subscribe((data: Docteur[]) => {
          this.listDocteur = data;
          console.log(data);
        });
      }
    } else {
      this.router.navigate(['/doctors'])

      this.fetchAllDoctors();
    }
  }
  

  sendAppoinment(id: number) {
    this.utilisateurService.getDocteur(id).subscribe((data: Docteur) => {
      this.docteur = data;
      console.log(data);
    });
  }
numberRenderInDay() :boolean{
  let test=false
  this.rendezvouService.numberRendeInDay(this.selectedDate.toDateString()).subscribe((data:number)=>{
    console.log(data)
    if(data >= 16){
      test=true
    }else{
test=false   
 }
  })
  return test
}
  envoyerAppoinment() {
    const formData = new FormData();
    formData.append('rendezVous', new Blob([JSON.stringify(this.rendez)], { type: 'application/json' }));
    formData.append('idPatient', this.utilisateur.id.toString());
    formData.append('selectedDate', this.selectedDate.toDateString());
    formData.append('idDocteur', this.docteur.id.toString());
    if(confirm("are you sure that you will send an appoinment to this doctor")){
      if(!this.isSunday(this.selectedDate) || !this.numberRenderInDay()){
        this.rendezvouService.envoyerRendezvous(formData).subscribe((data: RendezVous) => {
          if (data !== null) {
            alert("Your appointment is sent successfully");
          } else {
            alert("You have already sent an appointment request");
          }
          console.log(data);
        });
      }else{
        alert("you choose sunday ")
      }
    }
    
  }

  fetchAllDoctors(): void {
    this.utilisateurService.listDocteur().subscribe((data: Docteur[]) => {
      this.listDocteur = data;
    });
  }

  generateWeek(date: Date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    this.calendarWeek = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      this.calendarWeek.push(currentDate);
    }
  }

  changeWeek(days: number) {
    this.calDate.setDate(this.calDate.getDate() + days);
    this.generateWeek(this.calDate);
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  isSameDay(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isPastDay(date: Date): boolean {
    const today = new Date();
    return date < today && !this.isSameDay(date);
  }

  isSunday(date: Date): boolean {
    return date.getDay() === 0;
  }

  isSelectedDay(date: Date): boolean {
    return date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear();
  }

  getDayName(date: Date): string {
    return this.datePipe.transform(date, 'EEE')!;
  }

  login(form: NgForm) {
    console.log(form.value)
    this.adminService.loginAdmin(form.value).subscribe(
      (data: any) => {
        console.log(data)
        this.authAdmin.setRoles(data.utilisateur.roleUtilisateurs);
        this.authAdmin.setToken(data.token);
        const roles = data.utilisateur.roleUtilisateurs[0].nomRoles;
        if(data.utilisateur.etat == true){
        window.alert("Bien venu " + data.utilisateur.email);
          location.reload()
      }else{
        window.alert("Votre compte a ete desactive ");
        this.authAdmin.clear()
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }},
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.message = "Vérifier votre nom d'utilisateur ou votre mot de passe.";
          this.router.navigate(['/login']);
        }
      }
    );
  }
  goToDoctorDetails(id: number) {
this.router.navigate(['/doctor-profil',{id}])
  }
}
