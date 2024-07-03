package com.medical.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Consultations;
import com.medical.model.Radiographie;
 import com.medical.repo.ConsultationsRepo;
import com.medical.repo.RadiographieRepo;
import com.medical.service.RadiographieService;
@Service
public class RadiographieServiceImpl implements RadiographieService {
@Autowired
private RadiographieRepo radiographieRepo;
@Autowired
private ConsultationsRepo consultationsRepo;
	@Override
	public List<Radiographie> listRadiographie() {
		// TODO Auto-generated method stub
		return radiographieRepo.findAll();
	}

	@Override
	public List<Radiographie> findByConsultations(Consultations consultations) {
		// TODO Auto-generated method stub
		return radiographieRepo.findByConsultations(consultations);
	}

	@Override
	public Radiographie addTreatment(Radiographie radiographie, Long idCons) {
		 Consultations consultations = consultationsRepo.findById(idCons).orElse(null);
	        if (consultations == null) {
	            throw new IllegalArgumentException("Consultation not found with id: " + idCons);
	        }

	        radiographie.setConsultations(consultations);
	        radiographie.setImg(radiographie.getImg());
 	        Radiographie savedRadiographie = radiographieRepo.save(radiographie);

	       
	        return radiographieRepo.save(savedRadiographie);
	}

}
