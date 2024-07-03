package com.medical.service.impl;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Consultations;
import com.medical.model.Ordonnance;
import com.medical.repo.ConsultationsRepo;
import com.medical.repo.OrdonnanceRepository;
import com.medical.service.OrdonnanceService;
 
@Service
public class OrdonnanceServiceImpl implements  OrdonnanceService{
    @Autowired
    private OrdonnanceRepository ordonnanceRepository;
    @Autowired
    private ConsultationsRepo consultationsRepo;
@Override
    public List<Ordonnance> getAllOrdonnances() {
        return ordonnanceRepository.findAll();
    }
@Override

    public Ordonnance saveOrdonnance(Ordonnance ordonnance , Long idConst) {
	Consultations consultations=consultationsRepo.findById(idConst).get();
	ordonnance.setConsultation(consultations);
	ordonnance.setDateOrdonnance(new Date());
	ordonnance.setDetails(ordonnance.getDetails());
        return ordonnanceRepository.save(ordonnance);
    }
@Override

    public void deleteOrdonnance(Long id) {
        ordonnanceRepository.deleteById(id);
    }
@Override
public List<Ordonnance> findByConsultation(Consultations consultation) {
	// TODO Auto-generated method stub
	return ordonnanceRepository.findByConsultation(consultation);
}
}
