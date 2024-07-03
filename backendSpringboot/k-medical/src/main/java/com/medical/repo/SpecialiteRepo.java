package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Specialite;

public interface SpecialiteRepo extends JpaRepository<Specialite, Long> {
	boolean existsByNomSpecialite(String nomSpecialite);
}
