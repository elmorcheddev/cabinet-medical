import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
 import { DoctorsComponent } from './pages/doctors/doctors.component';
import { SpecialiteDeatilsComponent } from './pages/specialite-deatils/specialite-deatils.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { ListAppoinmentComponent } from './pages/list-appoinment/list-appoinment.component';
import { MedicalFolderComponent } from './pages/medical-folder/medical-folder.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },  // Redirect empty path to index
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'specialiteDetails', component: SpecialiteDeatilsComponent },
  { path: 'myAppoinment', component: ListAppoinmentComponent },
  { path: 'myAppoinment', component: ListAppoinmentComponent },
  { path: 'medicalFolder', component: MedicalFolderComponent },
 
  { path: 'doctor-profil', component: DoctorDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
