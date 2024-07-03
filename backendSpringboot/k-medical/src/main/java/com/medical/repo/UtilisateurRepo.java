package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

 import com.medical.model.RoleUtilisateur;
import com.medical.model.Utilisateur;
import java.util.List;
import java.util.Set;


public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long>{
	
	boolean existsByEmail(String email);
	Utilisateur  findByEmail(String email); 
	 @Query("SELECT u FROM Utilisateur u JOIN u.roleUtilisateurs r WHERE r.nomRoles = :roleName")
	    List<Utilisateur> findByRoleName(@Param("roleName") String roleName);
	Utilisateur findByResetToken(String token);
	 @Query("SELECT FUNCTION('DATE', p.dateCreation), COUNT(p) FROM Patient p GROUP BY FUNCTION('DATE', p.dateCreation)")
	    List<Object[]> countPatientsByDay();
	 	boolean existsByRoleUtilisateursContains(Set<RoleUtilisateur> singleton);

}
