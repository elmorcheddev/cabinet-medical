package com.medical.service;

import java.util.List;

import com.medical.model.DossierMedical;
import com.medical.model.Patient;

public interface DossierMedicalService {
	DossierMedical findByPatient(Patient patient);
	DossierMedical findById(Long id);
 	DossierMedical addNewDossierMedical(DossierMedical dossierMedical, Long idPatient);
	List<DossierMedical> findAllMedicalRecord(); 
}
