package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Consultations;
import com.medical.model.DossierMedical;

public interface ConsultationsRepo extends JpaRepository<Consultations, Long>{
List<Consultations> findByDossierMedical(DossierMedical dossierMedical);
}
