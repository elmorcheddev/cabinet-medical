package com.medical.service.impl;

import java.util.Date;
import java.util.List;
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.medical.model.Assistant;
import com.medical.model.Commande;
import com.medical.repo.CommandeRepo;
import com.medical.repo.LignCommandeRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.CommandeService;

 

@Service
public class CommandeServiceImpl implements CommandeService{
@Autowired
private CommandeRepo commandeRepo;
@Autowired
private UtilisateurRepo utilisateurRepo;
@Autowired
private LignCommandeRepo  lignCommandeRepo;
	@Override
	public Commande ajouterCommande(Commande commande ,Long id) {
		Assistant assistant=(Assistant) utilisateurRepo.findById(id).get();
		commande.setAssistant(assistant);
		       commande.setOrderDate(new Date());
		       commande.setTotalprix(calculeTotal(commande.getId()));
      return commandeRepo.save(commande);}
				 

	@Override
	public List<Commande> listCommandes() {
		// TODO Auto-generated method stub
		return commandeRepo.findAll();
	}
 
	public double calculeTotal(Long id) {
		// TODO Auto-generated method stub
		try {
			double total= lignCommandeRepo.calculerTotal(id);
			Commande commande= commandeRepo.findById(id).get();
			commande.setTotalprix(total);
			if(total==0.0) {
				return 0;
			}else {
				return total;
			}
		} catch (Exception e) {
			e.printStackTrace();
					return 0;
		}
		
	}
	@Override
	public void supprimerCommandes(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Commande rechercherParId(Long id) {
		// TODO Auto-generated method stub
		return commandeRepo.findById(id).get();
	}


	@Override
	public List<Commande> findByAssistant(Assistant assistant) {
		// TODO Auto-generated method stub
		return commandeRepo.findByAssistant(assistant);
 
	}
	
}
