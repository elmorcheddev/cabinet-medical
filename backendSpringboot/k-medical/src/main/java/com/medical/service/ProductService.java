package com.medical.service;

import java.util.List;

import com.medical.model.Product;

public interface ProductService {
    List<Product> listProducts();

    Product findByIdProduct(Long id);

    Product saveNewProduct(Product product);

    Product updateProduct(Product product);

    void deleteProduct(Long id);
}
