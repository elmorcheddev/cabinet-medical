package com.medical.service;

 
 
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.medical.model.Assistant;
import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.ResourceHumaine;
import com.medical.model.ResponsableStock;
import com.medical.model.Secretaire;
import com.medical.model.Specialite;
import com.medical.model.Utilisateur; 
 
public interface UtilisateurService {
	ResponsableStock ajouterResponsableStock(ResponsableStock responsableStock);
		Docteur ajouterDocteur(Docteur docteur);
		Assistant ajouterAssitant(Assistant docteur);
		ResourceHumaine ajouterResourceHumaine(ResourceHumaine resourceHumaine);
		Secretaire ajouterSecretaire(Secretaire Secretaire);
		Utilisateur ajouterSuperAdmin(Utilisateur utilisateur);
		Patient ajouterPatient(Patient patient);
	    List<Utilisateur> findByRoleName(String roleName);
	    List<Docteur> findBySpecialite(Specialite specialite);
		Utilisateur findByIdUtilisateur(Long id);
	    List<Object[]> countPatientsByDateCreation();
 

}
