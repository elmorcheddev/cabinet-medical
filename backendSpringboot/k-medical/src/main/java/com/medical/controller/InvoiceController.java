package com.medical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medical.model.Invoice;
import com.medical.service.InvoiceService;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/create/{consultationId}")
    public ResponseEntity<Invoice> createInvoice(@PathVariable Long consultationId) {
        try {
            Invoice invoice = invoiceService.createInvoiceForConsultation(consultationId);
            return ResponseEntity.ok(invoice);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable Long id) {
      
             return invoiceService.getInvoiceById(id);
          
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Invoice>> getInvoicesByDoctor(@PathVariable Long doctorId) {
        List<Invoice> invoices = invoiceService.getInvoicesByDoctor(doctorId);
        if (invoices != null) {
            return ResponseEntity.ok(invoices);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public List<Invoice> allInvoice() {
      
             return invoiceService.getAllInvoice();
          
    }
}
