package com.medical.service.impl;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.medical.model.Consultations;
import com.medical.model.Docteur;
import com.medical.model.Invoice;
import com.medical.model.Patient;
import com.medical.model.Treatment;
import com.medical.repo.ConsultationsRepo;
import com.medical.repo.InvoiceRepository;
import com.medical.repo.TreatmentRepo;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.InvoiceService; 

@Service
public class InvoiceServiceImpl implements InvoiceService{

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ConsultationsRepo consultationsRepository;

    @Autowired
    private TreatmentRepo treatmentRepository;
    @Autowired
    private UtilisateurRepo utilisateurRepo;
    @Override
    public Invoice createInvoiceForConsultation(Long consultationId) {
        Consultations consultation = consultationsRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        List<Treatment> treatments = treatmentRepository.findByConsultations(consultation);

        double totalAmount = treatments.stream().mapToDouble(Treatment::getPrixOperation).sum();
        double prixConsultation = consultation.getPrixConsultation(); // Assuming this attribute exists

        Invoice invoice = new Invoice();
        invoice.setDateIssued(new Date());
        invoice.setTotalAmount(totalAmount+prixConsultation);
        invoice.setPrixConsultation(prixConsultation);
        invoice.setConsultation(consultation);

        for (Treatment treatment : treatments) {
            treatment.setInvoice(invoice);
        }

        invoiceRepository.save(invoice);

        return invoice;
    }
    
@Override
public Invoice getInvoiceById(Long id) {
    return invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Invoice not found"));
}
@Override
public List<Invoice> getAllInvoice() {
	// TODO Auto-generated method stub
	return invoiceRepository.findAll();
}
@Override
public List<Invoice> getInvoicesByDoctor(Long doctorId) {
	Docteur docteur=  (Docteur) utilisateurRepo.findById(doctorId).get();

    return invoiceRepository.findByConsultation_Docteur(docteur);
}
}
