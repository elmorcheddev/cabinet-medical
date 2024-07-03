package com.medical.service;

import java.util.List;

import com.medical.model.Invoice;
import com.medical.model.Treatment;

public interface InvoiceService {

 
	Invoice createInvoiceForConsultation(Long consultationId);

	Invoice getInvoiceById(Long id);

	List<Invoice> getAllInvoice();

	List<Invoice> getInvoicesByDoctor(Long doctorId);

}
