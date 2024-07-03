import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ListdocteurComponent } from './pages/listdocteur/listdocteur.component';
import { SpecialiteComponent } from './pages/specialite/specialite.component';
import { RendezvousComponent } from './pages/rendezvous/rendezvous.component';
import { ListassistantComponent } from './pages/listassistant/listassistant.component';
import { AuthGuard } from './auth/auth.guard';
import { DossierMedicalComponent } from './pages/dossier-medical/dossier-medical.component';
import { QuestionnairesComponent } from './pages/dossier-medical/questionnaires/questionnaires.component';
import { ConsultationsComponent } from './pages/dossier-medical/consultations/consultations.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { FactureComponent } from './pages/facture/facture.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResponsableStockComponent } from './pages/responsable-stock/responsable-stock.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { GestioncommandeComponent } from './pages/commandes/gestioncommande/gestioncommande.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirect empty path to index
  { path: 'index', component: IndexComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listdocteur', component: ListdocteurComponent },
  { path: 'specialite', component: SpecialiteComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: 'listassitant', component: ListassistantComponent },
  { path: 'dossier', component: DossierMedicalComponent },
  { path: 'questionnaires', component: QuestionnairesComponent },
  { path: 'consultation', component: ConsultationsComponent },
  { path: 'listCat', component: CategoriesComponent },
  { path: 'listresponsable', component: ResponsableStockComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'commande', component: CommandesComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'gestioncommande', component: GestioncommandeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterAdminComponent },
  { path: 'reset-password', component: ResetPasswordComponent }, 
  { path: '**', redirectTo: '/index' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
