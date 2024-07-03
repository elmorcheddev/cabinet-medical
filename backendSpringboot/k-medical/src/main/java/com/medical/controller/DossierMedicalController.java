package com.medical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.DossierMedical;
import com.medical.model.Patient;
import com.medical.service.DossierMedicalService;
import com.medical.service.UtilisateurService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(value = "/api/dossier")
public class DossierMedicalController {
@Autowired
private DossierMedicalService dossierMedicalService;
@Autowired
private UtilisateurService utilisateurService;
@GetMapping(value = "/byPatient/{id}")
public  DossierMedical  getListDossierMedicalByPATIENT(@PathVariable Long id) {
	Patient patient=(Patient) utilisateurService.findByIdUtilisateur(id);
    return dossierMedicalService.findByPatient(patient);
}
@GetMapping(value = "/all")
public List<DossierMedical> getAllDossierMedical() {
    return dossierMedicalService.findAllMedicalRecord();
}
@PostMapping(value = "/addDossier")
public DossierMedical addNewDossier(@RequestBody DossierMedical dossierMedical , @RequestParam Long idPatient) {
	return dossierMedicalService.addNewDossierMedical(dossierMedical, idPatient);
}
}
