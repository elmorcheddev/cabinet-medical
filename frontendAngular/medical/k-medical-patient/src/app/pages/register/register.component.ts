import { Component } from '@angular/core';
import {   NgForm  } from '@angular/forms';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';
import { Patient } from 'src/app/monClass/Patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  image: File | null = null;
  patient: Patient = {
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
    confirmPasswrod: ''
  };
  message: string;
 
  constructor(private utilisateurService: UtilisateurService, private router:Router) {}

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid || this.patient.password !== this.patient.confirmPasswrod) {
      this.message = 'Form is invalid or passwords do not match';
      return;
    }
    if (registerForm.valid) {
      const formData = new FormData();
      formData.append('patient', new Blob([JSON.stringify(this.patient)], { type: 'application/json' }));
      if (this.image) {
        formData.append('img', this.image);
      }

      this.utilisateurService.ajouterPatient(formData).subscribe((response: Patient) => {
        if(response !== null){
          alert("your acount has been created ")
          this.router.navigate(['/login'])
        }else{
          this.message="account with same email already exist"
        }
      }, error => {
        console.error('Registration failed', error);
      });
    }
  }

 
}
