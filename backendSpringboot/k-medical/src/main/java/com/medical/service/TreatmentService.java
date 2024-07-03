package com.medical.service;

import java.util.List;

import com.medical.model.Consultations;
import com.medical.model.Treatment;

public interface TreatmentService {
List<Treatment> listTreatment();
List<Treatment> findByConsultations(Consultations consultations);
Treatment addTreatment(Treatment treatment, Long idCons);

}
