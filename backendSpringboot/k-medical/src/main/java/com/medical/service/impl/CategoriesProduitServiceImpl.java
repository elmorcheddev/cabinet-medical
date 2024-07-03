package com.medical.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.medical.model.CategoriesProduit;
import com.medical.repo.CategoriesProduitRepo;
 import com.medical.service.CategoriesProduitService;

@Service
public class CategoriesProduitServiceImpl implements CategoriesProduitService {

    @Autowired
    private CategoriesProduitRepo categoriesProduitRepository;

    @Override
    public List<CategoriesProduit> listCategoriesProduits() {
        return categoriesProduitRepository.findAll();
    }

    @Override
    public CategoriesProduit findByIdCategoriesProduit(Long id) {
        return categoriesProduitRepository.findById(id).orElse(null);
    }

    @Override
    public CategoriesProduit saveNewCategoriesProduit(CategoriesProduit categoriesProduit) {
    	boolean exist= categoriesProduitRepository.existsByNomCat(categoriesProduit.getNomCat());
    	if(!exist && StringUtils.hasLength(categoriesProduit.getNomCat())) {
            return categoriesProduitRepository.save(categoriesProduit);

    	}else {
    		return null;
    	}
    }

    @Override
    public CategoriesProduit updateCategoriesProduit(CategoriesProduit categoriesProduit) {
    	boolean exist= categoriesProduitRepository.existsByNomCat(categoriesProduit.getNomCat());

    	if(!exist && StringUtils.hasLength(categoriesProduit.getNomCat())) {
            return categoriesProduitRepository.save(categoriesProduit);

    	}else {
    		return null;
    	}    }

    @Override
    public void deleteCategoriesProduit(Long id) {
        categoriesProduitRepository.deleteById(id);
    }
}
