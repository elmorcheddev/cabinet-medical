package com.medical.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import com.medical.model.Assistant;
import com.medical.model.Commande;

 
public interface CommandeService{
 	List<Commande> listCommandes();
	void supprimerCommandes(Long id);
	Commande rechercherParId(Long id);
	List<Commande> findByAssistant(Assistant assistant);

	Commande ajouterCommande(Commande commande, Long id);
}
