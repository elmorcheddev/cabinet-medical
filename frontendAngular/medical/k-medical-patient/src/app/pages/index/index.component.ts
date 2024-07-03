import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from 'src/app/monClass/Specialitet';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';
 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent   implements OnInit{


  
  slides = [
    {
      image: 'assets/images/slider/gallery-1.jpg',
      subtitle: 'Fillings and Restorations',
      title: 'This Lifestyle for Your Smile, Not Only Health',
      content: 'Repairing decayed or damaged teeth with materials such as composite resin or amalgam.',
    },
    {
      image: 'assets/images/slider/gallery-2.jpg',
      subtitle: 'Preventive Care',
      title: 'A Healthy Smile Starts with Preventive Care',
      content: 'Regular check-ups and cleanings to keep your teeth and gums healthy.',
    },
    {
      image: 'assets/images/slider/gallery-3.jpg',
      subtitle: 'Cosmetic Dentistry',
      title: 'Enhance Your Smile with Cosmetic Dentistry',
      content: 'Achieve a brighter, more beautiful smile with our whitening and veneer options.',
    },
    {
      image: 'assets/images/slider/gallery-4.jpg',
      subtitle: 'Orthodontics',
      title: 'Straighten Your Smile with Orthodontic Solutions',
      content: 'We offer braces and clear aligners to align your teeth and improve your bite.',
    },
    {
      image: 'assets/images/slider/gallery-5.jpg',
      subtitle: 'Dental Implants',
      title: 'Restore Your Smile with Dental Implants',
      content: 'Permanent solutions for missing teeth, giving you a natural-looking smile.',
    },
    {
      image: 'assets/images/slider/gallery-6.jpg',
      subtitle: 'Periodontics',
      title: 'Healthy Gums for a Healthy Smile',
      content: 'Specialized care for gum disease to maintain the foundation of your teeth.',
    },
  ];
  
  activeSlideIndex = 0;
  listSpec: Specialite[];
  user: any;
  constructor(private specService:SpecialiteService, private authAdmin:AdminAuthService , private  router:Router) { }
  ngOnInit(): void {
 
    this.specService.getAllSpec().subscribe((data:Specialite[])=>{
      this.listSpec=data
    })  }

   
   
    filterBySpecialite(specialiteName: string): void {
      this.router.navigate(['/doctors', { specialiteName }]);
    }
    learnMore(id: number) {
      this.router.navigate(['/specialiteDetails',{id}])
      }
}
