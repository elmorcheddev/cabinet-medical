package com.medical.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medical.model.Patient;
import com.medical.model.RendezVous;
import com.medical.model.Utilisateur;
import com.medical.model.Docteur;


public interface RendezVousRepo  extends JpaRepository<RendezVous, Long>{
 	List<RendezVous> findByPatient(Patient patient); 
 	List<RendezVous> findByJours(String jours);
boolean existsByDocteurAndJoursAndPatient(Docteur docteur, String jours, Patient patient);
 	List<RendezVous> findByDocteur(Docteur docteur);
	List<RendezVous> findByDocteurAndEtatIsTrue(Docteur docteur);
	List<RendezVous> findByEtatIsTrue();
	@Query("SELECT rv.patient FROM RendezVous rv WHERE rv.etat = true")
    List<Patient> findAcceptedAppointments();
	 @Query("SELECT rv.patient FROM RendezVous rv WHERE rv.etat = true AND rv.docteur.id = :docteurId")
	    List<Patient> findAcceptedAppointmentsByDocteurId(@Param("docteurId") Long docteurId);
	  @Query("SELECT DISTINCT r.patient FROM RendezVous r WHERE r.etat = true")
	    List<Patient> findPatientsWithConfirmedAppointments();

	    @Query("SELECT d.specialite.nomSpecialite, COUNT(r) " +
	           "FROM RendezVous r " +
	           "JOIN r.docteur d " +
 	           "GROUP BY d.specialite.nomSpecialite")
	    List<Object[]> countRendezVousBySpecialiteWithEtatTrue();
		@Query("SELECT FUNCTION('DATE', r.dateCreation), "
				+ "COUNT(r) FROM RendezVous r "
				+ "GROUP BY FUNCTION('DATE', r.dateCreation)")
		List<Object[]> countRendezVousByDate();
 }
