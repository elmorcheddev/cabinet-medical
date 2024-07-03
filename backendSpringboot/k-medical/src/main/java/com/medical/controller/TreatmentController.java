package com.medical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.Consultations;
import com.medical.model.Treatment;
import com.medical.service.ConsultationsService;
import com.medical.service.TreatmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;


@RestController
@RequestMapping(value = "/api/treatment")
public class TreatmentController {
@Autowired
private TreatmentService treatmentService;
@Autowired
private ConsultationsService consultationsService;
@GetMapping(value = "/allByCons")
public List<Treatment> allByCons(@RequestParam Long id) {
	Consultations consultations= consultationsService.findByIdConsultation(id);
    return treatmentService.findByConsultations(consultations);
}
@PostMapping(value = "/addTreatment")
public Treatment addTreatment(@RequestPart("treatment") Treatment treatment, @RequestParam Long idCons) {
	return treatmentService.addTreatment(treatment ,idCons);
}
}
