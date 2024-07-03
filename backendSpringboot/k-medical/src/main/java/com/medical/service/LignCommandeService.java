package com.medical.service;

import java.util.List;

 
import com.medical.model.Commande;
import com.medical.model.LigneCommande;


public interface LignCommandeService {
	LigneCommande ajouterLigneCommande(LigneCommande ligneCommande );
	List<LigneCommande> list();
	void supprimerLignCommande(Long id);
	LigneCommande rechercherParId(Long id);
	List<LigneCommande> listByCommande(Commande commande);
	double calculeTotal(Long id);
}
