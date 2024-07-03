package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Assistant;
import com.medical.model.Commande;
import java.util.List;


 
public interface CommandeRepo extends JpaRepository<Commande, Long>{
List<Commande> findByAssistant(Assistant assistant);
}
