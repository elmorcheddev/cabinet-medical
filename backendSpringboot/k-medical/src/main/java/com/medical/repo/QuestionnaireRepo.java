package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.DossierMedical;
import com.medical.model.Questionnaire;

public interface QuestionnaireRepo extends JpaRepository<Questionnaire, Long>{
Questionnaire findByDossierMedical(DossierMedical dossierMedical);
}
