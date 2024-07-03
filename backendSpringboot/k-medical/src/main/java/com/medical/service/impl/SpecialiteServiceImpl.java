package com.medical.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Specialite;
import com.medical.model.Utilisateur;
import com.medical.repo.SpecialiteRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.SpecialiteService;
@Service
public class SpecialiteServiceImpl implements SpecialiteService{

	@Autowired
	private SpecialiteRepo specialiteRepo;
	 @Autowired
	 private UtilisateurRepo utilisateurRepo;
	@Override
	 public Specialite ajouterSpecialite(Specialite specialite , Long idAdmin) { 
         boolean exist = specialiteRepo.existsByNomSpecialite(specialite.getNomSpecialite());
         Utilisateur createBy= utilisateurRepo.findById(idAdmin).get();
         if (!exist) {
        	 specialite.setImg(specialite.getImg());
            specialite.setNomSpecialite(specialite.getNomSpecialite());
            specialite.setCreateBy(createBy);
            return specialiteRepo.save(specialite);
        } else {
       	 System.out.println("speci exist ");

            return null;
        }
    }

	@Override
	public Specialite findByIdSpecialite(Long id) {
		// TODO Auto-generated method stub
		return specialiteRepo.findById(id).orElseThrow();
	}

	@Override
	public List<Specialite> listSpecialites() {
		// TODO Auto-generated method stub
		return specialiteRepo.findAll();
	}
	@Override
	public Specialite updateSpecialite(Long id, Specialite updatedSpecialite) {
        Optional<Specialite> optionalSpecialite = specialiteRepo.findById(id);
        if (optionalSpecialite.isPresent()) {
            Specialite existingSpecialite = optionalSpecialite.get();
            existingSpecialite.setNomSpecialite(updatedSpecialite.getNomSpecialite());
            existingSpecialite.setDateCreation(updatedSpecialite.getDateCreation());
            existingSpecialite.setDescription(updatedSpecialite.getDescription());
            existingSpecialite.setImg(updatedSpecialite.getImg());
            existingSpecialite.setCreateBy(updatedSpecialite.getCreateBy());
            return specialiteRepo.save(existingSpecialite);
        } else {
            throw new RuntimeException("Specialite not found with id " + id);
        }
    }
}
