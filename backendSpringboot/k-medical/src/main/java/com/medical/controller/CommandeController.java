package com.medical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.Assistant;
import com.medical.model.Commande;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.CommandeService;

 
@RestController
@RequestMapping(value="/pfe/commande")

public class CommandeController {
@Autowired
private CommandeService commandeService;
@Autowired
private UtilisateurRepo repo;
@GetMapping(value = "/all")
public List<Commande> list(){
	return commandeService.listCommandes();
}
@PostMapping(value = "/save")
public  Commande  saveCommande(@RequestBody Commande commande,@RequestParam Long idAssiatnt){
	return commandeService.ajouterCommande(commande, idAssiatnt) ;
	
}
@GetMapping(value = "/byId/{id}")
public  Commande  byId(@PathVariable("id") Long  id){
	return commandeService.rechercherParId(id);
	
}
@GetMapping(value = "/byIdAssitant/{id}")
public  List<Commande>  byIdAssitant(@PathVariable("id") Long  id){
	Assistant assistant=(Assistant) repo.findById(id).get();
	return commandeService.findByAssistant(assistant);
	
}
}
