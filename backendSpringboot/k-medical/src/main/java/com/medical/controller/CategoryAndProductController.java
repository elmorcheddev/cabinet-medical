package com.medical.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.medical.model.CategoriesProduit;
import com.medical.model.Product;
import com.medical.service.CategoriesProduitService;
import com.medical.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/catAndProduct")
public class CategoryAndProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoriesProduitService categoriesProduitService;

    @GetMapping(value = "/listCat")
    public List<CategoriesProduit> listCategoriesProduits() {
        return categoriesProduitService.listCategoriesProduits();
    }

    @GetMapping(value = "/byIdCat/{id}")
    public CategoriesProduit categoriesProduitsByID(@PathVariable Long id) {
        return categoriesProduitService.findByIdCategoriesProduit(id);
    }

   

    @PostMapping(value = "/addNewCategories")
    public CategoriesProduit addNewCategories(@RequestBody CategoriesProduit categoriesProduit) {
        return categoriesProduitService.saveNewCategoriesProduit(categoriesProduit);
    }

    @PutMapping(value = "/updateCategory")
    public CategoriesProduit updateCategory(@RequestBody CategoriesProduit categoriesProduit) {
        return categoriesProduitService.updateCategoriesProduit(categoriesProduit);
    }

    @DeleteMapping(value = "/deleteCategory/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoriesProduitService.deleteCategoriesProduit(id);
    }

    @GetMapping(value = "/list")
    public List<Product> listProducts() {
        return productService.listProducts();
    }

    @GetMapping(value = "/{id}")
    public Product findByIdProduct(@PathVariable Long id) {
        return productService.findByIdProduct(id);
    }
    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable Long id) {
          productService.deleteProduct(id);
    }
    @PostMapping(value = "/add")
    public Product addNewProduct(@Valid @RequestPart("product") Product product ,@RequestPart("img") MultipartFile img) {
        try {
			product.setImg(img.getBytes());
	    	return productService.saveNewProduct(product);

		} catch (IOException e) {
 			e.printStackTrace();
 			return null;
		}
    }

    @PutMapping(value = "/update")
    public Product updateProduct(@Valid @RequestPart("product") Product product ,@RequestPart("img") MultipartFile img) {
        try {
			product.setImg(img.getBytes());
	    	return productService.updateProduct(product);

		} catch (IOException e) {
 			e.printStackTrace();
 			return null;
		}
    }
}
