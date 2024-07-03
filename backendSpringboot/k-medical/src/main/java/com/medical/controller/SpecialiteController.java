package com.medical.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.medical.model.Specialite;
import com.medical.service.SpecialiteService;

@RestController
@RequestMapping(value = "/api/spec")
public class SpecialiteController {

	@Autowired
	private SpecialiteService specialiteService;

	@PostMapping(value = "/ajouterSpec")
	public Specialite ajouterSpecialite(@RequestPart("specialite") Specialite specialite,
			@RequestParam("idAdmin") Long idAdmin, @RequestPart("img") MultipartFile img) {
		try {
			specialite.setImg(img.getBytes());
			return specialiteService.ajouterSpecialite(specialite, idAdmin);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping(value = "/all")
	public List<Specialite> listSpecialites() {
		return specialiteService.listSpecialites();
	}

	@GetMapping(value = "/byId/{id}")
	public Specialite byId(@PathVariable Long id) {
		return specialiteService.findByIdSpecialite(id);
	}

	@GetMapping(value = "/byIdForPatient/{id}")
	public Specialite byIdForPatient(@PathVariable Long id) {
		return specialiteService.findByIdSpecialite(id);
	}

	@PutMapping(value = "/updateSpecialite/{id}")
	public Specialite updateSpecialite(@RequestPart("specialite") Specialite specialite ,
			@RequestParam("idAdmin") Long idAdmin ,
			@RequestPart("img") MultipartFile img) {
try {
specialite.setImg(img.getBytes());
return specialiteService.updateSpecialite(idAdmin,specialite);

} catch (IOException e) {
// TODO Auto-generated catch block
e.printStackTrace();
return null;

}
	}
}
