package com.medical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.Consultations;
import com.medical.model.DossierMedical;
import com.medical.service.ConsultationsService;
import com.medical.service.DossierMedicalService;

@RestController
@RequestMapping(value = "/api/consultation")
public class ConsultationsController {
@Autowired
private ConsultationsService consultationsService;
@Autowired
private DossierMedicalService dossierMedicalService;
@GetMapping(value = "/byDossierMedical/{id}")
public List<Consultations> findByDossierMedical(@PathVariable Long id){
	DossierMedical dossierMedical=dossierMedicalService.findById(id);
	return consultationsService.findByDossierMedical(dossierMedical);
}
@GetMapping(value = "/byId/{id}")
public  Consultations byId(@PathVariable Long id){
 	return consultationsService.findByIdConsultation(id);
}
@PostMapping("/{consultationId}/add-note")
public ResponseEntity<?> addNoteToConsultation(@PathVariable Long consultationId, @RequestBody String note) {
    Consultations updatedConsultation = consultationsService.addNoteToConsultation(consultationId, note);
    return ResponseEntity.ok(updatedConsultation);
}
 
@PostMapping(value = "/ajouterConultation")
public Consultations addNewConsultations(@RequestBody Consultations consultations , @RequestParam Long idDossier , @RequestParam Long idDocteur) {
	return consultationsService.ajouterConsultations(consultations, idDossier, idDocteur);
}
}
