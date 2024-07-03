import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesProduit } from 'src/app/monClass/CategoriesProduit';
import { AdminService } from 'src/app/monService/admin.service';
import { ProductService } from 'src/app/monService/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  listCat: CategoriesProduit[];
  cat: CategoriesProduit = {
    id: 0,
    nomCat: ''
  };
  message: string;
  isEditMode: boolean = false;

  constructor(private catAndProductService: ProductService , private adminService:AdminService, 
    private router: Router,

  ) {}

  ngOnInit(): void {
    if (this.adminService.rolesMatch(['SUPERADMIN']) || this.adminService.rolesMatch(['RESPONSABLESTOCK'])) {
  this.catAndProductService.getListCategories().subscribe((data: CategoriesProduit[]) => {
      this.listCat = data;
    });
    }else{
      this.router.navigate(['/index'])
    }
  
  }

  edit(id: number) {
    this.catAndProductService.byIdCat(id).subscribe((data: CategoriesProduit) => {
      this.cat = data;
      this.isEditMode = true;
    });
  }

  saveCat(form: NgForm) {
    if (this.isEditMode) {
      this.catAndProductService.updateCategory(this.cat).subscribe((data: CategoriesProduit) => {
        if (data !== null) {
          this.message = "Category updated successfully";
          this.resetForm(form);
        }else{
          this.message = "Category already exist ";

        }
      });
    } else {
      this.catAndProductService.addnewCategoreis(this.cat).subscribe((data: CategoriesProduit) => {
        if (data !== null) {
          this.message = "Category added successfully";
          this.resetForm(form);
        }else{
          this.message = "Category already exist ";

        }
      });
    }
  }

  delete(id: number) {
    this.catAndProductService.deleteCategory(id).subscribe(() => {
      this.message = "Category deleted successfully";
      this.catAndProductService.getListCategories().subscribe((data: CategoriesProduit[]) => {
        this.listCat = data;
      });
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.cat = { id: 0, nomCat: '' };
    this.isEditMode = false;
    this.catAndProductService.getListCategories().subscribe((data: CategoriesProduit[]) => {
      this.listCat = data;
    });
  }
}
