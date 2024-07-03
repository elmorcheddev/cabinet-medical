package com.medical.controller;

import com.medical.model.DossierMedical;
import com.medical.model.Questionnaire;
import com.medical.repo.DossierMedicalRepo;
import com.medical.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questionnaire")
public class QuestionnaireController {

    @Autowired
    private QuestionnaireService questionnaireService;
@Autowired
private DossierMedicalRepo dossierMedicalRepo;
    @GetMapping("/findbydossiermedical/{id}")
    public Questionnaire findByDossierMedical(@PathVariable Long id) {
    DossierMedical dossierMedical = dossierMedicalRepo.findById(id).get();
        return questionnaireService.findByDossierMedical(dossierMedical);
        
    }

    @PostMapping("/newQuestionnaire")
    public ResponseEntity<Questionnaire> addNewQuestionnaire(@RequestParam Long idDossier, @RequestBody Questionnaire questionnaire) {
        Questionnaire savedQuestionnaire = questionnaireService.addNewQuestionnaire(questionnaire, idDossier);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestionnaire);
    }
}
