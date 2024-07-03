package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Consultations;
import com.medical.model.Treatment;

public interface TreatmentRepo extends JpaRepository<Treatment, Long>{
List<Treatment> findByConsultations(Consultations consultations);
}
