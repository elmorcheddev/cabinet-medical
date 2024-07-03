package com.medical.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medical.model.Consultations;
import com.medical.model.Ordonnance;
import com.medical.service.ConsultationsService;
import com.medical.service.OrdonnanceService;
 
@RestController
@RequestMapping("/api/ordonnances")
public class OrdonnanceController {
    @Autowired
    private OrdonnanceService ordonnanceService;
@Autowired
private ConsultationsService consultationsService;
    @GetMapping
    public List<Ordonnance> getAllOrdonnances() {
        return ordonnanceService.getAllOrdonnances();
    }
    @GetMapping(value = "getAllOrdonnancesByConst/{id}")
    public List<Ordonnance> getAllOrdonnancesByConst(@PathVariable Long id) {
    	Consultations consultations =consultationsService.findByIdConsultation(id);
        return ordonnanceService.findByConsultation(consultations);
    }
    @PostMapping
    public ResponseEntity<Ordonnance> createOrdonnance(@RequestBody Ordonnance ordonnance , @RequestParam Long idCosn) {
        Ordonnance createdOrdonnance = ordonnanceService.saveOrdonnance(ordonnance , idCosn);
        return ResponseEntity.ok(createdOrdonnance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdonnance(@PathVariable Long id) {
        ordonnanceService.deleteOrdonnance(id);
        return ResponseEntity.noContent().build();
    }
}
