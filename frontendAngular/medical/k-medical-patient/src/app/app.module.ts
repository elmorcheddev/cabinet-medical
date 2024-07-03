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
 import { AdminService } from './monService/admin.service';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.intercepter';
  import { RendezvousComponent } from './pages/rendezvous/rendezvous.component';
 import { RegisterComponent } from './pages/register/register.component';
 import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
 import 'boxicons';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DatePipe } from '@angular/common';
import { SpecialiteDeatilsComponent } from './pages/specialite-deatils/specialite-deatils.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { ListAppoinmentComponent } from './pages/list-appoinment/list-appoinment.component';
import { MedicalFolderComponent } from './pages/medical-folder/medical-folder.component';

 @NgModule({
  declarations: [
    AppComponent,
 
    LoginComponent,
      IndexComponent,
      HeaderComponent,
        
         RendezvousComponent,
       RegisterComponent,
         DoctorsComponent,
        SpecialiteDeatilsComponent,
        DoctorDetailsComponent,
        ListAppoinmentComponent,
        MedicalFolderComponent,
        
  ],
  imports: [
     
    BrowserModule,MatButtonModule,MatSelectModule,HttpClientModule, CarouselModule.forRoot(),
    AppRoutingModule,FormsModule,MatNativeDateModule,MatIconModule,ReactiveFormsModule, 
    BrowserAnimationsModule,MatDatepickerModule,MatFormFieldModule,MatInputModule, 
  ],
  providers: [  AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true 
  
    
  },DatePipe ,
  AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
