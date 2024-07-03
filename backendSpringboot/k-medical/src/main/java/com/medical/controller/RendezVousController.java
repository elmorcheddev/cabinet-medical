package com.medical.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.RendezVous;
import com.medical.model.Utilisateur;
import com.medical.service.RendezVousService;
import com.medical.service.UtilisateurService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/api/rendezvous")
public class RendezVousController {
	@Autowired
	private RendezVousService rendezVousService;
	@Autowired
	private UtilisateurService utilisateurService;
	@GetMapping(value = "/listRendezvous")
	public List<RendezVous> listRendezvous() {
		return rendezVousService.listRendezVous();
	}

	@PostMapping(value = "/envoyerRendezVous")
	public RendezVous envoyerRendezVous(@RequestPart("rendezVous") RendezVous rendezVous,
			@RequestParam Long idPatient,
			@RequestParam String selectedDate,
			@RequestParam Long idDocteur) {
		return rendezVousService.envoyerRendezVous(rendezVous, idPatient, idDocteur,selectedDate);

	}
	@PostMapping(value = "/changeEtatRendevous/{id}")
	public RendezVous envoyerRendezVous(@RequestBody RendezVous rendezVous,@PathVariable Long id) {
		return rendezVousService.updateAndChangeEtatRendezVous(rendezVous, id);

	}
	@GetMapping(value = "/numberRendezIndAY/{day}")
	public int numberInDay(@PathVariable String day) {
		return rendezVousService.numberRendevousInDay(day);
	}
	@GetMapping(value = "/byId/{id}")
	public RendezVous byId(@PathVariable Long id) {
		return rendezVousService.findByIdRendezVous(id);

	}
	@GetMapping(value = "/countByDocteur")
	public Map<String, Integer> countByDocteur() {
	    return rendezVousService.getRendezVousCountByDocteur();
	}
	@GetMapping(value = "/findByDocteur/{id}")
	public List<RendezVous> listRendezVousByDocteur(@PathVariable Long id) {
		Docteur docteur=(Docteur) utilisateurService.findByIdUtilisateur(id);
		return rendezVousService.findByDocteur(docteur);
	}
	@GetMapping(value = "/findByPatient/{id}")
	public List<RendezVous> findByPatient(@PathVariable Long id) {
		Patient patient=(Patient) utilisateurService.findByIdUtilisateur(id);
		return rendezVousService.findByPatient(patient);
	}
	@GetMapping(value = "/listRendezvousConfirme/{id}")
	public List<Patient> listRendezvousConfirme(@PathVariable Long id) {
		//Docteur docteur=(Docteur) utilisateurService.findByIdUtilisateur(id);
		return rendezVousService.findAcceptedAppointmentsByDocteurId(id);
	}
	@GetMapping(value = "/ALLRendezvousConfirme")
	public List<RendezVous> ALLRendezvousConfirme() {
 		return rendezVousService.findByEtatIsTrue();
	}
	@GetMapping(value = "/listPatient")
	public List<Patient> listPatient(){
		return rendezVousService.findPatientsWithConfirmedAppointments();
	}
	   @GetMapping("/countByDate")
	    public List<Object[]> getCountRendezVousByDate() {
	        return rendezVousService.getCountRendezVousByDate();
	    }
}
