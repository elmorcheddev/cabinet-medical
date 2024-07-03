package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

}
