package com.medical.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.DossierMedical;
import com.medical.model.Patient;

import java.util.List;


public interface DossierMedicalRepo extends JpaRepository<DossierMedical, Long>{
 DossierMedical  findByPatient(Patient patient);
boolean existsByPatient(Patient patient);
}
