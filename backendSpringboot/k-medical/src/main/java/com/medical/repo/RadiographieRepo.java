package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Consultations;
import com.medical.model.Radiographie;

public interface RadiographieRepo extends JpaRepository<Radiographie, Long>{
List<Radiographie> findByConsultations(Consultations consultations);
}
