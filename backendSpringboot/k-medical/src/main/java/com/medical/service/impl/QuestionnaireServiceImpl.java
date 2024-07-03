package com.medical.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.DossierMedical;
import com.medical.model.Questionnaire;
import com.medical.repo.DossierMedicalRepo;
import com.medical.repo.QuestionnaireRepo;
import com.medical.service.QuestionnaireService;
@Service
public class QuestionnaireServiceImpl implements QuestionnaireService{
@Autowired
private QuestionnaireRepo questionnaireRepo;
@Autowired
private DossierMedicalRepo dossierMedicalRepo;
	@Override
	public Questionnaire findByDossierMedical(DossierMedical dossierMedical) {
		// TODO Auto-generated method stub
		return questionnaireRepo.findByDossierMedical(dossierMedical);
	}

	@Override
	public Questionnaire addNewQuestionnaire(Questionnaire questionnaire, Long idDossier) {
	    DossierMedical dossierMedical = dossierMedicalRepo.findById(idDossier).orElse(null);
	    if (dossierMedical != null) {
	        String numeroQ = generateRandomCode(10);
	        questionnaire.setNumQuestionnaires("Q" + numeroQ);
	        questionnaire.setDossierMedical(dossierMedical);
	        // Set pathologies list based on checkboxes
	        List<String> pathologies = new ArrayList<>();
	        if (questionnaire.isTuberculose()) {
	            pathologies.add("Tuberculose");
	        }
	        if (questionnaire.isDiabete()) {
	            pathologies.add("Diabète");
	        }
	        if (questionnaire.isCardiopathie()) {
	            pathologies.add("Cardiopathie");
	        }
	        if (questionnaire.isAutres()) {
	            pathologies.add(questionnaire.getAutresPathologies());
	        }
	        questionnaire.setPathologies(pathologies);
	        return questionnaireRepo.save(questionnaire);
	    }
	    return null; // Handle error or return appropriate response
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
}
