package com.medical.service.impl;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.DossierMedical;
import com.medical.model.Patient;
import com.medical.repo.DossierMedicalRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.DossierMedicalService;

@Service
public class DossierMedicalServiceImpl implements DossierMedicalService {
	@Autowired
	private DossierMedicalRepo dossierMedicalRepo;
	@Autowired
	private UtilisateurRepo utilisateurRepo;

	@Override
	public DossierMedical findByPatient(Patient patient) {
		// TODO Auto-generated method stub
		return dossierMedicalRepo.findByPatient(patient);
	}

	@Override
	public DossierMedical addNewDossierMedical(DossierMedical dossierMedical, Long idPatient) {
		Patient patient = (Patient) utilisateurRepo.findById(idPatient).get();
		boolean exist = dossierMedicalRepo.existsByPatient(patient);
		if (!exist) {
			String numeroDossier = generateRandomCode(10);
			dossierMedical.setNumDossier("dossier" + numeroDossier);
			dossierMedical.setPatient(patient);
			return dossierMedicalRepo.save(dossierMedical);
		} else {
			return null;

		}
	}

	private String generateRandomCode(int length) {
		String characters = "0123456789";
		StringBuilder sb = new StringBuilder();
		Random random = new Random();

		for (int i = 0; i < length; i++) {
			int index = random.nextInt(characters.length());
			sb.append(characters.charAt(index));
		}

		return sb.toString();
	}

	@Override
	public DossierMedical findById(Long id) {
		// TODO Auto-generated method stub
		return dossierMedicalRepo.findById(id).get();
	}

	@Override
	public List<DossierMedical> findAllMedicalRecord() {
		// TODO Auto-generated method stub
        return dossierMedicalRepo.findAll();
	}
}
