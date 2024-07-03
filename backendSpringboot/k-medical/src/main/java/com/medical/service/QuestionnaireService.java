package com.medical.service;

import java.util.List;

import com.medical.model.DossierMedical;
import com.medical.model.Questionnaire;

public interface QuestionnaireService {
	Questionnaire findByDossierMedical(DossierMedical dossierMedical);
	Questionnaire addNewQuestionnaire(Questionnaire questionnaire , Long idDossier);
}
