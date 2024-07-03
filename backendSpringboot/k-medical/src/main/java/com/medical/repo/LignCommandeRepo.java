package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medical.model.Commande;
import com.medical.model.LigneCommande;
 

public interface LignCommandeRepo extends JpaRepository<LigneCommande, Long> {
   
 List<LigneCommande> findByCommande(Commande commande);
@Query(value="SELECT sum(total_price) FROM comercial.ligne_commande lc where lc.id_cmd=?1", nativeQuery = true)
 double calculerTotal(Long id);
}
