package com.medical.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Consultations;
import com.medical.model.Docteur;
import com.medical.model.DossierMedical;
import com.medical.repo.ConsultationsRepo;
import com.medical.repo.DocteurRepo;
import com.medical.repo.DossierMedicalRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.ConsultationsService;

@Service
public class ConsultationsServiceImpl implements ConsultationsService {
	@Autowired
	private ConsultationsRepo consultationsRepo;
	@Autowired
	private DossierMedicalRepo dossierMedicalRepo;
	@Autowired
	private UtilisateurRepo utilisateurRepo;

	@Override
	public List<Consultations> findByDossierMedical(DossierMedical dossierMedical) {
		// TODO Auto-generated method stub
		return consultationsRepo.findByDossierMedical(dossierMedical);
	}

	@Override
	public Consultations ajouterConsultations(Consultations consultations, Long idDossier, Long idDocteur) {
		DossierMedical dossierMedical = dossierMedicalRepo.findById(idDossier).get();
		Docteur docteur = (Docteur) utilisateurRepo.findById(idDocteur).get();
		consultations.setDateVisit(new Date());
		consultations.setDocteur(docteur);
		consultations.setDossierMedical(dossierMedical);
		consultations.setReason(consultations.getReason());
		return consultationsRepo.save(consultations);
	}

    @Override
    public Consultations addNoteToConsultation(Long consultationId, String note) {
        Consultations consultation = consultationsRepo.findById(consultationId)
                .orElseThrow(() -> new IllegalArgumentException("Consultation with id " + consultationId + " not found"));

        consultation.getNotes().add(note);
        return consultationsRepo.save(consultation);
    }
	@Override
	public Consultations findByIdConsultation(Long id) {
		// TODO Auto-generated method stub
		return consultationsRepo.findById(id).get();
	}

 

}
