package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Consultations;
import com.medical.model.Ordonnance;
import java.util.List;


public interface OrdonnanceRepository extends JpaRepository<Ordonnance, Long> {
	List<Ordonnance> findByConsultation(Consultations consultation);
}
