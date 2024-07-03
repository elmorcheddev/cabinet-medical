package com.medical.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.medical.model.Commande;
import com.medical.model.LigneCommande;
import com.medical.model.Product;
import com.medical.repo.CommandeRepo;
import com.medical.repo.LignCommandeRepo;
import com.medical.repo.ProductRepo;
import com.medical.service.LignCommandeService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
public class LigneCommandeServiceImpl implements LignCommandeService{
@Autowired
private LignCommandeRepo lignCommandeRepo;
@Autowired
private CommandeRepo commandeRepo;
@Autowired ProductRepo productRepo;
	@Override
	public LigneCommande ajouterLigneCommande(LigneCommande ligneCommande) {
		// TODO Auto-generated method stub
		Commande commande=commandeRepo.findById(ligneCommande.getCommande().getId()).get();
		
		commande.setTotalprix(calculeTotal(commande.getId()));
		commandeRepo.save(commande);
 		ligneCommande.setCommande(commande);
 		Product art=productRepo.findById(ligneCommande.getProduct().getId()).get();
 		 
 		art.setQteProdcut(art.getQteProdcut()-ligneCommande.getQuantity());
 		productRepo.save(art);
 
		ligneCommande.setProduct(art);
		double prixTotal=ligneCommande.getProduct().getPrixProduct()*ligneCommande.getQuantity();
			
		ligneCommande.setTotalPrice(prixTotal);
		return lignCommandeRepo.save(ligneCommande);
	}

	@Override
	public List<LigneCommande> list() {
		// TODO Auto-generated method stub
		return lignCommandeRepo.findAll();
	}

	@Override
	public void supprimerLignCommande(Long id) {
		// TODO Auto-generated method stub
		lignCommandeRepo.deleteById(id);
	}

	@Override
	public LigneCommande rechercherParId(Long id) {
		// TODO Auto-generated method stub
		return lignCommandeRepo.findById(id).get();
	}

	@Override
	public List<LigneCommande> listByCommande(Commande commande) {
		// TODO Auto-generated method stub
		return lignCommandeRepo.findByCommande(commande);
	}

	@Override
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


}
