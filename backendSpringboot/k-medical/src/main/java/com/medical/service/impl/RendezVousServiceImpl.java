package com.medical.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.RendezVous;
import com.medical.model.Utilisateur;
import com.medical.repo.RendezVousRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.RendezVousService;
@Service
public class RendezVousServiceImpl implements RendezVousService{

	@Autowired
	private RendezVousRepo rendezVousRepo;
	@Autowired
	private UtilisateurRepo utilisateurRepo;
	@Override
	public List<RendezVous> listRendezVous() {
		// TODO Auto-generated method stub
		return rendezVousRepo.findAll();
	}

	@Override
	public RendezVous envoyerRendezVous(RendezVous rendezVous , Long idPatient , Long idDocteur , String selectedDate) {
		Patient patient = (Patient) utilisateurRepo.findById(idPatient).get();
		Docteur docteur = (Docteur)utilisateurRepo.findById(idDocteur).get();
		boolean exist=rendezVousRepo.existsByDocteurAndJoursAndPatient(docteur, selectedDate, patient);
		System.out.println(exist);
		int numberRendezVous=rendezVousRepo.findByJours(selectedDate).size();
		System.out.println(numberRendezVous);
		if(!exist && numberRendezVous<=16) {
			rendezVous.setDocteur(docteur);
			rendezVous.setEnattent(true);
			rendezVous.setEtat(false);
			rendezVous.setJours(selectedDate); 
			rendezVous.setPatient(patient);
			return rendezVousRepo.save(rendezVous);
		}else {
			return null;
		}
		
	}


	@Override
	public List<RendezVous> findByDocteur(Docteur docteur) {
		// TODO Auto-generated method stub
		return rendezVousRepo.findByDocteur(docteur);
	}

	@Override
	public List<RendezVous> findByPatient(Patient patient) {
		// TODO Auto-generated method stub
		return rendezVousRepo.findByPatient(patient);
	}

	@Override
	public RendezVous updateAndChangeEtatRendezVous(RendezVous rendezVous,Long id) {
RendezVous UpdaterendezVous =rendezVousRepo.findById(id).get();
if(UpdaterendezVous.isEtat()==false ) {
	UpdaterendezVous.setEnattent(false);
	UpdaterendezVous.setEtat(true);
	UpdaterendezVous.setHeurs(rendezVous.getHeurs());
	return rendezVousRepo.save(UpdaterendezVous);
}else {
	UpdaterendezVous.setEnattent(true);
	UpdaterendezVous.setEtat(false);
	UpdaterendezVous.setHeurs(rendezVous.getHeurs());
	return rendezVousRepo.save(rendezVous);
}
		 
	}

	@Override
	public RendezVous findByIdRendezVous(Long id) {
		// TODO Auto-generated method stub
		return rendezVousRepo.findById(id).get();
	}

	@Override
	public List<RendezVous> findByDocteurAndEtatIsTrue(Docteur docteur) {
		// TODO Auto-generated method stub
		return rendezVousRepo.findByDocteurAndEtatIsTrue(docteur);
	}

	@Override
	public List<Patient> findAcceptedAppointments() {
		// TODO Auto-generated method stub
		return rendezVousRepo.findAcceptedAppointments();
	}
	@Override
public int numberRendevousInDay(String day) {
	return rendezVousRepo.findByJours(day).size();
}
	@Override
	public List<Patient> findAcceptedAppointmentsByDocteurId(Long docteurId) {
		// TODO Auto-generated method stub
		return rendezVousRepo.findAcceptedAppointmentsByDocteurId(docteurId);
	}

	@Override
	public List<Patient> findPatientsWithConfirmedAppointments() {
		// TODO Auto-generated method stub
		return rendezVousRepo.findPatientsWithConfirmedAppointments();
	}

	@Override
	public List<RendezVous> findByEtatIsTrue() {
		// TODO Auto-generated method stub
		return rendezVousRepo.findByEtatIsTrue();
	}
	@Override
	  public Map<String, Integer> getRendezVousCountByDocteur() {
	        List<Object[]> result = rendezVousRepo.countRendezVousBySpecialiteWithEtatTrue();
	        Map<String, Integer> doctorRendezVousCount = new HashMap<>();
	        for (Object[] row : result) {
	            doctorRendezVousCount.put((String) row[0], ((Number) row[1]).intValue());
	        }
	        return doctorRendezVousCount;
	    }
	@Override
	  public List<Object[]> getCountRendezVousByDate() {
	        return rendezVousRepo.countRendezVousByDate();
	    }
}
