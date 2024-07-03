package com.medical.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.medical.model.Assistant;
import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.ResourceHumaine;
import com.medical.model.ResponsableStock;
import com.medical.model.Secretaire;
import com.medical.model.Specialite;
import com.medical.model.Utilisateur;
import com.medical.service.SpecialiteService;
import com.medical.service.UtilisateurService;

@RestController
@RequestMapping(value = "/api/utilisateur")
public class UtilisateuController {
@Autowired
private UtilisateurService utilisateurService;
@Autowired
private SpecialiteService specialiteService;
@PostMapping(value = "/ajouterDocteur")
public Docteur ajouterDocteur(@RequestPart("docteur") Docteur docteur , @RequestPart("img") MultipartFile img) {
	try {
		docteur.setImg(img.getBytes());
		return utilisateurService.ajouterDocteur(docteur);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return null;
	}
}
@PostMapping(value = "/ajouterResponsableStock")
public ResponsableStock ajouterResponsableStock(@RequestPart("resStock") ResponsableStock responsableStock , @RequestPart("img") MultipartFile img) {
	try {
		responsableStock.setImg(img.getBytes());
		return utilisateurService.ajouterResponsableStock(responsableStock);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return null;
	}
}
@PostMapping(value = "/ajouterSuperAdmin")
public Utilisateur ajouterSuperAdmin(@RequestBody Utilisateur utilisateur) {
	 
 		return utilisateurService.ajouterSuperAdmin(utilisateur);
	 
}
@PostMapping(value = "/ajouterAssitant")
public Assistant ajouterAssitant(@RequestPart("assistant") Assistant assistant , @RequestPart("img") MultipartFile img) {
	try {
		assistant.setImg(img.getBytes());
		return utilisateurService.ajouterAssitant(assistant);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return null;
	}
}
@PostMapping(value = "/ajouterSecritaire")
public Secretaire ajouterSecritaire(@RequestPart("secretaire") Secretaire secretaire , @RequestPart("img") MultipartFile img) {
	try {
		secretaire.setImg(img.getBytes());
		return utilisateurService.ajouterSecretaire(secretaire);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return null;
	}
}
@PostMapping(value = "/ajouterRh")
public ResourceHumaine ajouterDocteur(@RequestPart("rh") ResourceHumaine resourceHumaine , @RequestPart("img") MultipartFile img) {
	try {
		resourceHumaine.setImg(img.getBytes());
		return utilisateurService.ajouterResourceHumaine(resourceHumaine);
	} catch (IOException e) {
 		e.printStackTrace();
		return null;
	}
}
@PostMapping(value = "/inscriptionSuper")
public Utilisateur inscriptionSuper(@RequestBody Utilisateur utilisateur) {
	 
		return utilisateurService.ajouterSuperAdmin(utilisateur);
	 
}
@PostMapping(value = "/inscriptionPatient")
public Patient inscriptionPatient(@RequestPart("patient") Patient patient , @RequestPart("img") MultipartFile img) {
	try {
		patient.setImg(img.getBytes());
		return utilisateurService.ajouterPatient(patient);
	} catch (IOException e) {
 		e.printStackTrace();
		return null;
	}
}
@GetMapping(value = "/listdocteur")
public List<Utilisateur> listDocteurs(){
	return utilisateurService.findByRoleName("DOCTEUR");
}
@GetMapping(value = "/listdocteurPatient")
public List<Utilisateur> listdocteurPatient(){
	return utilisateurService.findByRoleName("DOCTEUR");
}
@GetMapping(value = "/listAssistant")
public List<Utilisateur> listAssistant(){
	return utilisateurService.findByRoleName("ASSISTANT");
}
@GetMapping(value = "/listResponsableStock")
public List<Utilisateur> listResponsableStock(){
	return utilisateurService.findByRoleName("RESPONSABLESTOCK");
}
@GetMapping(value = "/listScretaire")
public List<Utilisateur> listScretaire(){
	return utilisateurService.findByRoleName("SECRITAIRE");
}
@GetMapping(value = "/listPatient")
public List<Utilisateur> listPatient(){
	return utilisateurService.findByRoleName("PATIENT");
}
@GetMapping(value = "/findBySpecialite/{id}")
public List<Docteur> findBySpecialite(@PathVariable Long id){
	Specialite specialite =specialiteService.findByIdSpecialite(id);
	return utilisateurService.findBySpecialite(specialite);
}
@GetMapping(value = "/byId/{id}")
public Utilisateur getByID(@PathVariable Long id) {
	return utilisateurService.findByIdUtilisateur(id);
}
@GetMapping("/patientcountByDate")
public List<Object[]> getCountPatientsByDateCreation() {
    return utilisateurService. countPatientsByDateCreation();
}
}
