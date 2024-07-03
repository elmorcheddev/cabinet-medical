package com.medical.service;

import java.util.List;

import com.medical.model.CategoriesProduit;

public interface CategoriesProduitService {
    List<CategoriesProduit> listCategoriesProduits();

    CategoriesProduit findByIdCategoriesProduit(Long id);

    CategoriesProduit saveNewCategoriesProduit(CategoriesProduit categoriesProduit);

    CategoriesProduit updateCategoriesProduit(CategoriesProduit categoriesProduit);

    void deleteCategoriesProduit(Long id);
}
