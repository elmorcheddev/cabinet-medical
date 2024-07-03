package com.medical.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.medical.model.Assistant;
import com.medical.model.Docteur;
import com.medical.model.Patient;
import com.medical.model.ResourceHumaine;
import com.medical.model.ResponsableStock;
import com.medical.model.RoleUtilisateur;
import com.medical.model.Secretaire;
import com.medical.model.Specialite;
import com.medical.model.Utilisateur;
import com.medical.repo.DocteurRepo;
import com.medical.repo.RoleRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.UtilisateurService;
@Service
public class UtilisateurServiceImpl implements UtilisateurService {
@Autowired
private UtilisateurRepo utilisateurRepo;
@Autowired private RoleRepo roleRepo;
@Autowired private BCryptPasswordEncoder passwordEncoder;
@Autowired private DocteurRepo docteurRepo;
@Autowired
private JavaMailSender mailSender;

	@Override
	public Docteur ajouterDocteur(Docteur docteur) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("DOCTEUR");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(docteur.getEmail());
	         if (!Exist) {
	        	 docteur.setNom(docteur.getNom());
	        	 docteur.setPrenom(docteur.getPrenom());
	        	 docteur.setEmail(docteur.getEmail());
	        	 docteur.setPassword(passwordEncoder.encode(docteur.getPassword()));
	        	 docteur.setConfirmPasswrod(passwordEncoder.encode(docteur.getConfirmPasswrod()));
	        	 docteur.setAdresse(docteur.getAdresse());
	        	 docteur.setDateCreation(new Date());
	        	 docteur.setDateNaissance(docteur.getDateNaissance());
	        	 docteur.setNumeroOrdre(docteur.getNumeroOrdre());
	        	 docteur.setSpecialite(docteur.getSpecialite());
	        	 docteur.setEtat(true);
	        	 docteur.setImg(docteur.getImg());
	        	 docteur.setTel(docteur.getTel());
	        	 docteur.setRoleUtilisateurs(listRole);
	        	 docteur.setEtat(true);

	          
	        return  utilisateurRepo.save(docteur); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public Utilisateur ajouterSuperAdmin(Utilisateur utilisateur) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("SUPERADMIN");
 		    boolean adminbyRolesExists = utilisateurRepo.existsByRoleUtilisateursContains(Collections.singleton(roleRepo.findByNomRoles("SUPERADMIN")));

	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(utilisateur.getEmail());
	         if (!Exist && !adminbyRolesExists) {
	        	 utilisateur.setNom(utilisateur.getNom());
	        	 utilisateur.setPrenom(utilisateur.getPrenom());
	        	 utilisateur.setEmail(utilisateur.getEmail());
	        	 utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
	        	 utilisateur.setAdresse(utilisateur.getAdresse());
 	        	 utilisateur.setEtat(true);
 	        	 utilisateur.setRoleUtilisateurs(listRole);
	        	 utilisateur.setEtat(true);

	          
	        return  utilisateurRepo.save(utilisateur); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public Assistant ajouterAssitant(Assistant assistant) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("ASSISTANT");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(assistant.getEmail());
	         if (!Exist) {
	        	 assistant.setNom(assistant.getNom());
	        	 assistant.setPrenom(assistant.getPrenom());
	        	 assistant.setEmail(assistant.getEmail());
	        	 assistant.setPassword(passwordEncoder.encode(assistant.getPassword()));
	        	 assistant.setConfirmPasswrod(passwordEncoder.encode(assistant.getConfirmPasswrod()));
	        	 assistant.setAdresse(assistant.getAdresse());
	        	 assistant.setDateCreation(new Date());
	        	 assistant.setDateNaissance(assistant.getDateNaissance());
 	        	 assistant.setDocteur(assistant.getDocteur());
	        	 assistant.setEtat(true);
	        	 assistant.setImg(assistant.getImg());
	        	 assistant.setTel(assistant.getTel());
	        	 assistant.setRoleUtilisateurs(listRole);
	        	 assistant.setEtat(true);

	          
	        return  utilisateurRepo.save(assistant); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public Patient ajouterPatient(Patient patient) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("PATIENT");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(patient.getEmail());
	         if (!Exist) {
	        	 patient.setNom(patient.getNom());
	        	 patient.setPrenom(patient.getPrenom());
	        	 patient.setEmail(patient.getEmail());
	        	 patient.setPassword(passwordEncoder.encode(patient.getPassword()));
	        	 patient.setConfirmPasswrod(passwordEncoder.encode(patient.getConfirmPasswrod()));

	        	 patient.setAdresse(patient.getAdresse());
	        	 patient.setDateCreation(new Date());
	        	 patient.setDateNaissance(patient.getDateNaissance());
 	        	 patient.setEtat(true);
	        	 patient.setImg(patient.getImg());
	        	 patient.setTel(patient.getTel());
	        	 patient.setRoleUtilisateurs(listRole);
	        	 patient.setEtat(true);

	          
	        return  utilisateurRepo.save(patient); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public ResourceHumaine ajouterResourceHumaine(ResourceHumaine resourceHumaine) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("DOCTEUR");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(resourceHumaine.getEmail());
	         if (!Exist) {
	        	 resourceHumaine.setNom(resourceHumaine.getNom());
	        	 resourceHumaine.setPrenom(resourceHumaine.getPrenom());
	        	 resourceHumaine.setEmail(resourceHumaine.getEmail());
	        	 resourceHumaine.setPassword(passwordEncoder.encode(resourceHumaine.getPassword()));
	        	 resourceHumaine.setAdresse(resourceHumaine.getAdresse());
	        	 resourceHumaine.setDateCreation(new Date());
	        	 resourceHumaine.setDateNaissance(resourceHumaine.getDateNaissance()); 
	        	 resourceHumaine.setEtat(true);
	        	 resourceHumaine.setImg(resourceHumaine.getImg());
	        	 resourceHumaine.setTel(resourceHumaine.getTel());
	        	 resourceHumaine.setRoleUtilisateurs(listRole);
	        	 resourceHumaine.setEtat(true);

	          
	        return  utilisateurRepo.save(resourceHumaine); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public Secretaire ajouterSecretaire(Secretaire Secretaire) {
 	        RoleUtilisateur roles = roleRepo.findByNomRoles("SECRITAIRE");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(Secretaire.getEmail());
	         if (!Exist) {
	        	 Secretaire.setNom(Secretaire.getNom());
	        	 Secretaire.setPrenom(Secretaire.getPrenom());
	        	 Secretaire.setEmail(Secretaire.getEmail());
	        	 Secretaire.setPassword(passwordEncoder.encode(Secretaire.getPassword()));
	        	 Secretaire.setConfirmPasswrod(passwordEncoder.encode(Secretaire.getConfirmPasswrod()));
	        	 Secretaire.setAdresse(Secretaire.getAdresse());
	        	 Secretaire.setDateCreation(new Date());
	        	 Secretaire.setDateNaissance(Secretaire.getDateNaissance()); 
	        	 Secretaire.setEtat(true);
	        	 Secretaire.setImg(Secretaire.getImg());
	        	 Secretaire.setTel(Secretaire.getTel());
	        	 Secretaire.setRoleUtilisateurs(listRole);
	        	 Secretaire.setEtat(true);

	          
	        return  utilisateurRepo.save(Secretaire); 
	         }else {
	        	 return null;
	         }
	}
	@Override
	public List<Utilisateur> findByRoleName(String roleName) {
		// TODO Auto-generated method stub
		return utilisateurRepo.findByRoleName(roleName);
	}
	@Override
	public List<Docteur> findBySpecialite(Specialite specialite) {
		// TODO Auto-generated method stub
		return docteurRepo.findBySpecialite(specialite);
	}
	@Override
	public Utilisateur findByIdUtilisateur(Long id) {
		// TODO Auto-generated method stub
		return utilisateurRepo.findById(id).orElse(null);
	}
	@Override
	public ResponsableStock ajouterResponsableStock(ResponsableStock responsableStock) {
		 RoleUtilisateur roles = roleRepo.findByNomRoles("RESPONSABLESTOCK");
	        Set<RoleUtilisateur> listRole=new HashSet<>();
	         listRole.add(roles);
	         boolean Exist = utilisateurRepo.existsByEmail(responsableStock.getEmail());
	         if (!Exist) {
	        	 responsableStock.setNom(responsableStock.getNom());
	        	 responsableStock.setPrenom(responsableStock.getPrenom());
	        	 responsableStock.setEmail(responsableStock.getEmail());
	        	 responsableStock.setPassword(passwordEncoder.encode(responsableStock.getPassword()));
	        	 responsableStock.setConfirmPasswrod(passwordEncoder.encode(responsableStock.getConfirmPasswrod()));
	        	 responsableStock.setAdresse(responsableStock.getAdresse());
	        	 responsableStock.setDateCreation(new Date());
	        	 responsableStock.setDateNaissance(responsableStock.getDateNaissance());
	        	  responsableStock.setEtat(true);
	        	 responsableStock.setImg(responsableStock.getImg());
	        	 responsableStock.setTel(responsableStock.getTel());
	        	 responsableStock.setRoleUtilisateurs(listRole);
	        	 responsableStock.setEtat(true);

	          
	        return  utilisateurRepo.save(responsableStock); 
	         }else {
	        	 return null;
	         }
	}


    public void processForgotPassword(String email) {
        Utilisateur user = utilisateurRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("No user found with email: " + email);
        }

        // Generate a reset token
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        utilisateurRepo.save(user);

        // Send email with reset link
        String resetLink = "http://localhost:4200/reset-password?token=" + token;
        sendEmail(user.getEmail(), resetLink);
    }

    private void sendEmail(String to, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request");
            message.setText("Click the link to reset your password: " + resetLink);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            // Log the exception and rethrow it or handle it as needed
        }
    }

    public Utilisateur getUserByResetToken(String token) {
        return utilisateurRepo.findByResetToken(token);
    }

    public void updatePassword(Utilisateur user, String newPassword) {
        user.setPassword(newPassword);
        utilisateurRepo.save(user);
    }
   
	@Override
	public List<Object[]> countPatientsByDateCreation() {
		// TODO Auto-generated method stub
        return utilisateurRepo.countPatientsByDay();
	}
} 