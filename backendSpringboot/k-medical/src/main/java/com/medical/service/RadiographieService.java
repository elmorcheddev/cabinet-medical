package com.medical.service;

import java.util.List;

import com.medical.model.Consultations;
import com.medical.model.Radiographie;
 
public interface RadiographieService {
 	List<Radiographie> findByConsultations(Consultations consultations);
	Radiographie addTreatment(Radiographie treatment, Long idCons);
	List<Radiographie> listRadiographie();

}
