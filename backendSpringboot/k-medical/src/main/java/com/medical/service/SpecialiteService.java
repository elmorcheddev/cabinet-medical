package com.medical.service;

import java.util.List;

import com.medical.model.Specialite;

public interface SpecialiteService {

 	Specialite findByIdSpecialite(Long id);
	List<Specialite> listSpecialites();
	Specialite ajouterSpecialite(Specialite specialite, Long idAdmin);
	Specialite updateSpecialite(Long id, Specialite updatedSpecialite);
 }
