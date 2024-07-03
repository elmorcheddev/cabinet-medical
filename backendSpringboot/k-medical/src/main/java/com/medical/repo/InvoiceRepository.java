package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Docteur;
import com.medical.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long>{

    List<Invoice> findByConsultation_Docteur(Docteur docteur);
	
}
