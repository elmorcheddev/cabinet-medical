package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.RoleUtilisateur;

public interface RoleRepo extends JpaRepository<RoleUtilisateur, Long> {
	RoleUtilisateur findByNomRoles(String nomRoles);
}
