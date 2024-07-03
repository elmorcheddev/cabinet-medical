package com.medical.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.medical.model.Consultations;
import com.medical.model.Radiographie;
import com.medical.model.Treatment;
import com.medical.service.ConsultationsService;
import com.medical.service.RadiographieService;

@RestController
@RequestMapping(value = "/api/radio")
public class RadiographieController {

	@Autowired
	private RadiographieService radiographieService;
	@Autowired
	private ConsultationsService consultationsService;
	@GetMapping(value = "/allByCons")
	public List<Radiographie> allByCons(@RequestParam Long id) {
		Consultations consultations= consultationsService.findByIdConsultation(id);
	    return radiographieService.findByConsultations(consultations);
	}
	@PostMapping(value = "/addRadio")
	public Radiographie addTreatment(@RequestPart("radio") Radiographie radiographie, @RequestParam Long idCons 
			, @RequestPart("img") MultipartFile img) {
		try {
			radiographie.setImg(img.getBytes());
			return radiographieService.addTreatment(radiographie ,idCons);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}
