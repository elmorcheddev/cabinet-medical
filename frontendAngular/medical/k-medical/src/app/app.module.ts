import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

 import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { HeaderComponent } from './pages/header/header.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AdminService } from './monService/admin.service';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.intercepter';
 import { ListdocteurComponent } from './pages/listdocteur/listdocteur.component';
import { SpecialiteComponent } from './pages/specialite/specialite.component';
  import { RendezvousComponent } from './pages/rendezvous/rendezvous.component';
import { ListassistantComponent } from './pages/listassistant/listassistant.component';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
   @NgModule({
  declarations: [
    AppComponent,
 
    LoginComponent,
      IndexComponent,
      HeaderComponent,
      PatientComponent,
       ListdocteurComponent ,
       SpecialiteComponent,
         RendezvousComponent,
        ListassistantComponent,
         DossierMedicalComponent,
        QuestionnairesComponent,
        ConsultationsComponent,
        CategoriesComponent,
        ProductsComponent,
         FactureComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ResponsableStockComponent,
        CommandesComponent,
        GestioncommandeComponent,
        RegisterAdminComponent,
         
  ],
  imports: [
    BrowserModule,MatButtonModule,MatSelectModule,HttpClientModule,MatSnackBarModule,
    AppRoutingModule,FormsModule,MatNativeDateModule,MatIconModule,MatGridListModule,
    BrowserAnimationsModule,MatDatepickerModule,MatFormFieldModule,MatInputModule
  ],
  providers: [  AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true 
  
    
  },
  AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
