package com.medical.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.model.Consultations;
import com.medical.model.Treatment;
import com.medical.repo.ConsultationsRepo;
import com.medical.repo.TreatmentRepo;
import com.medical.service.TreatmentService;

@Service
public class TreatmentServiceImpl implements TreatmentService {
    @Autowired
    private TreatmentRepo treatmentRepo;

    @Autowired
    private ConsultationsRepo consultationsRepo;

    @Override
    public List<Treatment> listTreatment() {
        return treatmentRepo.findAll();
    }

    @Override
    public Treatment addTreatment(Treatment treatment, Long idCons) {
        Consultations consultations = consultationsRepo.findById(idCons).orElse(null);
        if (consultations == null) {
            throw new IllegalArgumentException("Consultation not found with id: " + idCons);
        }

        treatment.setConsultations(consultations);
        treatment.setOperation(treatment.getOperation());
        treatment.setPrixOperation(treatment.getPrixOperation());
        Treatment savedTreatment = treatmentRepo.save(treatment);

       
        return treatmentRepo.save(savedTreatment);
    }

    @Override
    public List<Treatment> findByConsultations(Consultations consultations) {
        return treatmentRepo.findByConsultations(consultations);
    }
}
