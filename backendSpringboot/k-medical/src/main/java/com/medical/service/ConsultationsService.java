package com.medical.service;

import java.util.List;

import com.medical.model.Consultations;
import com.medical.model.DossierMedical;

public interface ConsultationsService {
	List<Consultations> findByDossierMedical(DossierMedical dossierMedical);
 	Consultations ajouterConsultations(Consultations consultations, Long idDossier, Long idDocteur);
	Consultations findByIdConsultation(Long id);
	Consultations addNoteToConsultation(Long consultationId, String note);
 }
