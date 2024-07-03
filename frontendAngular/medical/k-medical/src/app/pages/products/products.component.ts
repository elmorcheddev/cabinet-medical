import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesProduit } from 'src/app/monClass/CategoriesProduit';
import { Product } from 'src/app/monClass/product';
import { AdminService } from 'src/app/monService/admin.service';
import { ProductService } from 'src/app/monService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  listCategories: CategoriesProduit[] = [];
  product: Product = {
    id: 0,
    nomProduct: '',
    prixProduct: 0,
    qteProdcut: 0,
    img: '',
    categoriesProduit: {
      id: 0,
      nomCat: ''
    },
    minStock: 0
  };
  selectedFile: any;
  message: string = '';
  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router:Router,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    if (this.adminService.rolesMatch(['SUPERADMIN']) || this.adminService.rolesMatch(['RESPONSABLESTOCK'])){
      this.loadProducts();
      this.loadCategories();
    }else{
      this.router.navigate(['/index'])
    }
  
  }

  loadProducts(): void {
    this.productService.getListProducts().subscribe(data => {
      this.productList = data;
      this.checkStockLevels();
    });
  }

  loadCategories(): void {
    this.productService.getListCategories().subscribe(data => {
      this.listCategories = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ajouterProduct(form: NgForm): void {
    const formData = this.prepareFormData();

    this.productService.addNewProduct(formData).subscribe((data: Product) => {
      this.message = 'Product added successfully';
      this.resetForm(form);
      this.loadProducts();
      this.checkStockLevels();
    });
  }

  saveProduct(form: NgForm): void {
    const formData = this.prepareFormData();
    if(this.selectedFile){
      if (this.isEditMode) {
          this.productService.updateProduct(formData).subscribe((data: Product) => {
            this.message = 'Product updated successfully';
            this.resetForm(form);
            this.loadProducts();
            this.checkStockLevels();
          });
      } else {
          this.productService.addNewProduct(formData).subscribe((data: Product) => {
            this.message = 'Product added successfully';
            this.resetForm(form);
            this.loadProducts();
            this.checkStockLevels();
          });
      }
    } else {
      this.message = "Image is required";
    }
  }

  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('product', new Blob([JSON.stringify(this.product)], { type: 'application/json' }));
    return formData;
  }

  editProduct(product: Product): void {
    this.product = { ...product };
    this.isEditMode = true;
  }

  deleteProduct(id: number): void {
    if(confirm("Are you sure to delete this product?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.message = 'Product deleted successfully';
        this.loadProducts();
        this.checkStockLevels();
      });
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.product = {
      id: 0,
      nomProduct: '',
      prixProduct: 0,
      qteProdcut: 0,
      img: '',
      categoriesProduit: {
        id: 0,
        nomCat: ''
      },
      minStock: 0
    };
    this.selectedFile = null;
    this.isEditMode = false;
  }

  checkStockLevels(): void {
    this.productList.forEach(product => {
      if (product.qteProdcut === product.minStock) {
        this.showNotification(`Product ${product.nomProduct} has reached its minimum stock level.`);
      }
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
