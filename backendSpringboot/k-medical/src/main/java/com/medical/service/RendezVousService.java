package com.medical.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.repository.query.Param;

import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.RendezVous;
import com.medical.model.Utilisateur;

public interface RendezVousService {
	List<RendezVous> listRendezVous();
 	List<RendezVous> findByPatient(Patient patient);
 	List<RendezVous> findByDocteur(Docteur docteur);
   	RendezVous updateAndChangeEtatRendezVous(RendezVous rendezVous, Long id);
	RendezVous findByIdRendezVous(Long id);
	List<RendezVous> findByDocteurAndEtatIsTrue(Docteur docteur);
    List<Patient> findAcceptedAppointments();
    List<Patient> findAcceptedAppointmentsByDocteurId(Long docteurId);
	RendezVous envoyerRendezVous(RendezVous rendezVous, Long idPatient, Long idDocteur, String selectedDate);
	int numberRendevousInDay(String day);
    List<Patient> findPatientsWithConfirmedAppointments();
	List<RendezVous> findByEtatIsTrue();
	Map<String, Integer> getRendezVousCountByDocteur();
	List<Object[]> getCountRendezVousByDate();

}
