package com.medical.service;

import java.util.List;

import com.medical.model.Consultations;
import com.medical.model.Ordonnance;

public interface OrdonnanceService {

	void deleteOrdonnance(Long id);

	List<Ordonnance> findByConsultation(Consultations consultation);

	List<Ordonnance> getAllOrdonnances();

	Ordonnance saveOrdonnance(Ordonnance ordonnance, Long idConst);

}
