package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.CategoriesProduit;

public interface CategoriesProduitRepo extends JpaRepository<CategoriesProduit, Long> {
boolean existsByNomCat(String nomCat);
}
